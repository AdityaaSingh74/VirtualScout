import { useState } from "react";
import WelcomeHero from "@/components/WelcomeHero";
import TourLayout from "@/components/TourLayout";

const Index = () => {
  const [isTourStarted, setIsTourStarted] = useState(false);

  if (isTourStarted) {
    return <TourLayout onBack={() => setIsTourStarted(false)} />;
  }

  return <WelcomeHero onStartTour={() => setIsTourStarted(true)} />;
};

export default Index;
