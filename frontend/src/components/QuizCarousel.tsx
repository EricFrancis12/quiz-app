import { useState } from "react";
import type { Quiz } from "../lib/types";

export default function QuizCarousel({
  quizzes,
  onQuizClick,
}: {
  quizzes: Quiz[];
  onQuizClick?: (quiz: Quiz) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextSlide() {
    setCurrentIndex((index) => (index < quizzes.length - 1 ? index + 1 : 0));
  }

  function prevSlide() {
    setCurrentIndex((index) => (index === 0 ? quizzes.length - 1 : index - 1));
  }

  if (quizzes.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          color: "#666",
          fontSize: "1.1rem",
        }}
      >
        No quizzes available
      </div>
    );
  }

  return (
    <div style={{ position: "relative", padding: "1rem 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <CarouselButton text="←" onClick={prevSlide} />

        <div
          style={{
            position: "relative",
            flex: 1,
            height: "200px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: `${-currentIndex * 270}px`,
              transition: "left 0.5s ease-in-out",
              display: "flex",
              gap: "20px",
              alignItems: "center",
              height: "100%",
            }}
          >
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                style={{
                  width: "250px",
                  height: "90%",
                  flexShrink: 0,
                }}
              >
                <QuizCard quiz={quiz} onClick={() => onQuizClick?.(quiz)} />
              </div>
            ))}
          </div>
        </div>

        <CarouselButton text="→" onClick={nextSlide} />
      </div>
    </div>
  );
}

function CarouselButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.75rem",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        fontSize: "1.2rem",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
        flexShrink: 0,
      }}
    >
      {text}
    </button>
  );
}

function QuizCard({ quiz, onClick }: { quiz: Quiz; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "0 1.5rem 20px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        border: "1px solid #e9ecef",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        boxSizing: "border-box",
      }}
      onMouseOver={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
        }
      }}
      onMouseOut={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        }
      }}
    >
      <h3
        style={{
          fontSize: "1.2rem",
          color: "#333",
          marginBottom: "0.75rem",
          fontWeight: "600",
        }}
      >
        {quiz.name}
      </h3>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.9rem",
            color: "#666",
            marginBottom: "1rem",
            width: "100%",
          }}
        >
          <span>{quiz.questions.length} questions</span>
          <span>{quiz.results.length} results</span>
        </div>

        {onClick && (
          <div
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "6px",
              textAlign: "center",
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
          >
            Take Quiz
          </div>
        )}
      </div>
    </div>
  );
}
