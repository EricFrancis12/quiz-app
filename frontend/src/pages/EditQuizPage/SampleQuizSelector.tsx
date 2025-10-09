import type { Quiz } from "../../lib/types";

export default function QuizSelector({
  quizzes,
  onClick,
}: {
  quizzes: Quiz[];
  onClick: (quiz: Quiz) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          style={{
            border: "1px solid #e9ecef",
            borderRadius: "6px",
            padding: "15px",
            cursor: "pointer",
            transition: "all 0.2s",
            backgroundColor: "#f8f9fa",
          }}
          onClick={() => onClick(quiz)}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#e9ecef";
            e.currentTarget.style.borderColor = "#007bff";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#f8f9fa";
            e.currentTarget.style.borderColor = "#e9ecef";
          }}
        >
          <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{quiz.name}</h3>
          <div style={{ fontSize: "0.9rem", color: "#666" }}>
            {quiz.questions.length} questions • {quiz.results.length} results
          </div>
        </div>
      ))}
    </div>
  );
}
