import { useState } from "react";
import { useParams, Link } from "react-router";
import { Heart, ShoppingCart, Share2, ChevronLeft, Star, Plus, Minus, Leaf, Truck, Shield, RotateCcw, Check, ChevronDown } from "lucide-react";
import { getProductById, products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { StarRating } from "../components/StarRating";
import { ProductCard } from "../components/ProductCard";
import { toast } from "sonner";
import { motion } from "motion/react";

const mockReviews = [
  { id: 1, name: "Sarah M.", rating: 5, date: "April 2025", verified: true, review: "Absolutely love this product! The quality is exceptional and the results speak for themselves. I've been recommending it to everyone I know.", helpful: 24 },
  { id: 2, name: "Ahmed K.", rating: 5, date: "March 2025", verified: true, review: "Authentic and pure. You can really tell the difference in quality compared to what you find in local shops. Fast delivery too!", helpful: 18 },
  { id: 3, name: "Emma L.", rating: 4, date: "March 2025", verified: true, review: "Great product overall. Packaging could be improved slightly but the product itself is excellent. Will definitely reorder.", helpful: 12 },
];

export function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "usage" | "reviews">("description");
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const wishlisted = product ? isWishlisted(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🌿</p>
          <h2 className="text-gray-800 mb-2">Product not found</h2>
          <Link to="/products" className="text-[#C4622D] hover:underline">Browse all products</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity}x ${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist", {
      icon: wishlisted ? "💔" : "❤️",
    });
  };

  return (
    <div className="min-h-screen bg-[#FBF7F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gray-600">Products</Link>
          <span>/</span>
          <Link to={`/category/${product.categorySlug}`} className="hover:text-gray-600">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-40">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-sm"
            >
              <img
                src={product.images[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  -{product.discount}% OFF
                </span>
              )}
              {product.isOrganic && (
                <span className="absolute top-4 right-4 bg-[#C4622D] text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Leaf size={12} /> Organic
                </span>
              )}
            </motion.div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImage === i ? "border-[#C4622D]" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link
                  to={`/category/${product.categorySlug}`}
                  className="text-xs text-[#C4622D] bg-[#F4E7DA] px-3 py-1 rounded-full"
                >
                  {product.category}
                </Link>
                {product.isBestSeller && (
                  <span className="text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full">Best Seller</span>
                )}
                {product.isNew && (
                  <span className="text-xs text-blue-700 bg-blue-50 px-3 py-1 rounded-full">New</span>
                )}
              </div>
              <h1 className="text-gray-900 text-2xl sm:text-3xl mb-1">{product.name}</h1>
              {product.nameAr && (
                <p className="text-gray-400 text-sm" dir="rtl">{product.nameAr}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl text-[#C4622D]">LE {product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 text-lg line-through">LE {product.originalPrice.toFixed(2)}</span>
              )}
              {product.discount && (
                <span className="text-red-500 text-sm">Save ${(product.originalPrice! - product.price).toFixed(2)}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-[#F4E7DA] rounded-xl px-4 py-2.5">
                <p className="text-gray-400 text-xs">Weight / Size</p>
                <p className="text-gray-800">{product.weight}</p>
              </div>
              <div className="bg-[#F4E7DA] rounded-xl px-4 py-2.5">
                <p className="text-gray-400 text-xs">Origin</p>
                <p className="text-gray-800">{product.origin}</p>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <p className="text-sm text-gray-600 mb-2">Key Benefits</p>
              <div className="flex flex-wrap gap-2">
                {product.benefits.map(benefit => (
                  <span key={benefit} className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                    <Check size={10} /> {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex gap-3">
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus size={16} className="text-gray-600" />
                </button>
                <span className="w-10 text-center text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} className="text-gray-600" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#C4622D] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#9A4A20] transition-colors active:scale-[0.98]"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${
                  wishlisted ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-red-300"
                }`}
              >
                <Heart size={18} className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
              </button>
            </div>

            <button className="w-full border-2 border-[#C4622D] text-[#C4622D] py-3 rounded-xl hover:bg-[#C4622D] hover:text-white transition-all flex items-center justify-center gap-2">
              Buy Now
            </button>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, text: "Free shipping over $50" },
                { icon: Shield, text: "Quality guaranteed" },
                { icon: RotateCcw, text: "30-day returns" },
              ].map(item => (
                <div key={item.text} className="flex flex-col items-center gap-1.5 text-center p-3 bg-[#F4E7DA] rounded-xl">
                  <item.icon size={18} className="text-[#C4622D]" />
                  <p className="text-xs text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
              <Share2 size={14} /> Share this product
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl overflow-hidden mb-10">
          <div className="flex border-b border-gray-100">
            {(["description", "usage", "reviews"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm capitalize transition-colors relative ${
                  activeTab === tab ? "text-[#C4622D]" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "reviews" ? `Reviews (${product.reviewCount})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C4622D]" />
                )}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === "description" && (
              <div>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">{product.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Weight</p>
                    <p className="text-gray-800">{product.weight}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Origin</p>
                    <p className="text-gray-800">{product.origin}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Category</p>
                    <p className="text-gray-800">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Organic</p>
                    <p className="text-gray-800">{product.isOrganic ? "Yes ✓" : "No"}</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "usage" && (
              <div>
                <h4 className="text-gray-800 mb-3">How to Use</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{product.usage}</p>
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-amber-800 text-sm">⚠️ <strong>Note:</strong> This product is for wellness support. Please consult a healthcare professional before use if you have any medical conditions or are taking medication.</p>
                </div>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-[#F4E7DA] rounded-2xl">
                  <div className="text-center">
                    <p className="text-4xl text-[#C4622D]">{product.rating}</p>
                    <StarRating rating={product.rating} showCount={false} size="md" />
                    <p className="text-xs text-gray-400 mt-1">{product.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map(stars => {
                      const pct = stars === 5 ? 68 : stars === 4 ? 22 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
                      return (
                        <div key={stars} className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{stars}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span>{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {mockReviews.map(review => (
                  <div key={review.id} className="border-b border-gray-100 pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-900">{review.name}</p>
                          {review.verified && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                              <Check size={10} /> Verified
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{review.review}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {review.helpful} people found this helpful
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mb-10">
            <h2 className="text-gray-900 mb-5">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="h-20 sm:h-4" />
    </div>
  );
}
