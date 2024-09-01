import { GameState } from "./game-state";
import { Player } from "./player";
import { Answer } from "./question";

export type GameStatePayload = {
  gameId: number;
  gameState: GameState;
};

export type JoinPlayerPayload = {
  gameId: number;
  player: Player;
};

export type PlayerAnswerPayload = {
  gameId: number;
  questionId: string;
  answer: Answer;
};
