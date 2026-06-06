import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type Locale = "en" | "ar";

import enDict from "@/i18n/en.json";
import arDict from "@/i18n/ar.json";

const dict = {
  en: enDict,
  ar: arDict,
};

export type Translations = typeof dict.en;

interface AppSettings {
  theme: Theme;
  locale: Locale;
  isRTL: boolean;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
}

const Ctx = createContext<AppSettings | null>(null);

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("hajarafa.theme") as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getInitialLocale = (): Locale => {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("hajarafa.locale") as Locale | null;
  return stored === "ar" ? "ar" : "en";
};

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    localStorage.setItem("hajarafa.theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.dir = locale === "ar" ? "rtl" : "ltr";
    root.lang = locale;
    localStorage.setItem("hajarafa.locale", locale);
  }, [locale]);

  const value = useMemo<AppSettings>(() => ({
    theme,
    locale,
    isRTL: locale === "ar",
    setTheme: setThemeState,
    toggleTheme: () => setThemeState(t => (t === "light" ? "dark" : "light")),
    setLocale: setLocaleState,
    toggleLocale: () => setLocaleState(l => (l === "en" ? "ar" : "en")),
    t: dict[locale],
  }), [theme, locale]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppSettings() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppSettings must be used within AppSettingsProvider");
  return v;
}
