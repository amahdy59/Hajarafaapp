import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Heart, ShoppingCart, Share2, ChevronLeft, Star, Plus, Minus, Leaf, Truck, Shield, RotateCcw, Check } from "lucide-react";
import { getProductById, products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { StarRating } from "../components/StarRating";
import { ProductCard } from "../components/ProductCard";
import { toast } from "sonner";
import { motion } from "motion/react";

const mockReviews = [
  { id: 1, name: "Sarah M.", rating: 5, date: "April 2025", verified: true, review: "Absolutely love this product! The quality is exceptional and the results speak for themselves.", helpful: 24 },
  { id: 2, name: "Ahmed K.", rating: 5, date: "March 2025", verified: true, review: "Authentic and pure. You can really tell the difference in quality. Fast delivery too!", helpful: 18 },
  { id: 3, name: "Emma L.", rating: 4, date: "March 2025", verified: true, review: "Great product overall. Will definitely reorder.", helpful: 12 },
];

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { t, isRTL } = useAppSettings();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "usage" | "reviews">("description");
  const wishlisted = product ? isWishlisted(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-5xl">🌿</p>
          <h2 className="text-foreground">{isRTL ? "المنتج غير موجود" : "Product not found"}</h2>
          <Link to="/products" className="text-brand-terracotta hover:underline" style={{ fontSize: "0.9rem" }}>
            {t.browseProducts}
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity}× ${isRTL && product.nameAr ? product.nameAr : product.name} ${isRTL ? "أضيف للسلة" : "added to cart"}`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast(wishlisted
      ? (isRTL ? "أُزيل من المفضلة" : "Removed from wishlist")
      : (isRTL ? "أُضيف للمفضلة" : "Added to wishlist"),
      { icon: wishlisted ? "💔" : "❤️" });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const handleShare = () => {
    const title = isRTL && product.nameAr ? product.nameAr : product.name;
    const shareData = {
      title,
      text: product.description,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success(t.productCopied))
        .catch(() => toast.error(isRTL ? "فشل نسخ الرابط" : "Failed to copy link"));
    }
  };

  const tabLabels = {
    description: t.description,
    usage: t.howToUse,
    reviews: isRTL ? `${t.reviews} (${product.reviewCount})` : `${t.reviews} (${product.reviewCount})`,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 mb-6" style={{ fontSize: "0.8rem" }}>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">{t.home}</Link>
          <ChevronLeft size={12} className="text-muted-foreground rtl-flip" />
          <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">{t.shopAll}</Link>
          <ChevronLeft size={12} className="text-muted-foreground rtl-flip" />
          <Link to={`/category/${product.categorySlug}`} className="text-muted-foreground hover:text-foreground transition-colors">{isRTL && product.categoryAr ? product.categoryAr : product.category}</Link>
          <ChevronLeft size={12} className="text-muted-foreground rtl-flip" />
          <span className="text-foreground truncate max-w-40">{isRTL && product.nameAr ? product.nameAr : product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square bg-brand-cream-2 rounded-3xl overflow-hidden"
            >
              <img
                src={product.images[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-contain p-6 mix-blend-multiply"
              />
              {product.discount && (
                <span className="absolute top-4 start-4 bg-brand-terracotta text-white px-3 py-1 rounded-full" style={{ fontSize: "0.8rem" }}>
                  -{product.discount}%
                </span>
              )}
              {product.isOrganic && (
                <span className="absolute top-4 end-4 bg-brand-sage-dark text-white px-3 py-1 rounded-full flex items-center gap-1" style={{ fontSize: "0.8rem" }}>
                  <Leaf size={11} /> {isRTL ? "عضوي" : "Organic"}
                </span>
              )}
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors bg-brand-cream-2 ${
                      activeImage === i ? "border-brand-terracotta" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1 mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Link
                  to={`/category/${product.categorySlug}`}
                  className="text-brand-terracotta bg-brand-peach px-3 py-1 rounded-full"
                  style={{ fontSize: "0.75rem" }}
                >
                  {isRTL && product.categoryAr ? product.categoryAr : product.category}
                </Link>
                {product.isBestSeller && (
                  <span className="text-brand-forest bg-brand-cream-2 px-3 py-1 rounded-full" style={{ fontSize: "0.75rem" }}>
                    {t.bestSellers}
                  </span>
                )}
                {product.isNew && (
                  <span className="text-brand-sage-dark bg-brand-cream-2 px-3 py-1 rounded-full" style={{ fontSize: "0.75rem" }}>
                    {t.newArrivals}
                  </span>
                )}
              </div>
              <h1 className="text-foreground font-display mb-1" style={{ fontSize: "clamp(1.4rem, 4vw, 1.75rem)" }}>{isRTL && product.nameAr ? product.nameAr : product.name}</h1>
              {product.nameAr && (
                <p className="text-muted-foreground" dir="rtl" style={{ fontSize: "0.9rem" }}>{product.nameAr}</p>
              )}
            </div>

            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />

            <div className="flex items-baseline gap-3">
              <span className="text-brand-terracotta" style={{ fontSize: "2rem" }}>
                {t.currency} {product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through" style={{ fontSize: "1.1rem" }}>
                  {t.currency} {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-brand-peach rounded-xl px-4 py-2.5">
                <p className="text-muted-foreground mb-0.5" style={{ fontSize: "0.72rem" }}>
                  {isRTL ? "الوزن / الحجم" : "Weight / Size"}
                </p>
                <p className="text-foreground" style={{ fontSize: "0.9rem" }}>{product.weight}</p>
              </div>
              <div className="bg-brand-peach rounded-xl px-4 py-2.5">
                <p className="text-muted-foreground mb-0.5" style={{ fontSize: "0.72rem" }}>
                  {isRTL ? "المنشأ" : "Origin"}
                </p>
                <p className="text-foreground" style={{ fontSize: "0.9rem" }}>{product.origin}</p>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <p className="text-muted-foreground mb-2" style={{ fontSize: "0.8rem" }}>
                {isRTL ? "الفوائد الرئيسية" : "Key Benefits"}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.benefits.map(benefit => (
                  <span
                    key={benefit}
                    className="inline-flex items-center gap-1 bg-brand-cream-2 text-brand-forest px-3 py-1.5 rounded-full"
                    style={{ fontSize: "0.75rem" }}
                  >
                    <Check size={10} /> {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-3">
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-muted transition-colors"
                >
                  <Minus size={16} className="text-foreground" />
                </button>
                <span className="w-10 text-center text-foreground" style={{ fontSize: "0.95rem" }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-3 hover:bg-muted transition-colors"
                >
                  <Plus size={16} className="text-foreground" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-brand-terracotta text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-terracotta-dark transition-colors active:scale-[0.98]"
              >
                <ShoppingCart size={18} />
                {t.addToCart}
              </button>
              <button
                onClick={handleWishlist}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                  wishlisted ? "border-brand-terracotta bg-brand-peach" : "border-border hover:border-brand-terracotta"
                }`}
                aria-label={t.favourites}
              >
                <Heart size={18} className={wishlisted ? "fill-brand-terracotta text-brand-terracotta" : "text-muted-foreground"} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full border border-brand-terracotta text-brand-terracotta py-3 rounded-xl hover:bg-brand-terracotta hover:text-white transition-all flex items-center justify-center gap-2 active:scale-[0.98] font-medium"
            >
              {t.buyNow}
            </button>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Truck, en: "Free shipping over LE 500", ar: "شحن مجاني فوق ٥٠٠ج.م" },
                { icon: Shield, en: "Quality guaranteed", ar: "جودة مضمونة" },
                { icon: RotateCcw, en: "30-day returns", ar: "إرجاع خلال ٣٠ يوماً" },
              ].map(item => (
                <div key={item.en} className="flex flex-col items-center gap-1.5 text-center p-3 bg-brand-peach rounded-xl">
                  <item.icon size={18} className="text-brand-terracotta" />
                  <p className="text-muted-foreground" style={{ fontSize: "0.7rem", lineHeight: 1.3 }}>
                    {isRTL ? item.ar : item.en}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
              style={{ fontSize: "0.875rem" }}
            >
              <Share2 size={14} /> {t.shareThisProduct}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-card rounded-3xl overflow-hidden mb-10 border border-border">
          <div className="flex border-b border-border">
            {(["description", "usage", "reviews"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 transition-colors relative ${
                  activeTab === tab ? "text-brand-terracotta" : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontSize: "0.875rem" }}
              >
                {tabLabels[tab]}
                {activeTab === tab && (
                  <motion.div layoutId="tabIndicator" className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-terracotta" />
                )}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === "description" && (
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontSize: "0.9rem" }}>{product.description}</p>
                <div className="grid grid-cols-2 gap-4" style={{ fontSize: "0.875rem" }}>
                  {[
                    { label: isRTL ? "الوزن" : "Weight", value: product.weight },
                    { label: isRTL ? "المنشأ" : "Origin", value: product.origin },
                    { label: isRTL ? "الفئة" : "Category", value: isRTL && product.categoryAr ? product.categoryAr : product.category },
                    { label: isRTL ? "عضوي" : "Organic", value: product.isOrganic ? (isRTL ? "نعم ✓" : "Yes ✓") : (isRTL ? "لا" : "No") },
                  ].map(d => (
                    <div key={d.label}>
                      <p className="text-muted-foreground mb-1" style={{ fontSize: "0.75rem" }}>{d.label}</p>
                      <p className="text-foreground">{d.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "usage" && (
              <div>
                <h4 className="text-foreground mb-3">{isRTL ? "طريقة الاستخدام" : "How to Use"}</h4>
                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "0.875rem" }}>{product.usage}</p>
                <div className="mt-4 bg-brand-peach border border-brand-terracotta/20 rounded-xl p-4">
                  <p className="text-brand-terracotta" style={{ fontSize: "0.8rem" }}>
                    ⚠️ {isRTL ? "هذا المنتج لدعم الصحة العامة. استشر طبيبك عند الحاجة." : "This product is for wellness support. Consult a healthcare professional if you have any medical conditions."}
                  </p>
                </div>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-brand-peach rounded-2xl">
                  <div className="text-center">
                    <p className="text-brand-terracotta" style={{ fontSize: "2.5rem", lineHeight: 1 }}>{product.rating}</p>
                    <StarRating rating={product.rating} showCount={false} size="md" />
                    <p className="text-muted-foreground mt-1" style={{ fontSize: "0.72rem" }}>{product.reviewCount} {isRTL ? "تقييم" : "reviews"}</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map(stars => {
                      const pct = stars === 5 ? 68 : stars === 4 ? 22 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
                      return (
                        <div key={stars} className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: "0.72rem" }}>
                          <span>{stars}★</span>
                          <div className="flex-1 bg-white/70 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-brand-terracotta h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span>{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {mockReviews.map(review => (
                  <div key={review.id} className="border-b border-border pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-foreground" style={{ fontSize: "0.875rem" }}>{review.name}</p>
                          {review.verified && (
                            <span className="text-brand-sage-dark bg-brand-cream-2 px-2 py-0.5 rounded-full flex items-center gap-0.5" style={{ fontSize: "0.7rem" }}>
                              <Check size={9} /> {isRTL ? "مشترٍ موثق" : "Verified"}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>{review.review}</p>
                    <p className="text-muted-foreground mt-2" style={{ fontSize: "0.72rem" }}>
                      {review.helpful} {isRTL ? "وجدوا هذا مفيداً" : "people found this helpful"}
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
            <h2 className="text-foreground mb-5" style={{ fontSize: "1.1rem" }}>{t.youMightAlsoLike}</h2>
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
