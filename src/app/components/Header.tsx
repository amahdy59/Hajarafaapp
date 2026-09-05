import { useState, useEffect, useMemo } from "react";
import { Search, ShoppingBag, Heart, Menu, X, Languages, Sun, Moon, History, TrendingUp, ArrowUpRight } from "lucide-react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { SettingsDrawer } from "./SettingsDrawer";
import { IconButton } from "./ui/IconButton";
import { motion, AnimatePresence } from "motion/react";
import { categories } from "../data/categories";
import { products } from "../data/products";
import logoImg from "../../assets/logo.webp";

export function Header() {
  const { totalItems, setCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, setTheme, locale, setLocale, formatPrice, t, isRTL } = useAppSettings();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedCategoryScope, setSelectedCategoryScope] = useState<string>("all");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { setSearchOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (searchOpen) {
      try {
        const stored = localStorage.getItem("hajarafa.recent_searches");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) setRecentSearches(parsed.slice(0, 5));
        }
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }
  }, [searchOpen]);

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
        className={`fixed top-0 inset-x-0 z-40 bg-background/90 backdrop-blur-xl transition-shadow safe-area-pt ${
          scrolled ? "shadow-soft border-b border-border" : "border-b border-transparent"
        }`}
      >
        <div className="relative h-16 px-4 sm:px-6 max-w-[1280px] mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center justify-start z-10 -ms-2 sm:-ms-2.5">
            <div className="relative group">
              <IconButton onClick={() => setMenuOpen(true)} aria-label={t.menu}>
                <Menu size={20} />
              </IconButton>
              <span className="absolute top-full mt-1.5 start-0 scale-90 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 transition-all duration-150 ease-out bg-brand-ink/95 dark:bg-zinc-800 text-white dark:text-zinc-100 text-[10px] sm:text-[10.5px] font-medium py-1 px-2.5 rounded-md whitespace-nowrap shadow-elev z-50 border border-white/5">
                {t.menu}
              </span>
            </div>
          </div>

          <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center min-w-0 h-14 select-none cursor-pointer w-fit no-underline z-10">
            <img src={logoImg} alt={isRTL ? "شعار حاج عرفة" : "Haj Arafa Logo"} width={140} height={48} decoding="async" className="h-9 xs:h-12 sm:h-14 w-auto object-contain max-w-[42vw] sm:max-w-[220px] select-none" />
          </Link>

          <div className="flex items-center gap-0.5 justify-end z-10 -me-2 sm:-me-2.5">
            <div className="hidden lg:flex items-center gap-0.5 me-2 border-e border-border pe-2">
              <div className="relative group">
                <IconButton onClick={() => setLocale(locale === "en" ? "ar" : "en")} aria-label={t.language}>
                  <Languages size={19} />
                </IconButton>
                <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 scale-90 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 transition-all duration-150 ease-out bg-brand-ink/95 dark:bg-zinc-800 text-white dark:text-zinc-100 text-[10px] sm:text-[10.5px] font-medium py-1 px-2.5 rounded-md whitespace-nowrap shadow-elev z-50 border border-white/5">
                  {locale === "en" ? "العربية" : "English"}
                </span>
              </div>
              <div className="relative group">
                <IconButton onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={t.theme}>
                  {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
                </IconButton>
                <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 scale-90 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 transition-all duration-150 ease-out bg-brand-ink/95 dark:bg-zinc-800 text-white dark:text-zinc-100 text-[10px] sm:text-[10.5px] font-medium py-1 px-2.5 rounded-md whitespace-nowrap shadow-elev z-50 border border-white/5">
                  {theme === "light" ? (isRTL ? "المظهر الداكن" : "Dark Mode") : (isRTL ? "المظهر الفاتح" : "Light Mode")}
                </span>
              </div>
            </div>

            <div className="relative group">
              <IconButton 
                onClick={() => setSearchOpen(true)} 
                aria-label={t.searchPlaceholder}
              >
                <Search size={19} />
              </IconButton>
              <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 scale-90 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 transition-all duration-150 ease-out bg-brand-ink/95 dark:bg-zinc-800 text-white dark:text-zinc-100 text-[10px] sm:text-[10.5px] font-medium py-1 px-2.5 rounded-md whitespace-nowrap shadow-elev z-50 border border-white/5">
                {t.search}
              </span>
            </div>

            <div className="relative group">
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
                className="flex"
              >
                <Heart size={19} />
              </IconButton>
              <span className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 scale-90 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 transition-all duration-150 ease-out bg-brand-ink/95 dark:bg-zinc-800 text-white dark:text-zinc-100 text-[10px] sm:text-[10.5px] font-medium py-1 px-2.5 rounded-md whitespace-nowrap shadow-elev z-50 border border-white/5">
                {t.favourites}
              </span>
            </div>

            <div className="relative group hidden sm:block">
              <IconButton 
                onClick={() => setCartOpen(true)} 
                aria-label={t.cart} 
                badge={totalItems}
              >
                <ShoppingBag size={19} />
              </IconButton>
              <span className="absolute top-full mt-1.5 end-0 scale-90 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 transition-all duration-150 ease-out bg-brand-ink/95 dark:bg-zinc-800 text-white dark:text-zinc-100 text-[10px] sm:text-[10.5px] font-medium py-1 px-2.5 rounded-md whitespace-nowrap shadow-elev z-50 border border-white/5">
                {t.cart}
              </span>
            </div>
          </div>
        </div>

        {/* Category Navigation Rail */}
        {(location.pathname === "/" || location.pathname.startsWith("/category/") || location.pathname.startsWith("/products")) && (
          <div className="hidden sm:block relative z-10 border-t border-border bg-background/95 backdrop-blur-xl">
            <div className="max-w-[1280px] mx-auto overflow-x-auto scrollbar-hide py-2.5">
              <div className="flex gap-2 w-max px-4 sm:px-6">
                <Link
                  to="/products"
                  className={`group flex items-center gap-2 px-3.5 py-1.5 bg-card rounded-full border transition-all duration-300 hover:shadow-soft flex-shrink-0 select-none ${
                    location.pathname === "/products" && !searchParams.get("category")
                      ? "border-brand-terracotta bg-brand-peach/30"
                      : "border-border hover:border-brand-sage"
                  }`}
                >
                  <div className="w-5.5 h-5.5 rounded-full bg-brand-peach flex items-center justify-center text-[10px] flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    📦
                  </div>
                  <span className={`text-[10px] sm:text-xs font-semibold ${location.pathname === "/products" && !searchParams.get("category") ? "text-brand-terracotta-dark dark:text-brand-terracotta font-bold" : "text-foreground"}`}>
                    {isRTL ? "الكل" : "All Products"}
                  </span>
                </Link>
                {categories.map(cat => {
                  const catName = isRTL && cat.nameAr ? cat.nameAr : cat.name;
                  const active = location.pathname === `/category/${cat.slug}` ||
                                 (location.pathname === "/products" && searchParams.get("category") === cat.slug);
                  return (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className={`group flex items-center gap-2 px-3.5 py-1.5 bg-card rounded-full border transition-all duration-300 hover:shadow-soft flex-shrink-0 select-none ${
                        active
                          ? "border-brand-terracotta bg-brand-peach/30"
                          : "border-border hover:border-brand-sage"
                      }`}
                    >
                      <div className="w-5.5 h-5.5 rounded-full bg-brand-peach flex items-center justify-center text-[10px] flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {cat.icon}
                      </div>
                      <span className={`text-[10px] sm:text-xs font-semibold ${active ? "text-brand-terracotta-dark dark:text-brand-terracotta font-bold" : "text-foreground"}`}>
                        {catName}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
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
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed top-0 inset-x-0 z-50 bg-background/98 backdrop-blur-2xl safe-area-pt shadow-elev border-b border-border"
            >
              <form onSubmit={submit} className="px-4 sm:px-6 py-3 flex items-center gap-2 max-w-[1280px] mx-auto">
                <div className="relative flex-1 flex items-center bg-input rounded-full border border-border focus-within:border-brand-sage transition-colors">
                  <Search size={17} className="absolute start-4 text-brand-ink-soft pointer-events-none" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full ps-11 pe-4 py-3 bg-transparent text-foreground placeholder:text-brand-ink-soft outline-none"
                    style={{ fontSize: "0.95rem" }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      aria-label={isRTL ? "مسح النص" : "Clear input"}
                      className="me-3 p-1 rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
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
                <button
                  type="button"
                  onClick={() => setSelectedCategoryScope("all")}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex-shrink-0 cursor-pointer ${
                    selectedCategoryScope === "all"
                      ? "bg-brand-terracotta text-white shadow-sm"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isRTL ? "الكل" : "All"}
                </button>
                {categories.map(cat => {
                  const active = selectedCategoryScope === cat.slug;
                  const name = isRTL && cat.nameAr ? cat.nameAr : cat.name;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategoryScope(cat.slug)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex-shrink-0 flex items-center gap-1 cursor-pointer ${
                        active
                          ? "bg-brand-terracotta text-white shadow-sm"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{name}</span>
                    </button>
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
