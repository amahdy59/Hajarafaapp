import { Link, useParams } from "react-router";
import { getProductsByCategory } from "../data/products";
import { categories } from "../data/categories";
import { CatalogBrowser } from "../features/catalog/CatalogBrowser";
import { useAppSettings } from "../context/AppSettingsContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function Category() {
  const { slug } = useParams();
  const { isRTL, t } = useAppSettings();
  const category = categories.find((currentCategory) => currentCategory.slug === slug);
  const categoryProducts = getProductsByCategory(slug || "");
  const categoryName = category
    ? isRTL && category.nameAr
      ? category.nameAr
      : category.name
    : t.categoryNotFound;

  usePageMeta({
    description: category
      ? isRTL
        ? `ØªØ³ÙˆÙ‚ Ù…Ù†ØªØ¬Ø§Øª ${categoryName} Ù…Ù† Ø­Ø§Ø¬ Ø¹Ø±ÙØ© Ù…Ø¹ ØªØ¬Ø±Ø¨Ø© ØªØµÙØ­ Ø£ÙˆØ¶Ø­.`
        : `Shop Haj Arafa ${categoryName} products with clearer browsing and filters.`
      : isRTL
        ? "Ø§Ù„ÙØ¦Ø© Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© ØºÙŠØ± Ù…ØªØ§Ø­Ø© Ø­Ø§Ù„ÙŠØ§Ù‹."
        : "The requested category is currently unavailable.",
    title: category
      ? isRTL
        ? `${categoryName} | Ø­Ø§Ø¬ Ø¹Ø±ÙØ©`
        : `${categoryName} | Haj Arafa`
      : isRTL
        ? "Ø§Ù„ÙØ¦Ø© ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯Ø© | Ø­Ø§Ø¬ Ø¹Ø±ÙØ©"
        : "Category Not Found | Haj Arafa",
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">ðŸŒ¿</p>
          <h1 className="text-foreground mb-2 font-display">{t.categoryNotFound}</h1>
          <Link to="/products" className="text-brand-terracotta hover:underline">
            {t.browseAllProducts}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <CatalogBrowser
      products={categoryProducts}
      searchPlaceholder={t.searchInThisCategory}
      showCategoryFilter={false}
      title={categoryName}
    />
  );
}
