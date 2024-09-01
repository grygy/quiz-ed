import { Quiz } from "@/models/question";
import { v4 } from "uuid";

export const QUIZ_JSON_EXAMPLE: Quiz = {
  version: "v1",
  quizTitle: "Space quiz",
  questions: [
    {
      answers: [],
      id: v4(),
      options: [
        {
          id: v4(),
          isCorrect: true,
          title: "Earth",
        },
        {
          id: v4(),
          isCorrect: false,
          title: "Mars",
        },
        {
          id: v4(),
          isCorrect: false,
          title: "Venus",
        },
        {
          id: v4(),
          isCorrect: false,
          title: "Jupiter",
        },
      ],
      question: "Which planet is the third from the sun?",
      timeLimitInSeconds: 10,
      timeToReadInSeconds: 5,
    },
    {
      answers: [],
      id: v4(),
      options: [
        {
          id: v4(),
          isCorrect: false,
          title: "Neil Armstrong",
        },
        {
          id: v4(),
          isCorrect: true,
          title: "Yuri Gagarin",
        },
        {
          id: v4(),
          isCorrect: false,
          title: "Laika",
        },
        {
          id: v4(),
          isCorrect: false,
          title: "Buzz Aldrin",
        },
      ],
      question: "Who was the first human to travel to space?",
      timeLimitInSeconds: 15,
      timeToReadInSeconds: 5,
    },
  ],
};
