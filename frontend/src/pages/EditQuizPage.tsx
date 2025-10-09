import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Quiz, QuizResult, Question, QuestionChoice } from "../lib/types";
import { useAppContext } from "../contexts/AppContext/useAppContext";
import { safeParseInt } from "../lib/utils";
import { useAPI } from "../hooks/useAPI";
import { quizSchema } from "../lib/schemas";

export default function EditQuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const { appData, fetchAppData } = useAppContext();
  const { fetchData: doSaveQuiz, loading: saving } = useAPI(quizSchema);

  const [error, setError] = useState<string | null>(null);

  const [editedQuiz, setEditedQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    if (quizId) {
      const quizIdInt = safeParseInt(quizId);
      if (quizIdInt != null) {
        const foundQuiz = appData?.quizzes.find(({ id }) => id === quizIdInt);
        if (foundQuiz) {
          setEditedQuiz(structuredClone(foundQuiz));
          return;
        }
      }
    }

    setEditedQuiz(null);
    setError("Quiz not found");
  }, [quizId, appData?.quizzes]);

  function updateQuizName(name: string) {
    if (editedQuiz) {
      setEditedQuiz({ ...editedQuiz, name });
    }
  }

  function updateQuestion(questionIndex: number, text: string) {
    if (editedQuiz) {
      const newQuestions = [...editedQuiz.questions];
      newQuestions[questionIndex] = { ...newQuestions[questionIndex], text };
      setEditedQuiz({ ...editedQuiz, questions: newQuestions });
    }
  }

  function updateChoice(
    questionIndex: number,
    choiceIndex: number,
    field: keyof QuestionChoice,
    value: string | number
  ) {
    if (editedQuiz) {
      const newQuestions = [...editedQuiz.questions];
      const newChoices = [...newQuestions[questionIndex].choices];
      newChoices[choiceIndex] = { ...newChoices[choiceIndex], [field]: value };
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        choices: newChoices,
      };
      setEditedQuiz({ ...editedQuiz, questions: newQuestions });
    }
  }

  function addQuestion() {
    if (editedQuiz) {
      const newQuestion: Question = {
        text: "",
        choices: [{ text: "", points: 1, resultIndex: 0 }],
      };
      setEditedQuiz({
        ...editedQuiz,
        questions: [...editedQuiz.questions, newQuestion],
      });
    }
  }

  function removeQuestion(questionIndex: number) {
    if (editedQuiz) {
      const newQuestions = editedQuiz.questions.filter(
        (_, index) => index !== questionIndex
      );
      setEditedQuiz({ ...editedQuiz, questions: newQuestions });
    }
  }

  function addChoice(questionIndex: number) {
    if (editedQuiz) {
      const newQuestions = [...editedQuiz.questions];
      const newChoice: QuestionChoice = {
        text: "",
        points: 1,
        resultIndex: 0,
      };
      newQuestions[questionIndex].choices.push(newChoice);
      setEditedQuiz({ ...editedQuiz, questions: newQuestions });
    }
  }

  function removeChoice(questionIndex: number, choiceIndex: number) {
    if (editedQuiz) {
      const newQuestions = [...editedQuiz.questions];
      newQuestions[questionIndex].choices = newQuestions[
        questionIndex
      ].choices.filter((_, index) => index !== choiceIndex);
      setEditedQuiz({ ...editedQuiz, questions: newQuestions });
    }
  }

  function updateResult(
    resultIndex: number,
    field: keyof QuizResult,
    value: string
  ) {
    if (editedQuiz) {
      const newResults = [...editedQuiz.results];
      newResults[resultIndex] = { ...newResults[resultIndex], [field]: value };
      setEditedQuiz({ ...editedQuiz, results: newResults });
    }
  }

  async function addResult() {
    if (editedQuiz) {
      const newResult: QuizResult = { name: "", description: "" };
      setEditedQuiz({
        ...editedQuiz,
        results: [...editedQuiz.results, newResult],
      });
    }
  }

  function removeResult(resultIndex: number) {
    if (editedQuiz) {
      const newResults = editedQuiz.results.filter(
        (_, index) => index !== resultIndex
      );
      setEditedQuiz({ ...editedQuiz, results: newResults });
    }
  }

  async function saveQuiz() {
    if (!editedQuiz) return;

    doSaveQuiz(`/api/quizzes/${quizId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(editedQuiz),
    }).then((apiResponse) => {
      if (apiResponse?.success) {
        fetchAppData();
        alert("Quiz saved successfully!");
      } else {
        alert("Failed to save quiz. Please try again.");
      }
    });
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!editedQuiz) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Quiz not found</h2>
        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Edit Quiz</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={saveQuiz}
            disabled={saving}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Quiz Name */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Quiz Name</h2>
        <input
          type="text"
          value={editedQuiz.name}
          onChange={(e) => updateQuizName(e.target.value)}
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
          <h2>Questions ({editedQuiz.questions.length})</h2>
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

        {editedQuiz.questions.map((question, questionIndex) => (
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
                    {editedQuiz.results.map((result, resultIndex) => (
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
                    ×
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
          <h2>Results ({editedQuiz.results.length})</h2>
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

        {editedQuiz.results.map((result, resultIndex) => (
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

      {/* Save/Cancel Footer */}
      <div
        style={{
          borderTop: "1px solid #ddd",
          paddingTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "12px 24px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={saveQuiz}
          disabled={saving}
          style={{
            padding: "12px 24px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
