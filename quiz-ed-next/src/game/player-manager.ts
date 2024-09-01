import { GameState } from "@/models/game-state";
import { Player } from "@/models/player";
import { Answer, Question } from "@/models/question";

export const addOrUpdatePlayer = (
  player: Player,
  gameState: GameState
): GameState => {
  const playerIndex = gameState.players.findIndex((p) => p.id === player.id);
  if (playerIndex === -1) {
    return {
      ...gameState,
      players: [...gameState.players, player],
    };
  }
  return {
    ...gameState,
    players: [
      ...gameState.players.slice(0, playerIndex),
      player,
      ...gameState.players.slice(playerIndex + 1),
    ],
  };
};

export const getPlayer = (playerId: string, gameState: GameState) => {
  const player = gameState.players.find((p) => p.id === playerId);
  return player;
};

export const hasPlayerAnswered = (playerId: string, question: Question) => {
  return question.answers.some((answer) => answer.playerId === playerId);
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
