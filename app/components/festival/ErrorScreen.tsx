import React from "react";

type ErrorScreenProps = {
  error: string;
  onRetry: () => void;
};

export function ErrorScreen({ error, onRetry }: ErrorScreenProps) {
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
