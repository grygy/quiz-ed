import { Player } from "./player";
import { Question } from "./question";

export type QuestionState = "reading" | "answering" | "result";

export type GameState = {
  gameId: number;
  players: Player[];
  questions: Question[];
  quizTitle: string;
  currentQuestionIndex: number;
  state: "lobby" | "playing" | "finished";
  questionState: QuestionState;
};
