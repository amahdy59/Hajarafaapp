import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useWishlist } from "../context/WishlistContext";
import { ProductCard } from "../components/ProductCard";
import { motion } from "motion/react";

export function Wishlist() {
  const { items } = useWishlist();

  return (
    <div className="min-h-screen bg-[#FBF7F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Heart size={22} className="text-red-500 fill-red-500" />
          <h1 className="text-gray-900">Wishlist</h1>
          <span className="bg-red-50 text-red-500 text-sm px-3 py-1 rounded-full">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-white rounded-3xl"
          >
            <Heart size={56} className="text-gray-200 mx-auto mb-4" />
            <h2 className="text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 text-sm mb-6">Save products you love for later</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#C4622D] text-white px-6 py-3 rounded-xl hover:bg-[#9A4A20] transition-colors"
            >
              Discover Products <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <div className="h-20 sm:h-4" />
    </div>
  );
}
