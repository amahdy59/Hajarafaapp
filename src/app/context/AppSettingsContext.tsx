import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type Locale = "en" | "ar";

const dict = {
  en: {
    appName: "HajArafa",
    appTagline: "Natural Boutique",
    deliverTo: "Deliver to",
    location: "Cairo, Egypt 11511",
    searchPlaceholder: "Search HajArafa",
    home: "Home",
    favourites: "Favourites",
    cart: "Cart",
    menu: "Menu",
    account: "Account",
    settings: "Settings",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    english: "English",
    arabic: "العربية",
    foods: "Foods",
    nonFood: "Non-Food",
    trending: "Trending",
    todaysDeals: "Today's Deals",
    newArrivals: "New Arrivals",
    bestSellers: "Best Sellers",
    helpSettings: "Help & settings",
    yourAccount: "Your Account",
    yourOrders: "Your Orders",
    yourWishlist: "Your Wishlist",
    customerService: "Customer Service",
    aboutUs: "About HajArafa",
    branches: "Our Branches",
    contactUs: "Contact Us",
    signIn: "Sign in",
    welcomeTo: "Welcome to",
    shopAll: "Shop All",
    viewAll: "View all",
    addToCart: "Add to Cart",
    from: "From",
    currency: "LE",
    browseDepartments: "Browse departments",
    shopByCategory: "Shop by Category",
    featuredProducts: "Featured Products",
    explore: "Explore Collections",
    customerReviews: "What Our Customers Say",
    free: "Free",
    freeShipping: "Free shipping on orders over LE 500",
    away: "away",
    subtotal: "Subtotal",
    proceedToCheckout: "Proceed to Checkout",
    viewFullCart: "View Full Cart",
    cartEmpty: "Your cart is empty",
    cartEmptyHint: "Add some natural goodness!",
    browseProducts: "Browse Products",
  },
  ar: {
    appName: "هاج عرفة",
    appTagline: "بوتيك طبيعي",
    deliverTo: "التوصيل إلى",
    location: "القاهرة، مصر ١١٥١١",
    searchPlaceholder: "ابحث في هاج عرفة",
    home: "الرئيسية",
    favourites: "المفضلة",
    cart: "السلة",
    menu: "القائمة",
    account: "حسابي",
    settings: "الإعدادات",
    theme: "المظهر",
    language: "اللغة",
    light: "فاتح",
    dark: "داكن",
    english: "English",
    arabic: "العربية",
    foods: "المأكولات",
    nonFood: "غير غذائي",
    trending: "الأكثر رواجاً",
    todaysDeals: "عروض اليوم",
    newArrivals: "وصل حديثاً",
    bestSellers: "الأكثر مبيعاً",
    helpSettings: "المساعدة والإعدادات",
    yourAccount: "حسابك",
    yourOrders: "طلباتك",
    yourWishlist: "قائمتك المفضلة",
    customerService: "خدمة العملاء",
    aboutUs: "عن هاج عرفة",
    branches: "فروعنا",
    contactUs: "تواصل معنا",
    signIn: "تسجيل الدخول",
    welcomeTo: "أهلاً بك في",
    shopAll: "كل المنتجات",
    viewAll: "عرض الكل",
    addToCart: "أضف للسلة",
    from: "ابتداءً من",
    currency: "ج.م",
    browseDepartments: "تصفح الأقسام",
    shopByCategory: "تسوق حسب الفئة",
    featuredProducts: "منتجات مميزة",
    explore: "استكشف المجموعات",
    customerReviews: "آراء عملائنا",
    free: "مجاني",
    freeShipping: "شحن مجاني للطلبات فوق ٥٠٠ جنيه",
    away: "متبقي",
    subtotal: "الإجمالي الفرعي",
    proceedToCheckout: "إتمام الشراء",
    viewFullCart: "عرض السلة كاملة",
    cartEmpty: "سلتك فارغة",
    cartEmptyHint: "أضف بعض المنتجات الطبيعية!",
    browseProducts: "تصفح المنتجات",
  },
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
