import React, { useState, useEffect } from "react";
import { API_URL } from "../constants/festival.constants";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../components/LanguageSelector";

const redirectTidal = () => {
  console.log("Redirecting to Tidal...");
  window.location.href = `${API_URL}/api/auth/tidal/login`;
};

export function Welcome() {
  const [showDialog, setShowDialog] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const { t } = useTranslation();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const closeDialog = () => {
    if (countdown === 0) {
      setShowDialog(false);
    }
  };

  return (
    <>
      {/* Welcome Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border-2 border-sky-500/50 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl transform transition-all">
            <div className="absolute top-2 right-2">
              <LanguageSelector />
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
              {t("welcome.dialog.title")}
            </h2>

            <div className="space-y-3 text-slate-300 text-sm sm:text-base mb-6">
              <p className="text-center">
                {t("welcome.dialog.description1")}{" "}
                <span className="text-sky-400 font-semibold">
                  {t("welcome.dialog.description1_highlight")}
                </span>{" "}
                {t("welcome.dialog.description1_end")}
              </p>
              <p className="text-center">
                {t("welcome.dialog.description2")}{" "}
                <span className="text-purple-400 font-semibold">
                  {t("welcome.dialog.description2_highlight")}
                </span>{" "}
                {t("welcome.dialog.description2_end")}
              </p>
              <p className="text-center text-slate-400 text-sm">
                {t("welcome.dialog.description3")}
              </p>
            </div>

            <button
              onClick={closeDialog}
              disabled={countdown > 0}
              className={`w-full py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                countdown > 0
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-sky-500 to-purple-500 text-white hover:scale-105 hover:shadow-lg"
              }`}
            >
              {countdown > 0
                ? t("welcome.dialog.wait", { seconds: countdown })
                : t("welcome.dialog.understood")}
            </button>
          </div>
        </div>
      )}

      <div
        className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f172a 100%)",
        }}
      >
        <LanguageSelector />
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
              TidalFest
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
              <p className="text-slate-300 text-lg sm:text-xl md:text-2xl font-medium tracking-wide">
                {t("welcome.subtitle")}
              </p>
              <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
            </div>
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed mb-4">
              {t("welcome.description1")}{" "}
              <span className="text-sky-400 font-semibold">
                {t("welcome.description1_highlight")}
              </span>{" "}
              {t("welcome.description1_end")}
            </p>
            <p className="text-slate-500 text-sm sm:text-base">
              {t("welcome.description2")}
            </p>
          </div>

          {/* CTA Button with Tidal branding */}
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={redirectTidal}
              className="group relative inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
              style={{
                background: "#000000",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Button glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
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
                {t("welcome.loginButton")}
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
              <span>{t("welcome.securityBadge")}</span>
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
    </>
  );
}
