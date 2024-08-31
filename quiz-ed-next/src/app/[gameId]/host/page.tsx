"use client";

import HostGameStage from "@/components/states/host/host-game-stage";
import ResultsStage from "@/components/states/host/reults-stage";
import StartSessionStage from "@/components/states/host/start-session-stage";
import UploadQuestionStage from "@/components/states/host/upload-questions-stage";
import { useState } from "react";

export type HostStage =
  | "uploadQuestions"
  | "startSession"
  | "hostGame"
  | "results";

export default function Page({ params }: { params: { gameId: string } }) {
  const [stage, setStage] = useState<HostStage>("uploadQuestions");
  const gameId = params.gameId;

  const handleSetStage = (stage: HostStage) => {
    setStage(stage);
  };

  return (
    <>
      <div className="">HOST, Game id:{gameId}</div>
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
