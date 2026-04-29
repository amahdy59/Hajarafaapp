import { Heart, ShoppingCart, Leaf } from "lucide-react";
import { Link } from "react-router";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { StarRating } from "./StarRating";
import { toast } from "sonner";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  view?: "grid" | "list";
}

export function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      description: `LE ${product.price.toFixed(2)}`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist", {
      icon: wishlisted ? "💔" : "❤️",
    });
  };

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
      >
        <Link to={`/products/${product.id}`} className="flex gap-4 p-4">
          <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-[#F4E7DA]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.discount && (
              <span className="absolute top-1.5 left-1.5 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
            <div>
              {product.isOrganic && (
                <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full mb-1">
                  <Leaf size={10} /> Organic
                </span>
              )}
              <h3 className="text-gray-900 line-clamp-2 mb-1">{product.name}</h3>
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>
            <div className="flex items-center justify-between mt-2">
              <div>
                <span className="text-[#C4622D]">{product.priceFrom ? "From " : ""}LE {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm ml-2">LE {product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleWishlist} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Heart size={16} className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-[#C4622D] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#9A4A20] transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square bg-[#F4E7DA] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.discount && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                -{product.discount}%
              </span>
            )}
            {product.isNew && (
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                Best Seller
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          >
            <Heart size={15} className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"} />
          </button>

          {/* Quick add */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-3 right-3 bg-[#C4622D]/90 backdrop-blur-sm text-white text-sm py-2 rounded-xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <ShoppingCart size={15} />
            Add to Cart
          </button>
        </div>

        <div className="p-4">
          {product.isOrganic && (
            <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full mb-2">
              <Leaf size={9} /> Organic
            </span>
          )}
          <p className="text-xs text-gray-400 mb-0.5">{product.category}</p>
          <h3 className="text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[#C4622D]">{product.priceFrom ? "From " : ""}LE {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">LE {product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">{product.weight} · {product.origin}</p>
        </div>
      </Link>
    </motion.div>
  );
}
