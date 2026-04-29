import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { getProductsByCategory } from "../data/products";
import { categories } from "../data/categories";
import { ProductCard } from "../components/ProductCard";

export function Category() {
  const { slug } = useParams();
  const category = categories.find(c => c.slug === slug);
  const categoryProducts = getProductsByCategory(slug || "");

  if (!category) {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🌿</p>
          <h2 className="text-gray-800 mb-2">Category not found</h2>
          <Link to="/products" className="text-[#C4622D] hover:underline">Browse all products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF7F1]">
      {/* Category hero */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-10">
          <div className="max-w-7xl mx-auto w-full">
            <Link to="/products" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-3 transition-colors">
              <ArrowLeft size={14} /> All Products
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{category.icon}</span>
              <div>
                <h1 className="text-white text-2xl sm:text-3xl">{category.name}</h1>
                <p className="text-white/70 text-sm">{category.count}+ products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Other categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap text-sm transition-colors flex-shrink-0 ${
                cat.slug === slug
                  ? "bg-[#C4622D] text-white"
                  : "bg-white text-gray-700 hover:bg-[#F4E7DA]"
              }`}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <p className="text-4xl mb-4">{category.icon}</p>
            <p className="text-gray-500 mb-2">No products in this category yet</p>
            <Link to="/products" className="text-[#C4622D] text-sm hover:underline">Browse all products</Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500 text-sm">{categoryProducts.length} products</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
