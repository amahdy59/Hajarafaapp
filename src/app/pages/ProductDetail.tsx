import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useParams, Link } from "react-router";
import { Heart, ShoppingCart, Share2, ChevronLeft, ChevronDown, Star, Plus, Minus, Leaf, Truck, Shield, RotateCcw, Check, MessageCircle, Thermometer, Clock, Utensils, Layers } from "lucide-react";
import { getProductById, products } from "../data/products";
import { categories, categoryMapping } from "../data/categories";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings, toArabicIndic, type Translations } from "../context/AppSettingsContext";
import { StarRating } from "../components/StarRating";
import { ProductCard } from "../components/ProductCard";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/Button";
import { ScrollRail } from "../components/ui/ScrollRail";
import { usePageMeta } from "../hooks/usePageMeta";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { CONTACT } from "../config/contact";
import logoImg from "../../assets/logo.webp";


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
  let localized = weight;
  localized = localized.replace(/\bg\b/gi, "جم");
  localized = localized.replace(/\bml\b/gi, "مل");
  localized = localized.replace(/\bl\b/gi, "لتر");
  localized = localized.replace(/Pack of (\d+)/gi, (_, num) => `عبوة من ${num}`);
  return toArabicIndic(localized);
};

const getSpecLabel = (weight: string, t: Translations) => {
  const w = weight.toLowerCase();
  if (w.includes("ml") || w.includes("l")) return t.volume;
  if (w.includes("pack") || w.includes("pc")) return t.quantity;
  if (w.includes("g") || w.includes("kg")) return t.weight;
  return t.size;
};

function ApothecaryUsageGuide({
  usageText,
  isRTL,
  consultDoctorText,
}: {
  usageText: string;
  isRTL: boolean;
  consultDoctorText: string;
}) {
  const guideMetrics = [
    {
      icon: Thermometer,
      title: isRTL ? "درجة الحرارة المثالية" : "Optimal Temperature",
      value: isRTL ? "٨٥° - ٩٥° مئوية" : "85°C – 95°C",
      hint: isRTL ? "ماء مغلي يُترك ليهدأ دقيقة" : "Boiling water rested 1 min",
    },
    {
      icon: Clock,
      title: isRTL ? "مدة الاستخلاص والنقع" : "Steeping Duration",
      value: isRTL ? "٥ - ٧ دقائق" : "5 – 7 Minutes",
      hint: isRTL ? "يُغطى لحفظ الزيوت الطيارة" : "Cover to retain aroma",
    },
    {
      icon: Utensils,
      title: isRTL ? "الجرعة الموصى بها" : "Suggested Serving",
      value: isRTL ? "١ - ٢ ملعقة يومياً" : "1 – 2 Teaspoons",
      hint: isRTL ? "صباحاً أو مساءً مع العسل" : "Morning/evening with honey",
    },
    {
      icon: Shield,
      title: isRTL ? "طريقة الحفظ المتوارثة" : "Apothecary Preservation",
      value: isRTL ? "عبوة محكمة جافة" : "Airtight & Cool",
      hint: isRTL ? "بعيداً عن الضوء والرطوبة" : "Away from direct light",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-foreground font-bold mb-2 text-sm sm:text-base">
          {isRTL ? "إرشادات الاستخدام وتوصيات العطارة" : "Traditional Usage & Apothecary Preparation"}
        </h4>
        <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">{usageText}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {guideMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-brand-peach/40 dark:bg-zinc-800/60 border border-brand-terracotta/15 flex flex-col justify-between gap-1.5"
            >
              <div className="h-8 w-8 rounded-xl bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center flex-shrink-0">
                <Icon size={16} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium leading-tight">{metric.title}</p>
                <p className="text-xs font-bold text-foreground mt-0.5">{metric.value}</p>
                <p className="text-[10px] text-muted-foreground/80 mt-0.5 leading-tight">{metric.hint}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-brand-peach/60 dark:bg-zinc-800/80 border border-brand-terracotta/20 rounded-2xl p-3.5 flex items-start gap-2.5">
        <span className="text-sm flex-shrink-0">🌿</span>
        <p className="text-brand-terracotta text-xs leading-relaxed font-medium">
          {isRTL
            ? "نصيحة العطار: لتعزيز الامتصاص والنكهة، يُفضل تناوله دافئاً مع ملعقة من عسل السدر أو حبة البركة النقية."
            : "Herbalist Tip: For enhanced absorption and aroma, enjoy warm with a spoonful of raw Sidr honey or pure black seed."}
        </p>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-800 dark:text-amber-300">
        ⚠️ {consultDoctorText}
      </div>
    </div>
  );
}

export function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { t, isRTL, formatPrice, formatNumber } = useAppSettings();
  const { recentlyViewed } = useRecentlyViewed(product?.id);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "usage" | "reviews">("description");
  const [accordionOpen, setAccordionOpen] = useState({
    description: true,
    usage: false,
    reviews: false,
  });
  const [showDesktopStickyBar, setShowDesktopStickyBar] = useState(false);
  const buyBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const target = buyBoxRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (window.innerWidth >= 1024) {
          setShowDesktopStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        } else {
          setShowDesktopStickyBar(false);
        }
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );

    observer.observe(target);

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setShowDesktopStickyBar(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [product?.id]);

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

  const siteUrl = "https://amahdy59.github.io/Hajarafaapp/";
  const currentUrl = typeof window !== "undefined" ? window.location.href : `${siteUrl}#/products/${product?.id}`;
  const catUrl = `${siteUrl}#/category/${parentSlug || product?.categorySlug}`;

  const productSchema = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: isRTL && product.nameAr ? product.nameAr : product.name,
    image: [product.image],
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Haj Arafa",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: currentUrl,
    },
    aggregateRating: product.rating ? {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 1,
    } : undefined,
  } : undefined;

  const breadcrumbSchema = product ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isRTL ? "الرئيسية" : "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryName,
        item: catUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: isRTL && product.nameAr ? product.nameAr : product.name,
        item: currentUrl,
      },
    ],
  } : undefined;

  usePageMeta({
    description: product
      ? isRTL && product.nameAr
        ? `تعرف على ${product.nameAr} من حاج عرفة مع تفاصيل وفوائد واستخدام أوضح.`
        : `Explore ${product.name} from Haj Arafa with clearer details, benefits, and usage guidance.`
      : isRTL
        ? "تفاصيل المنتج غير متوفرة."
        : "Product details are unavailable.",
    title: product
      ? isRTL && product.nameAr
        ? `${product.nameAr} | حاج عرفة`
        : `${product.name} | Haj Arafa`
      : isRTL
        ? "المنتج غير موجود | حاج عرفة"
        : "Product Not Found | Haj Arafa",
    structuredData: product && productSchema && breadcrumbSchema
      ? [productSchema, breadcrumbSchema]
      : productSchema,
  });

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

  const handleShare = async () => {
    const title = isRTL && product.nameAr ? product.nameAr : product.name;
    const shareData = {
      title,
      text: product.description,
      url: window.location.href,
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success(t.shareSuccess || t.productCopied))
        .catch(() => toast.error(t.failedToCopyLink));
    }
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const pName = isRTL && product.nameAr ? product.nameAr : product.name;
    const totalEGP = (product.price * quantity).toFixed(2);
    const text = isRTL
      ? `مرحباً حاج عرفة 🌿\nأود طلب المنتج التالي:\n• *المنتج:* ${pName}\n• *الرمز:* ${product.id}\n• *الكمية:* ${quantity}\n• *الإجمالي:* ${totalEGP} ج.م\n\nيرجى تأكيد الطلب وسأقوم بمشاركتكم العنوان وبيانات التوصيل.`
      : `Hello Haj Arafa 🌿\nI would like to order:\n• *Product:* ${pName}\n• *SKU:* ${product.id}\n• *Quantity:* ${quantity}\n• *Total:* ${totalEGP} EGP\n\nPlease confirm availability and delivery details.`;
    const url = `https://wa.me/${CONTACT.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fallbackProduct = products[0]!;
  const complementaryProduct = product
    ? (products.find(p => p.id !== product.id && (p.category === product.category || p.isBestSeller)) ?? fallbackProduct)
    : fallbackProduct;

  const bundleDiscount = 0.08;
  const bundleCombinedPrice = product ? product.price + complementaryProduct.price : 0;
  const bundleDiscountedPrice = Math.round(bundleCombinedPrice * (1 - bundleDiscount));

  const handleAddBundle = () => {
    if (!product || !complementaryProduct) return;
    addToCart(product);
    addToCart(complementaryProduct);
    const p1Name = isRTL && product.nameAr ? product.nameAr : product.name;
    const p2Name = isRTL && complementaryProduct.nameAr ? complementaryProduct.nameAr : complementaryProduct.name;
    toast.success(
      isRTL
        ? `🌿 تمت إضافة الباقة المتكاملة: ${p1Name} + ${p2Name}`
        : `🌿 Complementary bundle added: ${p1Name} + ${p2Name}`
    );
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
                alt={isRTL && product.nameAr ? product.nameAr : product.name}
                width={600}
                height={600}
                decoding="async"
                className="w-full h-full object-contain p-3 sm:p-6 mix-blend-multiply dark:mix-blend-normal"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = logoImg; }}
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
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`${isRTL && product.nameAr ? product.nameAr : product.name} - ${i + 1}`}
                    className={`w-11 h-11 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-colors product-media-surface ${
                      activeImage === i ? "border-brand-terracotta" : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      width={64}
                      height={64}
                      decoding="async"
                      className="w-full h-full object-contain p-0.5 sm:p-1 mix-blend-multiply dark:mix-blend-normal"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = logoImg; }}
                    />
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
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-muted-foreground line-through text-xs sm:text-sm">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Minimalist Specs Row */}
            <div className="flex flex-wrap items-center gap-3 border-b border-border/40 pb-3 text-xs font-semibold text-foreground select-none">
              <span
                className="rounded-lg border border-brand-line/60 bg-brand-peach/35 px-2 py-0.5 text-xs font-bold text-brand-terracotta-dark dark:border-brand-sage/35 dark:bg-brand-sage/10 dark:text-brand-sage-dark"
                aria-label={`${getSpecLabel(product.weight, t)}: ${getLocalizedWeight(product.weight, isRTL)}`}
              >
                {getLocalizedWeight(product.weight, isRTL)}
              </span>
              <span className="text-border" aria-hidden="true">|</span>
              <div className="flex min-w-0 items-center gap-1.5 text-foreground">
                <span className="font-semibold text-foreground">{t.origin}:</span>
                <span className="font-bold text-foreground">{getLocalizedOrigin(product.origin, isRTL)}</span>
              </div>
            </div>

            {/* Quantity + Add to Cart + Wishlist */}
            <div ref={buyBoxRef} className="flex flex-col gap-3 w-full sm:flex-row">
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="flex h-11 flex-1 items-center justify-between overflow-hidden rounded-xl border border-border bg-card px-1 sm:flex-initial">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-muted"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} className="text-foreground" />
                  </button>
                  <span className="w-8 select-none text-center text-sm font-semibold text-foreground">{formatNumber(quantity)}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-muted"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} className="text-foreground" />
                  </button>
                </div>

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

              <div className="hidden sm:block sm:flex-1">
                <Button
                  onClick={handleAddToCart}
                  size="md"
                  fullWidth
                  className="font-bold text-sm h-11"
                  leftIcon={<ShoppingCart size={16} />}
                >
                  {t.addToCart}
                </Button>
              </div>

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

            {/* Quick Order via WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-[#25D366]/12 hover:bg-[#25D366]/20 text-[#0d7337] dark:text-[#25D366] border border-[#25D366]/30 font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-[0.99] cursor-pointer"
              aria-label={t.orderViaWhatsApp}
            >
              <MessageCircle size={17} className="text-[#25D366] flex-shrink-0" />
              <span>{t.orderViaWhatsApp}</span>
            </button>

            {/* Key Benefits */}
            <div className="space-y-2 select-none">
              <h2 className="text-brand-ink-soft dark:text-brand-cream/80 text-xs font-bold uppercase tracking-wider">
                {t.keyBenefits}
              </h2>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium" role="list">
                {product.benefits.map(benefit => (
                  <li
                    key={benefit}
                    className="inline-flex min-h-6 items-center gap-2 text-foreground"
                  >
                    <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-brand-sage/25 text-brand-forest dark:bg-brand-sage/24 dark:text-brand-sage-dark" aria-hidden="true">
                      <Check size={10} className="stroke-[3]" />
                    </span>
                    <span className="leading-snug">
                      {t[`benefit.${benefit}` as keyof typeof t] || benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantees */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border/60 py-2.5 select-none">
              {[
                { icon: Truck, en: "Free shipping over LE 500", ar: "شحن مجاني فوق ٥٠٠ ج.م" },
                { icon: Shield, en: "Quality guaranteed", ar: "جودة مضمونة ١٠٠٪" },
                { icon: RotateCcw, en: "30-day returns", ar: "إرجاع خلال ٣٠ يوماً" },
              ].map((item) => (
                <div
                  key={item.en}
                  className="inline-flex min-h-7 items-center gap-1.5 text-start text-foreground"
                >
                  <span className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-brand-terracotta/12 text-brand-terracotta dark:bg-brand-terracotta/18 dark:text-[#F0A978]">
                    <item.icon size={13} />
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

        {/* Frequently Bought Together (Smart Bundle) */}
        {complementaryProduct && (
          <section
            aria-labelledby="frequently-bought-title"
            className="bg-card rounded-3xl p-5 sm:p-6 mb-8 border border-border/80 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-brand-terracotta/10 text-brand-terracotta">
                  <Layers size={18} />
                </span>
                <div>
                  <h3 id="frequently-bought-title" className="text-sm sm:text-base font-bold text-foreground">
                    {isRTL ? "اشترِ معاً ووفّر (باقة العطارة المتكاملة)" : "Frequently Bought Together (Pair & Save)"}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground">
                    {isRTL ? "مزيج طبيعي متوارث يُنصح به لتعزيز القيمة والفوائد الصحية" : "Authentic complementary pairing for maximum natural synergy"}
                  </p>
                </div>
              </div>
              <span className="self-start sm:self-auto text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                {isRTL ? "وفر ٨٪ عند الشراء معاً" : "Save 8% on Bundle"}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
              <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-1">
                {/* Product 1 */}
                <div className="flex items-center gap-2.5 min-w-[130px] sm:min-w-[170px]">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 dark:bg-zinc-800 border border-border p-1.5 flex items-center justify-center flex-shrink-0">
                    <img src={product.image} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground line-clamp-1">{isRTL && product.nameAr ? product.nameAr : product.name}</p>
                    <p className="text-xs text-brand-terracotta font-semibold mt-0.5">{formatPrice(product.price)}</p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0 text-sm font-bold">
                  +
                </div>

                {/* Product 2 */}
                <Link to={`/products/${complementaryProduct.id}`} className="flex items-center gap-2.5 min-w-[130px] sm:min-w-[170px] group no-underline">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 dark:bg-zinc-800 border border-border p-1.5 flex items-center justify-center flex-shrink-0 group-hover:border-brand-terracotta transition-colors">
                    <img src={complementaryProduct.image} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground line-clamp-1 group-hover:text-brand-terracotta transition-colors">
                      {isRTL && complementaryProduct.nameAr ? complementaryProduct.nameAr : complementaryProduct.name}
                    </p>
                    <p className="text-xs text-brand-terracotta font-semibold mt-0.5">{formatPrice(complementaryProduct.price)}</p>
                  </div>
                </Link>
              </div>

              {/* Price & CTA */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-border">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-extrabold text-brand-forest dark:text-brand-sage-dark">
                      {formatPrice(bundleDiscountedPrice)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(bundleCombinedPrice)}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {isRTL ? "سعر الباقة الإجمالي مع الخصم" : "Combined price with discount"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddBundle}
                  className="px-5 py-2.5 rounded-xl bg-brand-terracotta hover:bg-[#b04b25] active:scale-95 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 min-h-[44px] cursor-pointer"
                  aria-label={isRTL ? "إضافة الباقة المتكاملة إلى السلة" : "Add complementary bundle to cart"}
                >
                  <ShoppingCart size={15} />
                  <span>{isRTL ? "إضافة الباقة معاً" : "Add Both to Cart"}</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Tabs - Desktop only */}
        <div className="hidden lg:block bg-card rounded-3xl overflow-hidden mb-10 border border-border">
          <div role="tablist" aria-label={isRTL ? "تفاصيل المنتج" : "Product details"} className="flex border-b border-border">
            {(["description", "usage", "reviews"] as const).map(tab => (
              <button
                key={tab}
                role="tab"
                id={`tab-${tab}`}
                aria-controls={`panel-${tab}`}
                aria-selected={activeTab === tab}
                tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 transition-colors relative min-h-[44px] ${
                  activeTab === tab ? "text-brand-terracotta font-bold" : "text-muted-foreground hover:text-foreground"
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
              <div role="tabpanel" id="panel-description" aria-labelledby="tab-description">
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
              <div role="tabpanel" id="panel-usage" aria-labelledby="tab-usage">
                <ApothecaryUsageGuide
                  usageText={product.usage}
                  isRTL={isRTL}
                  consultDoctorText={t.consultDoctor}
                />
              </div>
            )}
            {activeTab === "reviews" && (
              <div role="tabpanel" id="panel-reviews" aria-labelledby="tab-reviews" className="space-y-4">
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
              type="button"
              id="accordion-btn-description"
              aria-expanded={accordionOpen.description}
              aria-controls="accordion-panel-description"
              onClick={() => toggleAccordion("description")}
              className="w-full flex items-center justify-between p-4 text-start font-semibold text-foreground text-sm sm:text-base min-h-[44px]"
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
              <div
                id="accordion-panel-description"
                role="region"
                aria-labelledby="accordion-btn-description"
                className="px-4 pb-5 border-t border-border/50 pt-4"
              >
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
              type="button"
              id="accordion-btn-usage"
              aria-expanded={accordionOpen.usage}
              aria-controls="accordion-panel-usage"
              onClick={() => toggleAccordion("usage")}
              className="w-full flex items-center justify-between p-4 text-start font-semibold text-foreground text-sm sm:text-base min-h-[44px]"
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
              <div
                id="accordion-panel-usage"
                role="region"
                aria-labelledby="accordion-btn-usage"
                className="px-4 pb-5 border-t border-border/50 pt-4"
              >
                <ApothecaryUsageGuide
                  usageText={product.usage}
                  isRTL={isRTL}
                  consultDoctorText={t.consultDoctor}
                />
              </div>
            )}
          </div>

          {/* Reviews Section */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <button
              type="button"
              id="accordion-btn-reviews"
              aria-expanded={accordionOpen.reviews}
              aria-controls="accordion-panel-reviews"
              onClick={() => toggleAccordion("reviews")}
              className="w-full flex items-center justify-between p-4 text-start font-semibold text-foreground text-sm sm:text-base min-h-[44px]"
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
              <div
                id="accordion-panel-reviews"
                role="region"
                aria-labelledby="accordion-btn-reviews"
                className="px-4 pb-5 border-t border-border/50 pt-4 space-y-4"
              >
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

        {/* Recently viewed products */}
        {recentlyViewed.length > 0 && (
          <section className="mb-10">
            <h2 className="text-foreground mb-4 font-display font-bold" style={{ fontSize: "1.1rem" }}>
              {isRTL ? "شوهدت مؤخراً" : "Recently Viewed"}
            </h2>
            <ScrollRail>
              {recentlyViewed.map(p => (
                <div key={p.id} className="flex-shrink-0 snap-start w-[calc(50vw-20px)] sm:w-56 p-0.5">
                  <ProductCard product={p} />
                </div>
              ))}
            </ScrollRail>
          </section>
        )}
      </div>
      <div className="fixed inset-x-0 bottom-[calc(4.25rem+env(safe-area-inset-bottom,0px))] z-30 px-4 pb-2 sm:hidden pointer-events-none">
        <div className="pointer-events-auto mx-auto flex max-w-md items-center gap-2 rounded-2xl border border-border bg-card/96 p-2 shadow-elev backdrop-blur">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-foreground">
              {isRTL && product.nameAr ? product.nameAr : product.name}
            </p>
            <p className="text-sm font-extrabold text-brand-terracotta">
              {formatPrice(product.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleWhatsAppOrder}
            className="w-11 h-11 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#128C7E] dark:text-[#25D366] flex items-center justify-center flex-shrink-0 active:scale-95 transition-all cursor-pointer"
            aria-label={t.orderViaWhatsApp}
            title={t.orderViaWhatsApp}
          >
            <MessageCircle size={18} />
          </button>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="h-11 min-w-[7.5rem] rounded-xl text-sm font-bold"
            leftIcon={<ShoppingCart size={16} />}
          >
            {t.addToCart}
          </Button>
        </div>
      </div>

      {/* Desktop Floating Sticky Purchase Bar */}
      <AnimatePresence>
        {showDesktopStickyBar && product && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed inset-x-0 bottom-6 z-30 px-6 hidden lg:block pointer-events-none"
          >
            <div className="pointer-events-auto mx-auto max-w-4xl flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-3.5 shadow-elev">
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={product.images[0] || product.image}
                  alt=""
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-xl object-contain product-media-surface p-1 border border-border/40 flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">
                    {isRTL && product.nameAr ? product.nameAr : product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base font-extrabold text-brand-terracotta">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{product.weight}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex h-10 items-center justify-between rounded-xl border border-border bg-background px-1">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted text-foreground cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-8 select-none text-center text-xs font-bold text-foreground">
                    {formatNumber(quantity)}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted text-foreground cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="h-10 px-3.5 rounded-xl bg-[#25D366]/12 hover:bg-[#25D366]/22 border border-[#25D366]/30 text-[#128C7E] dark:text-[#25D366] flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
                  title={t.orderViaWhatsApp}
                >
                  <MessageCircle size={15} />
                  <span>{t.orderViaWhatsApp}</span>
                </button>

                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="h-10 px-5 rounded-xl text-xs font-bold"
                  leftIcon={<ShoppingCart size={15} />}
                >
                  {t.addToCart}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-36 sm:h-4" />
    </div>
  );
}
