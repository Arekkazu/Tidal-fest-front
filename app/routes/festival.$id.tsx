"use client";

import React, { useRef, useCallback, useState } from "react";
import { toPng } from "html-to-image";
import type { Route } from "./+types/festival.$id";
import type { ThemeName } from "../types/festival.types";
import { THEMES } from "../constants/festival.constants";
import { useFestivalData } from "../hooks/useFestivalData";
import { LoadingScreen } from "../components/festival/LoadingScreen";
import { ErrorScreen } from "../components/festival/ErrorScreen";
import { ThemeSelector } from "../components/festival/ThemeSelector";
import { FestivalPoster } from "../components/festival/FestivalPoster";
import { isRouteErrorResponse, Link } from "react-router";

// Loader simple para obtener el ID
export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  if (!id) {
    throw new Response("Festival ID no encontrado", { status: 404 });
  }

  return { festivalId: id };
}

// ErrorBoundary para manejar errores de routing y carga
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let errorMessage = "Algo salió mal";
  let errorDetails = "";
  let statusCode = 500;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    errorMessage =
      error.status === 404
        ? "Festival no encontrado"
        : "Error al cargar el festival";
    errorDetails = error.data?.message || error.statusText || "";
  } else if (error instanceof Error) {
    errorMessage = "Error inesperado";
    errorDetails = error.message;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f172a 100%)",
      }}
    >
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 mb-4">
            {statusCode}
          </h1>
          <h2 className="text-3xl font-bold text-white mb-4">{errorMessage}</h2>
          {errorDetails && (
            <p className="text-slate-400 text-lg mb-8">{errorDetails}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
              color: "white",
            }}
          >
            Volver al Inicio
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-all duration-300"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FestivalApp({ loaderData }: Route.ComponentProps) {
  const { festivalId } = loaderData;
  const posterRef = useRef<HTMLDivElement>(null);
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("SunsetBeach");
  const [isDownloading, setIsDownloading] = useState(false);

  // Hook personalizado para cargar datos del festival
  const { festivalData, loading, error, loadingMessage, refetch } =
    useFestivalData(festivalId);

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
      link.download = `tidalfest-lineup.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating image", err);
      alert("Error al generar la imagen. Por favor, intenta de nuevo.");
    } finally {
      setIsDownloading(false);
    }
  }, [posterRef]);

  // Estado de error
  if (error) {
    return <ErrorScreen error={error} onRetry={refetch} />;
  }

  // Estado de loading con mensajes rotativos
  if (loading || !festivalData) {
    return <LoadingScreen message={loadingMessage} />;
  }

  const theme = THEMES[currentTheme];

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-6 sm:px-6 sm:py-8 md:p-10"
      style={{
        background: "linear-gradient(180deg, #0a0a0f 0%, #12121c 100%)",
      }}
    >
      {/* Controles superiores */}
      <ThemeSelector
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        isDownloading={isDownloading}
        onDownload={downloadPoster}
      />

      {/* Cartel del Festival */}
      <FestivalPoster
        festivalData={festivalData}
        theme={theme}
        posterRef={posterRef}
      />
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
