"use client";

import { HostStage } from "@/app/[gameId]/host/page";
import Options from "@/components/molecules/options";
import {
  changeQuestionState,
  goToNextQuestion,
  isLastQuestion,
} from "@/game/game-manager";
import {
  finishQuestion,
  getCurrentQuestion,
  getNumberOfAnswersForCurrentQuestion,
  getTotalNumberOfPlayers,
} from "@/game/question-manager";
import { GameState } from "@/models/game-state";
import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";

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

  const [
    remainingReadingTimeInSeconds,
    {
      startCountdown: startRemainingReadingTimeInSeconds,
      resetCountdown: resetReadingTime,
    },
  ] = useCountdown({
    countStart: currentQuestion.timeToReadInSeconds,
  });

  const [
    remainingAnswerTimeInSeconds,
    {
      startCountdown: startRemainingAnswerTimeInSeconds,
      resetCountdown: resetAnswerTime,
    },
  ] = useCountdown({
    countStart: currentQuestion.timeLimitInSeconds,
  });

  useEffect(() => {
    if (
      (gameState.currentQuestionIndex === 0,
      gameState.questionState === "reading")
    ) {
      startRemainingReadingTimeInSeconds();
    }
  }, [
    gameState.currentQuestionIndex,
    gameState.questionState,
    startRemainingReadingTimeInSeconds,
  ]);

  useEffect(() => {
    if (remainingReadingTimeInSeconds <= 0.0001) {
      startRemainingAnswerTimeInSeconds();
      resetReadingTime();
      updateGameState((gameState) => {
        return changeQuestionState(gameState, "answering");
      });
    }
  }, [
    remainingReadingTimeInSeconds,
    startRemainingAnswerTimeInSeconds,
    updateGameState,
    resetReadingTime,
  ]);

  useEffect(() => {
    if (remainingAnswerTimeInSeconds <= 0.0001 || haveAllPlayersAnswered) {
      resetAnswerTime();
      updateGameState((gameState) => {
        return finishQuestion(gameState);
      });
    }
  }, [
    remainingReadingTimeInSeconds,
    startRemainingAnswerTimeInSeconds,
    updateGameState,
    resetReadingTime,
    remainingAnswerTimeInSeconds,
    resetAnswerTime,
    haveAllPlayersAnswered,
  ]);

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
