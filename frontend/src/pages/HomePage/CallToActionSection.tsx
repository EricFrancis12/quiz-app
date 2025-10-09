import { Link } from "react-router-dom";

export default function CallToActionSection() {
  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        padding: "3rem",
        borderRadius: "12px",
        textAlign: "center",
        border: "1px solid #e9ecef",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          color: "#333",
          marginBottom: "1rem",
        }}
      >
        Ready to Get Started?
      </h2>
      <p
        style={{
          fontSize: "1.1rem",
          color: "#666",
          marginBottom: "2rem",
        }}
      >
        Join thousands of users creating and taking engaging quizzes
      </p>
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
          transition: "background-color 0.2s",
          display: "inline-block",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        Get Started Now
      </Link>
    </div>
  );
}
