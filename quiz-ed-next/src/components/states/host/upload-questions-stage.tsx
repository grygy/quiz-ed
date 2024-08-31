"use client";

import { HostStage } from "@/app/[gameId]/host/page";

type Props = {
  setStage: (stage: HostStage) => void;
};

const UploadQuestionStage = ({ setStage }: Props) => {
  return (
    <div>
      <h1>UploadQuestionStage</h1>
      <button className="btn" onClick={() => setStage("startSession")}>
        Start session
      </button>
    </div>
  );
};

export default UploadQuestionStage;
