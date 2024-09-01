"use client";

import { HostStage } from "@/app/[gameId]/host/page";
import { goToNextQuestion, isLastQuestion } from "@/game/game-manager";
import {
  getCurrentQuestion,
  getNumberOfAnswersForCurrentQuestion,
  getNumberOfAnswersForOption,
  getTotalNumberOfPlayers,
} from "@/game/question-manager";
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
  const totalNumberOfPlayers = getTotalNumberOfPlayers(gameState);
  const numberOfAnswers = getNumberOfAnswersForCurrentQuestion(gameState);
  const haveAllPlayersAnswered = numberOfAnswers === totalNumberOfPlayers;
  const isLast = isLastQuestion(gameState);

  return (
    <div>
      <h1>{currentQuestion.question}</h1>

      <div>
        Answered: {numberOfAnswers}/{totalNumberOfPlayers}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => {
          if (haveAllPlayersAnswered) {
            const numberOfAnswers = getNumberOfAnswersForOption(
              option.id,
              gameState
            );

            return (
              <div
                className={`card ${
                  option.isCorrect ? "bg-success" : "bg-error"
                }`}
                key={option.id}
              >
                {index + 1} {option.title} - {numberOfAnswers} answers
              </div>
            );
          }

          return (
            <div className="card" key={option.id}>
              {index + 1} {option.title}
            </div>
          );
        })}
      </div>

      {haveAllPlayersAnswered && (
        <button
          className="btn"
          onClick={() => {
            updateGameState((gameState) => {
              return goToNextQuestion(gameState);
            });
            if (isLast) {
              setStage("results");
            }
          }}
        >
          {isLast ? "Results" : "Next Question"}
        </button>
      )}
    </div>
  );
};

export default HostGameStage;
