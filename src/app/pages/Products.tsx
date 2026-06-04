import { useState, useMemo } from "react";
import { SlidersHorizontal, Grid3X3, List, ChevronDown, X } from "lucide-react";
import { useSearchParams } from "react-router";
import { products } from "../data/products";
import { categories, categoryMapping } from "../data/categories";
import { ProductCard } from "../components/ProductCard";
import { motion, AnimatePresence } from "motion/react";
import { useAppSettings } from "../context/AppSettingsContext";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "new";

interface FilterPanelProps {
  t: any;
  isRTL: boolean;
  hasActiveFilters: boolean;
  selectedCategories: string[];
  toggleCategory: (slug: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  showOrganic: boolean;
  setShowOrganic: (show: boolean) => void;
  clearFilters: () => void;
  hideHeader?: boolean;
}

function FilterPanel({
  t,
  isRTL,
  hasActiveFilters,
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  showOrganic,
  setShowOrganic,
  clearFilters,
  hideHeader = false,
}: FilterPanelProps) {
  return (
    <div className="space-y-6">
      {!hideHeader && (
        <div className="flex items-center justify-between">
          <h3 className="text-foreground font-medium">{t.filters}</h3>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-xs text-brand-terracotta hover:underline flex items-center gap-1">
              <X size={12} /> {t.clearAll}
            </button>
          )}
        </div>
      )}

      {/* Categories */}
      <div>
        <h4 className="text-sm text-foreground/80 mb-3">{t.shopByCategory}</h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
              onClick={() => toggleCategory(cat.slug)}
            >
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedCategories.includes(cat.slug)
                    ? "border-brand-terracotta bg-brand-terracotta"
                    : "border-border group-hover:border-brand-terracotta"
                }`}
              >
                {selectedCategories.includes(cat.slug) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-muted-foreground">{cat.icon} {isRTL && cat.nameAr ? cat.nameAr : cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h4 className="text-sm text-foreground/80 mb-3">{t.priceRange}</h4>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-full border border-border bg-card rounded-lg px-2 py-1.5 text-sm text-center text-foreground outline-none focus:border-brand-terracotta"
            min={0}
            max={priceRange[1]}
          />
          <span className="text-muted-foreground text-sm">—</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full border border-border bg-card rounded-lg px-2 py-1.5 text-sm text-center text-foreground outline-none focus:border-brand-terracotta"
            min={priceRange[0]}
            max={200}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={e => setPriceRange([priceRange[0], +e.target.value])}
          className="w-full accent-brand-terracotta"
        />
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-sm text-foreground/80 mb-3">{t.minRating}</h4>
        <div className="space-y-2">
          {[4, 3, 2].map(r => (
            <label key={r} className="flex items-center gap-2 cursor-pointer text-muted-foreground select-none">
              <input
                type="radio"
                checked={minRating === r}
                onChange={() => setMinRating(minRating === r ? 0 : r)}
                className="accent-brand-terracotta"
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < r ? "text-amber-400" : "text-border"}`}>★</span>
                ))}
                <span className="text-xs text-muted-foreground">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Organic only */}
      <label
        className="flex items-center gap-3 cursor-pointer select-none"
        onClick={() => setShowOrganic(!showOrganic)}
      >
        <div
          className={`w-10 h-6 rounded-full transition-colors relative ${showOrganic ? "bg-brand-terracotta" : "bg-border"}`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${showOrganic ? (isRTL ? "-translate-x-5" : "translate-x-5") : "translate-x-1"}`} />
        </div>
        <span className="text-sm text-foreground/80">{t.organicOnly}</span>
      </label>
    </div>
  );
}

export function Products() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  const { t, isRTL } = useAppSettings();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<SortOption>("featured");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [showOrganic, setShowOrganic] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filter === "deals") {
      result = result.filter(p => p.discount);
    }

    if (selectedCategories.length > 0) {
      result = result.filter(p => {
        const parentSlug = categoryMapping[p.categorySlug] || p.categorySlug;
        return selectedCategories.includes(parentSlug);
      });
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    if (showOrganic) {
      result = result.filter(p => p.isOrganic);
    }

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "new": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }

    return result;
  }, [filter, selectedCategories, priceRange, minRating, showOrganic, sort]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setMinRating(0);
    setShowOrganic(false);
  };

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 100 || minRating > 0 || showOrganic;

  const panelProps = {
    t,
    isRTL,
    hasActiveFilters,
    selectedCategories,
    toggleCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    showOrganic,
    setShowOrganic,
    clearFilters,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-foreground font-display mb-1">
            {filter === "deals" ? `🔥 ${t.todaysDeals}` : t.shopAll}
          </h1>
          <p className="text-muted-foreground text-sm">{filteredProducts.length} {t.productsFound}</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-card rounded-2xl p-5 border border-border sticky top-28 shadow-soft">
              <FilterPanel {...panelProps} />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4 bg-card border border-border rounded-xl px-4 py-3 shadow-soft">
              {/* Row 1 (Mobile) / Left Group (Desktop) */}
              <div className="flex items-center justify-between gap-3 w-full lg:w-auto">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm font-semibold text-brand-terracotta bg-brand-peach border border-brand-terracotta/20 rounded-lg px-3.5 py-2 hover:bg-brand-peach/80 transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <SlidersHorizontal size={15} />
                  <span>{t.filters}</span>
                  {hasActiveFilters && (
                    <span className="bg-brand-terracotta text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {selectedCategories.length + (showOrganic ? 1 : 0)}
                    </span>
                  )}
                </button>

                {/* Sort select dropdown inside Row 1 on mobile, next to filters, but aligns next to Grid/List switcher on desktop */}
                <div className="relative w-40 sm:w-48 lg:hidden">
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value as SortOption)}
                    className="appearance-none w-full bg-brand-peach border border-brand-terracotta/10 ps-3 pe-8 py-2 rounded-lg text-sm text-brand-terracotta font-semibold outline-none cursor-pointer focus:border-brand-terracotta"
                  >
                    <option value="featured">{t.trending}</option>
                    <option value="price-asc">{isRTL ? "السعر: من الأقل للأعلى" : "Price: Low to High"}</option>
                    <option value="price-desc">{isRTL ? "السعر: من الأعلى للأقل" : "Price: High to Low"}</option>
                    <option value="rating">{isRTL ? "الأعلى تقييماً" : "Top Rated"}</option>
                    <option value="new">{t.newArrivals}</option>
                  </select>
                  <ChevronDown size={13} className="absolute end-2.5 top-1/2 -translate-y-1/2 text-brand-terracotta pointer-events-none" />
                </div>
              </div>

              {/* Row 2 (Mobile) / Right Group (Desktop) */}
              <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto border-t border-border/40 lg:border-t-0 pt-2 lg:pt-0">
                {/* Product Count on Mobile */}
                <span className="text-muted-foreground text-xs font-semibold lg:hidden">
                  {filteredProducts.length} {t.productsFound}
                </span>

                <div className="flex items-center gap-3 ms-auto lg:ms-0">
                  {/* Sort select dropdown for desktop only */}
                  <div className="relative hidden lg:block">
                    <select
                      value={sort}
                      onChange={e => setSort(e.target.value as SortOption)}
                      className="appearance-none bg-brand-peach ps-3 pe-8 py-2 rounded-lg text-sm text-brand-terracotta font-semibold outline-none cursor-pointer border border-brand-terracotta/10 focus:border-brand-terracotta"
                    >
                      <option value="featured">{t.trending}</option>
                      <option value="price-asc">{isRTL ? "السعر: من الأقل للأعلى" : "Price: Low to High"}</option>
                      <option value="price-desc">{isRTL ? "السعر: من الأعلى للأقل" : "Price: High to Low"}</option>
                      <option value="rating">{isRTL ? "الأعلى تقييماً" : "Top Rated"}</option>
                      <option value="new">{t.newArrivals}</option>
                    </select>
                    <ChevronDown size={13} className="absolute end-2.5 top-1/2 -translate-y-1/2 text-brand-terracotta pointer-events-none" />
                  </div>

                  {/* Grid / List view switch (Always visible, grouped on Row 2 for mobile, and side-by-side with sort dropdown on desktop) */}
                  <div className="flex items-center gap-1 bg-brand-peach rounded-lg p-1 border border-brand-terracotta/10">
                    <button
                      onClick={() => setView("grid")}
                      className={`p-1.5 rounded transition-all ${view === "grid" ? "bg-card shadow-sm text-brand-terracotta" : "text-brand-ink-soft hover:text-brand-terracotta"}`}
                      aria-label="Grid view"
                    >
                      <Grid3X3 size={15} />
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className={`p-1.5 rounded transition-all ${view === "list" ? "bg-card shadow-sm text-brand-terracotta" : "text-brand-ink-soft hover:text-brand-terracotta"}`}
                      aria-label="List view"
                    >
                      <List size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                <AnimatePresence>
                  {selectedCategories.map(slug => {
                    const cat = categories.find(c => c.slug === slug);
                    return cat ? (
                      <motion.span
                        key={slug}
                        layout
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        className="inline-flex items-center gap-1.5 bg-brand-terracotta/10 text-brand-terracotta text-xs px-3 py-1.5 rounded-full border border-brand-terracotta/20"
                      >
                        {isRTL && cat.nameAr ? cat.nameAr : cat.name}
                        <button onClick={() => toggleCategory(slug)} className="hover:text-brand-terracotta-dark transition-colors"><X size={11} /></button>
                      </motion.span>
                    ) : null;
                  })}
                  {showOrganic && (
                    <motion.span
                      key="organic"
                      layout
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="inline-flex items-center gap-1.5 bg-brand-terracotta/10 text-brand-terracotta text-xs px-3 py-1.5 rounded-full border border-brand-terracotta/20"
                    >
                      {t.organicOnly} <button onClick={() => setShowOrganic(false)} className="hover:text-brand-terracotta-dark transition-colors"><X size={11} /></button>
                    </motion.span>
                  )}
                  <motion.button
                    key="clear-all"
                    layout
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 bg-brand-peach hover:bg-brand-terracotta text-brand-terracotta hover:text-white text-xs px-3 py-1.5 rounded-full border border-brand-terracotta/30 transition-all font-semibold active:scale-95"
                  >
                    <X size={11} /> {t.clearAll}
                  </motion.button>
                </AnimatePresence>
              </div>
            )}

            {/* Products grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-card border border-border rounded-2xl">
                <p className="text-4xl mb-4">🌿</p>
                <p className="text-muted-foreground">{isRTL ? "لا توجد منتجات تطابق خيارات التصفية" : "No products match your filters"}</p>
                <button onClick={clearFilters} className="mt-4 text-brand-terracotta text-sm hover:underline">{t.clearAll}</button>
              </div>
            ) : (
              <div className={view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                : "flex flex-col gap-3"
              }>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} view={view} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-40"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ x: isRTL ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`fixed ${isRTL ? "right-0" : "left-0"} top-0 bottom-0 w-full max-w-[320px] bg-card z-50 overflow-y-auto p-5 shadow-elev border-r border-border`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-foreground font-display">{t.filters}</h2>
                  {hasActiveFilters && (
                    <button 
                      onClick={clearFilters}
                      className="text-xs text-brand-terracotta hover:underline font-semibold"
                    >
                      {t.clearAll}
                    </button>
                  )}
                </div>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X size={20} className="text-muted-foreground hover:text-foreground" />
                </button>
              </div>
              <FilterPanel {...panelProps} hideHeader />
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-brand-terracotta text-white py-3 rounded-xl mt-6 font-medium active:scale-[0.98] transition-all"
              >
                {t.applyFilters} ({filteredProducts.length})
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="h-20 sm:h-4" />
    </div>
  );
}
