"use client";

import { HostStage } from "@/app/[gameId]/host/page";
import { getCurrentQuestion } from "@/game/question-manager";
import { GameState } from "@/models/game-state";

type Props = {
  setStage: (stage: HostStage) => void;
  gameState: GameState;
  updateGameState: (
    setGameStateCallback: (gameState: GameState) => void
  ) => void;
};

const HostGameStage = ({ setStage, gameState, updateGameState }: Props) => {
  if (gameState.state !== "playing") {
    return <h1>Invalid state {gameState.state}</h1>;
  }

  const currentQuestion = getCurrentQuestion(gameState);

  return (
    <div>
      <h1>{currentQuestion.question}</h1>

      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <div className="card" key={option.id}>
            {index + 1} {option.title}
          </div>
        ))}
      </div>

      <button className="btn" onClick={() => setStage("results")}>
        Results
      </button>
    </div>
  );
};

export default HostGameStage;
