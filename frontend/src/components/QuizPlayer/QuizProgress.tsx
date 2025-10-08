export default function QuizProgress({
  currentQuestionIndex,
  totalQuestions,
}: {
  currentQuestionIndex: number;
  totalQuestions: number;
}) {
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div>
      <div
        style={{
          background: "#f0f0f0",
          borderRadius: "10px",
          overflow: "hidden",
          height: "8px",
        }}
      >
        <div
          style={{
            background: "#4CAF50",
            height: "100%",
            width: `${progressPercentage}%`,
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <p style={{ margin: "10px 0", color: "#666" }}>
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </p>
    </div>
  );
}
