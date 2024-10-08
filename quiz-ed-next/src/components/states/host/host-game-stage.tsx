"use client";

import { HostStage } from "@/app/[gameId]/host/page";
import Options from "@/components/molecules/options";
import { goToNextQuestion, isLastQuestion } from "@/game/game-manager";
import {
  getCurrentQuestion,
  getNumberOfAnswersForCurrentQuestion,
  getTotalNumberOfPlayers,
} from "@/game/question-manager";
import useQuestionCountdown from "@/hooks/use-question-countdown";
import { GameState } from "@/models/game-state";

type Props = {
  setStage: (stage: HostStage) => void;
  gameState: GameState;
  updateGameState: (
    setGameStateCallback: (gameState: GameState) => void
  ) => void;
};

const HostGameStage = ({ setStage, gameState, updateGameState }: Props) => {
  const currentQuestion = getCurrentQuestion(gameState);
  const totalNumberOfPlayers = getTotalNumberOfPlayers(gameState);
  const numberOfAnswers = getNumberOfAnswersForCurrentQuestion(gameState);
  const haveAllPlayersAnswered = numberOfAnswers === totalNumberOfPlayers;
  const isLast = isLastQuestion(gameState);

  const {
    remainingReadingTimeInSeconds,
    remainingAnswerTimeInSeconds,
    startRemainingReadingTimeInSeconds,
  } = useQuestionCountdown(gameState, updateGameState, haveAllPlayersAnswered);

  if (gameState.state !== "playing") {
    return <h1>Invalid state {gameState.state}</h1>;
  }

  return (
    <div>
      <h1>{currentQuestion.question}</h1>

      <div>Reading time: {remainingReadingTimeInSeconds} seconds</div>
      <div>Answer time: {remainingAnswerTimeInSeconds} seconds</div>

      <div>
        Answered: {numberOfAnswers}/{totalNumberOfPlayers}
      </div>

      <Options
        currentQuestion={currentQuestion}
        haveAllPlayersAnswered={haveAllPlayersAnswered}
        gameState={gameState}
      />

      {haveAllPlayersAnswered && (
        <button
          className="btn"
          onClick={() => {
            updateGameState((gameState) => {
              return goToNextQuestion(gameState);
            });
            startRemainingReadingTimeInSeconds();
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
