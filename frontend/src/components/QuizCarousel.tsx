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
  const itemsPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= quizzes.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, quizzes.length - itemsPerView) : prev - 1
    );
  };

  const visibleQuizzes = quizzes.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

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
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          style={{
            padding: "0.75rem",
            backgroundColor: currentIndex === 0 ? "#e9ecef" : "#007bff",
            color: currentIndex === 0 ? "#6c757d" : "white",
            border: "none",
            borderRadius: "50%",
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
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
          ‹
        </button>

        {/* Quiz Cards Container */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            overflow: "hidden",
            flex: 1,
            minHeight: "200px",
          }}
        >
          {visibleQuizzes.map((quiz, index) => (
            <QuizCard
              key={`${quiz.id}-${currentIndex + index}`}
              quiz={quiz}
              onClick={() => onQuizClick?.(quiz)}
            />
          ))}

          {/* Fill empty slots if not enough quizzes */}
          {visibleQuizzes.length < itemsPerView &&
            Array.from({ length: itemsPerView - visibleQuizzes.length }).map(
              (_, index) => (
                <div
                  key={`empty-${index}`}
                  style={{
                    flex: "0 0 calc(33.333% - 1rem)",
                    minWidth: "250px",
                    height: "180px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "12px",
                    border: "2px dashed #dee2e6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6c757d",
                    fontSize: "0.9rem",
                  }}
                >
                  Empty slot
                </div>
              )
            )}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={currentIndex + itemsPerView >= quizzes.length}
          style={{
            padding: "0.75rem",
            backgroundColor:
              currentIndex + itemsPerView >= quizzes.length
                ? "#e9ecef"
                : "#007bff",
            color:
              currentIndex + itemsPerView >= quizzes.length
                ? "#6c757d"
                : "white",
            border: "none",
            borderRadius: "50%",
            cursor:
              currentIndex + itemsPerView >= quizzes.length
                ? "not-allowed"
                : "pointer",
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
          ›
        </button>
      </div>

      {/* Dots Indicator */}
      {quizzes.length > itemsPerView && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "1rem",
          }}
        >
          {Array.from({
            length: Math.ceil(quizzes.length / itemsPerView),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerView)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "none",
                backgroundColor:
                  index === Math.floor(currentIndex / itemsPerView)
                    ? "#007bff"
                    : "#dee2e6",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            />
          ))}
        </div>
      )}
    </div>
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
        {quiz.name || "Untitled Quiz"}
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
