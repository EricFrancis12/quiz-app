import type { Quiz } from "../../lib/types";
import QuizViewer from "./QuizViewer";

export default function QuizList({
  quizzes,
  deletionDisabled,
  onTakeQuizIntent,
  onDeleteIntent,
}: {
  quizzes: Quiz[];
  deletionDisabled?: boolean;
  onTakeQuizIntent: (quizId: number) => void;
  onDeleteIntent: (quizId: number, quizName: string) => void;
}) {
  return quizzes.length === 0 ? (
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
      {quizzes.map((quiz) => (
        <QuizViewer
          quiz={quiz}
          deletionDisabled={deletionDisabled}
          onTakeQuizIntent={onTakeQuizIntent}
          onDeleteIntent={onDeleteIntent}
        />
      ))}
    </div>
  );
}
