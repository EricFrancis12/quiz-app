import type { QuestionChoice } from "../../lib/types";

export default function QuestionChoices({
  choices,
  onChoiceSelection,
}: {
  choices: QuestionChoice[];
  onChoiceSelection: (index: number) => void;
}) {
  return (
    <div>
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onChoiceSelection(index)}
          style={{
            display: "block",
            width: "100%",
            padding: "15px",
            margin: "10px 0",
            fontSize: "16px",
            backgroundColor: "white",
            border: "2px solid #ddd",
            borderRadius: "8px",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f5f5f5";
            e.currentTarget.style.borderColor = "#2196F3";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.borderColor = "#ddd";
          }}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
}
