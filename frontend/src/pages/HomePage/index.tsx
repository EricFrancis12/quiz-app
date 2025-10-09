import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
// import QuizzesSection from "./QuizzesSection";
import HowItWorksSection from "./HowItWorksSection";
import CallToActionSection from "./CallToActionSection";
// import sampleQuizzes from "../../lib/sampleQuizzes.json";

export default function HomePage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <HeroSection />
      <FeaturesSection />
      {/* TODO: finish */}
      {/* <QuizzesSection quizzes={sampleQuizzes} /> */}
      <HowItWorksSection />
      <CallToActionSection />
    </div>
  );
}
