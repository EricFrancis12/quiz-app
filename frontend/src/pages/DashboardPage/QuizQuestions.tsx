import type { Quiz } from "../../lib/types";

export default function QuizQuestions({ quiz }: { quiz: Quiz }) {
  return (
    <div style={{ maxHeight: "150px", overflowY: "auto" }}>
      {quiz.questions.slice(0, 3).map((question, index) => (
        <div
          key={index}
          style={{
            marginBottom: "8px",
            padding: "8px",
            background: "#f8f9fa",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        >
          <strong>{index + 1}.</strong> {question.text}
          <span style={{ color: "#888", marginLeft: "10px" }}>
            ({question.choices?.length || 0} choices)
          </span>
        </div>
      ))}
      {quiz.questions.length > 3 && (
        <p
          style={{
            fontSize: "12px",
            color: "#888",
            fontStyle: "italic",
          }}
        >
          ... and {quiz.questions.length - 3} more questions
        </p>
      )}
    </div>
  );
}
