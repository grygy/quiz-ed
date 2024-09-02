import { changeQuestionState } from "@/game/game-manager";
import { finishQuestion, getCurrentQuestion } from "@/game/question-manager";
import { GameState } from "@/models/game-state";
import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";

const useQuestionCountdown = (
  gameState: GameState,
  updateGameState: (
    setGameStateCallback: (gameState: GameState) => void
  ) => void,
  haveAllPlayersAnswered: boolean
) => {
  const currentQuestion = getCurrentQuestion(gameState);

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
      gameState.currentQuestionIndex === 0 &&
      gameState.questionState === "reading"
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

  return {
    remainingReadingTimeInSeconds,
    remainingAnswerTimeInSeconds,
    startRemainingReadingTimeInSeconds,
    startRemainingAnswerTimeInSeconds,
    resetReadingTime,
    resetAnswerTime,
  };
};

export default useQuestionCountdown;
