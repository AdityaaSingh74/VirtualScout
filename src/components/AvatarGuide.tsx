import { useState, useEffect } from "react";

type AvatarState = "idle" | "talking" | "thinking" | "waving";

interface AvatarGuideProps {
  state?: AvatarState;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const AvatarGuide = ({ state = "idle", size = "md", className = "" }: AvatarGuideProps) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Complex random blinking pattern
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      
      // Sometimes double blink
      if (Math.random() > 0.7) {
        setTimeout(() => {
          setIsBlinking(true);
          setTimeout(() => setIsBlinking(false), 150);
        }, 300);
      }
    };

    const intervalId = setInterval(blink, 4000 + Math.random() * 3000);
    return () => clearInterval(intervalId);
  }, []);

  const sizeClasses = {
    sm: "w-20 h-24 scale-75",
    md: "w-32 h-40",
    lg: "w-48 h-56 scale-110",
  };

  // State-based glow colors
  const glowColors = {
    idle: "rgba(56, 189, 248, 0.4)", // Cyan
    talking: "rgba(52, 211, 153, 0.5)", // Emerald
    thinking: "rgba(192, 132, 252, 0.5)", // Purple
    waving: "rgba(251, 191, 36, 0.5)", // Amber
  };

  const eyeColors = {
    idle: "bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.9)]",
    talking: "bg-emerald-300 shadow-[0_0_15px_rgba(110,231,183,0.9)]",
    thinking: "bg-fuchsia-300 shadow-[0_0_15px_rgba(240,171,252,0.9)]",
    waving: "bg-amber-300 shadow-[0_0_15px_rgba(252,211,77,0.9)]",
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${sizeClasses[size]} ${className}`}>
      
      {/* Background Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full blur-[40px] transition-colors duration-700 ease-in-out"
        style={{ backgroundColor: glowColors[state] }}
      />

      {/* Main Avatar Container (Floats as a whole) */}
      <div className="relative w-full h-full animate-float flex flex-col items-center z-10 perspective-[1000px]">
        
        {/* === HEAD === */}
        <div className={`relative w-[75%] aspect-square mb-3 z-20 transition-transform duration-500 transform-style-3d ${state === 'thinking' ? 'rotate-12 translate-x-2' : ''} ${state === 'talking' ? 'animate-nod' : ''}`}>
          
          {/* Glass Orb Shell */}
          <div className="absolute inset-0 rounded-[40%] bg-gradient-to-br from-white/50 to-white/10 backdrop-blur-xl border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.15),inset_0_10px_20px_rgba(255,255,255,0.6)] overflow-hidden">
            
            {/* Glossy Specular Highlight */}
            <div className="absolute top-[5%] left-[10%] w-[60%] h-[35%] bg-gradient-to-b from-white/90 to-transparent rounded-full rotate-[-20deg] opacity-80 blur-[0.5px] z-30" />
            
            {/* Inner Dark Visor */}
            <div className="absolute inset-[15%] rounded-[30%] bg-gradient-to-b from-slate-800 to-slate-950 shadow-[inset_0_8px_20px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center border border-slate-700/50">
              
              {/* Visor Glare */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/15 to-transparent z-10" />

              {/* Eyes Container */}
              <div className="relative w-full h-full flex justify-center items-center gap-[15%] px-3 z-0">
                
                {/* Left Eye */}
                <div className={`relative transition-all duration-300 ${isBlinking ? 'h-1 w-6 rounded-full' : 'h-8 w-6 rounded-t-full rounded-b-md'} ${state === 'thinking' ? 'h-6 w-5' : ''}`}>
                  <div className={`absolute inset-0 transition-colors duration-500 ${eyeColors[state]} ${isBlinking ? '' : 'rounded-t-full rounded-b-md'}`} />
                </div>
                
                {/* Right Eye */}
                <div className={`relative transition-all duration-300 ${isBlinking ? 'h-1 w-6 rounded-full' : 'h-8 w-6 rounded-t-full rounded-b-md'} ${state === 'thinking' ? 'h-5 w-6 mt-2' : ''}`}>
                  <div className={`absolute inset-0 transition-colors duration-500 ${eyeColors[state]} ${isBlinking ? '' : 'rounded-t-full rounded-b-md'}`} />
                </div>
                
              </div>
            </div>
          </div>

          {/* Left Floating Ear/Antenna */}
          <div className={`absolute top-1/2 -left-5 w-3 h-10 bg-white/30 backdrop-blur-md border border-white/40 rounded-full -translate-y-1/2 shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-all duration-300 ${state === 'talking' ? 'animate-pulse h-12 -left-6' : ''}`}>
            <div className={`absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${eyeColors[state]}`} />
          </div>

          {/* Right Floating Ear/Antenna */}
          <div className={`absolute top-1/2 -right-5 w-3 h-10 bg-white/30 backdrop-blur-md border border-white/40 rounded-full -translate-y-1/2 shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-all duration-300 ${state === 'talking' ? 'animate-pulse h-12 -right-6' : ''}`}>
             <div className={`absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${eyeColors[state]}`} />
          </div>

        </div>

        {/* === BODY === (Floats slightly differently) */}
        <div className="relative w-[55%] h-[25%] z-10 animate-float-delayed">
          {/* Glass Body Shell */}
          <div className="absolute inset-0 rounded-[25%] bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-xl border border-white/40 shadow-[0_15px_30px_rgba(0,0,0,0.15)] flex justify-center overflow-hidden">
             {/* Core Light inside body */}
             <div className={`w-8 h-8 mt-1 rounded-full blur-xl transition-colors duration-500`} style={{ backgroundColor: glowColors[state] }} />
             <div className={`absolute top-2 w-3 h-1.5 rounded-full transition-colors duration-500 ${eyeColors[state]}`} />
          </div>
        </div>

      </div>

      {/* Ground Shadow */}
      <div className="absolute -bottom-6 w-[70%] h-3 bg-black/10 blur-md rounded-full animate-shadow" />

      {/* Floating State Icons */}
      {state === 'thinking' && (
        <div className="absolute -top-8 right-0 text-3xl animate-bounce drop-shadow-2xl z-30">
          💭
        </div>
      )}
      {state === 'waving' && (
        <div className="absolute top-1/4 -right-12 text-5xl animate-wave origin-bottom drop-shadow-2xl z-30">
          👋
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes nod {
          0%, 100% { transform: rotateX(0deg) translateY(0); }
          50% { transform: rotateX(-15deg) translateY(6px); }
        }
        .animate-nod {
          animation: nod 2s ease-in-out infinite;
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-delayed {
          animation: float-delayed 3.5s ease-in-out infinite;
          animation-delay: 0.7s;
        }
        @keyframes shadow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(0.7); opacity: 0.2; }
        }
        .animate-shadow {
          animation: shadow 3s ease-in-out infinite;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .perspective-\\[1000px\\] {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default AvatarGuide;
