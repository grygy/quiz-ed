"use client";

import { PlayerStage } from "@/app/[gameId]/page";

type Props = {
  setStage: (stage: PlayerStage) => void;
};

const UsernameStage = ({ setStage }: Props) => {
  return (
    <div>
      <h1>UsernameStage</h1>
      <button className="btn" onClick={() => setStage("game")}>
        Join game
      </button>
    </div>
  );
};

export default UsernameStage;
