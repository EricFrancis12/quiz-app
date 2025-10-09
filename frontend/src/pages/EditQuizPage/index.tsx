import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import type { Quiz } from "../../lib/types";
import { useAppContext } from "../../contexts/AppContext/useAppContext";
import { safeParseInt } from "../../lib/utils";
import { useAPI } from "../../hooks/useAPI";
import { quizSchema } from "../../lib/schemas";
import QuizEditor from "../../components/QuizEditor";
import sampleQuizzesData from "../../lib/sampleQuizzes.json";
import { Overlay } from "../../components/overlay";
import QuizSelector from "./SampleQuizSelector";

export default function EditQuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const { appData, fetchAppData } = useAppContext();
  const { fetchData: doSaveQuiz, loading: saving } = useAPI(quizSchema);

  const [error, setError] = useState<string | null>(null);
  const [showSampleQuizModal, setShowSampleQuizModal] = useState(false);

  const [editedQuiz, setEditedQuiz] = useState<Quiz | null>(null);

  const sampleQuizzes = sampleQuizzesData as Quiz[];

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

  function loadSampleQuiz(sampleQuiz: Quiz) {
    if (!editedQuiz) return;

    const quizCopy = structuredClone(sampleQuiz);
    quizCopy.id = editedQuiz.id;
    setEditedQuiz(quizCopy);
    setShowSampleQuizModal(false);
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
      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          flexDirection: "column",
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
            Back to Dashboard
          </button>
          <button
            onClick={() => setShowSampleQuizModal(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#17a2b8",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Load Sample Quiz
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

      <Link
        to={`/quiz/${editedQuiz.id}`}
        target="_blank"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#ffc107",
          color: "#212529",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "500",
          textDecoration: "none",
        }}
      >
        Preview Quiz
      </Link>

      <QuizEditor quiz={editedQuiz} setQuiz={setEditedQuiz} />

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
          Back to Dashboard
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

      {showSampleQuizModal && (
        <Overlay onCloseIntent={() => setShowSampleQuizModal(false)}>
          <QuizSelector quizzes={sampleQuizzes} onClick={loadSampleQuiz} />
        </Overlay>
      )}
    </div>
  );
}
