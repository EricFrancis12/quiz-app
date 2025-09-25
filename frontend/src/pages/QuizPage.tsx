import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Quiz, QuizResult } from "../lib/types";

export default function QuizPage() {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]); // Store choice indices
  const [resultScores, setResultScores] = useState<number[]>([]); // Track scores for each result
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/quizzes/${quizId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch quiz: ${response.statusText}`);
        }

        // TODO: create type guard to parse valid Quiz
        const quizData = await response.json();
        setQuiz(quizData.data);

        // Initialize result scores array with zeros
        if (quizData.results) {
          setResultScores(new Array(quizData.results.length).fill(0));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerSelect = (choiceIndex: number) => {
    if (!quiz) return;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const selectedChoice = currentQuestion.choices[choiceIndex];

    // Update user answers
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = choiceIndex;
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
  };

  const completeQuiz = (finalScores: number[]) => {
    if (!quiz) return;

    // Find the result with the highest score
    let maxScore = 0;
    let resultIndex = 0;
    for (let i = 0; i < finalScores.length; i++) {
      if (finalScores[i] > maxScore) {
        maxScore = finalScores[i];
        resultIndex = i;
      }
    }

    const result = quiz.results[resultIndex];

    setFinalResult(result);
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setResultScores(quiz ? new Array(quiz.results.length).fill(0) : []);
    setQuizCompleted(false);
    setFinalResult(null);
  };

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  // Show results screen if quiz is completed
  if (quizCompleted && finalResult) {
    return (
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h1>Quiz Complete!</h1>
        <div
          style={{
            background: "#f0f8ff",
            padding: "20px",
            borderRadius: "8px",
            border: "2px solid #4CAF50",
          }}
        >
          <h2>Your Result: {finalResult.name}</h2>
          <p>{finalResult.description}</p>
        </div>
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={resetQuiz}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  // Show current question
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <h1>{quiz.name}</h1>
        <div
          style={{
            background: "#f0f0f0",
            borderRadius: "10px",
            overflow: "hidden",
            height: "8px",
          }}
        >
          <div
            style={{
              background: "#4CAF50",
              height: "100%",
              width: `${progressPercentage}%`,
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <p style={{ margin: "10px 0", color: "#666" }}>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </p>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h2>{currentQuestion.text}</h2>
      </div>

      <div>
        {currentQuestion.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            style={{
              display: "block",
              width: "100%",
              padding: "15px",
              margin: "10px 0",
              fontSize: "16px",
              backgroundColor: "white",
              border: "2px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
              e.currentTarget.style.borderColor = "#2196F3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
              e.currentTarget.style.borderColor = "#ddd";
            }}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
