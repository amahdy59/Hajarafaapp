import { useState, useMemo } from "react";
import { SlidersHorizontal, Grid3X3, List, ChevronDown, X } from "lucide-react";
import { useSearchParams } from "react-router";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { ProductCard } from "../components/ProductCard";
import { motion, AnimatePresence } from "motion/react";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "new";

export function Products() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

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
      result = result.filter(p => selectedCategories.includes(p.categorySlug));
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

  const FilterPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-xs text-[#C4622D] flex items-center gap-1">
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm text-gray-700 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedCategories.includes(cat.slug)
                    ? "border-[#C4622D] bg-[#C4622D]"
                    : "border-gray-300 group-hover:border-[#C4622D]"
                }`}
                onClick={() => toggleCategory(cat.slug)}
              >
                {selectedCategories.includes(cat.slug) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-600">{cat.icon} {cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h4 className="text-sm text-gray-700 mb-3">Price Range</h4>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center outline-none focus:border-[#C4622D]"
            min={0}
            max={priceRange[1]}
          />
          <span className="text-gray-400 text-sm">—</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-center outline-none focus:border-[#C4622D]"
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
          className="w-full accent-[#C4622D]"
        />
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-sm text-gray-700 mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2].map(r => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={minRating === r}
                onChange={() => setMinRating(minRating === r ? 0 : r)}
                className="accent-[#C4622D]"
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < r ? "text-amber-400" : "text-gray-200"}`}>★</span>
                ))}
                <span className="text-xs text-gray-500">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Organic only */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          className={`w-10 h-6 rounded-full transition-colors relative ${showOrganic ? "bg-[#C4622D]" : "bg-gray-200"}`}
          onClick={() => setShowOrganic(!showOrganic)}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${showOrganic ? "translate-x-5" : "translate-x-1"}`} />
        </div>
        <span className="text-sm text-gray-700">Organic only</span>
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FBF7F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-1">
            {filter === "deals" ? "🔥 Special Deals" : "All Products"}
          </h1>
          <p className="text-gray-500 text-sm">{filteredProducts.length} products found</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 sticky top-28">
              <FilterPanel />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 bg-white rounded-xl px-4 py-3">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <SlidersHorizontal size={16} />
                Filters
                {hasActiveFilters && (
                  <span className="bg-[#C4622D] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {selectedCategories.length + (showOrganic ? 1 : 0)}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-3 ml-auto">
                <div className="relative">
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value as SortOption)}
                    className="appearance-none bg-[#F4E7DA] pl-3 pr-8 py-2 rounded-lg text-sm text-gray-700 outline-none cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="new">New Arrivals</option>
                  </select>
                  <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>

                <div className="flex items-center gap-1 bg-[#F4E7DA] rounded-lg p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={`p-1.5 rounded ${view === "grid" ? "bg-white shadow-sm" : ""}`}
                  >
                    <Grid3X3 size={16} className={view === "grid" ? "text-[#C4622D]" : "text-gray-400"} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-1.5 rounded ${view === "list" ? "bg-white shadow-sm" : ""}`}
                  >
                    <List size={16} className={view === "list" ? "text-[#C4622D]" : "text-gray-400"} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map(slug => {
                  const cat = categories.find(c => c.slug === slug);
                  return cat ? (
                    <span key={slug} className="inline-flex items-center gap-1.5 bg-[#C4622D]/10 text-[#C4622D] text-xs px-3 py-1.5 rounded-full">
                      {cat.name}
                      <button onClick={() => toggleCategory(slug)}><X size={11} /></button>
                    </span>
                  ) : null;
                })}
                {showOrganic && (
                  <span className="inline-flex items-center gap-1.5 bg-[#C4622D]/10 text-[#C4622D] text-xs px-3 py-1.5 rounded-full">
                    Organic only <button onClick={() => setShowOrganic(false)}><X size={11} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Products grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl">
                <p className="text-4xl mb-4">🌿</p>
                <p className="text-gray-500">No products match your filters</p>
                <button onClick={clearFilters} className="mt-4 text-[#C4622D] text-sm hover:underline">Clear all filters</button>
              </div>
            ) : (
              <div className={view === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 gap-4"
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
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 overflow-y-auto p-5"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-gray-900">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <FilterPanel />
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-[#C4622D] text-white py-3 rounded-xl mt-6"
              >
                Apply Filters ({filteredProducts.length} results)
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-20 sm:h-4" />
    </div>
  );
}
