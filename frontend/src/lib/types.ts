export type Quiz = {
  id: number;
  name: string;
  questions: Question[];
  results: QuizResult[];
};

export type Question = {
  text: string;
  choices: QuestionChoice[];
};

export type QuestionChoice = {
  text: string;
  points: number;
  resultIndex: number;
};

export type QuizResult = {
  name: string;
  description: string;
};

export type User = {
  id: number;
  username: string;
};

export type AppData = {
  userId: number;
  username: string;
  quizzes: Quiz[];
};

export type APIResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };
