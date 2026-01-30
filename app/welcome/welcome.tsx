import React from "react";
import { API_URL } from "../constants/festival.constants";

const redirectTidal = () => {
  console.log("Redirecting to Tidal...");
  window.location.href = `${API_URL}/api/auth/tidal/login`;
};

export function Welcome() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f172a 100%)",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
            top: "-10%",
            left: "-5%",
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: "linear-gradient(135deg, #f43f5e, #fbbf24)",
            bottom: "-10%",
            right: "-5%",
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* Sound waves decoration */}
        <div className="flex items-center justify-center gap-1 h-12 sm:h-16 mb-8 sm:mb-12">
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className="w-1 sm:w-1.5 bg-gradient-to-t from-sky-400 to-purple-500 rounded-full"
              style={{
                animation: `soundWave ${1 + (i % 3) * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
                height: "40%",
              }}
            />
          ))}
        </div>

        {/* Logo and title */}
        <div className="mb-6 sm:mb-8">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4"
            style={{
              background:
                "linear-gradient(135deg, #38bdf8 0%, #8b5cf6 50%, #f43f5e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            TIDALFEST
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
            <p className="text-slate-300 text-lg sm:text-xl md:text-2xl font-medium tracking-wide">
              Tu Festival Personalizado
            </p>
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
          </div>
        </div>

        {/* Description */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed mb-4">
            Conecta tu cuenta de{" "}
            <span className="text-sky-400 font-semibold">Tidal</span> y descubre
            tu lineup perfecto.
          </p>
          <p className="text-slate-500 text-sm sm:text-base">
            Generamos un cartel de festival único basado en tus artistas
            favoritos, reproducciones y gustos musicales.
          </p>
        </div>

        {/* CTA Button with Tidal branding */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={redirectTidal}
            className="group relative inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #00d4ff 0%, #0084ff 100%)",
              boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)",
            }}
          >
            {/* Button glow effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
              }}
            />

            {/* Tidal logo placeholder - using SVG inline */}
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative z-10"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L8 6L12 10L16 6L12 2Z" />
              <path d="M12 10L8 14L12 18L16 14L12 10Z" opacity="0.7" />
              <path d="M4 10L0 14L4 18L8 14L4 10Z" opacity="0.7" />
              <path d="M20 10L16 14L20 18L24 14L20 10Z" opacity="0.7" />
            </svg>

            <span className="relative z-10 text-white">
              Iniciar Sesión con Tidal
            </span>

            {/* Arrow icon */}
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>

          {/* Security badge */}
          <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Conexión segura · No guardamos tu contraseña</span>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
          <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-xl p-5 sm:p-6 hover:border-sky-500/50 transition-all">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-2">
              Personalizado
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Basado en tus gustos y reproducciones reales
            </p>
          </div>

          <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-xl p-5 sm:p-6 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-2">
              Comparte
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Descarga tu cartel y compártelo con amigos
            </p>
          </div>

          <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-xl p-5 sm:p-6 hover:border-pink-500/50 transition-all">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-2">
              Instantáneo
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Tu festival listo en segundos
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes soundWave {
          0%, 100% {
            transform: scaleY(0.3);
            opacity: 0.6;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
        }
      `}</style>
    </div>
  );
}
