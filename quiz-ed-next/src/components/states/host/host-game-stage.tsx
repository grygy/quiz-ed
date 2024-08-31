"use client";

import { HostStage } from "@/app/[gameId]/host/page";

type Props = {
  setStage: (stage: HostStage) => void;
};

const HostGameStage = ({ setStage }: Props) => {
  return (
    <div>
      <h1>HostGameStage</h1>
      <button className="btn" onClick={() => setStage("results")}>
        Results
      </button>
    </div>
  );
};

export default HostGameStage;
