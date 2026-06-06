import { useParams, Link } from "react-router";
import { useState, useMemo, useEffect, useRef } from "react";
import { SlidersHorizontal, Grid3X3, List, X, Search } from "lucide-react";
import { getProductsByCategory } from "../data/products";
import { categories } from "../data/categories";
import { ProductCard } from "../components/ProductCard";
import { useAppSettings } from "../context/AppSettingsContext";
import { FilterPanel, SortOption } from "./Products";
import { motion, AnimatePresence } from "motion/react";
import { CustomDropdown } from "../components/ui/CustomDropdown";

export function Category() {
  const { slug } = useParams();
  const { t, isRTL } = useAppSettings();
  const category = categories.find(c => c.slug === slug);
  const categoryProducts = useMemo(() => getProductsByCategory(slug || ""), [slug]);

  const sortOptions = [
    { value: "featured", label: t.trending },
    { value: "price-asc", label: t.sortPriceAsc },
    { value: "price-desc", label: t.sortPriceDesc },
    { value: "rating", label: t.sortRating },
    { value: "new", label: t.newArrivals },
  ];

  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [showOrganic, setShowOrganic] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // When category changes, reset filters
  useEffect(() => {
    setPriceRange([0, 500]);
    setMinRating(0);
    setShowOrganic(false);
    setSearchQuery("");
    setSort("featured");
  }, [slug]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [slug]);

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    if (showOrganic) {
      result = result.filter(p => p.isOrganic);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.nameAr && p.nameAr.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "new": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }

    return result;
  }, [categoryProducts, priceRange, minRating, showOrganic, sort, searchQuery]);

  const clearFilters = () => {
    setPriceRange([0, 500]);
    setMinRating(0);
    setShowOrganic(false);
    setSearchQuery("");
  };

  const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < 500 || minRating > 0 || showOrganic || searchQuery.trim().length > 0;

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🌿</p>
          <h2 className="text-foreground mb-2 font-display">{t.categoryNotFound}</h2>
          <Link to="/products" className="text-brand-terracotta hover:underline">{t.browseAllProducts}</Link>
        </div>
      </div>
    );
  }

  const categoryName = isRTL && category.nameAr ? category.nameAr : category.name;

  const panelProps = {
    t,
    isRTL,
    hasActiveFilters,
    selectedCategories: [], // Unused when showCategoryFilter is false
    toggleCategory: () => {}, // Unused when showCategoryFilter is false
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    showOrganic,
    setShowOrganic,
    clearFilters,
    showCategoryFilter: false,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-6">
        {/* Page header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 select-none">
          <h1 className="text-foreground font-display text-2xl font-bold leading-tight">
            {categoryName}
          </h1>
          <p className="text-muted-foreground text-sm hidden lg:block">{filteredProducts.length} {t.productsFound}</p>
        </div>

        <div className="flex gap-6 items-start">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-card rounded-2xl p-4 border border-border sticky top-28 shadow-soft">
              <FilterPanel {...panelProps} />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-6">
              {/* Desktop layout: search box on left, sorting + grid/list on right */}
              <div className="hidden lg:flex items-center justify-between gap-3">
                {/* Search products box */}
                <div className="relative w-full max-w-xs">
                  <Search size={15} className={`absolute ${isRTL ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 text-muted-foreground`} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t.searchInThisCategory}
                    className={`w-full h-11 ${isRTL ? "pr-10 pl-10" : "pl-10 pr-10"} bg-brand-peach/40 dark:bg-zinc-800/80 border border-brand-terracotta/20 rounded-xl text-foreground placeholder:text-muted-foreground outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 transition-all text-sm font-semibold`}
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery("")} 
                      className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 w-5 h-5 bg-muted rounded-full flex items-center justify-center hover:bg-border transition-colors`}
                    >
                      <X size={11} className="text-muted-foreground" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <CustomDropdown
                    value={sort}
                    onChange={val => setSort(val as SortOption)}
                    options={sortOptions}
                    className="w-48"
                  />

                  {/* Grid / List view switch */}
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

              {/* Mobile layout: search box + filter button on same row */}
              <div className="lg:hidden flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 w-full">
                  <div className="relative flex-1">
                    <Search size={15} className={`absolute ${isRTL ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 text-muted-foreground`} />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder={t.searchInThisCategory}
                      className={`w-full h-11 ${isRTL ? "pr-10 pl-10" : "pl-10 pr-10"} bg-brand-peach/40 dark:bg-zinc-800/80 border border-brand-terracotta/20 rounded-xl text-foreground placeholder:text-muted-foreground outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 transition-all text-sm font-semibold`}
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")} 
                        className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 w-5 h-5 bg-muted rounded-full flex items-center justify-center hover:bg-border transition-colors`}
                      >
                        <X size={11} className="text-muted-foreground" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center justify-center w-11 h-11 text-brand-terracotta bg-brand-peach dark:bg-zinc-800/80 border border-brand-terracotta/20 rounded-xl hover:bg-brand-peach/80 transition-all duration-200 active:scale-95 shadow-sm relative flex-shrink-0"
                    aria-label={t.filters}
                  >
                    <SlidersHorizontal size={16} />
                    {hasActiveFilters && (
                      <span className="absolute -top-1 -end-1 bg-brand-terracotta text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                        {(showOrganic ? 1 : 0) + (sort !== "featured" ? 1 : 0)}
                      </span>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between px-0.5 mt-0.5">
                  <span className="text-muted-foreground text-xs font-semibold">
                    {filteredProducts.length} {t.productsFound}
                  </span>

                  <div className="flex items-center gap-1 bg-brand-peach rounded-lg p-0.5 border border-brand-terracotta/10">
                    <button
                      onClick={() => setView("grid")}
                      className={`p-1.5 rounded transition-all ${view === "grid" ? "bg-card shadow-sm text-brand-terracotta" : "text-brand-ink-soft hover:text-brand-terracotta"}`}
                      aria-label="Grid view"
                    >
                      <Grid3X3 size={14} />
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className={`p-1.5 rounded transition-all ${view === "list" ? "bg-card shadow-sm text-brand-terracotta" : "text-brand-ink-soft hover:text-brand-terracotta"}`}
                      aria-label="List view"
                    >
                      <List size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                <AnimatePresence>
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
                <p className="text-muted-foreground">{t.noProductsMatchFilters}</p>
                <button onClick={clearFilters} className="mt-4 text-brand-terracotta text-sm hover:underline">{t.clearAll}</button>
              </div>
            ) : (
              <div className={view === "grid"
                ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4"
                : "flex flex-col gap-2 sm:gap-3"
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
              className="fixed inset-0 bg-brand-ink/45 backdrop-blur-sm z-40"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t.filters}
              initial={{ x: isRTL ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
              className={`fixed top-0 bottom-0 ${isRTL ? "right-0" : "left-0"} w-full lg:max-w-sm bg-card text-card-foreground z-50 overflow-y-auto shadow-elev flex flex-col`}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between safe-area-pt flex-shrink-0">
                <h2 className="text-foreground font-display text-lg font-bold">{t.filters}</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  aria-label="Close"
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-6 flex-1 overflow-y-auto">
                {/* Sort By section (mobile only, since it's hidden on the main toolbar on mobile) */}
                <div className="flex flex-col gap-2">
                  <span className="eyebrow px-1">{isRTL ? "ترتيب حسب" : "Sort By"}</span>
                  <div className="bg-muted/50 rounded-md overflow-hidden border border-border p-3 space-y-2.5">
                    {sortOptions.map(opt => (
                      <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer text-foreground/80 select-none text-sm font-medium">
                        <input
                          type="radio"
                          name="sortOption"
                          value={opt.value}
                          checked={sort === opt.value}
                          onChange={() => setSort(opt.value as SortOption)}
                          className="accent-brand-terracotta w-4 h-4 cursor-pointer"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter options section */}
                <div className="flex flex-col gap-2">
                  <span className="eyebrow px-1">{t.filters}</span>
                  <div className="bg-muted/50 rounded-md overflow-hidden border border-border p-3.5">
                    <FilterPanel {...panelProps} hideHeader />
                  </div>
                </div>
              </div>

              {/* Sticky bottom bar */}
              <div className="sticky bottom-0 bg-card/95 backdrop-blur-md border-t border-border p-4 mt-auto flex gap-3 flex-shrink-0">
                {hasActiveFilters && (
                  <Button
                    onClick={() => {
                      clearFilters();
                      setIsFilterOpen(false);
                    }}
                    variant="secondary"
                    className="flex-1 text-sm font-semibold h-11"
                  >
                    {t.clearAll}
                  </Button>
                )}
                <Button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 text-sm font-semibold h-11"
                >
                  {t.applyFilters} ({filteredProducts.length})
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="h-20 sm:h-4" />
    </div>
  );
}
