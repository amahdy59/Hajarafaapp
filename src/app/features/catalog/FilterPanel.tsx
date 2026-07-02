import { useId } from "react";
import { Check, X } from "lucide-react";
import { categories } from "../../data/categories";
import type { Translations } from "../../context/AppSettingsContext";

interface FilterPanelProps {
  clearFilters: () => void;
  hasActiveFilters: boolean;
  hideHeader?: boolean;
  isRTL: boolean;
  maxPrice: number;
  minRating: number;
  priceRange: [number, number];
  selectedCategories: string[];
  setMinRating: (rating: number) => void;
  setPriceRange: (range: [number, number]) => void;
  setShowOrganic: (show: boolean) => void;
  showCategoryFilter?: boolean;
  showOrganic: boolean;
  t: Translations;
  toggleCategory: (slug: string) => void;
}

export function FilterPanel({
  clearFilters,
  hasActiveFilters,
  hideHeader = false,
  isRTL,
  maxPrice,
  minRating,
  priceRange,
  selectedCategories,
  setMinRating,
  setPriceRange,
  setShowOrganic,
  showCategoryFilter = true,
  showOrganic,
  t,
  toggleCategory,
}: FilterPanelProps) {
  const panelId = useId();
  const minPriceId = `${panelId}-price-min`;
  const maxPriceId = `${panelId}-price-max`;
  const rangeId = `${panelId}-price-range`;

  return (
    <div className="space-y-3 sm:space-y-4">
      {!hideHeader && (
        <div className="flex items-center justify-between">
          <h3 className="text-foreground font-bold text-sm sm:text-base">{t.filters}</h3>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-brand-terracotta hover:underline flex items-center gap-1 font-bold"
            >
              <X size={12} /> {t.clearAll}
            </button>
          )}
        </div>
      )}

      {showCategoryFilter && (
        <div>
          <h4 className="text-sm text-foreground/80 mb-2 font-bold">{t.shopByCategory}</h4>
          <div className="space-y-1 sm:space-y-1.5">
            {categories.map((category) => {
              const checked = selectedCategories.includes(category.slug);

              return (
                <label
                  key={category.id}
                  className="flex items-center gap-2.5 cursor-pointer group select-none text-sm text-foreground/80 font-medium focus-within:text-brand-terracotta"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCategory(category.slug)}
                    className="sr-only peer"
                  />
                  <span
                    aria-hidden="true"
                    className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors peer-focus:ring-2 peer-focus:ring-brand-terracotta/40 ${
                      checked
                        ? "border-brand-terracotta bg-brand-terracotta"
                        : "border-border group-hover:border-brand-terracotta"
                    }`}
                  >
                    {checked && <Check size={10} className="text-white" />}
                  </span>
                  <span>{category.icon} {isRTL && category.nameAr ? category.nameAr : category.name}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <fieldset className="space-y-1.5">
        <legend className="text-sm text-foreground/80 mb-2 font-bold">{t.priceRange}</legend>
        <div className="flex items-center gap-1.5 mb-1.5">
          <label htmlFor={minPriceId} className="sr-only">
            {isRTL ? "الحد الأدنى للسعر" : "Minimum price"}
          </label>
          <input
            id={minPriceId}
            type="number"
            value={priceRange[0]}
            onChange={(event) =>
              setPriceRange([
                Math.max(0, Number(event.target.value || 0)),
                priceRange[1],
              ])
            }
            className="w-full border border-border bg-card rounded-lg px-2 py-1.5 text-sm text-center text-foreground outline-none focus:border-brand-terracotta"
            min={0}
            max={priceRange[1]}
          />
          <span className="text-muted-foreground text-sm" aria-hidden="true">-</span>
          <label htmlFor={maxPriceId} className="sr-only">
            {isRTL ? "الحد الأقصى للسعر" : "Maximum price"}
          </label>
          <input
            id={maxPriceId}
            type="number"
            value={priceRange[1]}
            onChange={(event) =>
              setPriceRange([
                priceRange[0],
                Math.min(maxPrice, Number(event.target.value || 0)),
              ])
            }
            className="w-full border border-border bg-card rounded-lg px-2 py-1.5 text-sm text-center text-foreground outline-none focus:border-brand-terracotta"
            min={priceRange[0]}
            max={maxPrice}
          />
        </div>
        <label htmlFor={rangeId} className="sr-only">
          {isRTL ? "اختيار الحد الأقصى للسعر" : "Choose maximum price"}
        </label>
        <input
          id={rangeId}
          type="range"
          min={0}
          max={maxPrice}
          value={priceRange[1]}
          onChange={(event) => setPriceRange([priceRange[0], Number(event.target.value)])}
          className="w-full accent-brand-terracotta h-1"
        />
      </fieldset>

      <fieldset>
        <legend className="text-sm text-foreground/80 mb-2 font-bold">{t.minRating}</legend>
        <div className="space-y-1 sm:space-y-1.5">
          {[4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center gap-2.5 cursor-pointer text-foreground/80 select-none text-sm">
              <input
                type="radio"
                checked={minRating === rating}
                onChange={() => setMinRating(minRating === rating ? 0 : rating)}
                className="accent-brand-terracotta w-4 h-4 cursor-pointer"
              />
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`text-sm ${index < rating ? "text-amber-400" : "text-muted-foreground"}`}>★</span>
                ))}
                <span className="text-xs text-muted-foreground ms-1">{isRTL ? "فأعلى" : "& up"}</span>
              </div>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-center gap-2.5 cursor-pointer select-none text-sm text-foreground/80 font-semibold focus-within:text-brand-terracotta">
        <input
          type="checkbox"
          checked={showOrganic}
          onChange={() => setShowOrganic(!showOrganic)}
          className="sr-only peer"
        />
        <span
          aria-hidden="true"
          className={`w-9 h-5 rounded-full transition-colors relative peer-focus:ring-2 peer-focus:ring-brand-terracotta/40 ${showOrganic ? "bg-brand-terracotta" : "bg-border"}`}
        >
          <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${showOrganic ? (isRTL ? "-translate-x-4.5" : "translate-x-4.5") : (isRTL ? "-translate-x-0.5" : "translate-x-0.5")}`} />
        </span>
        <span>{t.organicOnly}</span>
      </label>
    </div>
  );
}
