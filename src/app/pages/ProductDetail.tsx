import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Heart, ShoppingCart, Share2, ChevronLeft, ChevronDown, Star, Plus, Minus, Leaf, Truck, Shield, RotateCcw, Check } from "lucide-react";
import { getProductById, products } from "../data/products";
import { categories, categoryMapping } from "../data/categories";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { StarRating } from "../components/StarRating";
import { ProductCard } from "../components/ProductCard";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Button } from "../components/ui/Button";


const mockReviews = [
  { id: 1, name: "Sarah M.", rating: 5, date: "April 2025", verified: true, review: "Absolutely love this product! The quality is exceptional and the results speak for themselves.", helpful: 24 },
  { id: 2, name: "Ahmed K.", rating: 5, date: "March 2025", verified: true, review: "Authentic and pure. You can really tell the difference in quality. Fast delivery too!", helpful: 18 },
  { id: 3, name: "Emma L.", rating: 4, date: "March 2025", verified: true, review: "Great product overall. Will definitely reorder.", helpful: 12 },
];

const getLocalizedOrigin = (origin: string, isRTL: boolean) => {
  if (!isRTL) return origin;
  switch (origin.toLowerCase().trim()) {
    case "egypt": return "مصر";
    case "saudi arabia": return "السعودية";
    case "turkey": return "تركيا";
    case "yemen": return "اليمن";
    case "usa": return "أمريكا";
    case "california": return "كاليفورنيا";
    default: return origin;
  }
};

const getLocalizedWeight = (weight: string, isRTL: boolean) => {
  if (!isRTL) return weight;
  
  const toArabicDigits = (str: string) => {
    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return str.split("").map(char => {
      const idx = englishDigits.indexOf(char);
      return idx !== -1 ? arabicDigits[idx] : char;
    }).join("");
  };

  let localized = weight;
  localized = localized.replace(/\bg\b/gi, "جم");
  localized = localized.replace(/\bml\b/gi, "مل");
  localized = localized.replace(/\bl\b/gi, "لتر");
  localized = localized.replace(/Pack of (\d+)/gi, (_, num) => `عبوة من ${num}`);
  
  return toArabicDigits(localized);
};

const getSpecLabel = (weight: string, t: any) => {
  const w = weight.toLowerCase();
  if (w.includes("ml") || w.includes("l")) return t.volume;
  if (w.includes("pack") || w.includes("pc")) return t.quantity;
  if (w.includes("g") || w.includes("kg")) return t.weight;
  return t.size;
};

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

  // Reset UI state when navigating between products.
  useEffect(() => {
    setQuantity(1);
    setActiveImage(0);
    setActiveTab("description");
    setAccordionOpen({ description: true, usage: false, reviews: false });
  }, [id]);

  // Force scroll-to-top synchronously on ID change
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const toggleAccordion = (section: "description" | "usage" | "reviews") => {
    setAccordionOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };
  const wishlisted = product ? isWishlisted(product.id) : false;

  const parentSlug = product ? (categoryMapping[product.categorySlug] || product.categorySlug) : "";
  const parentCategory = categories.find(c => c.slug === parentSlug);
  const categoryName = parentCategory
    ? (isRTL && parentCategory.nameAr ? parentCategory.nameAr : parentCategory.name)
    : (product ? product.category : "");

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-5xl">🌿</p>
          <h2 className="text-foreground">{t.productNotFound}</h2>
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
    toast.success(`${quantity}× ${isRTL && product.nameAr ? product.nameAr : product.name} ${t.addedToCart}`);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast(wishlisted ? t.removedFromWishlist : t.addedToWishlist, {
      icon: wishlisted ? "💔" : "❤️",
    });
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
        .catch(() => toast.error(t.failedToCopyLink));
    }
  };

  const tabLabels = {
    description: t.description,
    usage: t.howToUse,
    reviews: isRTL ? `${t.reviews} (${product.reviewCount})` : `${t.reviews} (${product.reviewCount})`,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-3 pb-6 sm:py-6">
        {/* Breadcrumb - Desktop only */}
        <nav className="hidden md:flex items-center gap-1.5 mb-6" style={{ fontSize: "0.8rem" }}>
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">{t.home}</Link>
          <ChevronLeft size={12} className="text-muted-foreground rtl-flip" />
          <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">{t.shopAll}</Link>
          <ChevronLeft size={12} className="text-muted-foreground rtl-flip" />
          <Link to={`/category/${parentSlug}`} className="text-muted-foreground hover:text-foreground transition-colors">
            {categoryName}
          </Link>
          <ChevronLeft size={12} className="text-muted-foreground rtl-flip" />
          <span className="text-foreground truncate max-w-40">{isRTL && product.nameAr ? product.nameAr : product.name}</span>
        </nav>

        {/* Breadcrumb - Mobile/Tablet only compact back button */}
        <div className="md:hidden mb-2.5">
          <Link 
            to={`/category/${parentSlug}`} 
            className="inline-flex items-center gap-1.5 text-brand-ink-soft hover:text-foreground transition-colors text-xs font-semibold py-1 px-2.5 bg-card border border-border rounded-xl"
          >
            <ChevronLeft size={14} className="rtl-flip text-brand-ink-soft" />
            <span>
              {t.backTo} {categoryName}
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mb-8 sm:mb-12">
          {/* Images */}
          <div className="space-y-2.5 sm:space-y-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[16/10] sm:aspect-square product-media-surface rounded-2xl sm:rounded-3xl overflow-hidden max-h-[180px] xs:max-h-[220px] sm:max-h-none flex items-center justify-center"
            >
              <img
                src={product.images[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-contain p-3 sm:p-6 mix-blend-multiply dark:mix-blend-normal"
              />
              {product.discount && (
                <span className="absolute top-3 start-3 bg-brand-terracotta-dark dark:bg-brand-terracotta text-white dark:text-brand-cream px-2.5 py-0.5 rounded-full font-bold text-[10px] sm:text-xs">
                  -{product.discount}%
                </span>
              )}
              {product.isOrganic && (
                <span className="absolute top-3 end-3 bg-brand-sage-dark text-white dark:text-brand-cream px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold text-[10px] sm:text-xs">
                  <Leaf size={10} className="sm:w-3 sm:h-3" /> {t.organic}
                </span>
              )}
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-11 h-11 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-colors product-media-surface ${
                      activeImage === i ? "border-brand-terracotta" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-0.5 sm:p-1 mix-blend-multiply dark:mix-blend-normal" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <div className="flex items-center gap-2 mb-0.5 sm:mb-1 flex-wrap">
                <Link
                  to={`/category/${parentSlug}`}
                  className="hidden md:inline-block bg-brand-terracotta/10 text-brand-terracotta-dark dark:text-[#FFCFB3] border border-brand-terracotta/20 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                >
                  {categoryName}
                </Link>
                {product.isBestSeller && (
                  <span className="bg-brand-sage/10 text-brand-forest dark:text-brand-sage-dark border border-brand-sage/20 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold">
                    {t.bestSellers}
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-brand-sage/10 text-brand-forest dark:text-brand-sage-dark border border-brand-sage/20 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold">
                    {t.newArrivals}
                  </span>
                )}
              </div>
              <h1 className="text-foreground font-display font-bold leading-tight text-lg sm:text-2xl md:text-3xl">
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

            {/* Minimalist Specs Row */}
            <div className="flex items-center gap-3 text-xs font-semibold text-brand-ink-soft dark:text-brand-cream/80 select-none border-b border-border/40 pb-3.5">
              <span 
                className="bg-brand-peach/30 dark:bg-brand-sage/10 text-brand-terracotta-dark dark:text-brand-sage-dark border border-brand-line/40 dark:border-brand-sage/20 px-2 py-0.5 rounded-lg text-xs font-bold"
                aria-label={`${getSpecLabel(product.weight, t)}: ${getLocalizedWeight(product.weight, isRTL)}`}
              >
                {getLocalizedWeight(product.weight, isRTL)}
              </span>
              <span className="text-muted-foreground/30 font-light" aria-hidden="true">|</span>
              <div className="flex items-center gap-1.5 text-muted-foreground dark:text-brand-cream/60">
                <span className="font-medium">{t.origin}:</span>
                <span className="text-foreground dark:text-brand-cream font-bold">{getLocalizedOrigin(product.origin, isRTL)}</span>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="space-y-2.5 select-none">
              <h2 className="text-brand-ink-soft dark:text-brand-cream/80 text-xs font-bold uppercase tracking-wider">
                {t.keyBenefits}
              </h2>
              <ul className="grid grid-cols-1 gap-2 text-sm font-medium sm:grid-cols-2" role="list">
                {product.benefits.map(benefit => (
                  <li
                    key={benefit}
                    className="flex min-h-9 items-center gap-2 rounded-xl bg-muted/45 px-2.5 text-foreground ring-1 ring-border/50 dark:bg-white/[0.045] dark:ring-white/10"
                  >
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-sage/22 text-brand-forest dark:bg-brand-sage/20 dark:text-brand-sage-dark" aria-hidden="true">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span className="leading-snug">
                      {t[`benefit.${benefit}` as keyof typeof t] || benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity + Add to Cart + Wishlist */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Row 1 (Mobile): Quantity Selector + Wishlist */}
              <div className="flex gap-3 w-full sm:w-auto">
                {/* Quantity selector */}
                <div className="flex-1 sm:flex-initial flex items-center justify-between border border-border rounded-xl h-11 bg-card px-1 overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center hover:bg-muted rounded-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} className="text-foreground" />
                  </button>
                  <span className="w-8 text-center text-foreground font-semibold text-sm select-none">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-11 h-11 flex items-center justify-center hover:bg-muted rounded-lg transition-colors"
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
              <Button
                onClick={handleAddToCart}
                size="md"
                className="w-full sm:flex-1 font-bold text-sm h-11"
                leftIcon={<ShoppingCart size={16} />}
              >
                {t.addToCart}
              </Button>

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
            <div className="grid grid-cols-1 gap-2 border-y border-border/60 py-3 select-none sm:grid-cols-3">
              {[
                { icon: Truck, en: "Free shipping over LE 500", ar: "شحن مجاني فوق ٥٠٠ ج.م" },
                { icon: Shield, en: "Quality guaranteed", ar: "جودة مضمونة ١٠٠٪" },
                { icon: RotateCcw, en: "30-day returns", ar: "إرجاع خلال ٣٠ يوماً" },
              ].map((item) => (
                <div
                  key={item.en}
                  className="flex min-h-11 items-center gap-2 rounded-xl bg-muted/55 px-3 text-start ring-1 ring-border/60 dark:bg-white/[0.045] dark:ring-white/10"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-terracotta/12 text-brand-terracotta dark:bg-brand-terracotta/18 dark:text-[#F0A978]">
                    <item.icon size={15} />
                  </span>
                  <span className="text-xs font-semibold leading-snug text-foreground">
                    {isRTL ? item.ar : item.en}
                  </span>
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
                    { label: t.weight, value: getLocalizedWeight(product.weight, isRTL) },
                    { label: t.origin, value: getLocalizedOrigin(product.origin, isRTL) },
                    { label: t.category, value: categoryName },
                    { label: t.organic, value: product.isOrganic ? t.yes : t.no },
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
                <h4 className="text-foreground mb-3">{t.howToUse}</h4>
                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "0.875rem" }}>{product.usage}</p>
                <div className="mt-4 bg-brand-peach border border-brand-terracotta/20 rounded-xl p-4">
                  <p className="text-brand-terracotta" style={{ fontSize: "0.8rem" }}>
                    ⚠️ {t.consultDoctor}
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
                    <p className="text-muted-foreground mt-1" style={{ fontSize: "0.72rem" }}>{product.reviewCount} {t.reviews}</p>
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
                            <span className="bg-brand-sage/10 text-brand-forest dark:text-brand-sage-dark border border-brand-sage/20 px-2 py-0.5 rounded-full flex items-center gap-0.5" style={{ fontSize: "0.7rem" }}>
                              <Check size={9} /> {t.verifiedBuyer}
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
                      {review.helpful} {t.peopleFoundHelpful}
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
              className="w-full flex items-center justify-between p-4 text-start font-semibold text-foreground text-sm sm:text-base"
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
                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">{product.description}</p>
                 <div className="flex flex-col gap-3 text-sm sm:text-base">
                   {[
                     { label: t.weight, value: getLocalizedWeight(product.weight, isRTL) },
                     { label: t.origin, value: getLocalizedOrigin(product.origin, isRTL) },
                     { label: t.category, value: categoryName },
                     { label: t.organic, value: product.isOrganic ? t.yes : t.no },
                   ].map(d => (
                    <div key={d.label} className="flex justify-between border-b border-border/50 pb-2">
                      <p className="text-muted-foreground text-xs sm:text-sm">{d.label}</p>
                      <p className="text-foreground font-semibold">{d.value}</p>
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
              className="w-full flex items-center justify-between p-4 text-start font-semibold text-foreground text-sm sm:text-base"
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
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{product.usage}</p>
                <div className="mt-4 bg-brand-peach border border-brand-terracotta/20 rounded-xl p-4">
                  <p className="text-brand-terracotta text-xs sm:text-sm font-medium">
                    ⚠️ {t.consultDoctor}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Reviews Section */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <button
              onClick={() => toggleAccordion("reviews")}
              className="w-full flex items-center justify-between p-4 text-start font-semibold text-foreground text-sm sm:text-base"
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
                    <p className="text-brand-terracotta text-3xl font-extrabold" style={{ lineHeight: 1 }}>{product.rating}</p>
                    <div className="flex justify-center my-1.5">
                      <StarRating rating={product.rating} showCount={false} size="sm" />
                    </div>
                    <p className="text-muted-foreground text-xs">{product.reviewCount} {t.reviews}</p>
                  </div>
                  <div className="flex-1 w-full space-y-1.5">
                    {[5, 4, 3, 2, 1].map(stars => {
                      const pct = stars === 5 ? 68 : stars === 4 ? 22 : stars === 3 ? 7 : stars === 2 ? 2 : 1;
                      return (
                        <div key={stars} className="flex items-center gap-2 text-muted-foreground text-xs">
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
                          <p className="text-foreground font-semibold text-sm sm:text-base">{review.name}</p>
                          {review.verified && (
                            <span className="bg-brand-sage/10 text-brand-forest dark:text-brand-sage-dark border border-brand-sage/20 px-2 py-0.5 rounded-full flex items-center gap-0.5 text-[10px]">
                              <Check size={8} className="stroke-[3]" /> {t.verifiedBuyer}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-[11px] mt-0.5">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{review.review}</p>
                    <p className="text-muted-foreground mt-2 text-[11px]">
                      {review.helpful} {t.peopleFoundHelpful}
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
