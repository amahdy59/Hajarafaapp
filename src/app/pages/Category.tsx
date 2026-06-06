import { useParams, Link } from "react-router";
import { getProductsByCategory } from "../data/products";
import { categories } from "../data/categories";
import { ProductCard } from "../components/ProductCard";
import { useAppSettings } from "../context/AppSettingsContext";

export function Category() {
  const { slug } = useParams();
  const { t, isRTL } = useAppSettings();
  const category = categories.find(c => c.slug === slug);
  const categoryProducts = getProductsByCategory(slug || "");

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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-[28px]">
        <div className="mb-6">
          <h1 className="text-foreground font-display text-2xl mb-1 leading-tight">
            {categoryName}
          </h1>
          <p className="text-muted-foreground text-sm">{categoryProducts.length} {t.productsFound}</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">

        {categoryProducts.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-2xl shadow-soft">
            <p className="text-4xl mb-4">{category.icon}</p>
            <p className="text-muted-foreground mb-2">{t.noProductsInCategoryYet}</p>
            <Link to="/products" className="text-brand-terracotta text-sm hover:underline">{t.browseAllProducts}</Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground text-sm">{categoryProducts.length} {t.productsFound}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="h-20 sm:h-4" />
    </div>
  );
}
