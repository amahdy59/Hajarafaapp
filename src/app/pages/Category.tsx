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

  const siteUrl = "https://amahdy59.github.io/Hajarafaapp/";
  const currentUrl = typeof window !== "undefined" ? window.location.href : `${siteUrl}#/category/${slug}`;

  const breadcrumbSchema = category ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isRTL ? "الرئيسية" : "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryName,
        item: currentUrl,
      },
    ],
  } : undefined;

  usePageMeta({
    description: category
      ? isRTL
        ? `تسوق منتجات ${categoryName} من حاج عرفة مع تجربة تصفح أوضح.`
        : `Shop Haj Arafa ${categoryName} products with clearer browsing and filters.`
      : isRTL
        ? "الفئة المطلوبة غير متاحة حالياً."
        : "The requested category is currently unavailable.",
    title: category
      ? isRTL
        ? `${categoryName} | حاج عرفة`
        : `${categoryName} | Haj Arafa`
      : isRTL
        ? "الفئة غير موجودة | حاج عرفة"
        : "Category Not Found | Haj Arafa",
    structuredData: breadcrumbSchema,
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4" role="img" aria-label={isRTL ? "نبتة" : "Plant"}>🌿</p>
          <h1 className="text-foreground mb-2 font-display">{t.categoryNotFound}</h1>
          <Link
            to="/products"
            className="inline-flex items-center justify-center text-brand-terracotta hover:underline min-h-[44px] px-4 py-2 font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta rounded-lg"
          >
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
