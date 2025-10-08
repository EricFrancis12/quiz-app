import type { QuizResult } from "../../lib/types";

export default function QuizResultViewer({
  quizResult,
  onResetIntent,
}: {
  quizResult: QuizResult;
  onResetIntent: () => void;
}) {
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
        <h2>Your Result: {quizResult.name}</h2>
        <p>{quizResult.description}</p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={onResetIntent}
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
