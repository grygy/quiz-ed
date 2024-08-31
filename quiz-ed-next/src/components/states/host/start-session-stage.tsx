"use client";

import { HostStage } from "@/app/[gameId]/host/page";

type Props = {
  setStage: (stage: HostStage) => void;
};

const StartSessionStage = ({ setStage }: Props) => {
  return (
    <div>
      <h1>StartSessionStage</h1>
      <button className="btn" onClick={() => setStage("hostGame")}>
        Start
      </button>
    </div>
  );
};

export default StartSessionStage;
