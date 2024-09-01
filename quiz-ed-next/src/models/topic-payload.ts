import { GameState } from "./game-state";
import { Player } from "./player";

export type GameStatePayload = {
  gameId: number;
  gameState: GameState;
};

export type JoinPlayerPayload = {
  gameId: number;
  player: Player;
};
