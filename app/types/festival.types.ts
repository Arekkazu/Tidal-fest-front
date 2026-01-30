// --- Tipos de Datos del Festival ---

export type Artist = {
  name: string;
  score: number;
  details: {
    track: number;
    albums: number;
  };
};

export type FestivalResponse = {
  headliners: Artist[];
  specialGuests: Artist[];
  undercard: Artist[];
};

export type ThemeName = "SunsetBeach" | "MidnightFest" | "DesertDawn";

export type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
  decoration: string;
};

export type FestivalDataState = {
  data: FestivalResponse | null;
  loading: boolean;
  error: string | null;
  loadingMessage: string;
};
