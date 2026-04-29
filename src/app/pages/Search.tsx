import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Search as SearchIcon, X } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

const recentSearches = ["black seed oil", "turmeric", "chamomile tea", "argan oil"];
const popularSearches = ["moringa", "sidr honey", "rose water", "ashwagandha", "matcha"];

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [query]);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.trim()) {
      setSearchParams({ q: q.trim() });
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearchParams({});
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#FBF7F1]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Search input */}
        <div className="relative mb-6">
          <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search for herbal products..."
            autoFocus
            className="w-full pl-11 pr-11 py-4 bg-white border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 outline-none focus:border-[#C4622D] focus:ring-2 focus:ring-[#C4622D]/20 transition-all text-sm shadow-sm"
          />
          {hasQuery && (
            <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <X size={12} className="text-gray-500" />
            </button>
          )}
        </div>

        {!hasQuery ? (
          <div className="space-y-6">
            {/* Recent searches */}
            <div>
              <h3 className="text-gray-700 text-sm mb-3">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSearch(s)}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-sm text-gray-700 hover:bg-[#F4E7DA] border border-gray-100 transition-colors"
                  >
                    <SearchIcon size={12} className="text-gray-400" /> {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular */}
            <div>
              <h3 className="text-gray-700 text-sm mb-3">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => handleSearch(s)}
                    className="flex items-center gap-1.5 bg-[#F4E7DA] text-[#C4622D] px-4 py-2 rounded-xl text-sm hover:bg-[#C4622D] hover:text-white transition-colors"
                  >
                    {i === 0 ? "🔥" : i === 1 ? "⭐" : "🌿"} {s}
                  </button>
                ))}
              </div>
            </div>

            {/* All products preview */}
            <div>
              <h3 className="text-gray-700 text-sm mb-3">All Products</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {products.slice(0, 6).map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-500 text-sm mb-4">
              {results.length === 0
                ? `No results for "${query}"`
                : `${results.length} results for "${query}"`}
            </p>

            {results.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-gray-500 mb-2">No products found for "{query}"</p>
                <p className="text-gray-400 text-sm mb-6">Try different keywords or browse categories</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {popularSearches.map(s => (
                    <button
                      key={s}
                      onClick={() => handleSearch(s)}
                      className="bg-[#F4E7DA] text-[#C4622D] px-3 py-1.5 rounded-lg text-sm hover:bg-[#C4622D] hover:text-white transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {results.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="h-20 sm:h-4" />
    </div>
  );
}
