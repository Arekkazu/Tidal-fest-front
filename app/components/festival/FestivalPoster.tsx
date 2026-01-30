import React from "react";
import type { FestivalResponse, Theme } from "../../types/festival.types";
import { LineupSection } from "./LineupSection";

type FestivalPosterProps = {
  festivalData: FestivalResponse;
  theme: Theme;
  posterRef: React.RefObject<HTMLDivElement | null>;
};

export function FestivalPoster({
  festivalData,
  theme,
  posterRef,
}: FestivalPosterProps) {
  const headliners = festivalData?.headliners || [];
  const specialGuests = festivalData?.specialGuests || [];
  const undercard = festivalData?.undercard || [];

  return (
    <div
      ref={posterRef}
      className="w-full max-w-[420px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[680px] relative flex flex-col overflow-hidden shadow-2xl rounded-2xl"
      style={{
        background: theme.background,
        fontFamily: "'Poppins', sans-serif",
        border: `2px solid ${theme.border}`,
        boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), 0 0 40px ${theme.decoration}33`,
        minHeight: "600px",
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
        className="py-5 sm:py-6 px-6 text-center border-b border-slate-700/70"
        style={{ borderColor: theme.border }}
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <div
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
            style={{ backgroundColor: theme.accent }}
          />
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
            style={{ color: theme.text, letterSpacing: "-0.02em" }}
          >
            TIDALFEST
          </h1>
          <div
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
            style={{ backgroundColor: theme.accent }}
          />
        </div>
        {/* Decorative divider */}
        <div className="flex items-center justify-center mt-3 sm:mt-4">
          <div
            className="h-0.5 w-10 sm:w-12 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{ opacity: 0.4 }}
          />
        </div>
      </div>

      {/* LINEUP - Cartel único */}
      <LineupSection
        headliners={headliners}
        specialGuests={specialGuests}
        undercard={undercard}
        theme={theme}
      />
    </div>
  );
}
