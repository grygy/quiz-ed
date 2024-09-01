import { GameState } from "@/models/game-state";
import { Player } from "@/models/player";

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
