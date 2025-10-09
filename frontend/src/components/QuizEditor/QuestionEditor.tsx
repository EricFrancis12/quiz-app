import type { Question, QuizResult } from "../../lib/types";
import ChoicesSection from "./ChoicesSection";

export default function QuestionEditor({
  question,
  questionIndex,
  results,
  onUpdate,
  onRemove,
}: {
  question: Question;
  questionIndex: number;
  results: QuizResult[];
  onUpdate: (question: Question) => void;
  onRemove: () => void;
}) {
  function updateQuestionText(text: string) {
    onUpdate({ ...question, text });
  }

  function updateChoices(choices: Question["choices"]) {
    onUpdate({ ...question, choices });
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
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
        <h3>Question {questionIndex + 1}</h3>
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
        value={question.text}
        onChange={(e) => updateQuestionText(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          marginBottom: "15px",
        }}
        placeholder="Enter question text..."
      />

      <ChoicesSection
        choices={question.choices}
        results={results}
        onUpdate={updateChoices}
      />
    </div>
  );
}
