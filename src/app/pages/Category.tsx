import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
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
      {/* Category hero */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img src={category.image} alt={categoryName} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-10">
          <div className="max-w-7xl mx-auto w-full">
            <Link to="/products" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-3 transition-colors">
              <ArrowLeft size={14} className="rtl-flip" /> {t.shopAll}
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{category.icon}</span>
              <div>
                <h1 className="text-white text-2xl sm:text-3xl font-display">{categoryName}</h1>
                <p className="text-white/70 text-sm">{category.count}+ {t.productsFound}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
