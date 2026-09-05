import { useState, useEffect, useMemo, useRef } from "react";
import { Search, ShoppingBag, Heart, Menu, X, Languages, Sun, Moon, History, TrendingUp, ArrowUpRight, MapPin } from "lucide-react";
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
  const { totalItems, totalPrice, setCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, setTheme, locale, setLocale, formatPrice, t, isRTL } = useAppSettings();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedCategoryScope, setSelectedCategoryScope] = useState<string>("all");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchOpen(false);
    setDesktopSearchOpen(false);
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
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(e.target as Node)) {
        setDesktopSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <div className="relative h-16 sm:h-[68px] px-4 sm:px-6 max-w-[1280px] mx-auto flex items-center justify-between gap-3 sm:gap-6">
          {/* Mobile Start: Menu toggle button */}
          <div className="flex items-center justify-start z-10 -ms-2 lg:hidden">
            <IconButton onClick={() => setMenuOpen(true)} aria-label={t.menu}>
              <Menu size={20} />
            </IconButton>
          </div>

          {/* Logo & Apothecary Heritage Tagline */}
          <Link
            to="/"
            className="flex items-center gap-3 select-none no-underline z-10 flex-shrink-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0"
          >
            <img
              src={logoImg}
              alt={isRTL ? "شعار حاج عرفة" : "Haj Arafa Logo"}
              width={140}
              height={48}
              decoding="async"
              className="h-10 sm:h-12 w-auto object-contain select-none"
            />
            <div className="hidden xl:flex flex-col text-start">
              <span className="font-display font-extrabold text-base text-brand-forest dark:text-brand-sage-dark tracking-tight leading-tight">
                {isRTL ? "حاج عرفة" : "Haj Arafa"}
              </span>
              <span className="text-[10px] text-brand-ink-soft dark:text-zinc-400 font-medium">
                {isRTL ? "العطارة والأغذية الطبيعية منذ 1968" : "Natural Apothecary Since 1968"}
              </span>
            </div>
          </Link>

          {/* Prominent Desktop Search Bar with Category Scopes */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-2 relative z-20" ref={desktopSearchRef}>
            <form onSubmit={submit} className="relative w-full flex items-center">
              <div className="relative w-full flex items-center rounded-2xl bg-card border border-border focus-within:border-brand-terracotta focus-within:ring-2 focus-within:ring-brand-terracotta/20 shadow-sm transition-all overflow-hidden h-11">
                <label htmlFor="desktop-category-scope" className="sr-only">
                  {isRTL ? "تحديد القسم" : "Select Category"}
                </label>
                <select
                  id="desktop-category-scope"
                  value={selectedCategoryScope}
                  onChange={(e) => setSelectedCategoryScope(e.target.value)}
                  className="h-full bg-brand-peach/40 dark:bg-zinc-800 text-foreground text-xs font-semibold px-2.5 border-e border-border outline-none cursor-pointer hover:bg-brand-peach/60 transition-colors"
                  aria-label={isRTL ? "تحديد القسم" : "Select Category"}
                >
                  <option value="all">{isRTL ? "جميع الأقسام" : "All Departments"}</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.slug}>{isRTL && c.nameAr ? c.nameAr : c.name}</option>
                  ))}
                </select>

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
                  className="flex-1 h-full px-3.5 bg-transparent text-foreground placeholder:text-muted-foreground text-xs font-medium outline-none"
                />

                <button
                  type="submit"
                  className="h-full px-4 bg-brand-terracotta hover:bg-brand-terracotta-dark text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label={t.search}
                >
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Desktop Autocomplete Preview Dropdown */}
            {desktopSearchOpen && (queryClean || recentSearches.length > 0) && (
              <div className="absolute top-full mt-2 inset-x-0 bg-card border border-border rounded-2xl shadow-elev p-3 z-50 max-h-[420px] overflow-y-auto">
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
              </div>
            )}
          </div>

          {/* End Utility Items */}
          <div className="flex items-center gap-1 sm:gap-2 justify-end z-10 -me-2 sm:-me-0">
            {/* Desktop Branches Link */}
            <Link
              to="/branches"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-ink-soft hover:text-brand-terracotta rounded-xl hover:bg-muted transition-colors select-none"
            >
              <MapPin size={15} />
              <span>{isRTL ? "فروعنا" : "Branches"}</span>
            </Link>

            {/* Desktop Language & Theme Toggles */}
            <div className="hidden lg:flex items-center gap-0.5 border-e border-border pe-2">
              <IconButton onClick={() => setLocale(locale === "en" ? "ar" : "en")} aria-label={t.language}>
                <Languages size={18} />
              </IconButton>
              <IconButton onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={t.theme}>
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </IconButton>
            </div>

            {/* Mobile Search Button (< lg) */}
            <div className="lg:hidden">
              <IconButton onClick={() => setSearchOpen(true)} aria-label={t.searchPlaceholder}>
                <Search size={19} />
              </IconButton>
            </div>

            {/* Wishlist Button */}
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

            {/* Cart Button: Full Price Pill on Desktop, Icon on Mobile */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="hidden sm:inline-flex items-center gap-2.5 h-10 px-3.5 rounded-xl bg-brand-terracotta hover:bg-brand-terracotta-dark text-white transition-all shadow-sm active:scale-95 cursor-pointer select-none font-semibold text-xs"
              aria-label={t.cart}
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag size={17} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -end-2 bg-white text-brand-terracotta text-[9.5px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="font-bold tracking-tight">
                {formatPrice(totalPrice)}
              </span>
            </button>
            <div className="sm:hidden">
              <IconButton onClick={() => setCartOpen(true)} aria-label={t.cart} badge={totalItems}>
                <ShoppingBag size={19} />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Desktop Category Navigation Rail (Permanent across storefront on desktop) */}
        <div className="hidden sm:block relative z-10 border-t border-border bg-background/95">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-2">
              <Link
                to="/products"
                className={`group flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all select-none flex-shrink-0 ${
                  location.pathname === "/products" && !searchParams.get("category")
                    ? "bg-brand-terracotta text-white shadow-sm"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span>📦</span>
                <span>{isRTL ? "جميع المنتجات" : "All Products"}</span>
              </Link>

              {categories.map(cat => {
                const catName = isRTL && cat.nameAr ? cat.nameAr : cat.name;
                const active = location.pathname === `/category/${cat.slug}` ||
                               (location.pathname === "/products" && searchParams.get("category") === cat.slug);
                return (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className={`group flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all select-none flex-shrink-0 ${
                      active
                        ? "bg-brand-terracotta text-white shadow-sm"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{catName}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Quick Nav Links on the End */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-brand-ink-soft ps-4 border-s border-border flex-shrink-0">
              <Link to="/about" className="hover:text-brand-terracotta transition-colors">
                {isRTL ? "عن حاج عرفة" : "About Us"}
              </Link>
              <Link to="/contact" className="hover:text-brand-terracotta transition-colors">
                {isRTL ? "تواصل معنا" : "Contact"}
              </Link>
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
