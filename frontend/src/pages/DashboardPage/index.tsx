import { z } from "zod";
import { useAppContext } from "../../contexts/AppContext/useAppContext";
import { useAPI } from "../../hooks/useAPI";
import { quizSchema } from "../../lib/schemas";
import QuizList from "./QuizList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useConfirm } from "../../hooks/useConfirm";

export default function DashboardPage() {
  const navigate = useNavigate();

  const { appData, fetchAppData } = useAppContext();
  const { showConfirm, ConfirmDialog } = useConfirm();

  const { loading: deleting, fetchData: doDeleteQuiz } = useAPI(z.number());
  const { loading: creating, fetchData: doCreateQuiz } = useAPI(quizSchema);

  async function deleteQuiz(quizId: number, quizName: string) {
    const formattedQuizName = quizName ? `"${quizName}"` : "this quiz";

    const confirmed = await showConfirm({
      title: "Delete Quiz",
      message: `Are you sure you want to delete ${formattedQuizName}? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmed) {
      return;
    }

    doDeleteQuiz(`/api/quizzes/${quizId}`, {
      method: "DELETE",
      credentials: "include",
    }).then((apiResponse) => {
      if (apiResponse?.success) {
        fetchAppData();
      } else {
        toast(`Failed to delete quiz "${quizName}". Please try again.`, {
          type: "error",
        });
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
        navigate(`/quiz/${apiResponse.data.id}/edit`);
      } else {
        toast(`Failed to create new quiz. Please try again.`, {
          type: "error",
        });
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

        <QuizList
          quizzes={appData?.quizzes ?? []}
          deletionDisabled={deleting}
          onTakeQuizIntent={(quizId) => {
            window.open(`/quiz/${quizId}`, "_blank");
          }}
          onDeleteIntent={deleteQuiz}
        />
      </div>

      {ConfirmDialog}
    </div>
  );
}
