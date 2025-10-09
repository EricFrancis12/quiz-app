import type { QuizResult } from "../../lib/types";

export default function ResultEditor({
  result,
  resultIndex,
  onUpdate,
  onRemove,
}: {
  result: QuizResult;
  resultIndex: number;
  onUpdate: (result: QuizResult) => void;
  onRemove: () => void;
}) {
  function updateField(field: keyof QuizResult, value: string) {
    onUpdate({ ...result, [field]: value });
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "15px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "15px",
        }}
      >
        <h3>Result {resultIndex + 1}</h3>
        <button
          onClick={onRemove}
          style={{
            padding: "5px 10px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Remove
        </button>
      </div>

      <input
        type="text"
        value={result.name}
        onChange={(e) => updateField("name", e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
        placeholder="Result name..."
      />

      <textarea
        value={result.description}
        onChange={(e) => updateField("description", e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          minHeight: "80px",
          resize: "vertical",
        }}
        placeholder="Result description..."
      />
    </div>
  );
}
