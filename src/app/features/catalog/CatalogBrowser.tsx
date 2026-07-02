import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Grid3X3, List, Search, SlidersHorizontal, X } from "lucide-react";
import { categories } from "../../data/categories";
import type { Product } from "../../data/products";
import { useAppSettings } from "../../context/AppSettingsContext";
import { Button } from "../../components/ui/Button";
import { CustomDropdown } from "../../components/ui/CustomDropdown";
import { ProductCard } from "../../components/ProductCard";
import { useDialogAccessibility } from "../../hooks/useDialogAccessibility";
import { FilterPanel } from "./FilterPanel";
import {
  filterAndSortProducts,
  getActiveCatalogFilterCount,
  getCatalogPriceLimit,
  type CatalogSortOption,
} from "./catalogUtils";

interface CatalogBrowserProps {
  initialSearchQuery?: string;
  products: Product[];
  searchPlaceholder: string;
  showCategoryFilter?: boolean;
  title: string;
}

export function CatalogBrowser({
  initialSearchQuery = "",
  products,
  searchPlaceholder,
  showCategoryFilter = true,
  title,
}: CatalogBrowserProps) {
  const { isRTL, t } = useAppSettings();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<CatalogSortOption>("featured");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [showOrganic, setShowOrganic] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const filterDialogRef = useRef<HTMLDivElement>(null);
  const maxPrice = useMemo(() => getCatalogPriceLimit(products), [products]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  useDialogAccessibility({
    containerRef: filterDialogRef,
    onClose: () => setIsFilterOpen(false),
    open: isFilterOpen,
  });

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  const sortOptions = [
    { value: "featured", label: t.trending },
    { value: "price-asc", label: t.sortPriceAsc },
    { value: "price-desc", label: t.sortPriceDesc },
    { value: "rating", label: t.sortRating },
    { value: "new", label: t.newArrivals },
  ];

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(products, {
        maxPrice,
        minRating,
        priceRange,
        searchQuery,
        selectedCategories,
        showCategoryFilter,
        showOrganic,
        sort,
      }),
    [
      maxPrice,
      minRating,
      priceRange,
      products,
      searchQuery,
      selectedCategories,
      showCategoryFilter,
      showOrganic,
      sort,
    ]
  );

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    minRating > 0 ||
    showOrganic ||
    searchQuery.trim().length > 0 ||
    sort !== "featured";

  const activeFilterCount = getActiveCatalogFilterCount({
    maxPrice,
    minRating,
    priceRange,
    searchQuery,
    selectedCategories,
    showCategoryFilter,
    showOrganic,
    sort,
  });

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setMinRating(0);
    setShowOrganic(false);
    setSearchQuery("");
    setSort("featured");
  };

  const toggleCategory = (slug: string) => {
    setSelectedCategories((currentCategories) =>
      currentCategories.includes(slug)
        ? currentCategories.filter((currentSlug) => currentSlug !== slug)
        : [...currentCategories, slug]
    );
  };

  const panelProps = {
    clearFilters,
    hasActiveFilters,
    isRTL,
    maxPrice,
    minRating,
    priceRange,
    selectedCategories,
    setMinRating,
    setPriceRange,
    setShowOrganic,
    showCategoryFilter,
    showOrganic,
    t,
    toggleCategory,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-1 sm:pt-6 pb-6">
        <div className="mb-3 sm:mb-6 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 select-none">
          <h1 className="text-foreground font-display text-2xl font-bold leading-tight">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm hidden lg:block">
            {filteredProducts.length} {t.productsFound}
          </p>
        </div>

        <div className="flex gap-6 items-start">
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-card rounded-2xl p-4 border border-border sticky top-28 shadow-soft">
              <FilterPanel {...panelProps} />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="mb-3.5 sm:mb-6">
              <div className="hidden lg:flex items-center justify-between gap-3">
                <div className="relative w-full max-w-xs">
                  <label htmlFor="catalog-search-desktop" className="sr-only">
                    {isRTL ? "البحث في المنتجات" : "Search products"}
                  </label>
                  <Search size={15} className={`absolute ${isRTL ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 text-muted-foreground`} />
                  <input
                    id="catalog-search-desktop"
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder={searchPlaceholder}
                    className={`w-full h-11 ${isRTL ? "pr-10 pl-10" : "pl-10 pr-10"} bg-brand-peach/40 dark:bg-zinc-800/80 border border-brand-terracotta/20 rounded-xl text-foreground placeholder:text-muted-foreground outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 transition-all text-sm font-semibold`}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 w-5 h-5 bg-muted rounded-full flex items-center justify-center hover:bg-border transition-colors`}
                      aria-label={isRTL ? "مسح البحث" : "Clear search"}
                    >
                      <X size={11} className="text-muted-foreground" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <CustomDropdown
                    value={sort}
                    onChange={(value) => setSort(value as CatalogSortOption)}
                    options={sortOptions}
                    className="w-48"
                    label={isRTL ? "ترتيب المنتجات" : "Sort products"}
                  />

                  <div className="flex items-center gap-1 bg-brand-peach rounded-lg p-1 border border-brand-terracotta/10">
                    <button
                      type="button"
                      onClick={() => setView("grid")}
                      className={`p-1.5 rounded transition-all ${view === "grid" ? "bg-card shadow-sm text-brand-terracotta" : "text-brand-ink-soft hover:text-brand-terracotta"}`}
                      aria-pressed={view === "grid"}
                      aria-label={isRTL ? "عرض شبكي" : "Grid view"}
                    >
                      <Grid3X3 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setView("list")}
                      className={`p-1.5 rounded transition-all ${view === "list" ? "bg-card shadow-sm text-brand-terracotta" : "text-brand-ink-soft hover:text-brand-terracotta"}`}
                      aria-pressed={view === "list"}
                      aria-label={isRTL ? "عرض قائمة" : "List view"}
                    >
                      <List size={15} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:hidden flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5 w-full">
                  <div className="relative flex-1">
                    <label htmlFor="catalog-search-mobile" className="sr-only">
                      {isRTL ? "البحث في المنتجات" : "Search products"}
                    </label>
                    <Search size={15} className={`absolute ${isRTL ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 text-muted-foreground`} />
                    <input
                      id="catalog-search-mobile"
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder={searchPlaceholder}
                      className={`w-full h-11 ${isRTL ? "pr-10 pl-10" : "pl-10 pr-10"} bg-brand-peach/40 dark:bg-zinc-800/80 border border-brand-terracotta/20 rounded-xl text-foreground placeholder:text-muted-foreground outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 transition-all text-sm font-semibold`}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 w-5 h-5 bg-muted rounded-full flex items-center justify-center hover:bg-border transition-colors`}
                        aria-label={isRTL ? "مسح البحث" : "Clear search"}
                      >
                        <X size={11} className="text-muted-foreground" />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center justify-center w-11 h-11 text-brand-terracotta bg-brand-peach dark:bg-zinc-800/80 border border-brand-terracotta/20 rounded-xl hover:bg-brand-peach/80 transition-all duration-200 active:scale-95 shadow-sm relative flex-shrink-0"
                    aria-label={t.filters}
                  >
                    <SlidersHorizontal size={16} />
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1 -end-1 bg-brand-terracotta text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                        {activeFilterCount}
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
                      type="button"
                      onClick={() => setView("grid")}
                      className={`p-1.5 rounded transition-all ${view === "grid" ? "bg-card shadow-sm text-brand-terracotta" : "text-brand-ink-soft hover:text-brand-terracotta"}`}
                      aria-pressed={view === "grid"}
                      aria-label={isRTL ? "عرض شبكي" : "Grid view"}
                    >
                      <Grid3X3 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setView("list")}
                      className={`p-1.5 rounded transition-all ${view === "list" ? "bg-card shadow-sm text-brand-terracotta" : "text-brand-ink-soft hover:text-brand-terracotta"}`}
                      aria-pressed={view === "list"}
                      aria-label={isRTL ? "عرض قائمة" : "List view"}
                    >
                      <List size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                <AnimatePresence>
                  {showCategoryFilter &&
                    selectedCategories.map((slug) => {
                      const category = categories.find((currentCategory) => currentCategory.slug === slug);
                      if (!category) {
                        return null;
                      }

                      return (
                        <motion.span
                          key={slug}
                          layout
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          className="inline-flex items-center gap-1.5 bg-brand-terracotta/10 text-brand-terracotta text-xs px-3 py-1.5 rounded-full border border-brand-terracotta/20"
                        >
                          {isRTL && category.nameAr ? category.nameAr : category.name}
                          <button
                            type="button"
                            onClick={() => toggleCategory(slug)}
                            className="hover:text-brand-terracotta-dark transition-colors"
                            aria-label={isRTL ? "إزالة الفلتر" : "Remove filter"}
                          >
                            <X size={11} />
                          </button>
                        </motion.span>
                      );
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
                      {t.organicOnly}
                      <button
                        type="button"
                        onClick={() => setShowOrganic(false)}
                        className="hover:text-brand-terracotta-dark transition-colors"
                        aria-label={isRTL ? "إزالة الفلتر" : "Remove filter"}
                      >
                        <X size={11} />
                      </button>
                    </motion.span>
                  )}
                  {searchQuery.trim().length > 0 && (
                    <motion.span
                      key="query"
                      layout
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="inline-flex items-center gap-1.5 bg-brand-peach text-brand-terracotta text-xs px-3 py-1.5 rounded-full border border-brand-terracotta/20"
                    >
                      {searchQuery}
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="hover:text-brand-terracotta-dark transition-colors"
                        aria-label={isRTL ? "مسح البحث" : "Clear search"}
                      >
                        <X size={11} />
                      </button>
                    </motion.span>
                  )}
                  <motion.button
                    key="clear-all"
                    type="button"
                    layout
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 bg-brand-peach hover:bg-brand-terracotta text-brand-terracotta hover:text-white text-xs px-3 py-1.5 rounded-full border border-brand-terracotta/30 transition-all font-semibold active:scale-95"
                  >
                    <X size={11} /> {t.clearAll}
                  </motion.button>
                </AnimatePresence>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div id="product-grid" className="text-center py-20 bg-card border border-border rounded-2xl">
                <p className="text-4xl mb-4">🌿</p>
                <p className="text-muted-foreground">{t.noProductsMatchFilters}</p>
                <button type="button" onClick={clearFilters} className="mt-4 text-brand-terracotta text-sm hover:underline">
                  {t.clearAll}
                </button>
              </div>
            ) : (
              <div
                id="product-grid"
                className={
                  view === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4"
                    : "flex flex-col gap-2 sm:gap-3"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} view={view} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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
              ref={filterDialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={t.filters}
              tabIndex={-1}
              initial={{ x: isRTL ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "100%" : "-100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
              className={`fixed top-0 bottom-0 ${isRTL ? "right-0" : "left-0"} w-full lg:max-w-sm bg-card text-card-foreground z-50 overflow-y-auto shadow-elev flex flex-col`}
            >
              <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between safe-area-pt flex-shrink-0">
                <h2 className="text-foreground font-display text-lg font-bold">{t.filters}</h2>
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  aria-label={isRTL ? "إغلاق" : "Close"}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 flex flex-col gap-6 flex-1 overflow-y-auto">
                <div className="flex flex-col gap-2">
                  <span className="eyebrow px-1">{isRTL ? "ترتيب حسب" : "Sort By"}</span>
                  <CustomDropdown
                    value={sort}
                    onChange={(value) => setSort(value as CatalogSortOption)}
                    options={sortOptions}
                    label={isRTL ? "ترتيب المنتجات" : "Sort products"}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="eyebrow px-1">{t.filters}</span>
                  <div className="bg-muted/50 rounded-md overflow-hidden border border-border p-3.5">
                    <FilterPanel {...panelProps} hideHeader />
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-card/95 backdrop-blur-md border-t border-border p-4 mt-auto flex gap-3 flex-shrink-0">
                {hasActiveFilters && (
                  <Button
                    type="button"
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
                  type="button"
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
