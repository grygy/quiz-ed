"use client";

import { PlayerStage } from "@/app/[gameId]/page";
import { emitPlayerAnswer } from "@/communication/emitter";
import { getPlayer, hasPlayerAnswered } from "@/game/player-manager";
import { getCurrentQuestion } from "@/game/question-manager";
import { GameState } from "@/models/game-state";

type Props = {
  setStage: (stage: PlayerStage) => void;
  gameState: GameState;
  playerId: string;
};

const GameStage = ({ setStage, gameState, playerId }: Props) => {
  const player = getPlayer(playerId, gameState);

  if (gameState.state === "lobby") {
    return <h3>Hi {player?.name}, sit tight. Others are joining...</h3>;
  }

  const currentQuestion = getCurrentQuestion(gameState);

  const handleAnswer = (optionId: string) => {
    emitPlayerAnswer(gameState.gameId, currentQuestion.id, {
      playerId: playerId,
      optionId: optionId,
    });
  };

  if (hasPlayerAnswered(playerId, currentQuestion)) {
    return <h3>Waiting for other players to answer...</h3>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((question, index) => (
          <button
            className="btn btn-primary"
            key={question.id}
            onClick={() => handleAnswer(question.id)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button className="btn" onClick={() => setStage("end")}>
        Finish
      </button>
    </div>
  );
};

export default GameStage;
