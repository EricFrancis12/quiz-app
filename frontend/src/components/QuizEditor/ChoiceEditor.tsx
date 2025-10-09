import type { QuestionChoice, QuizResult } from "../../lib/types";

export default function ChoiceEditor({
  choice,
  results,
  onUpdate,
  onRemove,
}: {
  choice: QuestionChoice;
  results: QuizResult[];
  onUpdate: (choice: QuestionChoice) => void;
  onRemove: () => void;
}) {
  function updateField(field: keyof QuestionChoice, value: string | number) {
    onUpdate({ ...choice, [field]: value });
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "10px",
        alignItems: "center",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #eee",
      }}
    >
      <input
        type="text"
        value={choice.text}
        onChange={(e) => updateField("text", e.target.value)}
        style={{
          flex: 1,
          padding: "8px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
        placeholder="Choice text..."
      />
      <label style={{ fontSize: "12px", color: "#666" }}>Points:</label>
      <input
        type="number"
        value={choice.points}
        onChange={(e) => updateField("points", parseInt(e.target.value) || 0)}
        style={{
          width: "60px",
          padding: "8px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      />
      <label style={{ fontSize: "12px", color: "#666" }}>Result:</label>
      <select
        value={choice.resultIndex}
        onChange={(e) => updateField("resultIndex", parseInt(e.target.value))}
        style={{
          padding: "8px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        {results.map((result, resultIndex) => (
          <option key={resultIndex} value={resultIndex}>
            {result.name || `Result ${resultIndex + 1}`}
          </option>
        ))}
      </select>
      <button
        onClick={onRemove}
        style={{
          padding: "5px 8px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "12px",
        }}
      >
        x
      </button>
    </div>
  );
}
