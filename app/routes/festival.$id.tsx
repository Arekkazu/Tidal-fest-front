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

// Loader simple para obtener el ID
export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  if (!id) {
    throw new Response("Festival ID not found", { status: 404 });
  }

  return { festivalId: id };
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
