"use client";

import { emitPlayerAnswer } from "@/communication/emitter";
import { getPlayer, hasPlayerAnswered } from "@/game/player-manager";
import {
  getCurrentQuestion,
  isPlayersAnswerCorrect,
} from "@/game/question-manager";
import { GameState } from "@/models/game-state";

type Props = {
  gameState: GameState;
  playerId: string;
};

const GameStage = ({ gameState, playerId }: Props) => {
  const player = getPlayer(gameState, playerId);

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

  const isPlayersCorrect = isPlayersAnswerCorrect(playerId, currentQuestion);

  if (gameState.questionState === "reading") {
    return <h3>Reading...</h3>;
  }

  if (gameState.questionState === "result") {
    return <h3>{isPlayersCorrect ? "Correct" : "Wrong"}</h3>;
  }

  if (hasPlayerAnswered(currentQuestion, playerId)) {
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
    </div>
  );
};

export default GameStage;
