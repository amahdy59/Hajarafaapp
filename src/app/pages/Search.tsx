import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Search as SearchIcon, X } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { useAppSettings } from "../context/AppSettingsContext";

const recentSearches = ["black seed oil", "turmeric", "chamomile tea", "argan oil"];
const popularSearches = ["moringa", "sidr honey", "rose water", "ashwagandha", "matcha"];

const recentSearchesAr = ["حبة البركة", "كركم", "بابونج", "زيت أركان"];
const popularSearchesAr = ["مورينجا", "عسل سدر", "ماء ورد", "اشواغاندا", "ماتشا"];

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, isRTL } = useAppSettings();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.nameAr && p.nameAr.toLowerCase().includes(q)) ||
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
  const recent = isRTL ? recentSearchesAr : recentSearches;
  const popular = isRTL ? popularSearchesAr : popularSearches;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Search input */}
        <div className="relative mb-6">
          <SearchIcon size={18} className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-muted-foreground`} />
          <input
            type="text"
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            autoFocus
            className={`w-full ${isRTL ? "pr-11 pl-11" : "pl-11 pr-11"} py-4 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground outline-none focus:border-brand-terracotta focus:ring-2 focus:ring-brand-terracotta/20 transition-all text-sm shadow-sm`}
          />
          {hasQuery && (
            <button onClick={clearSearch} className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 w-6 h-6 bg-muted rounded-full flex items-center justify-center hover:bg-border transition-colors`}>
              <X size={12} className="text-muted-foreground" />
            </button>
          )}
        </div>

        {!hasQuery ? (
          <div className="space-y-6">
            {/* Recent searches */}
            <div>
              <h3 className="text-muted-foreground eyebrow mb-3">{t.recentSearches}</h3>
              <div className="flex flex-wrap gap-2">
                {recent.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSearch(s)}
                    className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl text-sm text-foreground hover:bg-brand-peach border border-border hover:border-brand-terracotta transition-colors font-medium"
                  >
                    <SearchIcon size={12} className="text-muted-foreground" /> {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular */}
            <div>
              <h3 className="text-muted-foreground eyebrow mb-3">{t.popularSearches}</h3>
              <div className="flex flex-wrap gap-2">
                {popular.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => handleSearch(s)}
                    className="flex items-center gap-1.5 bg-brand-peach text-brand-terracotta px-4 py-2 rounded-xl text-sm hover:bg-brand-terracotta hover:text-white transition-colors font-medium"
                  >
                    {i === 0 ? "🔥" : i === 1 ? "⭐" : "🌿"} {s}
                  </button>
                ))}
              </div>
            </div>

            {/* All products preview */}
            <div>
              <h3 className="text-muted-foreground eyebrow mb-3">{t.featuredProducts}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.slice(0, 6).map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-muted-foreground text-sm mb-4">
              {results.length === 0
                ? `${isRTL ? "لا توجد نتائج لـ" : "No results for"} "${query}"`
                : `${results.length} ${t.productsFound} "${query}"`}
            </p>

            {results.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-2xl shadow-soft">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-foreground font-medium mb-2">
                  {isRTL ? `لا توجد نتائج لـ "${query}"` : `No products found for "${query}"`}
                </p>
                <p className="text-muted-foreground text-sm mb-6">
                  {isRTL ? "جرب كلمات مختلفة أو تصفح الأقسام" : "Try different keywords or browse categories"}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {popular.map(s => (
                    <button
                      key={s}
                      onClick={() => handleSearch(s)}
                      className="bg-brand-peach text-brand-terracotta px-3 py-1.5 rounded-lg text-sm hover:bg-brand-terracotta hover:text-white transition-colors font-medium"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
