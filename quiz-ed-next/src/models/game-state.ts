import { Player } from "./player";
import { Question } from "./question";

export type GameState = {
  gameId: number;
  players: Player[];
  questions: Question[];
  quizTitle: string;
  currentQuestionIndex: number;
  state: "lobby" | "playing" | "finished";
  questionState: "reading" | "answering" | "result";
};
