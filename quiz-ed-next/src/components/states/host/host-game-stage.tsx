"use client";

import { HostStage } from "@/app/[gameId]/host/page";
import { GameState } from "@/models/game-state";

type Props = {
  setStage: (stage: HostStage) => void;
  gameState: GameState;
  updateGameState: (
    setGameStateCallback: (gameState: GameState) => void
  ) => void;
};

const HostGameStage = ({ setStage, gameState, updateGameState }: Props) => {
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
