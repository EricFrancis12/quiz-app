import { z } from "zod";
import type {
  Quiz,
  Question,
  QuestionChoice,
  QuizResult,
  AppData,
  User,
} from "./types";

export const questionChoiceSchema: z.ZodType<QuestionChoice> = z.object({
  text: z.string(),
  points: z.number(),
  resultIndex: z.number().int(),
});

export const questionSchema: z.ZodType<Question> = z.object({
  text: z.string(),
  choices: z.array(questionChoiceSchema),
});

export const quizResultSchema: z.ZodType<QuizResult> = z.object({
  name: z.string(),
  description: z.string(),
});

export const quizSchema: z.ZodType<Quiz> = z.object({
  id: z.number(),
  name: z.string(),
  questions: z.array(questionSchema),
  results: z.array(quizResultSchema),
});

export const userSchema: z.ZodType<User> = z.object({
  id: z.number(),
  username: z.string(),
});

export const appDataSchema: z.ZodType<AppData> = z.object({
  userId: z.number(),
  username: z.string(),
  quizzes: z.array(quizSchema),
});

export const apiResponseSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.discriminatedUnion("success", [
    z.object({
      success: z.literal(true),
      data: dataSchema,
    }),
    z.object({
      success: z.literal(false),
      error: z.string(),
    }),
  ]);
