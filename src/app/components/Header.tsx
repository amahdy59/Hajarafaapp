import { useState, useEffect, useMemo, useRef } from "react";
import { Search, ShoppingBag, Heart, Menu, X, Languages, Sun, Moon, History, TrendingUp, ArrowUpRight, MapPin, ChevronDown, Check, Mic, Sparkles, Award } from "lucide-react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings, CURRENCIES, Currency } from "../context/AppSettingsContext";
import { useLoyalty } from "../context/LoyaltyContext";
import { SettingsDrawer } from "./SettingsDrawer";
import { IconButton } from "./ui/IconButton";
import { CategoryIcon } from "./ui/CategoryIcon";
import { motion, AnimatePresence } from "motion/react";
import { categories } from "../data/categories";
import { products } from "../data/products";
import logoImg from "../../assets/logo.webp";
import { toast } from "sonner";

export function Header() {
  const { totalItems, totalPrice, setCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, setTheme, locale, setLocale, formatPrice, formatNumber, currency, setCurrency, currencyInfo, setQuizOpen, t, isRTL } = useAppSettings();
  const { points, setLoyaltyModalOpen } = useLoyalty();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const scopeDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedCategoryScope, setSelectedCategoryScope] = useState<string>("all");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchOpen(false);
    setDesktopSearchOpen(false);
    setScopeDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("hajarafa.recent_searches");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setRecentSearches(parsed.slice(0, 5));
      }
    } catch (e) {
      console.error("Failed to parse recent searches", e);
    }
  }, [searchOpen, desktopSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(target)) {
        setDesktopSearchOpen(false);
      }
      if (scopeDropdownRef.current && !scopeDropdownRef.current.contains(target)) {
        setScopeDropdownOpen(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(target)) {
        setCurrencyDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDesktopSearchOpen(false);
        setScopeDropdownOpen(false);
        setCurrencyDropdownOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleVoiceSearch = () => {
    interface SpeechRecognitionResultItem {
      transcript: string;
    }

    interface SpeechRecognitionResultList {
      [index: number]: {
        [index: number]: SpeechRecognitionResultItem;
      };
    }

    interface SpeechRecognitionEventLike {
      results?: SpeechRecognitionResultList;
    }

    interface SpeechRecognitionErrorEventLike {
      error?: string;
    }

    interface ISpeechRecognition {
      lang: string;
      interimResults: boolean;
      maxAlternatives: number;
      onstart: (() => void) | null;
      onresult: ((event: SpeechRecognitionEventLike) => void) | null;
      onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
      onend: (() => void) | null;
      start: () => void;
      stop: () => void;
    }

    type SpeechRecognitionConstructor = new () => ISpeechRecognition;

    interface WindowWithSpeech {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    }

    const speechWindow = window as unknown as WindowWithSpeech;
    const SpeechRecognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.info(
        locale === "ar"
          ? "البحث الصوتي غير مدعوم في متصفحك الحالي. يرجى تجربة Chrome أو Edge."
          : "Voice search is not supported in this browser. Please use Chrome or Edge."
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = locale === "ar" ? "ar-EG" : "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setSearchQuery(transcript);
          setDesktopSearchOpen(true);
          executeSearch(transcript, false);
          toast.success(
            locale === "ar"
              ? `تم التعرف على الصوت: "${transcript}"`
              : `Recognized voice: "${transcript}"`
          );
        }
      };

      recognition.onerror = (e: SpeechRecognitionErrorEventLike) => {
        setIsListening(false);
        if (e.error !== "no-speech") {
          toast.error(
            locale === "ar"
              ? "تعذر سماع الصوت، تأكد من إذن الميكروفون وحاول مجدداً."
              : "Could not capture voice. Check microphone permissions and try again."
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trendingSearches = locale === "ar"
    ? ["عسل سدر", "زيت عنبر", "قهوة محوجة", "بخور صندل", "شاي أخضر"]
    : ["Sidr Honey", "Amber Oil", "Cardamom Coffee", "Sandalwood Incense", "Green Tea"];

  const queryClean = searchQuery.trim().toLowerCase();

  const matchedProducts = useMemo(() => {
    if (!queryClean) return [];
    return products
      .filter(p => {
        const matchesScope = selectedCategoryScope === "all" || p.categorySlug === selectedCategoryScope;
        if (!matchesScope) return false;
        const nameEn = p.name.toLowerCase();
        const nameAr = (p.nameAr || "").toLowerCase();
        const descEn = (p.description || "").toLowerCase();
        const cat = p.categorySlug.toLowerCase();
        return nameEn.includes(queryClean) || nameAr.includes(queryClean) || descEn.includes(queryClean) || cat.includes(queryClean);
      })
      .slice(0, 6);
  }, [queryClean, selectedCategoryScope]);

  const executeSearch = (rawQuery: string, redirect = true) => {
    const q = rawQuery.trim();
    if (!q) return;
    try {
      const existing = recentSearches.filter(s => s.toLowerCase() !== q.toLowerCase());
      const updated = [q, ...existing].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("hajarafa.recent_searches", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save recent search", e);
    }
    if (redirect) {
      const catParam = selectedCategoryScope !== "all" ? `&category=${selectedCategoryScope}` : "";
      navigate(`/products?q=${encodeURIComponent(q)}${catParam}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("hajarafa.recent_searches");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchQuery);
  };

  return (
    <>
      <SettingsDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <header
        className={`fixed top-0 inset-x-0 z-40 bg-background/95 transition-shadow safe-area-pt border-b ${
          scrolled ? "shadow-soft border-border" : "border-border/60"
        }`}
      >
        <div className="relative h-16 sm:h-[72px] px-3 sm:px-6 max-w-[1280px] mx-auto flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          {/* Start: Hamburger (on < lg) + Brand Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0 z-10">
            <div className="lg:hidden -ms-1">
              <IconButton onClick={() => setMenuOpen(true)} aria-label={t.menu}>
                <Menu size={20} />
              </IconButton>
            </div>

            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 select-none no-underline flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta rounded-lg"
            >
              <img
                src={logoImg}
                alt={isRTL ? "شعار حاج عرفة" : "Haj Arafa Logo"}
                width={140}
                height={48}
                decoding="async"
                className="h-9 sm:h-11 md:h-12 w-auto max-w-[115px] sm:max-w-[135px] md:max-w-[150px] object-contain select-none"
              />
              <div className="hidden xl:flex items-center">
                <span className="text-xs text-brand-ink-soft dark:text-zinc-300 font-medium border-s border-border/80 ps-3.5 ms-1 leading-tight select-none">
                  {isRTL ? "العطارة والأغذية الطبيعية منذ 1968" : "Natural Apothecary Since 1968"}
                </span>
              </div>
            </Link>
          </div>

          {/* Prominent Desktop Search Bar with Category Scopes */}
          <div className="hidden lg:flex flex-1 max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-2 xl:mx-4 relative z-20" ref={desktopSearchRef}>
            <form onSubmit={submit} className="relative w-full flex items-center">
              <div className="relative w-full flex items-center rounded-2xl bg-card border border-border/80 focus-within:border-brand-terracotta focus-within:ring-4 focus-within:ring-brand-terracotta/15 shadow-sm hover:shadow-soft transition-all h-11">
                {/* Themed Department Scope Selector Dropdown */}
                <div className="relative h-full flex-shrink-0" ref={scopeDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setScopeDropdownOpen(prev => !prev)}
                    aria-expanded={scopeDropdownOpen}
                    aria-haspopup="listbox"
                    aria-label={isRTL ? "تحديد القسم" : "Select Category"}
                    className="h-full px-3.5 bg-brand-peach/30 hover:bg-brand-peach/50 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 text-foreground text-xs font-semibold flex items-center gap-1.5 border-e border-border/80 cursor-pointer transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta rounded-s-2xl"
                  >
                    <span className="truncate max-w-[100px] xl:max-w-[120px]">
                      {selectedCategoryScope === "all"
                        ? (isRTL ? "جميع الأقسام" : "All Departments")
                        : (categories.find(c => c.slug === selectedCategoryScope)?.nameAr && isRTL
                            ? categories.find(c => c.slug === selectedCategoryScope)!.nameAr
                            : categories.find(c => c.slug === selectedCategoryScope)?.name || selectedCategoryScope)}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-muted-foreground transition-transform duration-200 ${scopeDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {scopeDropdownOpen && (
                      <motion.div
                        role="listbox"
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full mt-1.5 start-0 w-56 bg-card/98 backdrop-blur-xl border border-border/80 rounded-2xl shadow-elev p-1.5 z-50 text-xs"
                      >
                        <button
                          type="button"
                          role="option"
                          aria-selected={selectedCategoryScope === "all"}
                          onClick={() => {
                            setSelectedCategoryScope("all");
                            setScopeDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-start font-semibold transition-colors cursor-pointer ${
                            selectedCategoryScope === "all"
                              ? "bg-brand-terracotta text-white shadow-sm"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <CategoryIcon slug="all" size={14} className={selectedCategoryScope === "all" ? "text-white" : "text-brand-terracotta"} />
                            <span>{isRTL ? "جميع الأقسام" : "All Departments"}</span>
                          </span>
                          {selectedCategoryScope === "all" && <Check size={14} />}
                        </button>

                        <div className="my-1 border-t border-border/60" />

                        <div className="max-h-60 overflow-y-auto space-y-0.5">
                          {categories.map((c) => {
                            const active = selectedCategoryScope === c.slug;
                            const name = isRTL && c.nameAr ? c.nameAr : c.name;
                            return (
                              <button
                                key={c.id}
                                type="button"
                                role="option"
                                aria-selected={active}
                                onClick={() => {
                                  setSelectedCategoryScope(c.slug);
                                  setScopeDropdownOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-start font-semibold transition-colors cursor-pointer ${
                                  active
                                    ? "bg-brand-terracotta text-white shadow-sm"
                                    : "text-foreground hover:bg-muted"
                                }`}
                              >
                                <span className="flex items-center gap-2 truncate">
                                  <CategoryIcon
                                    slug={c.slug}
                                    fallbackEmoji={c.icon}
                                    size={14}
                                    className={active ? "text-white" : "text-brand-terracotta flex-shrink-0"}
                                  />
                                  <span className="truncate">{name}</span>
                                </span>
                                {active && <Check size={14} className="flex-shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <label htmlFor="desktop-header-search" className="sr-only">
                  {t.searchPlaceholder}
                </label>
                <input
                  id="desktop-header-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setDesktopSearchOpen(true);
                  }}
                  onFocus={() => setDesktopSearchOpen(true)}
                  placeholder={isRTL ? "ابحث عن عسل، قهوة، بهارات، زيوت طبيعية..." : "Search honey, coffee, spices, natural oils..."}
                  className="flex-1 min-w-0 h-full px-3.5 bg-transparent text-foreground placeholder:text-muted-foreground text-xs font-medium outline-none"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label={isRTL ? "مسح البحث" : "Clear search"}
                    className="p-1 me-1 text-muted-foreground hover:text-foreground rounded-full cursor-pointer transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  aria-label={
                    isListening
                      ? (isRTL ? "جاري الاستماع لصوتك..." : "Listening to your voice...")
                      : (isRTL ? "البحث الصوتي باللهجة المصرية والعربية" : "Voice search in Arabic or English")
                  }
                  className={`p-1.5 me-1.5 rounded-full cursor-pointer transition-all flex items-center justify-center min-h-[32px] min-w-[32px] ${
                    isListening
                      ? "text-red-600 bg-red-100 dark:bg-red-950/60 animate-pulse ring-2 ring-red-400"
                      : "text-muted-foreground hover:text-brand-terracotta hover:bg-muted"
                  }`}
                >
                  <Mic size={16} />
                </button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="h-full px-4 bg-brand-terracotta hover:bg-brand-terracotta-dark text-white flex items-center justify-center transition-colors cursor-pointer rounded-e-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta"
                  aria-label={t.search}
                >
                  <Search size={16} />
                </motion.button>
              </div>
            </form>

            {/* Desktop Autocomplete Preview Dropdown */}
            <AnimatePresence>
              {desktopSearchOpen && (queryClean || recentSearches.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full mt-2 inset-x-0 bg-card/98 backdrop-blur-xl border border-border/80 rounded-2xl shadow-elev p-3 z-50 max-h-[420px] overflow-y-auto"
                >
                  {queryClean ? (
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/60 px-1">
                        <span className="text-[11px] font-bold text-muted-foreground uppercase">
                          {isRTL ? "المنتجات المطابقة" : "Matching Products"}
                        </span>
                        <span className="text-[11px] text-brand-terracotta font-semibold">
                          {matchedProducts.length} {isRTL ? "نتائج" : "results"}
                        </span>
                      </div>

                      {matchedProducts.length > 0 ? (
                        <div className="space-y-1">
                          {matchedProducts.map((p) => (
                            <Link
                              key={p.id}
                              to={`/products/${p.id}`}
                              onClick={() => {
                                executeSearch(locale === "ar" && p.nameAr ? p.nameAr : p.name, false);
                                setDesktopSearchOpen(false);
                              }}
                              className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/70 transition-colors group text-foreground no-underline"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <img
                                  src={p.image}
                                  alt={isRTL && p.nameAr ? p.nameAr : p.name}
                                  width={44}
                                  height={44}
                                  decoding="async"
                                  className="w-11 h-11 rounded-lg object-contain bg-brand-peach/30 p-1 flex-shrink-0"
                                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = logoImg; }}
                                />
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-foreground group-hover:text-brand-terracotta transition-colors truncate">
                                    {locale === "ar" && p.nameAr ? p.nameAr : p.name}
                                  </p>
                                  <p className="text-[10.5px] text-muted-foreground">
                                    {p.weight || p.category}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end flex-shrink-0 ms-2">
                                <span className="text-xs font-bold text-brand-terracotta">
                                  {formatPrice(p.price)}
                                </span>
                                <span className="text-[9.5px] text-brand-forest dark:text-brand-sage font-medium">
                                  {isRTL ? "متوفر" : "In Stock"}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-muted-foreground text-xs">
                          {isRTL ? "لا توجد منتجات مطابقة" : "No products found"}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      {recentSearches.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between pb-1.5 mb-1 px-1">
                            <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1.5">
                              <History size={12} /> {t.recentSearches}
                            </span>
                            <button
                              type="button"
                              onClick={clearRecentSearches}
                              className="text-[10px] text-brand-terracotta hover:underline font-semibold cursor-pointer"
                            >
                              {isRTL ? "مسح" : "Clear"}
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {recentSearches.map((s, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  executeSearch(s);
                                  setDesktopSearchOpen(false);
                                }}
                                className="px-2.5 py-1 bg-muted hover:bg-brand-peach/60 rounded-lg text-xs text-foreground transition-colors cursor-pointer"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1.5 px-1 mb-1.5">
                          <TrendingUp size={12} /> {isRTL ? "الأكثر بحثاً" : "Trending Searches"}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {trendingSearches.map((term, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                executeSearch(term);
                                setDesktopSearchOpen(false);
                              }}
                              className="px-2.5 py-1 bg-brand-peach/40 dark:bg-zinc-800 hover:bg-brand-peach text-brand-terracotta rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* End Utility Items */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 justify-end z-10 -me-1 sm:-me-0">
            {/* Loyalty Points Pill (Desktop >= lg) */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setLoyaltyModalOpen(true)}
              aria-label={isRTL ? `رصيد نقاط عرفة: ${formatNumber(points)} نقطة` : `Haj Arafa Points: ${formatNumber(points)}`}
              className="hidden lg:inline-flex items-center gap-1.5 h-11 min-h-[44px] px-3 rounded-full bg-gradient-to-r from-amber-500/10 to-brand-moss/10 dark:from-amber-400/10 dark:to-brand-moss/20 border border-amber-500/30 hover:border-amber-500/60 text-foreground transition-all cursor-pointer select-none text-xs font-bold"
            >
              <Award size={15} className="text-amber-500 flex-shrink-0" />
              <span className="text-brand-moss dark:text-amber-400 font-extrabold">{formatNumber(points)}</span>
              <span className="text-[11px] text-muted-foreground font-medium">{isRTL ? "نقطة" : "pts"}</span>
            </motion.button>

            {/* GCC Multi-Currency Dropdown (Tablet & Desktop >= md) */}
            <div className="relative hidden md:block" ref={currencyDropdownRef}>
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(prev => !prev)}
                aria-expanded={currencyDropdownOpen}
                aria-haspopup="listbox"
                aria-label={isRTL ? "تغيير العملة والدولة" : "Change currency & region"}
                className="h-11 min-h-[44px] px-2.5 rounded-full flex items-center gap-1.5 text-foreground hover:bg-muted text-xs font-bold transition-colors cursor-pointer border border-border/70"
              >
                <span className="text-sm">{currencyInfo.flag}</span>
                <span className="text-[11px] tracking-wide">{currency}</span>
                <ChevronDown size={12} className={`text-muted-foreground transition-transform ${currencyDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {currencyDropdownOpen && (
                  <motion.div
                    role="listbox"
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 end-0 bg-card border border-border rounded-2xl shadow-elev p-1.5 z-50 min-w-[170px]"
                  >
                    {(Object.keys(CURRENCIES) as Currency[]).map(curKey => {
                      const cur = CURRENCIES[curKey];
                      const isCurActive = curKey === currency;
                      return (
                        <button
                          key={curKey}
                          type="button"
                          role="option"
                          aria-selected={isCurActive}
                          onClick={() => {
                            setCurrency(curKey);
                            setCurrencyDropdownOpen(false);
                            toast.success(
                              isRTL
                                ? `تم التحويل إلى ${cur.countryNameAr} (${cur.symbolAr})`
                                : `Currency switched to ${cur.countryNameEn} (${cur.symbolEn})`
                            );
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-start ${
                            isCurActive ? "bg-brand-moss text-white shadow-sm" : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{cur.flag}</span>
                            <span>{isRTL ? cur.countryNameAr : cur.countryNameEn}</span>
                            <span className={`text-[10px] ${isCurActive ? "text-white/80" : "text-muted-foreground"}`}>
                              ({curKey})
                            </span>
                          </span>
                          {isCurActive && <Check size={14} className="flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Branches Link */}
            <Link
              to="/branches"
              className="hidden xl:inline-flex items-center gap-1.5 h-11 px-3.5 text-xs font-semibold text-brand-ink-soft hover:text-brand-terracotta rounded-xl border border-border/60 hover:border-brand-terracotta hover:bg-muted/80 transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta"
            >
              <MapPin size={15} />
              <span>{isRTL ? "فروعنا" : "Branches"}</span>
            </Link>

            {/* Desktop Language & Theme Toggles */}
            <div className="hidden lg:flex items-center gap-1 border-e border-border/80 pe-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLocale(locale === "en" ? "ar" : "en")}
                aria-label={t.language}
                className="h-11 px-2.5 rounded-full flex items-center gap-1.5 text-brand-ink-soft hover:bg-muted text-xs font-bold transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta cursor-pointer"
              >
                <Languages size={17} />
                <span className="text-[10px] font-bold text-brand-terracotta bg-brand-peach/40 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md">
                  {locale === "ar" ? "EN" : "عربي"}
                </span>
              </motion.button>
              
              <IconButton
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label={t.theme}
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-center"
                >
                  {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </motion.div>
              </IconButton>
            </div>

            {/* Mobile Search Button (< lg) */}
            <div className="lg:hidden">
              <IconButton onClick={() => setSearchOpen(true)} aria-label={t.searchPlaceholder}>
                <Search size={19} />
              </IconButton>
            </div>

            {/* Wishlist Button (viewports >= 360px; accessible in Drawer on <360px) */}
            <div className="hidden min-[360px]:block">
              <IconButton
                onClick={() => {
                  if (location.pathname === "/account" && searchParams.get("tab") === "wishlist") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    navigate("/account?tab=wishlist");
                  }
                }}
                aria-label={t.favourites}
                badge={wishlistItems.length}
              >
                <Heart size={19} />
              </IconButton>
            </div>

            {/* Cart Button: Full Price Pill on Desktop, Icon on Mobile */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setCartOpen(true)}
              className="hidden sm:inline-flex items-center gap-2.5 h-11 px-4 rounded-xl bg-brand-terracotta hover:bg-brand-terracotta-dark text-white transition-all shadow-sm cursor-pointer select-none font-semibold text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
              aria-label={t.cart}
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag size={17} />
                <AnimatePresence mode="wait">
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="absolute -top-2 -end-2 bg-white text-brand-terracotta text-[9.5px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm"
                    >
                      {totalItems > 99 ? "99+" : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="font-bold tracking-tight">
                {formatPrice(totalPrice)}
              </span>
            </motion.button>
            <div className="sm:hidden">
              <IconButton onClick={() => setCartOpen(true)} aria-label={t.cart} badge={totalItems}>
                <ShoppingBag size={19} />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Desktop & Tablet Category Navigation Rail (Permanent across storefront on sm/md/lg/xl) */}
        <div className="hidden sm:block relative z-10 border-t border-border/80 bg-background/95 backdrop-blur-md">
          <div className="max-w-[1280px] mx-auto px-3 sm:px-6">
            <div className="flex items-center justify-between h-12 py-1">
              {/* Category Scrollable Track Wrapper with Scoped Edge Fades */}
              <div className="relative flex-1 min-w-0 flex items-center overflow-hidden">
                {/* Scoped Start Edge Fade */}
                <div 
                  className="absolute top-0 bottom-0 start-0 w-4 sm:w-6 z-10 pointer-events-none" 
                  style={{ background: `linear-gradient(to ${isRTL ? "left" : "right"}, var(--color-background), transparent)` }} 
                />
                {/* Scoped End Edge Fade (inside track, before divider) */}
                <div 
                  className="absolute top-0 bottom-0 end-0 w-6 sm:w-8 z-10 pointer-events-none" 
                  style={{ background: `linear-gradient(to ${isRTL ? "right" : "left"}, var(--color-background), transparent)` }} 
                />

                <nav 
                  aria-label={isRTL ? "أقسام المتجر السريعة" : "Store quick categories"}
                  className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide py-1 px-1 pe-6 sm:pe-8 scroll-smooth"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {/* All Products Pill */}
                  <Link
                    to="/products"
                    className={`group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 select-none flex-shrink-0 cursor-pointer min-h-[34px] sm:min-h-[36px] ${
                      location.pathname === "/products" && !searchParams.get("category")
                        ? "bg-brand-terracotta text-white border border-brand-terracotta shadow-soft font-bold active:scale-[0.97]"
                        : "bg-card dark:bg-zinc-800/90 text-foreground/90 hover:text-brand-terracotta border border-border/80 dark:border-zinc-700/80 hover:border-brand-terracotta/40 hover:bg-brand-peach/30 dark:hover:bg-zinc-700/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-soft active:scale-[0.97]"
                    }`}
                  >
                    <CategoryIcon
                      slug="all"
                      size={14}
                      className={`transition-transform group-hover:scale-110 ${
                        location.pathname === "/products" && !searchParams.get("category")
                          ? "text-white"
                          : "text-brand-terracotta dark:text-brand-terracotta"
                      }`}
                    />
                    <span className="whitespace-nowrap">{isRTL ? "جميع المنتجات" : "All Products"}</span>
                  </Link>

                  {categories.map(cat => {
                    const catName = isRTL && cat.nameAr ? cat.nameAr : cat.name;
                    const active = location.pathname === `/category/${cat.slug}` ||
                                   (location.pathname === "/products" && searchParams.get("category") === cat.slug);
                    return (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        className={`group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 select-none flex-shrink-0 cursor-pointer min-h-[34px] sm:min-h-[36px] ${
                          active
                            ? "bg-brand-terracotta text-white border border-brand-terracotta shadow-soft font-bold active:scale-[0.97]"
                            : "bg-card dark:bg-zinc-800/90 text-foreground/90 hover:text-brand-terracotta border border-border/80 dark:border-zinc-700/80 hover:border-brand-terracotta/40 hover:bg-brand-peach/30 dark:hover:bg-zinc-700/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-soft active:scale-[0.97]"
                        }`}
                      >
                        <CategoryIcon
                          slug={cat.slug}
                          fallbackEmoji={cat.icon}
                          size={14}
                          className={`transition-transform group-hover:scale-110 ${
                            active ? "text-white" : "text-brand-terracotta dark:text-brand-terracotta"
                          }`}
                        />
                        <span className="whitespace-nowrap">{catName}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Desktop Quick Nav Links on the End */}
              <div className="hidden lg:flex items-center gap-3 xl:gap-4 text-xs font-semibold text-brand-ink-soft ps-3.5 xl:ps-4.5 ms-2 border-s border-border/70 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setQuizOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-moss/10 hover:bg-brand-moss/20 text-brand-moss dark:text-brand-sage font-bold cursor-pointer transition-all duration-200 border border-brand-moss/30 hover:border-brand-moss/50 shadow-sm active:scale-95 flex-shrink-0 min-h-[34px] sm:min-h-[36px]"
                >
                  <Sparkles size={13} className="text-amber-500 animate-pulse" />
                  <span className="whitespace-nowrap">{isRTL ? "مستشارك العشبي" : "Apothecary Quiz"}</span>
                </button>
                <Link to="/about" className="hover:text-brand-terracotta transition-colors py-1 flex-shrink-0">
                  {isRTL ? "عن حاج عرفة" : "About Us"}
                </Link>
                <Link to="/contact" className="hover:text-brand-terracotta transition-colors py-1 flex-shrink-0">
                  {isRTL ? "تواصل معنا" : "Contact"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-40"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t.search}
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 inset-x-0 z-50 bg-background/98 backdrop-blur-2xl safe-area-pt shadow-elev border-b border-border/80"
            >
              <form onSubmit={submit} className="px-4 sm:px-6 py-3 flex items-center gap-2 max-w-[1280px] mx-auto">
                <div className="relative flex-1 flex items-center bg-card rounded-2xl border border-border/80 focus-within:border-brand-terracotta focus-within:ring-4 focus-within:ring-brand-terracotta/15 h-12 shadow-sm transition-all">
                  <Search size={18} className="absolute start-4 text-muted-foreground pointer-events-none" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full ps-11 pe-4 py-2.5 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    aria-label={
                      isListening
                        ? (isRTL ? "جاري الاستماع لصوتك..." : "Listening to your voice...")
                        : (isRTL ? "البحث الصوتي باللهجة المصرية والعربية" : "Voice search in Arabic or English")
                    }
                    className={`me-2 p-2 rounded-full cursor-pointer transition-all flex items-center justify-center min-h-[36px] min-w-[36px] ${
                      isListening
                        ? "text-red-600 bg-red-100 dark:bg-red-950/60 animate-pulse ring-2 ring-red-400"
                        : "text-muted-foreground hover:text-brand-terracotta"
                    }`}
                  >
                    <Mic size={18} />
                  </button>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      aria-label={isRTL ? "مسح النص" : "Clear input"}
                      className="me-3 p-1.5 rounded-full text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
                <IconButton type="button" onClick={() => setSearchOpen(false)} aria-label={isRTL ? "إغلاق البحث" : "Close search"}>
                  <X size={20} />
                </IconButton>
              </form>

              {/* Category Scope Chips */}
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-2 border-b border-border/50 overflow-x-auto scrollbar-hide flex gap-1.5 items-center">
                <span className="text-[11px] text-muted-foreground font-semibold pe-1 flex-shrink-0">
                  {isRTL ? "في قسم:" : "In:"}
                </span>
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  type="button"
                  onClick={() => setSelectedCategoryScope("all")}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 flex items-center gap-1.5 cursor-pointer border ${
                    selectedCategoryScope === "all"
                      ? "bg-brand-terracotta text-white border-brand-terracotta shadow-sm font-bold"
                      : "bg-card dark:bg-zinc-800 text-muted-foreground hover:text-foreground border-border/80 hover:border-brand-terracotta/40"
                  }`}
                >
                  <CategoryIcon slug="all" size={13} className={selectedCategoryScope === "all" ? "text-white" : "text-brand-terracotta"} />
                  <span>{isRTL ? "الكل" : "All"}</span>
                </motion.button>
                {categories.map(cat => {
                  const active = selectedCategoryScope === cat.slug;
                  const name = isRTL && cat.nameAr ? cat.nameAr : cat.name;
                  return (
                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategoryScope(cat.slug)}
                      className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex-shrink-0 flex items-center gap-1.5 cursor-pointer border ${
                        active
                          ? "bg-brand-terracotta text-white border-brand-terracotta shadow-sm font-bold"
                          : "bg-card dark:bg-zinc-800 text-muted-foreground hover:text-foreground border-border/80 hover:border-brand-terracotta/40"
                      }`}
                    >
                      <CategoryIcon
                        slug={cat.slug}
                        fallbackEmoji={cat.icon}
                        size={13}
                        className={active ? "text-white" : "text-brand-terracotta"}
                      />
                      <span>{name}</span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-4 pt-1 max-h-[70vh] overflow-y-auto">
                {queryClean ? (
                  <div>
                    {matchedProducts.length > 0 ? (
                      <div className="flex flex-col divide-y divide-border">
                        <div className="py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {locale === "ar" ? "المنتجات المطابقة" : "Matching Products"}
                        </div>
                        {matchedProducts.map((p) => (
                          <Link
                            key={p.id}
                            to={`/products/${p.id}`}
                            onClick={() => {
                              executeSearch(locale === "ar" && p.nameAr ? p.nameAr : p.name, false);
                              setSearchOpen(false);
                            }}
                            className="flex items-center gap-3.5 py-2.5 px-2 hover:bg-muted/60 rounded-xl transition-colors group"
                          >
                            <img
                              src={p.image}
                              alt={isRTL && p.nameAr ? p.nameAr : p.name}
                              width={48}
                              height={48}
                              decoding="async"
                              className="w-12 h-12 rounded-lg object-cover bg-brand-peach/30 flex-shrink-0"
                              onError={(e) => { (e.currentTarget as HTMLImageElement).src = logoImg; }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate group-hover:text-brand-terracotta transition-colors">
                                {isRTL && p.nameAr ? p.nameAr : p.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {p.weight || p.category}
                              </p>
                            </div>
                            <div className="flex flex-col items-end flex-shrink-0">
                              <span className="text-sm font-bold text-brand-terracotta">
                                {formatPrice(p.price)}
                              </span>
                              <span className="text-[10px] text-brand-forest dark:text-brand-sage font-medium">
                                {isRTL ? "متوفر" : "In Stock"}
                              </span>
                            </div>
                          </Link>
                        ))}
                        <button
                          type="button"
                          onClick={() => executeSearch(searchQuery)}
                          className="w-full text-center py-3 text-xs font-semibold text-brand-terracotta hover:underline mt-2 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>{locale === "ar" ? `عرض كل النتائج لـ "${searchQuery}"` : `View all results for "${searchQuery}"`}</span>
                          <ArrowUpRight size={14} className="rtl-flip" />
                        </button>
                      </div>
                    ) : (
                      <div className="py-8 text-center text-muted-foreground text-sm">
                        {t.noResultsFound}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 py-2">
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                            <History size={13} />
                            {t.recentSearches}
                          </span>
                          <button
                            type="button"
                            onClick={clearRecentSearches}
                            className="text-[11px] text-muted-foreground hover:text-foreground font-medium cursor-pointer"
                          >
                            {t.clearRecent}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {recentSearches.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => executeSearch(s)}
                              className="px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-foreground text-xs font-medium transition-colors cursor-pointer"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-muted-foreground">
                        <TrendingUp size={13} className="text-brand-terracotta" />
                        {t.trendingSearches}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {trendingSearches.map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => executeSearch(term)}
                            className="px-3 py-1.5 rounded-full bg-brand-peach/40 hover:bg-brand-peach/70 text-foreground text-xs font-medium border border-brand-terracotta/20 transition-colors cursor-pointer"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
