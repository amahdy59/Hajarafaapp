import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Heart, ShoppingCart, Share2, ChevronLeft, ChevronDown, Star, Plus, Minus, Leaf, Truck, Shield, RotateCcw, Check } from "lucide-react";
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
  const [accordionOpen, setAccordionOpen] = useState({
    description: true,
    usage: false,
    reviews: false,
  });

  const toggleAccordion = (section: "description" | "usage" | "reviews") => {
    setAccordionOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };
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
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb - Desktop only */}
        <nav className="hidden md:flex items-center gap-1.5 mb-6" style={{ fontSize: "0.8rem" }}>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">{t.home}</Link>
          <ChevronLeft size={12} className="text-muted-foreground rtl-flip" />
          <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">{t.shopAll}</Link>
          <ChevronLeft size={12} className="text-muted-foreground rtl-flip" />
          <Link to={`/category/${product.categorySlug}`} className="text-muted-foreground hover:text-foreground transition-colors">
            {isRTL && product.categoryAr ? product.categoryAr : product.category}
          </Link>
          <ChevronLeft size={12} className="text-muted-foreground rtl-flip" />
          <span className="text-foreground truncate max-w-40">{isRTL && product.nameAr ? product.nameAr : product.name}</span>
        </nav>

        {/* Breadcrumb - Mobile/Tablet only compact back button */}
        <div className="md:hidden mb-4">
          <Link 
            to={`/category/${product.categorySlug}`} 
            className="inline-flex items-center gap-1.5 text-brand-ink-soft hover:text-foreground transition-colors text-xs font-semibold py-1 px-2.5 bg-card border border-border rounded-xl"
          >
            <ChevronLeft size={14} className="rtl-flip text-brand-ink-soft" />
            <span>
              {isRTL ? "العودة إلى" : "Back to"} {isRTL && product.categoryAr ? product.categoryAr : product.category}
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square bg-[#FAF6F0] dark:bg-zinc-800/40 rounded-3xl overflow-hidden"
            >
              <img
                src={product.images[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-contain p-6 mix-blend-multiply dark:mix-blend-normal"
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
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors bg-[#FAF6F0] dark:bg-zinc-800/40 ${
                      activeImage === i ? "border-brand-terracotta" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1 mix-blend-multiply dark:mix-blend-normal" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Link
                  to={`/category/${product.categorySlug}`}
                  className="text-brand-terracotta bg-brand-peach px-2.5 py-0.5 rounded-full text-xs font-semibold"
                >
                  {isRTL && product.categoryAr ? product.categoryAr : product.category}
                </Link>
                {product.isBestSeller && (
                  <span className="text-brand-forest bg-brand-cream-2 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                    {t.bestSellers}
                  </span>
                )}
                {product.isNew && (
                  <span className="text-brand-sage-dark bg-brand-cream-2 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                    {t.newArrivals}
                  </span>
                )}
              </div>
              <h1 className="text-foreground font-display font-bold leading-tight text-xl sm:text-2xl md:text-3xl">
                {isRTL && product.nameAr ? product.nameAr : product.name}
              </h1>
              <div className="flex items-center mt-0.5">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-brand-terracotta font-extrabold text-2xl sm:text-3xl leading-none">
                  {t.currency} {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through text-xs sm:text-sm">
                    {t.currency} {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
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

            {/* Quantity + Add to Cart + Wishlist */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Row 1 (Mobile): Quantity Selector + Wishlist */}
              <div className="flex gap-3 w-full sm:w-auto">
                {/* Quantity selector */}
                <div className="flex-1 sm:flex-initial flex items-center justify-between border border-border rounded-xl h-11 bg-card px-1 overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-9 flex items-center justify-center hover:bg-muted rounded-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} className="text-foreground" />
                  </button>
                  <span className="w-8 text-center text-foreground font-semibold text-sm select-none">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-9 flex items-center justify-center hover:bg-muted rounded-lg transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} className="text-foreground" />
                  </button>
                </div>

                {/* Wishlist Button - mobile only */}
                <button
                  onClick={handleWishlist}
                  className={`sm:hidden w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${
                    wishlisted ? "border-brand-terracotta bg-brand-peach" : "border-border hover:border-brand-terracotta"
                  }`}
                  aria-label={t.favourites}
                >
                  <Heart size={18} className={wishlisted ? "fill-brand-terracotta text-brand-terracotta" : "text-muted-foreground"} />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-brand-terracotta text-white h-11 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-terracotta-dark transition-colors active:scale-[0.98] text-sm font-bold shadow-sm"
              >
                <ShoppingCart size={16} />
                {t.addToCart}
              </button>

              {/* Wishlist Button - desktop only */}
              <button
                onClick={handleWishlist}
                className={`hidden sm:flex w-11 h-11 rounded-xl border items-center justify-center transition-all flex-shrink-0 ${
                  wishlisted ? "border-brand-terracotta bg-brand-peach text-brand-terracotta" : "border-border hover:border-brand-terracotta text-muted-foreground"
                }`}
                aria-label={t.favourites}
              >
                <Heart size={18} className={wishlisted ? "fill-brand-terracotta text-brand-terracotta" : "text-muted-foreground"} />
              </button>
            </div>

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

        {/* Tabs - Desktop only */}
        <div className="hidden lg:block bg-card rounded-3xl overflow-hidden mb-10 border border-border">
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

        {/* Accordion - Mobile/Tablet only */}
        <div className="lg:hidden space-y-3 mb-10">
          {/* Description Section */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <button
              onClick={() => toggleAccordion("description")}
              className="w-full flex items-center justify-between p-4 text-start font-semibold text-foreground"
              style={{ fontSize: "0.9rem" }}
            >
              <span>{tabLabels.description}</span>
              <ChevronDown
                size={18}
                className={`text-muted-foreground transition-transform duration-200 ${
                  accordionOpen.description ? "rotate-180" : ""
                }`}
              />
            </button>
            {accordionOpen.description && (
              <div className="px-4 pb-5 border-t border-border/50 pt-4">
                <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontSize: "0.875rem" }}>{product.description}</p>
                <div className="grid grid-cols-2 gap-4" style={{ fontSize: "0.8125rem" }}>
                  {[
                    { label: isRTL ? "الوزن" : "Weight", value: product.weight },
                    { label: isRTL ? "المنشأ" : "Origin", value: product.origin },
                    { label: isRTL ? "الفئة" : "Category", value: isRTL && product.categoryAr ? product.categoryAr : product.category },
                    { label: isRTL ? "عضوي" : "Organic", value: product.isOrganic ? (isRTL ? "نعم ✓" : "Yes ✓") : (isRTL ? "لا" : "No") },
                  ].map(d => (
                    <div key={d.label}>
                      <p className="text-muted-foreground mb-0.5" style={{ fontSize: "0.72rem" }}>{d.label}</p>
                      <p className="text-foreground font-medium">{d.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* How to Use Section */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <button
              onClick={() => toggleAccordion("usage")}
              className="w-full flex items-center justify-between p-4 text-start font-semibold text-foreground"
              style={{ fontSize: "0.9rem" }}
            >
              <span>{tabLabels.usage}</span>
              <ChevronDown
                size={18}
                className={`text-muted-foreground transition-transform duration-200 ${
                  accordionOpen.usage ? "rotate-180" : ""
                }`}
              />
            </button>
            {accordionOpen.usage && (
              <div className="px-4 pb-5 border-t border-border/50 pt-4">
                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "0.875rem" }}>{product.usage}</p>
                <div className="mt-4 bg-brand-peach border border-brand-terracotta/20 rounded-xl p-4">
                  <p className="text-brand-terracotta" style={{ fontSize: "0.75rem" }}>
                    ⚠️ {isRTL ? "هذا المنتج لدعم الصحة العامة. استشر طبيبك عند الحاجة." : "This product is for wellness support. Consult a healthcare professional if you have any medical conditions."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Reviews Section */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <button
              onClick={() => toggleAccordion("reviews")}
              className="w-full flex items-center justify-between p-4 text-start font-semibold text-foreground"
              style={{ fontSize: "0.9rem" }}
            >
              <span>{tabLabels.reviews}</span>
              <ChevronDown
                size={18}
                className={`text-muted-foreground transition-transform duration-200 ${
                  accordionOpen.reviews ? "rotate-180" : ""
                }`}
              />
            </button>
            {accordionOpen.reviews && (
              <div className="px-4 pb-5 border-t border-border/50 pt-4 space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-brand-peach rounded-2xl">
                  <div className="text-center w-full sm:w-auto">
                    <p className="text-brand-terracotta" style={{ fontSize: "2.25rem", lineHeight: 1 }}>{product.rating}</p>
                    <div className="flex justify-center my-1">
                      <StarRating rating={product.rating} showCount={false} size="sm" />
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: "0.72rem" }}>{product.reviewCount} {isRTL ? "تقييم" : "reviews"}</p>
                  </div>
                  <div className="flex-1 w-full space-y-1.5">
                    {[5, 4, 3, 2, 1].map(stars => {
                      const pct = stars === 5 ? 68 : stars === 4 ? 22 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
                      return (
                        <div key={stars} className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: "0.72rem" }}>
                          <span className="w-5 text-end">{stars}★</span>
                          <div className="flex-1 bg-white/70 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-brand-terracotta h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-8 text-end">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {mockReviews.map(review => (
                  <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-foreground font-medium" style={{ fontSize: "0.8125rem" }}>{review.name}</p>
                          {review.verified && (
                            <span className="text-brand-sage-dark bg-brand-cream-2 px-2 py-0.5 rounded-full flex items-center gap-0.5" style={{ fontSize: "0.65rem" }}>
                              <Check size={8} /> {isRTL ? "مشترٍ موثق" : "Verified"}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground" style={{ fontSize: "0.6875rem" }}>{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground" style={{ fontSize: "0.8125rem", lineHeight: 1.4 }}>{review.review}</p>
                    <p className="text-muted-foreground mt-2" style={{ fontSize: "0.6875rem" }}>
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
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
