import QuizCarousel from "../../components/QuizCarousel";
import type { Quiz } from "../../lib/types";

export default function QuizzesSection({ quizzes }: { quizzes: Quiz[] }) {
  const handleQuizClick = (quiz: Quiz) => {
    console.log("TODO: Selected quiz:", quiz.name);
  };

  return (
    <div style={{ marginBottom: "4rem" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          color: "#333",
          marginBottom: "1rem",
        }}
      >
        Take a Quiz!
      </h2>

      <QuizCarousel quizzes={quizzes} onQuizClick={handleQuizClick} />
    </div>
  );
}
