"use client";

import HostGameStage from "@/components/states/host/host-game-stage";
import ResultsStage from "@/components/states/host/reults-stage";
import StartSessionStage from "@/components/states/host/start-session-stage";
import UploadQuestionStage from "@/components/states/host/upload-questions-stage";
import useGameState from "@/hooks/use-game-state";
import useGameUpdate from "@/hooks/use-game-update";
import useJoinPlayer from "@/hooks/use-join-player";
import usePlayerAnswer from "@/hooks/use-player-answer";
import { useState } from "react";
import { useIsClient } from "usehooks-ts";

export type HostStage =
  | "uploadQuestions"
  | "startSession"
  | "hostGame"
  | "results";

export default function Page({ params }: { params: { gameId: string } }) {
  const [stage, setStage] = useState<HostStage>("uploadQuestions");
  // prevent hydration errors
  const isClient = useIsClient();
  const gameId = +params.gameId;

  const { gameState, updateGameState, clearGame } = useGameState(gameId);

  const handleSetStage = (stage: HostStage) => {
    setStage(stage);
  };

  useJoinPlayer(gameId, updateGameState);

  usePlayerAnswer(gameId, updateGameState);

  useGameUpdate(gameId, gameState);

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
        <StartSessionStage
          setStage={handleSetStage}
          gameState={gameState}
          updateGameState={updateGameState}
        />
      )}
      {stage === "hostGame" && (
        <HostGameStage
          setStage={handleSetStage}
          gameState={gameState}
          updateGameState={updateGameState}
        />
      )}
      {stage === "results" && <ResultsStage />}
      <button
        className="btn btn-error"
        onClick={() => {
          setStage("uploadQuestions");
          clearGame();
        }}
      >
        CLEAR ALL
      </button>
    </>
  );
}
