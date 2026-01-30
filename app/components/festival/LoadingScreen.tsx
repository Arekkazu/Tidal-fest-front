import React from "react";

type LoadingScreenProps = {
  message: string;
};

export function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10"
      style={{
        background:
          "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      }}
    >
      <div className="text-center max-w-md w-full">
        {/* Animated Sound Waves */}
        <div className="flex items-center justify-center gap-[3px] h-16 sm:h-20 mb-8 sm:mb-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-1 sm:w-1.5 bg-sky-400 rounded-full origin-center"
              style={{
                animation: `soundWave 1s ease-in-out infinite`,
                animationDelay: `${i * 0.08}s`,
                height: "30%",
              }}
            />
          ))}
        </div>

        {/* Logo */}
        <div className="mb-6 sm:mb-8">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
            style={{
              background:
                "linear-gradient(to right, #38bdf8, #8b5cf6, #f43f5e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "-0.025em",
            }}
          >
            TidalFest
          </h1>
        </div>

        {/* Message */}
        <div className="min-h-[48px] sm:min-h-[60px] flex items-center justify-center px-4">
          <p className="text-slate-300 text-sm sm:text-base font-medium tracking-wide drop-shadow-sm">
            {message}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-3 mt-6 sm:mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-sky-400 rounded-full"
              style={{
                animation: "bounce 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes soundWave {
          0%, 100% {
            transform: scaleY(0.4);
            opacity: 0.6;
          }
          50% {
            transform: scaleY(1.2);
            opacity: 1;
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
