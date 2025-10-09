import type { Question, Quiz, QuizResult } from "../../lib/types";
import QuestionsSection from "./QuestionsSection";
import QuizNameEditor from "./QuizNameEditor";
import ResultsSection from "./ResultsSection";

export default function QuizEditor({
  quiz,
  setQuiz,
}: {
  quiz: Quiz;
  setQuiz: (newQuiz: Quiz) => void;
}) {
  function updateQuizName(name: string) {
    setQuiz({ ...quiz, name });
  }

  function updateQuestions(questions: Question[]) {
    setQuiz({ ...quiz, questions });
  }

  function updateResults(results: QuizResult[]) {
    setQuiz({ ...quiz, results });
  }

  return (
    <div>
      <QuizNameEditor quizName={quiz.name} onUpdate={updateQuizName} />
      <QuestionsSection
        questions={quiz.questions}
        results={quiz.results}
        onUpdate={updateQuestions}
      />
      <ResultsSection results={quiz.results} onUpdate={updateResults} />
    </div>
  );
}
