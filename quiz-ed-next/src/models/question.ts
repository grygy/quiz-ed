import { z } from "zod";

const OptionSchema = z.object({
  id: z.string(),
  title: z.string(),
  isCorrect: z.boolean(),
});

const AnswerSchema = z.object({
  playerId: z.string(),
  answerId: z.string(),
});

export type Answer = z.infer<typeof AnswerSchema>;

const QuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  timeLimitInSeconds: z.number(),
  timeToReadInSeconds: z.number(),
  options: z.array(OptionSchema),
  answers: z.array(AnswerSchema),
});

export type Question = z.infer<typeof QuestionSchema>;

export const QuizSchema = z.object({
  version: z.literal("v1"),
  quizTitle: z.string(),
  questions: z.array(QuestionSchema),
});

export type Quiz = z.infer<typeof QuizSchema>;
