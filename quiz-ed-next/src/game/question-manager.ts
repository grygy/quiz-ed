import { GameState } from "@/models/game-state";
import { Answer, Question } from "@/models/question";

export const getCurrentQuestion = (gameState: GameState) => {
  return gameState.questions[gameState.currentQuestionIndex];
};

const hasPlayerAlreadyAnswered = (question: Question, playerId: string) => {
  return question.answers.some((answer) => answer.playerId === playerId);
};

export const addAnswerToCurrentQuestion = (
  gameState: GameState,
  answer: Answer
) => {
  const currentQuestion = getCurrentQuestion(gameState);
  if (hasPlayerAlreadyAnswered(currentQuestion, answer.playerId)) {
    return gameState;
  }
  const newState = {
    ...gameState,
    questions: gameState.questions.map((question, index) => {
      if (index === gameState.currentQuestionIndex) {
        return {
          ...question,
          answers: [...question.answers, answer],
        };
      }
      return question;
    }),
  };
  return newState;
};
