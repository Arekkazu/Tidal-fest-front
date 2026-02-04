import React from "react";
import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("i18nextLng");
      if (stored && stored !== i18n.language) {
        i18n.changeLanguage(stored);
      }
    }
  }, [i18n]);

  const languages = [
    { code: "es", label: "ES", flag: "🇪🇸" },
    { code: "en", label: "EN", flag: "🇺🇸" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`px-3 py-2 rounded-md font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
            i18n.language === lang.code
              ? "bg-gradient-to-r from-sky-500 to-purple-500 text-white shadow-lg"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
          }`}
          aria-label={`Change language to ${lang.label}`}
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
