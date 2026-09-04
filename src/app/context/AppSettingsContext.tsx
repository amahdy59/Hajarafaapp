import { createContext, useContext, useEffect, useMemo, useState, useCallback, ReactNode } from "react";

type Theme = "light" | "dark";
type Locale = "en" | "ar";

import enDict from "../../i18n/en.json";
import arDict from "../../i18n/ar.json";

const dict = {
  en: enDict,
  ar: arDict,
};

export type Translations = typeof dict.en;

export type NumeralSystem = "western" | "arabic-indic";

const ARABIC_INDIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toArabicIndic(val: number | string): string {
  return String(val).replace(/\d/g, d => ARABIC_INDIC_DIGITS[Number(d)] ?? d);
}

interface AppSettings {
  theme: Theme;
  locale: Locale;
  numeralSystem: NumeralSystem;
  isRTL: boolean;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  setNumeralSystem: (sys: NumeralSystem) => void;
  formatNumber: (val: number | string) => string;
  formatPrice: (price: number) => string;
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

const getInitialNumeralSystem = (): NumeralSystem => {
  if (typeof window === "undefined") return "western";
  const stored = localStorage.getItem("hajarafa.numeral_system") as NumeralSystem | null;
  return stored === "arabic-indic" ? "arabic-indic" : "western";
};

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const [numeralSystem, setNumeralSystemState] = useState<NumeralSystem>(getInitialNumeralSystem);

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

  useEffect(() => {
    localStorage.setItem("hajarafa.numeral_system", numeralSystem);
  }, [numeralSystem]);

  const formatNumber = useCallback((val: number | string): string => {
    const str = String(val);
    return numeralSystem === "arabic-indic" ? toArabicIndic(str) : str;
  }, [numeralSystem]);

  const formatPrice = useCallback((price: number): string => {
    const formattedNum = formatNumber(price.toFixed(2));
    const currency = dict[locale].currency;
    return locale === "ar" ? `${formattedNum} ${currency}` : `${currency} ${formattedNum}`;
  }, [formatNumber, locale]);

  const value = useMemo<AppSettings>(() => ({
    theme,
    locale,
    numeralSystem,
    isRTL: locale === "ar",
    setTheme: setThemeState,
    toggleTheme: () => setThemeState(t => (t === "light" ? "dark" : "light")),
    setLocale: setLocaleState,
    toggleLocale: () => setLocaleState(l => (l === "en" ? "ar" : "en")),
    setNumeralSystem: setNumeralSystemState,
    formatNumber,
    formatPrice,
    t: dict[locale],
  }), [theme, locale, numeralSystem, formatNumber, formatPrice]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppSettings() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppSettings must be used within AppSettingsProvider");
  return v;
}
