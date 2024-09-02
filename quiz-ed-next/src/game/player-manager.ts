import { GameState } from "@/models/game-state";
import { Player } from "@/models/player";
import { Question } from "@/models/question";

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

export const getPlayersThatDidNotAnswer = (
  question: Question,
  gameState: GameState
) => {
  return gameState.players.filter(
    (player) => !hasPlayerAnswered(player.id, question)
  );
};
