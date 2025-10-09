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
  function addQuestion() {
    const newQuestion: Question = {
      text: "",
      choices: [{ text: "", points: 1, resultIndex: 0 }],
    };
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion],
    });
  }

  function removeQuestion(questionIndex: number) {
    const newQuestions = quiz.questions.filter(
      (_, index) => index !== questionIndex
    );
    setQuiz({ ...quiz, questions: newQuestions });
  }

  function updateQuestion(questionIndex: number, text: string) {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex] = { ...newQuestions[questionIndex], text };
    setQuiz({ ...quiz, questions: newQuestions });
  }

  function addChoice(questionIndex: number) {
    const newQuestions = [...quiz.questions];
    const newChoice: QuestionChoice = {
      text: "",
      points: 1,
      resultIndex: 0,
    };
    newQuestions[questionIndex].choices.push(newChoice);
    setQuiz({ ...quiz, questions: newQuestions });
  }

  function updateChoice(
    questionIndex: number,
    choiceIndex: number,
    field: keyof QuestionChoice,
    value: string | number
  ) {
    const newQuestions = [...quiz.questions];
    const newChoices = [...newQuestions[questionIndex].choices];
    newChoices[choiceIndex] = { ...newChoices[choiceIndex], [field]: value };
    newQuestions[questionIndex] = {
      ...newQuestions[questionIndex],
      choices: newChoices,
    };
    setQuiz({ ...quiz, questions: newQuestions });
  }

  function removeChoice(questionIndex: number, choiceIndex: number) {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].choices = newQuestions[
      questionIndex
    ].choices.filter((_, index) => index !== choiceIndex);
    setQuiz({ ...quiz, questions: newQuestions });
  }

  async function addResult() {
    const newResult: QuizResult = { name: "", description: "" };
    setQuiz({
      ...quiz,
      results: [...quiz.results, newResult],
    });
  }

  function removeResult(resultIndex: number) {
    const newResults = quiz.results.filter((_, index) => index !== resultIndex);
    setQuiz({ ...quiz, results: newResults });
  }

  function updateResult(
    resultIndex: number,
    field: keyof QuizResult,
    value: string
  ) {
    const newResults = [...quiz.results];
    newResults[resultIndex] = { ...newResults[resultIndex], [field]: value };
    setQuiz({ ...quiz, results: newResults });
  }

  return (
    <div>
      {/* Quiz Name */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Quiz Name</h2>
        <input
          type="text"
          value={quiz.name}
          onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
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

      {/* Questions */}
      <div style={{ marginBottom: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h2>Questions ({quiz.questions.length})</h2>
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

        {quiz.questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
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
                onClick={() => removeQuestion(questionIndex)}
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
              onChange={(e) => updateQuestion(questionIndex, e.target.value)}
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

            <div style={{ marginBottom: "15px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h4>Choices ({question.choices.length})</h4>
                <button
                  onClick={() => addChoice(questionIndex)}
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

              {question.choices.map((choice, choiceIndex) => (
                <div
                  key={choiceIndex}
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
                    onChange={(e) =>
                      updateChoice(
                        questionIndex,
                        choiceIndex,
                        "text",
                        e.target.value
                      )
                    }
                    style={{
                      flex: 1,
                      padding: "8px",
                      fontSize: "14px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                    placeholder="Choice text..."
                  />
                  <label style={{ fontSize: "12px", color: "#666" }}>
                    Points:
                  </label>
                  <input
                    type="number"
                    value={choice.points}
                    onChange={(e) =>
                      updateChoice(
                        questionIndex,
                        choiceIndex,
                        "points",
                        parseInt(e.target.value) || 0
                      )
                    }
                    style={{
                      width: "60px",
                      padding: "8px",
                      fontSize: "14px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  />
                  <label style={{ fontSize: "12px", color: "#666" }}>
                    Result:
                  </label>
                  <select
                    value={choice.resultIndex}
                    onChange={(e) =>
                      updateChoice(
                        questionIndex,
                        choiceIndex,
                        "resultIndex",
                        parseInt(e.target.value)
                      )
                    }
                    style={{
                      padding: "8px",
                      fontSize: "14px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  >
                    {quiz.results.map((result, resultIndex) => (
                      <option key={resultIndex} value={resultIndex}>
                        {result.name || `Result ${resultIndex + 1}`}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeChoice(questionIndex, choiceIndex)}
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
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Results */}
      <div style={{ marginBottom: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h2>Results ({quiz.results.length})</h2>
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

        {quiz.results.map((result, resultIndex) => (
          <div
            key={resultIndex}
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
                onClick={() => removeResult(resultIndex)}
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
              onChange={(e) =>
                updateResult(resultIndex, "name", e.target.value)
              }
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
              onChange={(e) =>
                updateResult(resultIndex, "description", e.target.value)
              }
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
        ))}
      </div>
    </div>
  );
}
