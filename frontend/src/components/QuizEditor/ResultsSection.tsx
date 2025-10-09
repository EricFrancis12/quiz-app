import type { QuizResult } from "../../lib/types";
import ResultEditor from "./ResultEditor";

export default function ResultsSection({
  results,
  onUpdate,
}: {
  results: QuizResult[];
  onUpdate: (results: QuizResult[]) => void;
}) {
  function addResult() {
    const newResult: QuizResult = { name: "", description: "" };
    onUpdate([...results, newResult]);
  }

  function removeResult(resultIndex: number) {
    const newResults = results.filter((_, index) => index !== resultIndex);
    onUpdate(newResults);
  }

  function updateResult(resultIndex: number, updatedResult: QuizResult) {
    const newResults = [...results];
    newResults[resultIndex] = updatedResult;
    onUpdate(newResults);
  }

  return (
    <div style={{ marginBottom: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2>Results ({results.length})</h2>
        <button
          onClick={addResult}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          + Add Result
        </button>
      </div>

      {results.map((result, resultIndex) => (
        <ResultEditor
          key={resultIndex}
          result={result}
          resultIndex={resultIndex}
          onUpdate={(updatedResult) => updateResult(resultIndex, updatedResult)}
          onRemove={() => removeResult(resultIndex)}
        />
      ))}
    </div>
  );
}
