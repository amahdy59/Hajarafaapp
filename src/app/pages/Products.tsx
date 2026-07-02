import { useSearchParams } from "react-router";
import { CatalogBrowser } from "../features/catalog/CatalogBrowser";
import { products } from "../data/products";
import { useAppSettings } from "../context/AppSettingsContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function Products() {
  const [searchParams] = useSearchParams();
  const { isRTL, t } = useAppSettings();
  const filter = searchParams.get("filter");
  const initialSearchQuery = searchParams.get("q") || "";
  const visibleProducts = filter === "deals" ? products.filter((product) => product.discount) : products;
  const pageTitle = filter === "deals" ? t.todaysDeals : t.shopAll;

  usePageMeta({
    description: isRTL
      ? "استعرض جميع منتجات حاج عرفة الطبيعية مع أدوات بحث وتصفية أسهل."
      : "Browse Haj Arafa's full natural product catalogue with improved search and filtering.",
    title: isRTL
      ? `${pageTitle} | حاج عرفة`
      : `${pageTitle} | Haj Arafa`,
  });

  return (
    <CatalogBrowser
      initialSearchQuery={initialSearchQuery}
      products={visibleProducts}
      searchPlaceholder={isRTL ? "ابحث عن منتج..." : "Search products..."}
      title={filter === "deals" ? `🔥 ${pageTitle}` : pageTitle}
    />
  );
}
