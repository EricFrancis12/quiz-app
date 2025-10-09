import type { Quiz } from "../../lib/types";
import QuizQuestions from "./QuizQuestions";

export default function QuizViewer({
  quiz,
  deletionDisabled,
  onTakeQuizIntent,
  onDeleteIntent,
}: {
  quiz: Quiz;
  deletionDisabled?: boolean;
  onTakeQuizIntent: (quizId: number) => void;
  onDeleteIntent: (quizId: number, quizName: string) => void;
}) {
  return (
    <div
      key={quiz.id}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        background: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>{quiz.name}</h3>

          <div style={{ marginBottom: "15px" }}>
            <p
              style={{
                margin: "5px 0",
                color: "#666",
                fontSize: "14px",
              }}
            >
              <strong>Questions:</strong> {quiz.questions?.length || 0}
            </p>
            <p
              style={{
                margin: "5px 0",
                color: "#666",
                fontSize: "14px",
              }}
            >
              <strong>Results:</strong> {quiz.results?.length || 0}
            </p>
            <p
              style={{
                margin: "5px 0",
                color: "#666",
                fontSize: "14px",
              }}
            >
              <strong>Quiz ID:</strong> {quiz.id}
            </p>
          </div>

          {quiz.questions && quiz.questions.length > 0 && (
            <div style={{ marginTop: "15px" }}>
              <h4
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "16px",
                  color: "#555",
                }}
              >
                Questions Preview:
              </h4>
              <QuizQuestions quiz={quiz} />
            </div>
          )}
        </div>

        <div
          style={{
            marginLeft: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <button
            onClick={() => onTakeQuizIntent(quiz.id)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Take Quiz
          </button>
          <a
            href={`/quiz/${quiz.id}/edit`}
            style={{
              padding: "8px 16px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Edit
          </a>
          <button
            onClick={() => onDeleteIntent(quiz.id, quiz.name)}
            disabled={deletionDisabled}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: deletionDisabled ? "not-allowed" : "pointer",
              fontSize: "14px",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
