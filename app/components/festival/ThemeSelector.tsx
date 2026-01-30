import React from "react";
import type { ThemeName } from "../../types/festival.types";
import { THEMES } from "../../constants/festival.constants";

type ThemeSelectorProps = {
  currentTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
  isDownloading: boolean;
  onDownload: () => void;
};

export function ThemeSelector({
  currentTheme,
  onThemeChange,
  isDownloading,
  onDownload,
}: ThemeSelectorProps) {
  return (
    <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full max-w-lg sm:max-w-none sm:w-auto bg-slate-900/50 backdrop-blur-sm border border-slate-700 p-4 sm:p-5 rounded-2xl">
      <div className="flex items-center gap-3 sm:gap-4">
        <label className="text-slate-300 text-xs sm:text-sm font-medium whitespace-nowrap">
          Tema
        </label>
        <select
          onChange={(e) => onThemeChange(e.target.value as ThemeName)}
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
        onClick={onDownload}
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
  );
}
