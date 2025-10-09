import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div style={{ textAlign: "center", marginBottom: "4rem" }}>
      <h1
        style={{
          fontSize: "3rem",
          color: "#333",
          marginBottom: "1rem",
          fontWeight: "bold",
        }}
      >
        Quiz Master
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#666",
          marginBottom: "2rem",
          maxWidth: "600px",
          margin: "0 auto 2rem auto",
          lineHeight: "1.6",
        }}
      >
        Create engaging quizzes, test your knowledge, and track your progress.
        Build custom quizzes with multiple choice questions and personalized
        results.
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/register"
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "500",
            transition: "all 0.2s",
            border: "2px solid #007bff",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#0056b3";
            e.currentTarget.style.borderColor = "#0056b3";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#007bff";
            e.currentTarget.style.borderColor = "#007bff";
          }}
        >
          Get Started
        </Link>

        <Link
          to="/login"
          style={{
            padding: "1rem 2rem",
            backgroundColor: "transparent",
            color: "#007bff",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "500",
            transition: "all 0.2s",
            border: "2px solid #007bff",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#007bff";
            e.currentTarget.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#007bff";
          }}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
