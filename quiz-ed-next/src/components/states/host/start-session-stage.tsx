"use client";

import { HostStage } from "@/app/[gameId]/host/page";
import { GameState } from "@/models/game-state";

type Props = {
  setStage: (stage: HostStage) => void;
  gameState: GameState;
};

const StartSessionStage = ({ setStage, gameState }: Props) => {
  return (
    <div>
      <h1>StartSessionStage</h1>
      <div>players:</div>
      {gameState && (
        <div>{gameState?.players.map((player) => player.name).join(", ")}</div>
      )}
      <button className="btn" onClick={() => setStage("hostGame")}>
        Start
      </button>
    </div>
  );
};

export default StartSessionStage;
