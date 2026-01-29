"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import { toPng } from "html-to-image";
import type { Route } from "./+types/festival.$id";

// --- Tipos de Datos ---
type Lineup = {
  name: string;
  score: number;
  details: { track: number; albums: number };
};

type DayLineup = {
  dayNumber: number;
  headliners: Lineup[];
  specialGuests: Lineup[];
  undercard: Lineup[];
  tinyLetters: Lineup[];
  totalArtists: number;
};

type FestivalResponse = {
  success: boolean;
  daysGenerated: 0 | 1 | 2 | 3;
  days: DayLineup[];
  metadata: {
    totalArtistsAvailable: number;
    totalArtistsUsed: number;
    paddingUsedTotal: number;
    paddingPercentage: number;
    paddingPerDay: number[];
    categories: {
      headliners: number;
      specialGuests: number;
      undercard: number;
      tinyLetters: number;
    };
  };
  message: string;
  warning?: string;
  error?: string;
};

// --- Configuracion de Temas (estilo festival premium) ---
const THEMES = {
  SunsetBeach: {
    primary: "#06b6d4",
    secondary: "#0891b2",
    accent: "#fbbf24",
    background: "#0a1929",
    text: "#FFFFFF",
    border: "#0e7490",
    decoration: "#38bdf8",
  },
  MidnightFest: {
    primary: "#4c1d95",
    secondary: "#5b21b6",
    accent: "#fde047",
    background: "#0f0f1b",
    text: "#FFFFFF",
    border: "#6d28d9",
    decoration: "#8b5cf6",
  },
  DesertDawn: {
    primary: "#e11d48",
    secondary: "#f43f5e",
    accent: "#fde047",
    background: "#1a0d0d",
    text: "#FFFFFF",
    border: "#fb7185",
    decoration: "#fca5a5",
  },
};

const DAY_LABELS = ["", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"];

// Mensajes de loading rotativos
const LOADING_MESSAGES = [
  "Obteniendo tus artistas favoritos",
  "Analizando albumes",
  "Revisando tus reproducciones",
  "Calculando scores de popularidad",
  "Organizando headliners",
  "Seleccionando special guests",
  "Armando el undercard",
  "Analizando tus gustos musicales",
  "Generando el lineup perfecto",
  "Organizando el festival",
  "Preparando tu festival",
  "Ultimos ajustes",
];

// Loader simple para obtener el ID
export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  if (!id) {
    throw new Response("Festival ID not found", { status: 404 });
  }

  return { festivalId: id };
}

// --- Loading Screen Component (estilo festival premium) ---
function LoadingScreen({ message }: { message: string }) {
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

// --- Error Screen Component ---
function ErrorScreen({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10"
      style={{
        background:
          "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      }}
    >
      <div className="bg-slate-900/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-slate-700">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-rose-900/30 flex items-center justify-center border border-rose-500/30">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-200 mb-2">
          Error al cargar el festival
        </h2>
        <p className="text-slate-400 mb-6 text-sm sm:text-base">{error}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRetry}
            className="bg-sky-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-sky-600 transition-all text-sm sm:text-base shadow-lg hover:shadow-sky-500/30"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="bg-slate-800 text-slate-300 px-6 py-3 rounded-xl font-semibold hover:bg-slate-700 transition-all text-sm sm:text-base border border-slate-700"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FestivalApp({ loaderData }: Route.ComponentProps) {
  const { festivalId } = loaderData;
  const posterRef = useRef<HTMLDivElement>(null);
  const [currentTheme, setCurrentTheme] =
    useState<keyof typeof THEMES>("SunsetBeach");
  const [isDownloading, setIsDownloading] = useState(false);

  // Estados para el fetch
  const [festivalData, setFestivalData] = useState<FestivalResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);

  // useEffect para rotar mensajes de loading
  useEffect(() => {
    if (!loading) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[currentIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, [loading]);

  // Funcion para cargar datos
  const fetchFestival = useCallback(async () => {
    const API_URL = "http://192.168.1.73:3000";

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/result-fest/${festivalId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error ${response.status}: ${response.statusText} - ${errorText}`,
        );
      }

      const textData = await response.text();

      let data: FestivalResponse;
      try {
        data = JSON.parse(textData);
      } catch {
        throw new Error(
          `Error al parsear respuesta del servidor: ${textData.substring(0, 100)}`,
        );
      }

      // El backend envia los datos dentro de festivalLineup
      const festivalResponse: FestivalResponse =
        (data as { festivalLineup?: FestivalResponse }).festivalLineup || data;

      // Verificar si fue exitoso
      if (!festivalResponse.success) {
        throw new Error(festivalResponse.error || festivalResponse.message);
      }

      setFestivalData(festivalResponse);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error desconocido al cargar el festival",
      );
    } finally {
      setLoading(false);
    }
  }, [festivalId]);

  // useEffect para cargar datos del backend
  useEffect(() => {
    fetchFestival();
  }, [fetchFestival]);

  const downloadPoster = useCallback(async () => {
    if (posterRef.current === null) return;

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        skipFonts: true,
        backgroundColor: "#0a0a0f",
      });

      const link = document.createElement("a");
      const daysSuffix =
        festivalData && festivalData.daysGenerated > 1
          ? `-${festivalData.daysGenerated}days`
          : "";
      link.download = `tidalfest${daysSuffix}-lineup.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating image", err);
      alert("Error al generar la imagen. Por favor, intenta de nuevo.");
    } finally {
      setIsDownloading(false);
    }
  }, [posterRef, festivalData]);

  // Estado de error
  if (error) {
    return (
      <ErrorScreen error={error} onRetry={() => window.location.reload()} />
    );
  }

  // Estado de loading con mensajes rotativos
  if (loading || !festivalData) {
    return <LoadingScreen message={loadingMessage} />;
  }

  const { days, daysGenerated, metadata, warning } = festivalData;
  const theme = THEMES[currentTheme];

  // Calcular fechas para los dias del festival
  const getDateForDay = (dayNum: number) => {
    const baseDate = new Date();
    baseDate.setMonth(baseDate.getMonth() + 3); // Festival en 3 meses
    baseDate.setDate(baseDate.getDate() + dayNum - 1);
    return {
      dayLabel: DAY_LABELS[baseDate.getDay()] || "DIA",
      dateNum: baseDate.getDate(),
      month: baseDate.toLocaleString("es", { month: "short" }).toUpperCase(),
    };
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-6 sm:px-6 sm:py-8 md:p-10"
      style={{
        background: "linear-gradient(180deg, #0a0a0f 0%, #12121c 100%)",
      }}
    >
      {/* Controles superiores */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full max-w-lg sm:max-w-none sm:w-auto bg-slate-900/50 backdrop-blur-sm border border-slate-700 p-4 sm:p-5 rounded-2xl">
        <div className="flex items-center gap-3 sm:gap-4">
          <label className="text-slate-300 text-xs sm:text-sm font-medium whitespace-nowrap">
            Tema
          </label>
          <select
            onChange={(e) =>
              setCurrentTheme(e.target.value as keyof typeof THEMES)
            }
            value={currentTheme}
            className="flex-1 sm:flex-none bg-slate-800/50 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-sky-400/50 border border-slate-700 text-sm sm:text-base"
          >
            <option value="SunsetBeach" className="bg-slate-900">
              Ocean Breeze
            </option>
            <option value="MidnightFest" className="bg-slate-900">
              Purple Night
            </option>
            <option value="DesertDawn" className="bg-slate-900">
              Coral Sunset
            </option>
          </select>
        </div>

        <button
          onClick={downloadPoster}
          disabled={isDownloading}
          className="bg-sky-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold hover:bg-sky-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg hover:shadow-sky-500/30"
        >
          {isDownloading ? (
            <>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Generando...</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>Guardar Imagen</span>
            </>
          )}
        </button>
      </div>

      {/* Warning si hay padding */}
      {warning && (
        <div className="mb-6 sm:mb-8 bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl max-w-lg sm:max-w-2xl w-full mx-auto">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <p className="text-amber-300 font-medium text-sm sm:text-base">
                {warning}
              </p>
              <p className="text-amber-300/70 text-xs sm:text-sm mt-1">
                Algunos artistas se repiten en diferentes dias para completar el
                festival.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CONTENEDOR DEL CARTEL - DISEÑO UNIFICADO Y PROFESIONAL */}
      <div
        ref={posterRef}
        className="w-full max-w-[380px] sm:max-w-[450px] md:max-w-[520px] lg:max-w-[580px] relative flex flex-col overflow-hidden shadow-2xl rounded-2xl"
        style={{
          background: theme.background,
          fontFamily: "'Poppins', sans-serif",
          border: `2px solid ${theme.border}`,
          boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), 0 0 40px ${theme.decoration}33`,
        }}
      >
        {/* Decorative top bar */}
        <div
          className="h-2 w-full"
          style={{
            background: `linear-gradient(to right, ${theme.primary}, ${theme.secondary}, ${theme.accent})`,
          }}
        />

        {/* HEADER UNIFICADO */}
        <div
          className="py-4 px-6 text-center border-b border-slate-700/70"
          style={{ borderColor: theme.border }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.accent }}
            />
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
              style={{ color: theme.text, letterSpacing: "-0.02em" }}
            >
              TIDALFEST
            </h1>
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.accent }}
            />
          </div>
          {/* Decorative divider */}
          <div className="flex items-center justify-center mt-3">
            <div
              className="h-0.5 w-8 bg-gradient-to-r from-transparent via-white to-transparent"
              style={{ opacity: 0.3 }}
            />
          </div>
        </div>

        {/* DAYS PANELS - Diseño mejorado */}
        <section className="flex-1 w-full flex flex-col">
          {days.map((day, index) => {
            const dateInfo = getDateForDay(day.dayNumber);
            const isLastDay = index === days.length - 1;
            return (
              <DayPanel
                key={day.dayNumber}
                day={day}
                theme={theme}
                dayLabel={dateInfo.dayLabel}
                dateNum={dateInfo.dateNum}
                month={dateInfo.month}
                isLastDay={isLastDay}
              />
            );
          })}
        </section>
      </div>

      {/* Info de estadisticas debajo */}
      <div className="mt-6 sm:mt-8 bg-slate-900/50 backdrop-blur-sm border border-slate-700 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-center max-w-lg w-full">
        <p className="text-sm sm:text-base text-slate-200 font-medium">
          Festival de {daysGenerated} día{daysGenerated > 1 ? "s" : ""} con{" "}
          {metadata.totalArtistsUsed} artistas
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-3 text-[10px] sm:text-xs text-slate-400">
          <span className="bg-slate-800/50 px-2 sm:px-3 py-1 rounded-full border border-slate-700">
            {metadata.categories.headliners * daysGenerated} headliners
          </span>
          <span className="bg-slate-800/50 px-2 sm:px-3 py-1 rounded-full border border-slate-700">
            {metadata.categories.specialGuests * daysGenerated} special guests
          </span>
          <span className="bg-slate-800/50 px-2 sm:px-3 py-1 rounded-full border border-slate-700">
            {metadata.categories.undercard * daysGenerated} undercard
          </span>
          <span className="bg-slate-800/50 px-2 sm:px-3 py-1 rounded-full border border-slate-700">
            {metadata.categories.tinyLetters * daysGenerated} extras
          </span>
        </div>
        {metadata.paddingUsedTotal > 0 && (
          <p className="text-xs text-amber-400 mt-3">
            {metadata.paddingUsedTotal} artistas repetidos (
            {metadata.paddingPercentage.toFixed(1)}%)
          </p>
        )}
      </div>
    </div>
  );
}

/* =========================
   DAY PANEL COMPONENT - Diseño mejorado y coherente
========================= */
function DayPanel({
  day,
  theme,
  dayLabel,
  dateNum,
  month,
  isLastDay,
}: {
  day: DayLineup;
  theme: (typeof THEMES)[keyof typeof THEMES];
  dayLabel: string;
  dateNum: number;
  month: string;
  isLastDay: boolean;
}) {
  return (
    <div
      className={`flex-1 flex flex-col justify-center py-3 sm:py-4 relative ${!isLastDay ? "border-b border-slate-700/70" : ""}`}
      style={{ borderColor: theme.border }}
    >
      {/* Day indicator left + Date right - mejorado */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: theme.accent }}
        />
        <span
          className="text-[10px] sm:text-xs font-bold tracking-wider"
          style={{ color: theme.accent }}
        >
          {dayLabel}
        </span>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-right">
        <div
          className="text-[10px] sm:text-xs font-bold tracking-wider"
          style={{ color: theme.text, opacity: 0.85 }}
        >
          {month}
        </div>
        <div
          className="text-lg sm:text-xl font-black mt-0.5"
          style={{ color: theme.accent }}
        >
          {dateNum}
        </div>
      </div>

      {/* Content - centrado con mejor jerarquía visual */}
      <div className="flex flex-col items-center gap-1.5 sm:gap-2 px-6 sm:px-8">
        {/* HEADLINERS - Grande y bold con mejor espaciado */}
        {day.headliners.length > 0 && (
          <div className="text-center max-w-full">
            {day.headliners.map((a) => (
              <div
                key={a.name}
                className="text-xl sm:text-2xl md:text-3xl font-black leading-tight tracking-tight whitespace-nowrap overflow-hidden text-ellipsis px-2"
                style={{ color: theme.text, WebkitLineClamp: 1 }}
                title={a.name}
              >
                {a.name.toUpperCase()}
              </div>
            ))}
          </div>
        )}

        {/* SPECIAL GUESTS - Mediano con bullets mejorados */}
        {day.specialGuests.length > 0 && (
          <div
            className="text-center leading-relaxed max-w-full"
            style={{ color: theme.text, opacity: 0.95 }}
          >
            {day.specialGuests.map((a, i) => (
              <React.Fragment key={a.name}>
                <span className="text-sm sm:text-base font-bold whitespace-nowrap">
                  {a.name.toUpperCase()}
                </span>
                {i < day.specialGuests.length - 1 && (
                  <span className="mx-1.5 sm:mx-2 text-slate-500">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* UNDERCARD - Pequeño con bullets */}
        {day.undercard.length > 0 && (
          <div
            className="text-center leading-relaxed max-w-full"
            style={{ color: theme.text, opacity: 0.85 }}
          >
            {day.undercard.map((a, i) => (
              <React.Fragment key={a.name}>
                <span className="text-[11px] sm:text-xs font-medium whitespace-nowrap">
                  {a.name.toUpperCase()}
                </span>
                {i < day.undercard.length - 1 && (
                  <span className="mx-1 sm:mx-1.5 text-slate-600">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* TINY LETTERS - Legible con bullets */}
        {day.tinyLetters.length > 0 && (
          <div
            className="text-center leading-relaxed max-w-full"
            style={{ color: theme.text, opacity: 0.75 }}
          >
            {day.tinyLetters.map((a, i) => (
              <React.Fragment key={a.name}>
                <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap">
                  {a.name.toUpperCase()}
                </span>
                {i < day.tinyLetters.length - 1 && (
                  <span className="mx-1 sm:mx-1.5 text-slate-700">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TidalFest - Tu Festival Personalizado" },
    {
      name: "description",
      content: "Tu festival personalizado basado en tu musica favorita",
    },
  ];
}
