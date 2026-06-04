import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type Locale = "en" | "ar";

const dict = {
  en: {
    appName: "HajArafa",
    appTagline: "Natural Boutique",
    deliverTo: "Deliver to",
    location: "Cairo, Egypt",
    searchPlaceholder: "Search HajArafa",
    home: "Home",
    favourites: "Favourites",
    cart: "Cart",
    shoppingCart: "Shopping Cart",
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
    helpSettings: "Help & Settings",
    yourAccount: "My Account",
    yourOrders: "My Orders",
    yourWishlist: "Wishlist",
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
    browseDepartments: "Browse Departments",
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
    item: "item",
    items: "items",
    addMoreForFreeShipping: "Add {amount} more for free shipping",
    couponCode: "Coupon code",
    apply: "Apply",
    remove: "Remove",
    discount: "Discount",
    shipping: "Shipping",
    tax: "Tax",
    total: "Total",
    secureCheckout: "Secure Checkout",
    secureCheckoutNote: "🔒 Secure checkout",
    returnsNote: "30-day returns",
    shippingInfo: "Shipping Information",
    paymentDetails: "Payment Details",
    orderSummary: "Order Summary",
    continueToPay: "Continue to Payment",
    placeOrder: "Place Order",
    orderConfirmed: "Order Confirmed!",
    orderConfirmedNote: "Thank you for your order. A confirmation has been sent to your email.",
    continueShopping: "Continue Shopping",
    trackOrder: "Track My Order",
    back: "Back",
    orderNumber: "Order number",
    estimatedDelivery: "Estimated delivery",
    totalPaid: "Total paid",
    businessDays: "3–5 business days",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    address: "Street Address",
    city: "City",
    state: "State",
    zip: "ZIP Code",
    country: "Country",
    cardNumber: "Card Number",
    cardName: "Cardholder Name",
    expiry: "Expiry Date",
    cvv: "CVV",
    paymentSecureNote: "Your payment information is encrypted and secure",
    youMightAlsoLike: "You Might Also Like",
    wishlist: "Wishlist",
    wishlistEmpty: "Your wishlist is empty",
    wishlistEmptyHint: "Save products you love for later.",
    shopByConcern: "Shop by Concern",
    herbalEssentials: "Herbal Essentials",
    heritage: "Our Heritage",
    heritageDesc: "Rooted in centuries of Egyptian herbal traditions.",
    heroHeadline: "Natural Wellness",
    heroSubline: "Ancient Egyptian herbal wisdom for your daily life.",
    freeDelivery: "Free Delivery",
    freeDeliveryNote: "On all orders over",
    tryCode: "Try: NATURE10 for 10% off",
    coffeeLovers: "For Coffee Lovers",
    nutsSeeds: "Nuts & Seeds",
    naturalCosmetics: "Natural Cosmetics",
    immunity: "Immunity",
    energy: "Energy",
    skinCare: "Skin Care",
    relaxation: "Relaxation",
    digestion: "Digestion",
  },
  ar: {
    appName: "حاج عارفة",
    appTagline: "بوتيك طبيعي",
    deliverTo: "التوصيل إلى",
    location: "القاهرة، مصر",
    searchPlaceholder: "ابحث في حاج عارفة",
    home: "الرئيسية",
    favourites: "المفضلة",
    cart: "السلة",
    shoppingCart: "سلة التسوق",
    menu: "القائمة",
    account: "حسابي",
    settings: "الإعدادات",
    theme: "المظهر",
    language: "اللغة",
    light: "فاتح",
    dark: "داكن",
    english: "English",
    arabic: "العربية",
    foods: "مأكولات",
    nonFood: "غير غذائي",
    trending: "الأكثر رواجاً",
    todaysDeals: "عروض اليوم",
    newArrivals: "وصل حديثاً",
    bestSellers: "الأكثر مبيعاً",
    helpSettings: "المساعدة والإعدادات",
    yourAccount: "حسابي",
    yourOrders: "طلباتي",
    yourWishlist: "المفضلة",
    customerService: "خدمة العملاء",
    aboutUs: "عن حاج عارفة",
    branches: "فروعنا",
    contactUs: "تواصل معنا",
    signIn: "تسجيل الدخول",
    welcomeTo: "أهلاً بك في",
    shopAll: "جميع المنتجات",
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
    freeShipping: "شحن مجاني للطلبات فوق ٥٠٠ ج.م",
    away: "للشحن المجاني",
    subtotal: "الإجمالي",
    proceedToCheckout: "إتمام الشراء",
    viewFullCart: "عرض السلة",
    cartEmpty: "سلتك فارغة",
    cartEmptyHint: "أضف بعض المنتجات الطبيعية!",
    browseProducts: "تصفح المنتجات",
    item: "منتج",
    items: "منتجات",
    addMoreForFreeShipping: "أضف {amount} للشحن المجاني",
    couponCode: "كود الخصم",
    apply: "تطبيق",
    remove: "إزالة",
    discount: "خصم",
    shipping: "الشحن",
    tax: "الضريبة",
    total: "الإجمالي الكلي",
    secureCheckout: "دفع آمن",
    secureCheckoutNote: "🔒 دفع آمن ومشفر",
    returnsNote: "إرجاع خلال ٣٠ يوماً",
    shippingInfo: "معلومات الشحن",
    paymentDetails: "تفاصيل الدفع",
    orderSummary: "ملخص الطلب",
    continueToPay: "المتابعة للدفع",
    placeOrder: "تأكيد الطلب",
    orderConfirmed: "تم تأكيد الطلب!",
    orderConfirmedNote: "شكراً لطلبك. تم إرسال تأكيد الطلب إلى بريدك الإلكتروني.",
    continueShopping: "مواصلة التسوق",
    trackOrder: "تتبع طلبي",
    back: "رجوع",
    orderNumber: "رقم الطلب",
    estimatedDelivery: "التوصيل المتوقع",
    totalPaid: "المبلغ المدفوع",
    businessDays: "٣–٥ أيام عمل",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    address: "العنوان",
    city: "المدينة",
    state: "المحافظة",
    zip: "الرمز البريدي",
    country: "الدولة",
    cardNumber: "رقم البطاقة",
    cardName: "اسم حامل البطاقة",
    expiry: "تاريخ الانتهاء",
    cvv: "CVV",
    paymentSecureNote: "معلومات الدفع مشفرة وآمنة",
    youMightAlsoLike: "قد يعجبك أيضاً",
    wishlist: "المفضلة",
    wishlistEmpty: "قائمتك المفضلة فارغة",
    wishlistEmptyHint: "احفظ المنتجات التي تحبها لوقت لاحق.",
    shopByConcern: "تسوق حسب اهتمامك",
    herbalEssentials: "أساسيات الأعشاب",
    heritage: "تراثنا",
    heritageDesc: "متجذرون في قرون من تقاليد الأعشاب المصرية.",
    heroHeadline: "صحة طبيعية",
    heroSubline: "حكمة الأعشاب المصرية القديمة لحياتك اليومية.",
    freeDelivery: "توصيل مجاني",
    freeDeliveryNote: "على الطلبات فوق",
    tryCode: "جرّب: NATURE10 للحصول على خصم ١٠٪",
    coffeeLovers: "لمحبي القهوة",
    nutsSeeds: "مكسرات وبذور",
    naturalCosmetics: "تجميل طبيعي",
    immunity: "مناعة",
    energy: "طاقة",
    skinCare: "العناية بالبشرة",
    relaxation: "استرخاء",
    digestion: "هضم",
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
