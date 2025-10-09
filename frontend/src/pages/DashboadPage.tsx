import { z } from "zod";
import { useAppContext } from "../contexts/AppContext/useAppContext";
import { useAPI } from "../hooks/useAPI";
import { quizSchema } from "../lib/schemas";

export default function DashboardPage() {
  const { appData, fetchAppData } = useAppContext();

  const { loading: deleting, fetchData: doDeleteQuiz } = useAPI(z.number());
  const { loading: creating, fetchData: doCreateQuiz } = useAPI(quizSchema);

  async function deleteQuiz(quizId: number, quizName: string) {
    if (!confirm(`Are you sure you want to delete "${quizName}"?`)) {
      return;
    }

    doDeleteQuiz(`/api/quizzes/${quizId}`, {
      method: "DELETE",
      credentials: "include",
    }).then((apiResponse) => {
      if (apiResponse?.success) {
        fetchAppData();
      } else {
        alert(`Failed to delete quiz "${quizName}". Please try again.`);
      }
    });
  }

  async function createQuiz() {
    doCreateQuiz("/api/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name: "" }),
    }).then((apiResponse) => {
      if (apiResponse?.success) {
        // Redirect to edit page for the new quiz
        window.location.href = `/quiz/${apiResponse.data.id}/edit`;
      } else {
        alert(`Failed to create new quiz. Please try again.`);
      }
    });
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Dashboard</h1>

      {appData && (
        <div style={{ marginBottom: "30px" }}>
          <h2>Welcome back, {appData.username}!</h2>
        </div>
      )}

      <div>
        <button
          onClick={createQuiz}
          disabled={creating}
          style={{
            padding: "10px 20px",
            backgroundColor: creating ? "#ccc" : "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: creating ? "not-allowed" : "pointer",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          {creating ? "Creating..." : "Create Quiz"}
        </button>

        <h2>Your Quizzes ({appData?.quizzes.length || 0})</h2>

        {!appData?.quizzes || appData.quizzes.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              background: "#f9f9f9",
              borderRadius: "8px",
              color: "#666",
            }}
          >
            <p>No quizzes found. Create your first quiz!</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {appData.quizzes.map((quiz) => (
              <div
                key={quiz.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "20px",
                  background: "white",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
                      {quiz.name}
                    </h3>

                    <div style={{ marginBottom: "15px" }}>
                      <p
                        style={{
                          margin: "5px 0",
                          color: "#666",
                          fontSize: "14px",
                        }}
                      >
                        <strong>Questions:</strong>{" "}
                        {quiz.questions?.length || 0}
                      </p>
                      <p
                        style={{
                          margin: "5px 0",
                          color: "#666",
                          fontSize: "14px",
                        }}
                      >
                        <strong>Results:</strong> {quiz.results?.length || 0}
                      </p>
                      <p
                        style={{
                          margin: "5px 0",
                          color: "#666",
                          fontSize: "14px",
                        }}
                      >
                        <strong>Quiz ID:</strong> {quiz.id}
                      </p>
                    </div>

                    {/* Display Questions Preview */}
                    {quiz.questions && quiz.questions.length > 0 && (
                      <div style={{ marginTop: "15px" }}>
                        <h4
                          style={{
                            margin: "0 0 10px 0",
                            fontSize: "16px",
                            color: "#555",
                          }}
                        >
                          Questions Preview:
                        </h4>
                        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                          {quiz.questions.slice(0, 3).map((question, index) => (
                            <div
                              key={index}
                              style={{
                                marginBottom: "8px",
                                padding: "8px",
                                background: "#f8f9fa",
                                borderRadius: "4px",
                                fontSize: "14px",
                              }}
                            >
                              <strong>{index + 1}.</strong> {question.text}
                              <span
                                style={{ color: "#888", marginLeft: "10px" }}
                              >
                                ({question.choices?.length || 0} choices)
                              </span>
                            </div>
                          ))}
                          {quiz.questions.length > 3 && (
                            <p
                              style={{
                                fontSize: "12px",
                                color: "#888",
                                fontStyle: "italic",
                              }}
                            >
                              ... and {quiz.questions.length - 3} more questions
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => {
                        window.open(`/quiz/${quiz.id}`, "_blank");
                      }}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Take Quiz
                    </button>
                    <a
                      href={`/quiz/${quiz.id}/edit`}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#2196F3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => deleteQuiz(quiz.id, quiz.name)}
                      disabled={deleting}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: deleting ? "not-allowed" : "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
