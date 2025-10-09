import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      {/* Hero Section */}
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

      {/* Features Section */}
      <div style={{ marginBottom: "4rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
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
                color: "#007bff",
              }}
            >
              🎯
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              Create Custom Quizzes
            </h3>
            <p style={{ color: "#666", lineHeight: "1.6" }}>
              Build engaging quizzes with multiple choice questions, custom
              scoring, and personalized results for different outcomes.
            </p>
          </div>

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
                color: "#ffc107",
              }}
            >
              🏆
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              Personalized Results
            </h3>
            <p style={{ color: "#666", lineHeight: "1.6" }}>
              Get customized feedback and results based on your quiz responses,
              with detailed explanations and insights.
            </p>
          </div>

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
                color: "#28a745",
              }}
            >
              🤝
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              Share with Friends
            </h3>
            <p style={{ color: "#666", lineHeight: "1.6" }}>
              Share your quizzes online with friends and family. Challenge them
              to beat your score and see who knows the most!
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
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
          <div style={{ width: "250px", flex: "0 0 250px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#007bff",
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
              1
            </div>
            <h3
              style={{
                fontSize: "1.3rem",
                color: "#333",
                marginBottom: "0.5rem",
              }}
            >
              Sign Up
            </h3>
            <p style={{ color: "#666" }}>Create your account to get started</p>
          </div>

          <div style={{ width: "250px", flex: "0 0 250px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#28a745",
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
              2
            </div>
            <h3
              style={{
                fontSize: "1.3rem",
                color: "#333",
                marginBottom: "0.5rem",
              }}
            >
              Create or Take Quizzes
            </h3>
            <p style={{ color: "#666" }}>
              Build your own quizzes or take existing ones
            </p>
          </div>

          <div style={{ width: "250px", flex: "0 0 250px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#ffc107",
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
              3
            </div>
            <h3
              style={{
                fontSize: "1.3rem",
                color: "#333",
                marginBottom: "0.5rem",
              }}
            >
              Share Quizzes Online
            </h3>
            <p style={{ color: "#666" }}>
              Share your quizzes with friends and family around the web
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
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
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
}
