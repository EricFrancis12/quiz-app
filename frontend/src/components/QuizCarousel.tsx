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
      {/* Carousel Container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <CarouselButton text="<-" onClick={prevSlide} />

        <div
          style={{
            position: "relative",
            flex: 1,
            height: "200px",
            overflow: "hidden",
          }}
        >
          {quizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              style={{
                position: "absolute",
                left: `${(index - currentIndex) * 280}px`,
                transition: "left 0.5s ease-in-out",
                width: "250px",
                height: "100%",
              }}
            >
              <QuizCard quiz={quiz} onClick={() => onQuizClick?.(quiz)} />
            </div>
          ))}
        </div>

        <CarouselButton text="->" onClick={nextSlide} />
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
        flex: "0 0 calc(33.333% - 1rem)",
        minWidth: "250px",
        padding: "1.5rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        border: "1px solid #e9ecef",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.9rem",
          color: "#666",
          marginBottom: "1rem",
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
  );
}
