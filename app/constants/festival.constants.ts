// --- Constantes del Festival ---

import type { Theme } from "../types/festival.types";

export const THEMES: Record<string, Theme> = {
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

export const LOADING_MESSAGES = [
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

export const API_URL = import.meta.env.VITE_API_URL;
