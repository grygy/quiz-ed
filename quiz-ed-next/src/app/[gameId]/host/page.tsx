"use client";

import HostGameStage from "@/components/states/host/host-game-stage";
import ResultsStage from "@/components/states/host/reults-stage";
import StartSessionStage from "@/components/states/host/start-session-stage";
import UploadQuestionStage from "@/components/states/host/upload-questions-stage";
import useGameState from "@/hooks/use-game-state";
import useJoinPlayer from "@/hooks/use-join-player";
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

  useJoinPlayer(gameId, updateGameState);

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
      {stage === "hostGame" && <HostGameStage setStage={handleSetStage} />}
      {stage === "results" && <ResultsStage />}
    </>
  );
}
