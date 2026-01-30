import { useState, useEffect, useCallback } from "react";
import type { FestivalResponse } from "../types/festival.types";
import { API_URL, LOADING_MESSAGES } from "../constants/festival.constants";

export function useFestivalData(festivalId: string) {
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

  // Función para cargar datos
  const fetchFestival = useCallback(async () => {
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

      // El backend devuelve los datos dentro de { data: { headliners, specialGuests, undercard } }
      const festivalData = (data as any).data || data;

      // Validar que la respuesta tenga la estructura esperada
      if (
        !festivalData.headliners &&
        !festivalData.specialGuests &&
        !festivalData.undercard
      ) {
        console.error("Respuesta recibida:", data);
        throw new Error(
          "La respuesta del servidor no tiene el formato esperado. Revisa la consola para ver los datos recibidos.",
        );
      }

      setFestivalData(festivalData);
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

  return {
    festivalData,
    loading,
    error,
    loadingMessage,
    refetch: fetchFestival,
  };
}
