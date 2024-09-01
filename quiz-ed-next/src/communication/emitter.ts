import {
  GAME_STATE_TOPIC,
  JOIN_PLAYER_TOPIC,
  PLAYER_ANSWER_TOPIC,
} from "@/constants/topic-name";
import { GameState } from "@/models/game-state";
import { Answer } from "@/models/question";
import {
  GameStatePayload,
  JoinPlayerPayload,
  PlayerAnswerPayload,
} from "@/models/topic-payload";
import { socket } from "@/socket";

export const emitJoinPlayer = (playerPayload: JoinPlayerPayload) => {
  socket.emit(JOIN_PLAYER_TOPIC, playerPayload);
  console.log("Player emitted", playerPayload);
};

export const emitGameState = (
  gameId: number,
  gameState: GameState | undefined
) => {
  if (!gameState) {
    console.log("Game state is undefined");
    return;
  }

  const gameStatePayload: GameStatePayload = { gameId, gameState };
  socket.emit(GAME_STATE_TOPIC, gameStatePayload);
  console.log("Game state emitted", gameStatePayload);
};

export const emitPlayerAnswer = (
  gameId: number,
  questionId: string,
  answer: Answer
) => {
  const payload: PlayerAnswerPayload = { gameId, questionId, answer };
  socket.emit(PLAYER_ANSWER_TOPIC, payload);
  console.log("Player answer emitted", questionId, answer);
};
