import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Quiz } from "../lib/types";
import sampleQuizzes from "../lib/sampleQuizzes.json";
import { safeParseInt } from "../lib/utils";
import { useAPI } from "../hooks/useAPI";
import { quizSchema } from "../lib/schemas";
import QuizPlayer from "../components/QuizPlayer";

export default function QuizPage() {
  const { quizId } = useParams();

  const { fetchData, loading } = useAPI(quizSchema);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quizId) return;

    const quizIdInt = safeParseInt(quizId);
    if (quizIdInt == null) {
      setError("Quiz id should be a number");
      return;
    }

    // If quiz id is negative, look in sample quizzes
    if (quizIdInt < 0) {
      const quiz = sampleQuizzes[-quizIdInt - 1];
      if (quiz) {
        setQuiz(quiz);
      } else {
        setError("Quiz not found...");
      }
      return;
    }

    fetchData(`/api/quizzes/${quizIdInt}`).then((apiResponse) => {
      console.log(apiResponse);
      if (!apiResponse) {
        setError("Unable to fetch from API");
        return;
      }

      if (!apiResponse.success) {
        setError(apiResponse.error);
        return;
      }

      setQuiz(apiResponse.data);
    });
  }, [quizId]);

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quiz) {
    return <div>Quiz not found...</div>;
  }

  return <QuizPlayer quiz={quiz} />;
}
