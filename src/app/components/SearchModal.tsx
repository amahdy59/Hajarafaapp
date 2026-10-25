import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, TrendingUp, History, Plus, ArrowRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { products, Product } from "../data/products";
import { categories } from "../data/categories";
import { matchesArabicOrEnglish } from "../utils/arabic";
import { useAppSettings } from "../context/AppSettingsContext";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { Button } from "./ui/Button";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = {
  ar: ["عسل سدر", "حبة البركة", "مكسرات", "بهارات مشاوي", "عناية وزيوت"],
  en: ["Sidr Honey", "Black Seed", "Raw Cashews", "BBQ Spices", "Hair Oils"],
};

export function SearchModal({ open, onClose }: SearchModalProps) {
  const { t, isRTL, locale } = useAppSettings();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("hajarafa.recent_searches");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...recentSearches.filter(s => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem("hajarafa.recent_searches", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("hajarafa.recent_searches");
  };

  const handleSearchSubmit = (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    saveRecentSearch(trimmed);
    onClose();
    navigate(`/products?q=${encodeURIComponent(trimmed)}`);
  };

  // Instant matching products
  const matchingProducts = useMemo(() => {
    if (!query.trim()) return [];
    return products
      .filter(p =>
        matchesArabicOrEnglish(p.name, query) ||
        matchesArabicOrEnglish(p.nameAr, query) ||
        matchesArabicOrEnglish(p.category, query) ||
        matchesArabicOrEnglish(p.description, query)
      )
      .slice(0, 5);
  }, [query]);

  // Instant matching categories
  const matchingCategories = useMemo(() => {
    if (!query.trim()) return [];
    return categories
      .filter(c =>
        matchesArabicOrEnglish(c.name, query) ||
        matchesArabicOrEnglish(c.nameAr, query)
      )
      .slice(0, 3);
  }, [query]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${isRTL && product.nameAr ? product.nameAr : product.name} ${t.addedToCart}`);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-start items-center p-0 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-brand-ink/50 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Search Surface */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-card border border-border shadow-elev sm:rounded-2xl flex flex-col overflow-hidden max-h-[90vh] z-10"
        >
          {/* Header Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchSubmit(query);
            }}
            className="flex items-center gap-2 p-3 sm:p-4 border-b border-border bg-background/80 backdrop-blur"
          >
            <div className="relative flex-1 flex items-center">
              <Search size={18} className="absolute start-3.5 text-muted-foreground pointer-events-none" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isRTL ? "ابحث عن عسل، أعشاب، مكسرات، بهارات..." : "Search natural honey, herbs, nuts, spices..."}
                className="w-full ps-10 pe-9 py-2.5 bg-brand-peach/40 dark:bg-zinc-800/80 border border-brand-terracotta/20 rounded-xl text-foreground placeholder:text-muted-foreground outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 text-sm font-semibold transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute end-3 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground"
                  aria-label={isRTL ? "مسح" : "Clear"}
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <Button
              type="submit"
              size="sm"
              className="h-10 px-4 text-xs font-bold rounded-xl"
            >
              {isRTL ? "بحث" : "Search"}
            </Button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground rounded-lg"
              aria-label={isRTL ? "إغلاق" : "Close"}
            >
              <X size={20} />
            </button>
          </form>

          {/* Results / Suggestions Container */}
          <div className="overflow-y-auto p-4 space-y-5">
            {/* When typing and matches exist */}
            {query.trim().length > 0 ? (
              <>
                {/* Category chips if matching */}
                {matchingCategories.length > 0 && (
                  <div>
                    <span className="eyebrow block mb-2">{isRTL ? "الأقسام المطابقة" : "Matching Categories"}</span>
                    <div className="flex flex-wrap gap-2">
                      {matchingCategories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/category/${cat.slug}`}
                          onClick={onClose}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-peach/50 dark:bg-zinc-800 text-xs font-semibold text-brand-forest dark:text-brand-sage-dark border border-brand-sage/20 hover:border-brand-terracotta transition-colors"
                        >
                          <span>{cat.icon}</span>
                          <span>{isRTL && cat.nameAr ? cat.nameAr : cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product results */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="eyebrow">{isRTL ? "المنتجات المطابقة" : "Matching Products"}</span>
                    <span className="text-xs text-muted-foreground">{matchingProducts.length} {t.productsFound}</span>
                  </div>

                  {matchingProducts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-2xl mb-1">🌿</p>
                      <p className="text-sm">{t.noProductsMatchFilters}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {matchingProducts.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/${product.id}`}
                          onClick={() => {
                            saveRecentSearch(isRTL && product.nameAr ? product.nameAr : product.name);
                            onClose();
                          }}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-card hover:bg-brand-peach/30 border border-border transition-colors group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-lg bg-background p-1 flex-shrink-0 border border-border/40 flex items-center justify-center">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-foreground group-hover:text-brand-terracotta truncate transition-colors">
                                {isRTL && product.nameAr ? product.nameAr : product.name}
                              </p>
                              <p className="text-xs text-muted-foreground">{product.weight || product.category}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 flex-shrink-0 ms-2">
                            <span className="text-sm font-bold text-brand-forest">
                              {t.currency} {product.price.toFixed(2)}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => handleQuickAdd(e, product)}
                              className="w-8 h-8 rounded-lg bg-brand-terracotta text-white flex items-center justify-center hover:bg-brand-terracotta-dark transition-all active:scale-95 shadow-sm"
                              aria-label={isRTL ? "أضف للسلة" : "Add to cart"}
                            >
                              <Plus size={15} />
                            </button>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {matchingProducts.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit(query)}
                      className="w-full mt-3 py-2 text-center text-xs font-bold text-brand-terracotta hover:underline flex items-center justify-center gap-1"
                    >
                      <span>{isRTL ? `عرض جميع النتائج لـ "${query}"` : `View all results for "${query}"`}</span>
                      {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Idle state: Popular and Recent searches */
              <>
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="eyebrow flex items-center gap-1.5">
                        <History size={13} className="text-brand-terracotta" />
                        {isRTL ? "عمليات البحث الأخيرة" : "Recent Searches"}
                      </span>
                      <button
                        type="button"
                        onClick={clearRecentSearches}
                        className="text-[11px] text-muted-foreground hover:text-brand-terracotta transition-colors"
                      >
                        {isRTL ? "مسح السجل" : "Clear all"}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSearchSubmit(term)}
                          className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-foreground hover:bg-brand-peach/60 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <span className="eyebrow flex items-center gap-1.5 mb-2">
                    <TrendingUp size={13} className="text-brand-terracotta" />
                    {isRTL ? "الأكثر بحثاً اليوم" : "Popular Searches"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(locale === "ar" ? POPULAR_SEARCHES.ar : POPULAR_SEARCHES.en).map((term, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSearchSubmit(term)}
                        className="px-3 py-1.5 rounded-full border border-border bg-card text-xs font-semibold text-foreground hover:border-brand-terracotta hover:text-brand-terracotta transition-all shadow-sm"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
