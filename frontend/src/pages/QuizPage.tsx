import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function QuizPage() {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/quizzes/${quizId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch quiz: ${response.statusText}`);
        }

        const quizData = await response.json();
        setQuiz(quizData);
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

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div>
      <h1>Quiz Page</h1>
      <pre>{JSON.stringify(quiz, null, 2)}</pre>
    </div>
  );
}
