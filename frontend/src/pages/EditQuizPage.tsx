import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Quiz } from "../lib/types";
import { useAppContext } from "../contexts/AppContext/useAppContext";
import { safeParseInt } from "../lib/utils";
import { useAPI } from "../hooks/useAPI";
import { quizSchema } from "../lib/schemas";
import QuizEditor from "../components/QuizEditor";

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

      <QuizEditor quiz={editedQuiz} setQuiz={setEditedQuiz} />

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
