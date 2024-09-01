"use client";

import { emitGameState } from "@/communication/emitter";
import HostGameStage from "@/components/states/host/host-game-stage";
import ResultsStage from "@/components/states/host/reults-stage";
import StartSessionStage from "@/components/states/host/start-session-stage";
import UploadQuestionStage from "@/components/states/host/upload-questions-stage";
import { GAME_STATE_UPDATE_INTERVAL_MS } from "@/constants/communication";
import useGameState from "@/hooks/use-game-state";
import useJoinPlayer from "@/hooks/use-join-player";
import { GameState } from "@/models/game-state";
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
    if (stage === "hostGame") {
      updateGameState((gameState) => {
        const newGameState: GameState = {
          ...gameState,
          state: "playing",
        };
        return newGameState;
      });
    }
    if (stage === "results") {
      updateGameState((gameState) => {
        const newGameState: GameState = {
          ...gameState,
          state: "finished",
        };
        return newGameState;
      });
    }
    setStage(stage);
  };

  useEffect(() => {
    // to prevent hydration errors
    setIsClient(true);
  }, []);

  useJoinPlayer(gameId, updateGameState);

  useEffect(() => {
    const interval = setInterval(() => {
      emitGameState(gameId, gameState);
    }, GAME_STATE_UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [gameId, gameState]);

  if (!gameId || !gameState || !isClient) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  return (
    <>
      <div className="">HOST, Game id:{gameId}</div>

      {stage === "uploadQuestions" && (
        <UploadQuestionStage
          setStage={handleSetStage}
          updateGameState={updateGameState}
        />
      )}
      {stage === "startSession" && (
        <StartSessionStage setStage={handleSetStage} gameState={gameState} />
      )}
      {stage === "hostGame" && (
        <HostGameStage
          setStage={handleSetStage}
          gameState={gameState}
          updateGameState={updateGameState}
        />
      )}
      {stage === "results" && <ResultsStage />}
    </>
  );
}
