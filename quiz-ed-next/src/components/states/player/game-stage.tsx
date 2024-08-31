"use client";

import { PlayerStage } from "@/app/[gameId]/page";

type Props = {
  setStage: (stage: PlayerStage) => void;
};

const GameStage = ({ setStage }: Props) => {
  return (
    <div>
      <h1>GameStage</h1>
      <button className="btn" onClick={() => setStage("end")}>
        Finish
      </button>
    </div>
  );
};

export default GameStage;
