import { GameState } from "@/models/game-state";
import { Answer, Option, Question } from "@/models/question";
import {
  getPlayersThatDidNotAnswer,
  hasPlayerAnswered,
} from "./player-manager";

export const getCurrentQuestion = (gameState: GameState): Question => {
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

const findQuestionIndex = (questionId: string, gameState: GameState) => {
  return gameState.questions.findIndex((q) => q.id === questionId);
};

export const addAnswerForQuestion = (
  questionId: string,
  answer: Answer,
  gameState: GameState
): GameState => {
  const questionIndex = findQuestionIndex(questionId, gameState);
  if (questionIndex === -1) {
    return gameState;
  }

  const question = gameState.questions[questionIndex];

  if (hasPlayerAnswered(answer.playerId, question)) {
    return gameState;
  }

  const newQuestion = {
    ...question,
    answers: [...question.answers, answer],
  };

  return {
    ...gameState,
    questions: [
      ...gameState.questions.slice(0, questionIndex),
      newQuestion,
      ...gameState.questions.slice(questionIndex + 1),
    ],
  };
};

export const getNumberOfAnswersForCurrentQuestion = (gameState: GameState) => {
  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  return currentQuestion.answers.length;
};

export const getTotalNumberOfPlayers = (gameState: GameState) => {
  return gameState.players.length;
};

export const getNumberOfAnswersForOption = (
  optionId: string,
  gameState: GameState
) => {
  const answers = gameState.questions.map((q) => q.answers).flat();
  return answers.filter((a) => a.optionId === optionId).length;
};

export const getOptionForQuestionById = (
  optionId: string,
  question: Question
): Option | undefined => {
  return question.options.find((o) => o.id === optionId);
};

export const isPlayersAnswerCorrect = (
  playerId: string,
  currentQuestion: Question
) => {
  const playerAnswer = currentQuestion.answers.find(
    (a) => a.playerId === playerId
  );
  const option = getOptionForQuestionById(
    playerAnswer?.optionId || "",
    currentQuestion
  );
  return option?.isCorrect || false;
};

export const finishQuestion = (gameState: GameState): GameState => {
  const currentQuestion = getCurrentQuestion(gameState);

  const playersThatDidNotAnswer = getPlayersThatDidNotAnswer(
    currentQuestion,
    gameState
  );

  const currentQuestionWithFilledAnswers: Question = {
    ...currentQuestion,
    answers: [
      ...currentQuestion.answers,
      ...playersThatDidNotAnswer.map((player) => ({
        playerId: player.id,
        optionId: null,
      })),
    ],
  };

  const newState: GameState = {
    ...gameState,
    questions: [
      ...gameState.questions.slice(0, gameState.currentQuestionIndex),
      currentQuestionWithFilledAnswers,
      ...gameState.questions.slice(gameState.currentQuestionIndex + 1),
    ],
    questionState: "result",
  };

  return newState;
};
