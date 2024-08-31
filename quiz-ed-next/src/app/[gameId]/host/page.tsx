"use client";

import HostGameStage from "@/components/states/host/host-game-stage";
import ResultsStage from "@/components/states/host/reults-stage";
import StartSessionStage from "@/components/states/host/start-session-stage";
import UploadQuestionStage from "@/components/states/host/upload-questions-stage";
import useStoreState from "@/hooks/use-store-state";
import { GameState } from "@/models/game-state";
import { useState } from "react";

export type HostStage =
  | "uploadQuestions"
  | "startSession"
  | "hostGame"
  | "results";

export default function Page({ params }: { params: { gameId: string } }) {
  const [stage, setStage] = useState<HostStage>("uploadQuestions");
  const [gameState, setGameState] = useStoreState<GameState>("game-state", {
    players: [],
  });
  const gameId = params.gameId;

  const handleSetStage = (stage: HostStage) => {
    setStage(stage);
  };

  return (
    <>
      <div className="">HOST, Game id:{gameId}</div>

      <div>players: {gameState?.players.join(", ")}</div>

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
