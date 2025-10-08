import { useState } from "react";
import QuizResultViewer from "./QuizResultViewer";
import type { Quiz, QuizResult } from "../../lib/types";
import QuestionChoices from "./QuestionChoices";
import QuizProgress from "./QuizProgress";

export default function QuizPlayer({ quiz }: { quiz: Quiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [resultScores, setResultScores] = useState<number[]>(
    new Array(quiz.results.length).fill(0)
  );
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState<QuizResult | null>(null);

  function handleChoiceSelection(index: number) {
    if (!quiz) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const selectedChoice = currentQuestion.choices[index];

    // Update user answers
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = index;
    setUserAnswers(newUserAnswers);

    // Update result scores based on the selected choice
    const newResultScores = [...resultScores];
    newResultScores[selectedChoice.resultsIndex] += selectedChoice.points;
    setResultScores(newResultScores);

    // Move to next question or complete quiz
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz(newResultScores);
    }
  }

  function completeQuiz(finalScores: number[]) {
    if (!quiz) return;

    // Find the result with the highest score
    let maxScore = finalScores[0] || 0;
    let resultIndex = 0;

    for (let i = 1; i < finalScores.length; i++) {
      if (finalScores[i] > maxScore) {
        maxScore = finalScores[i];
        resultIndex = i;
      }
    }

    const result = quiz.results[resultIndex];
    setFinalResult(result);
    setQuizCompleted(true);
  }

  function resetQuiz() {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setResultScores(quiz ? new Array(quiz.results.length).fill(0) : []);
    setQuizCompleted(false);
    setFinalResult(null);
  }

  if (quizCompleted && finalResult) {
    return (
      <QuizResultViewer quizResult={finalResult} onResetIntent={resetQuiz} />
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1>{quiz.name}</h1>
        <QuizProgress
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={quiz.questions.length}
        />
      </div>

      <div>
        <div style={{ marginBottom: "30px" }}>
          <h2>{currentQuestion.text}</h2>
        </div>

        <QuestionChoices
          choices={currentQuestion.choices}
          onChoiceSelection={handleChoiceSelection}
        />
      </div>
    </div>
  );
}
