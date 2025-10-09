export default function HowItWorksSection() {
  return (
    <div style={{ marginBottom: "4rem" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          color: "#333",
          marginBottom: "3rem",
        }}
      >
        How It Works
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <StepCard
          stepNumber={1}
          bgColor="#007bff"
          title="Sign Up"
          description="Create your account to get started"
        />
        <StepCard
          stepNumber={2}
          bgColor="#28a745"
          title="Create or Take Quizzes"
          description="Build your own quizzes or take existing ones"
        />
        <StepCard
          stepNumber={3}
          bgColor="#ffc107"
          title="Share Quizzes Online"
          description="Share your quizzes with friends and family around the web"
        />
      </div>
    </div>
  );
}

function StepCard({
  stepNumber,
  bgColor,
  title,
  description,
}: {
  stepNumber: number;
  bgColor: string;
  title: string;
  description: string;
}) {
  return (
    <div style={{ width: "250px", flex: "0 0 250px" }}>
      <div
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: bgColor,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1rem auto",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        {stepNumber}
      </div>
      <h3
        style={{
          fontSize: "1.3rem",
          color: "#333",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h3>
      <p style={{ color: "#666" }}>{description}</p>
    </div>
  );
}
