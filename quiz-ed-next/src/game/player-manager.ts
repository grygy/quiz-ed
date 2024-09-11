import { GameState } from "@/models/game-state";
import { Player } from "@/models/player";
import { Question } from "@/models/question";

export const addOrUpdatePlayer = (
  gameState: GameState,
  player: Player
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

export const getPlayer = (gameState: GameState, playerId: string) => {
  const player = gameState.players.find((p) => p.id === playerId);
  return player;
};

export const hasPlayerAnswered = (question: Question, playerId: string) => {
  return question.answers.some((answer) => answer.playerId === playerId);
};

export const getPlayersThatDidNotAnswer = (
  gameState: GameState,
  question: Question
) => {
  return gameState.players.filter(
    (player) => !hasPlayerAnswered(question, player.id)
  );
};
