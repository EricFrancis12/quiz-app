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
  resultsIndex: number;
};

export type QuizResult = {
  name: string;
  description: string;
};

export type AppData = {
  userId: number;
  username: string;
  quizzes: Quiz[];
};
