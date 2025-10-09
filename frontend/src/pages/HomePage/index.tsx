import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import CallToActionSection from "./CallToActionSection";

export default function HomePage() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CallToActionSection />
    </div>
  );
}
