import type { QuestionChoice, QuizResult } from "../../lib/types";
import ChoiceEditor from "./ChoiceEditor";

export default function ChoicesSection({
  choices,
  results,
  onUpdate,
}: {
  choices: QuestionChoice[];
  results: QuizResult[];
  onUpdate: (choices: QuestionChoice[]) => void;
}) {
  function addChoice() {
    const newChoice: QuestionChoice = {
      text: "",
      points: 1,
      resultIndex: 0,
    };
    onUpdate([...choices, newChoice]);
  }

  function updateChoice(choiceIndex: number, updatedChoice: QuestionChoice) {
    const newChoices = [...choices];
    newChoices[choiceIndex] = updatedChoice;
    onUpdate(newChoices);
  }

  function removeChoice(choiceIndex: number) {
    const newChoices = choices.filter((_, index) => index !== choiceIndex);
    onUpdate(newChoices);
  }

  return (
    <div style={{ marginBottom: "15px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h4>Choices ({choices.length})</h4>
        <button
          onClick={addChoice}
          style={{
            padding: "5px 10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          + Add Choice
        </button>
      </div>

      {choices.map((choice, choiceIndex) => (
        <ChoiceEditor
          key={choiceIndex}
          choice={choice}
          results={results}
          onUpdate={(updatedChoice) => updateChoice(choiceIndex, updatedChoice)}
          onRemove={() => removeChoice(choiceIndex)}
        />
      ))}
    </div>
  );
}
