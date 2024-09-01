"use client";

import HostGameStage from "@/components/states/host/host-game-stage";
import ResultsStage from "@/components/states/host/reults-stage";
import StartSessionStage from "@/components/states/host/start-session-stage";
import UploadQuestionStage from "@/components/states/host/upload-questions-stage";
import { JOIN_PLAYER_TOPIC } from "@/constants/topic-name";
import useGameState from "@/hooks/use-game-state";
import { JoinPlayerPayload } from "@/models/topic-payload";
import { socket } from "@/socket";
import { useEffect, useState } from "react";

export type HostStage =
  | "uploadQuestions"
  | "startSession"
  | "hostGame"
  | "results";

export default function Page({ params }: { params: { gameId: string } }) {
  const [stage, setStage] = useState<HostStage>("uploadQuestions");
  const [isClient, setIsClient] = useState(false);
  const gameId = +params.gameId;

  const [gameState, updateGameState] = useGameState(gameId);

  const handleSetStage = (stage: HostStage) => {
    setStage(stage);
  };

  useEffect(() => {
    // to prevent hydration errors
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleAddPlayer = (playerPayload: JoinPlayerPayload) => {
      if (playerPayload.gameId !== gameId) {
        console.log("player joined wrong game", playerPayload);
      }

      updateGameState((state) => {
        return {
          gameId: state.gameId,
          players: [...state.players, playerPayload.player],
        };
      });

      console.log("player joined", playerPayload);
    };

    socket.on(JOIN_PLAYER_TOPIC, (playerPayload: JoinPlayerPayload) => {
      handleAddPlayer(playerPayload);
    });
    return () => {
      socket.off(JOIN_PLAYER_TOPIC);
    };
  }, []);

  if (!gameId || !gameState || !isClient) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  return (
    <>
      <div className="">HOST, Game id:{gameId}</div>

      <div>players:</div>
      {gameState && (
        <div>{gameState?.players.map((player) => player.name).join(", ")}</div>
      )}

      {stage === "uploadQuestions" && (
        <UploadQuestionStage setStage={handleSetStage} />
      )}
      {stage === "startSession" && (
        <StartSessionStage setStage={handleSetStage} />
      )}
      {stage === "hostGame" && <HostGameStage setStage={handleSetStage} />}
      {stage === "results" && <ResultsStage />}
    </>
  );
}
