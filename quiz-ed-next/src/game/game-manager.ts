import { GameState } from "@/models/game-state";

export const goToNextQuestion = (gameState: GameState): GameState => {
  const currentQuestionIndex = gameState.currentQuestionIndex;
  const nextQuestionIndex = currentQuestionIndex + 1;

  if (nextQuestionIndex >= gameState.questions.length) {
    return {
      ...gameState,
      state: "finished",
    };
  }

  return {
    ...gameState,
    currentQuestionIndex: nextQuestionIndex,
  };
};

export const isLastQuestion = (gameState: GameState) => {
  return gameState.currentQuestionIndex === gameState.questions.length - 1;
};
