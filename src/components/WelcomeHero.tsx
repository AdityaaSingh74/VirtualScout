import { ArrowRight, MapPin, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import AvatarGuide from "./AvatarGuide";

interface WelcomeHeroProps {
  onStartTour: () => void;
}

const WelcomeHero = ({ onStartTour }: WelcomeHeroProps) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Avatar */}
        <div className="mb-8 flex justify-center">
          <AvatarGuide state="waving" size="lg" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
          <MapPin className="w-4 h-4" />
          Virtual Campus Experience
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          Explore Our Campus in{" "}
          <span className="gradient-text">360°</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
          Meet your AI guide and discover every corner of our beautiful campus
          through an immersive virtual tour experience.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
          <Button
            onClick={onStartTour}
            size="lg"
            className="h-14 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Compass className="w-5 h-5 mr-2" />
            Start Virtual Tour
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
          {[
            {
              icon: "🎓",
              title: "AI Campus Guide",
              description: "Chat with your virtual guide for personalized tours",
            },
            {
              icon: "🗺️",
              title: "360° Views",
              description: "Immersive panoramic views of every location",
            },
            {
              icon: "📍",
              title: "Interactive Navigation",
              description: "Click hotspots to explore different areas",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass-card rounded-2xl p-6 text-left hover:scale-105 transition-transform"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default WelcomeHero;
