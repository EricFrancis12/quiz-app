import type {
  Question,
  QuestionChoice,
  Quiz,
  QuizResult,
} from "../../lib/types";

export default function QuizEditor({
  quiz,
  setQuiz,
}: {
  quiz: Quiz;
  setQuiz: (newQuiz: Quiz) => void;
}) {
  function updateQuizName(name: string) {
    setQuiz({ ...quiz, name });
  }

  function updateQuestions(questions: Question[]) {
    setQuiz({ ...quiz, questions });
  }

  function updateResults(results: QuizResult[]) {
    setQuiz({ ...quiz, results });
  }

  return (
    <div>
      <QuizNameEditor quiz={quiz} onUpdate={updateQuizName} />
      <QuestionsSection
        questions={quiz.questions}
        results={quiz.results}
        onUpdate={updateQuestions}
      />
      <ResultsSection results={quiz.results} onUpdate={updateResults} />
    </div>
  );
}

// Quiz Name Editor Component
function QuizNameEditor({
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

// Questions Section Component
function QuestionsSection({
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

// Individual Question Editor Component
function QuestionEditor({
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

  function updateChoices(choices: QuestionChoice[]) {
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

// Choices Section Component
function ChoicesSection({
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

// Individual Choice Editor Component
function ChoiceEditor({
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

// Results Section Component
function ResultsSection({
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

// Individual Result Editor Component
function ResultEditor({
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
