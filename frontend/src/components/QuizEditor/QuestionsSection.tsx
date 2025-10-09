import type { Question, QuizResult } from "../../lib/types";
import QuestionEditor from "./QuestionEditor";

export default function QuestionsSection({
  questions,
  results,
  onUpdate,
}: {
  questions: Question[];
  results: QuizResult[];
  onUpdate: (questions: Question[]) => void;
}) {
  function addQuestion() {
    const newQuestion: Question = {
      text: "",
      choices: [{ text: "", points: 1, resultIndex: 0 }],
    };
    onUpdate([...questions, newQuestion]);
  }

  function removeQuestion(questionIndex: number) {
    const newQuestions = questions.filter(
      (_, index) => index !== questionIndex
    );
    onUpdate(newQuestions);
  }

  function updateQuestion(questionIndex: number, updatedQuestion: Question) {
    const newQuestions = [...questions];
    newQuestions[questionIndex] = updatedQuestion;
    onUpdate(newQuestions);
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
        <h2>Questions ({questions.length})</h2>
        <button
          onClick={addQuestion}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          + Add Question
        </button>
      </div>

      {questions.map((question, questionIndex) => (
        <QuestionEditor
          key={questionIndex}
          question={question}
          questionIndex={questionIndex}
          results={results}
          onUpdate={(updatedQuestion) =>
            updateQuestion(questionIndex, updatedQuestion)
          }
          onRemove={() => removeQuestion(questionIndex)}
        />
      ))}
    </div>
  );
}
