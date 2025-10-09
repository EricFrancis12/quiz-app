export default function FeaturesSection() {
  return (
    <div style={{ marginBottom: "4rem" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        <FeatureCard
          icon="🎯"
          iconColor="#007bff"
          title="Create Custom Quizzes"
          description="Build engaging quizzes with multiple choice questions, custom scoring, and personalized results for different outcomes."
        />
        <FeatureCard
          icon="🏆"
          iconColor="#ffc107"
          title="Personalized Results"
          description="Get customized feedback and results based on your quiz responses, with detailed explanations and insights."
        />
        <FeatureCard
          icon="🤝"
          iconColor="#28a745"
          title="Share with Friends"
          description="Share your quizzes online with friends and family. Challenge them to beat your score and see who knows the most!"
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  iconColor,
  title,
  description,
}: {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        textAlign: "center",
        border: "1px solid #e9ecef",
        width: "300px",
        flex: "0 0 300px",
      }}
    >
      <div
        style={{
          fontSize: "3rem",
          marginBottom: "1rem",
          color: iconColor,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "1.5rem",
          color: "#333",
          marginBottom: "1rem",
        }}
      >
        {title}
      </h3>
      <p style={{ color: "#666", lineHeight: "1.6" }}>{description}</p>
    </div>
  );
}
