import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/lib/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("portfolio_lang");
    return saved || "en";
  });

  useEffect(() => {
    localStorage.setItem("portfolio_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "vi" : "en"));
  };

  const t = (path) => {
    const keys = path.split(".");
    let current = translations[lang];
    for (const key of keys) {
      if (current[key] === undefined) {
        // Fallback to English if key missing
        let fallback = translations.en;
        for (const k of keys) {
          if (fallback[k] === undefined) return path;
          fallback = fallback[k];
        }
        return fallback;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
