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
export type Currency = "EGP" | "SAR" | "AED" | "KWD";

export interface CurrencyInfo {
  code: Currency;
  rate: number;
  symbolAr: string;
  symbolEn: string;
  countryNameAr: string;
  countryNameEn: string;
  flag: string;
}

export const CURRENCIES: Record<Currency, CurrencyInfo> = {
  EGP: { code: "EGP", rate: 1.0, symbolAr: "ج.م", symbolEn: "EGP", countryNameAr: "مصر", countryNameEn: "Egypt", flag: "🇪🇬" },
  SAR: { code: "SAR", rate: 0.076, symbolAr: "ر.س", symbolEn: "SAR", countryNameAr: "السعودية", countryNameEn: "Saudi Arabia", flag: "🇸🇦" },
  AED: { code: "AED", rate: 0.074, symbolAr: "د.إ", symbolEn: "AED", countryNameAr: "الإمارات", countryNameEn: "UAE", flag: "🇦🇪" },
  KWD: { code: "KWD", rate: 0.0062, symbolAr: "د.ك", symbolEn: "KWD", countryNameAr: "الكويت", countryNameEn: "Kuwait", flag: "🇰🇼" },
};

const ARABIC_INDIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toArabicIndic(val: number | string): string {
  return String(val).replace(/\d/g, d => ARABIC_INDIC_DIGITS[Number(d)] ?? d);
}

interface AppSettings {
  theme: Theme;
  locale: Locale;
  numeralSystem: NumeralSystem;
  currency: Currency;
  currencyInfo: CurrencyInfo;
  isQuizOpen: boolean;
  setQuizOpen: (open: boolean) => void;
  isRTL: boolean;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  setNumeralSystem: (sys: NumeralSystem) => void;
  setCurrency: (c: Currency) => void;
  formatNumber: (val: number | string) => string;
  formatPrice: (price: number) => string;
  convertPrice: (priceInEgp: number) => number;
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

const getInitialCurrency = (): Currency => {
  if (typeof window === "undefined") return "EGP";
  const stored = localStorage.getItem("hajarafa.currency") as Currency | null;
  if (stored && ["EGP", "SAR", "AED", "KWD"].includes(stored)) return stored;
  return "EGP";
};

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const [numeralSystem, setNumeralSystemState] = useState<NumeralSystem>(getInitialNumeralSystem);
  const [currency, setCurrencyState] = useState<Currency>(getInitialCurrency);
  const [isQuizOpen, setQuizOpen] = useState(false);

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

  useEffect(() => {
    localStorage.setItem("hajarafa.currency", currency);
  }, [currency]);

  const currencyInfo = useMemo(() => CURRENCIES[currency] ?? CURRENCIES.EGP, [currency]);

  const formatNumber = useCallback((val: number | string): string => {
    const str = String(val);
    return numeralSystem === "arabic-indic" ? toArabicIndic(str) : str;
  }, [numeralSystem]);

  const convertPrice = useCallback((priceInEgp: number): number => {
    const info = CURRENCIES[currency] ?? CURRENCIES.EGP;
    return priceInEgp * info.rate;
  }, [currency]);

  const formatPrice = useCallback((priceInEgp: number): string => {
    const info = CURRENCIES[currency] ?? CURRENCIES.EGP;
    const converted = priceInEgp * info.rate;
    const formattedNum = formatNumber(converted.toFixed(2));
    const symbol = locale === "ar" ? info.symbolAr : info.symbolEn;
    return locale === "ar" ? `${formattedNum} ${symbol}` : `${symbol} ${formattedNum}`;
  }, [currency, formatNumber, locale]);

  const value = useMemo<AppSettings>(() => ({
    theme,
    locale,
    numeralSystem,
    currency,
    currencyInfo,
    isQuizOpen,
    setQuizOpen,
    isRTL: locale === "ar",
    setTheme: setThemeState,
    toggleTheme: () => setThemeState(t => (t === "light" ? "dark" : "light")),
    setLocale: setLocaleState,
    toggleLocale: () => setLocaleState(l => (l === "en" ? "ar" : "en")),
    setNumeralSystem: setNumeralSystemState,
    setCurrency: setCurrencyState,
    formatNumber,
    formatPrice,
    convertPrice,
    t: dict[locale],
  }), [theme, locale, numeralSystem, currency, currencyInfo, isQuizOpen, formatNumber, formatPrice, convertPrice]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppSettings() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppSettings must be used within AppSettingsProvider");
  return v;
}
