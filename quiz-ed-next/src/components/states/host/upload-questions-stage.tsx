"use client";

import { HostStage } from "@/app/[gameId]/host/page";
import { QUIZ_JSON_EXAMPLE } from "@/constants/example";
import { GameState } from "@/models/game-state";
import { QuizSchema } from "@/models/question";
import { useEffect, useState } from "react";

type Props = {
  setStage: (stage: HostStage) => void;
  updateGameState: (
    setGameStateCallback: (gameState: GameState) => void
  ) => void;
};

const UploadQuestionStage = ({ setStage, updateGameState }: Props) => {
  const [quizJson, setQuizJson] = useState(
    JSON.stringify(QUIZ_JSON_EXAMPLE, null, 2)
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [quizJson]);

  const parseQuizJson = (quizJson: string) => {
    try {
      return QuizSchema.parse(JSON.parse(quizJson));
    } catch {
      setError("Invalid JSON");
      return null;
    }
  };

  const handleStartSession = () => {
    const quiz = parseQuizJson(quizJson);
    if (quiz) {
      updateGameState((gameState) => {
        const newGameState: GameState = {
          ...gameState,
          questions: quiz.questions,
          quizTitle: quiz.quizTitle,
        };
        return newGameState;
      });
      setStage("startSession");
    }
  };

  return (
    <div>
      <h1>UploadQuestionStage</h1>
      <textarea
        className="textarea textarea-bordered"
        placeholder="Quiz json"
        value={quizJson}
        onChange={(e) => setQuizJson(e.target.value)}
      ></textarea>
      <p className="text-error">{error}</p>

      <button className="btn" onClick={handleStartSession}>
        Start session
      </button>
    </div>
  );
};

export default UploadQuestionStage;
