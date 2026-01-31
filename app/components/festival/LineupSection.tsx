import React from "react";
import type { Artist, Theme } from "../../types/festival.types";

type LineupSectionProps = {
  headliners: Artist[];
  specialGuests: Artist[];
  undercard: Artist[];
  theme: Theme;
};

export function LineupSection({
  headliners,
  specialGuests,
  undercard,
  theme,
}: LineupSectionProps) {
  return (
    <section className="flex-1 w-full flex flex-col justify-center py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        {/* HEADLINERS - Grande y bold */}
        {headliners.length > 0 && (
          <div className="text-center max-w-full w-full space-y-2">
            {headliners.map((artist) => (
              <div
                key={artist.name}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter px-2"
                style={{
                  color: theme.text,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  hyphens: "auto",
                }}
                title={artist.name}
              >
                {artist.name.toUpperCase()}
              </div>
            ))}
          </div>
        )}

        {/* Separador visual */}
        {headliners.length > 0 && specialGuests.length > 0 && (
          <div className="flex items-center justify-center my-3 sm:my-4">
            <div
              className="h-0.5 w-20 sm:w-24 bg-gradient-to-r from-transparent via-white to-transparent"
              style={{ opacity: 0.4 }}
            />
          </div>
        )}

        {/* SPECIAL GUESTS - Mediano */}
        {specialGuests.length > 0 && (
          <div
            className="text-center leading-relaxed max-w-full px-2 flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 gap-y-1"
            style={{
              color: theme.text,
              opacity: 0.95,
              wordBreak: "break-word",
            }}
          >
            {specialGuests.map((artist, i) => (
              <React.Fragment key={artist.name}>
                <span className="text-lg sm:text-xl md:text-2xl font-bold whitespace-nowrap">
                  {artist.name.toUpperCase()}
                </span>
                {i < specialGuests.length - 1 && (
                  <span
                    className="text-lg sm:text-xl"
                    style={{ color: theme.accent }}
                  >
                    •
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Separador visual */}
        {specialGuests.length > 0 && undercard.length > 0 && (
          <div className="flex items-center justify-center my-2 sm:my-3">
            <div
              className="h-px w-16 sm:w-20 bg-gradient-to-r from-transparent via-white to-transparent"
              style={{ opacity: 0.3 }}
            />
          </div>
        )}

        {/* UNDERCARD - Pequeño */}
        {undercard.length > 0 && (
          <div
            className="text-center leading-relaxed max-w-full px-2 flex flex-wrap justify-center items-center gap-x-2 gap-y-1"
            style={{
              color: theme.text,
              opacity: 0.85,
              wordBreak: "break-word",
            }}
          >
            {undercard.map((artist, i) => (
              <React.Fragment key={artist.name}>
                <span className="text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap">
                  {artist.name.toUpperCase()}
                </span>
                {i < undercard.length - 1 && (
                  <span className="text-sm sm:text-base text-slate-500">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
