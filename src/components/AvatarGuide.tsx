import { useState, useEffect } from "react";

type AvatarState = "idle" | "talking" | "thinking" | "waving";

interface AvatarGuideProps {
  state?: AvatarState;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const AvatarGuide = ({ state = "idle", size = "md", className = "" }: AvatarGuideProps) => {
  const [eyeBlink, setEyeBlink] = useState(false);

  // Random eye blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const stateClasses = {
    idle: "animate-float",
    talking: "animate-pulse-soft",
    thinking: "animate-pulse-soft",
    waving: "animate-wave",
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-secondary/30 blur-xl avatar-glow" />
      
      {/* Main avatar container */}
      <div
        className={`relative w-full h-full rounded-full bg-gradient-to-b from-primary to-primary/80 shadow-lg ${stateClasses[state]}`}
        style={{
          boxShadow: "0 8px 32px -8px hsl(var(--primary) / 0.4)",
        }}
      >
        {/* Face container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Eyes */}
          <div className="flex gap-3 mb-2">
            {/* Left eye */}
            <div className="relative">
              <div
                className={`w-3 h-3 bg-primary-foreground rounded-full transition-all duration-100 ${
                  eyeBlink ? "scale-y-[0.1]" : "scale-y-100"
                }`}
              >
                {/* Pupil */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
              </div>
            </div>
            {/* Right eye */}
            <div className="relative">
              <div
                className={`w-3 h-3 bg-primary-foreground rounded-full transition-all duration-100 ${
                  eyeBlink ? "scale-y-[0.1]" : "scale-y-100"
                }`}
              >
                {/* Pupil */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
              </div>
            </div>
          </div>

          {/* Mouth */}
          <div
            className={`bg-primary-foreground transition-all duration-200 ${
              state === "talking"
                ? "w-4 h-3 rounded-full animate-pulse"
                : state === "thinking"
                ? "w-3 h-1 rounded-full"
                : "w-5 h-2 rounded-full"
            }`}
          />
        </div>

        {/* Graduation cap */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
          <div className="relative">
            {/* Cap top */}
            <div className="w-12 h-1 bg-foreground rounded-sm" />
            {/* Cap base */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-3 bg-foreground rounded-sm" />
            {/* Tassel */}
            <div className="absolute -right-2 top-0 w-0.5 h-4 bg-secondary" />
            <div className="absolute -right-3 top-4 w-2 h-2 bg-secondary rounded-full" />
          </div>
        </div>

        {/* Waving hand (shows when waving) */}
        {state === "waving" && (
          <div className="absolute -right-4 top-1/2 text-2xl animate-wave origin-bottom">
            👋
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarGuide;
