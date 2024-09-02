import { GameState, QuestionState } from "@/models/game-state";

export const goToNextQuestion = (gameState: GameState): GameState => {
  const currentQuestionIndex = gameState.currentQuestionIndex;
  const nextQuestionIndex = currentQuestionIndex + 1;

  if (nextQuestionIndex >= gameState.questions.length) {
    console.log("Game finished");
    return {
      ...gameState,
      state: "finished",
      questionState: "reading",
    };
  }

  return {
    ...gameState,
    currentQuestionIndex: nextQuestionIndex,
    questionState: "reading",
  };
};

export const isLastQuestion = (gameState: GameState) => {
  return gameState.currentQuestionIndex === gameState.questions.length - 1;
};

export const changeQuestionState = (
  gameState: GameState,
  questionState: QuestionState
): GameState => {
  return {
    ...gameState,
    questionState,
  };
};
