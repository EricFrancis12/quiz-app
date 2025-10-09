import type { Quiz } from "../../lib/types";

export default function QuizNameEditor({
  quiz,
  onUpdate,
}: {
  quiz: Quiz;
  onUpdate: (name: string) => void;
}) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Quiz Name</h2>
      <input
        type="text"
        value={quiz.name}
        onChange={(e) => onUpdate(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
        placeholder="Enter quiz name..."
      />
    </div>
  );
}
