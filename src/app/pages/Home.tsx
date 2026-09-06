import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Gift, Sparkles, Leaf, Truck, Award, ShieldCheck, CheckCircle2, Star } from "lucide-react";
import { getProductsByCategory } from "../data/products";
import { categories } from "../data/categories";
import { ProductCard } from "../components/ProductCard";
import { ScrollRail } from "../components/ui/ScrollRail";
import { useAppSettings } from "../context/AppSettingsContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { GiftHamperModal } from "../components/GiftHamperModal";

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1758745464235-ccb8c1253074?w=1600&auto=format&fit=crop&q=82",
    altEn: "Natural herbs, grains, and spices in woven baskets",
    altAr: "أعشاب وحبوب وتوابل طبيعية في سلال منسوجة",
  },
];

const categoryAccentColors: Record<string, string> = {
  "coffee-drinks": "var(--brand-terracotta)",
  "honey": "#D0A040", // Honey Gold
  "spices": "var(--brand-sage-dark)", // Spice Sage Green
  "nuts": "#A07050", // Nuts Brown
  "wellness": "var(--brand-sage)", // Wellness Light Green
  "cosmetics": "#C44E8C", // Cosmetics Rose Pink
  "incense": "#7E5E4E", // Incense Sandalwood Brown
};

export function Home() {
  const { t, isRTL, setQuizOpen } = useAppSettings();
  const { recentlyViewed } = useRecentlyViewed();
  const [showHamperModal, setShowHamperModal] = useState(false);

  usePageMeta({
    description: isRTL
      ? "تسوق منتجات حاج عرفة الطبيعية مع عرض أوضح على الهاتف وسطح المكتب."
      : "Shop Haj Arafa natural products with a clearer mobile and desktop browsing experience.",
    title: isRTL ? "حاج عرفة | منتجات طبيعية مختارة" : "Haj Arafa | Handpicked Natural Products",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Store",
      name: isRTL ? "حاج عرفة" : "Haj Arafa",
      description: isRTL ? "متجر الأعشاب والعسل والبهارات الطبيعية الفاخرة منذ عام 1968" : "Finest natural herbs, honey, coffee, and spices since 1968",
      url: "https://amahdy59.github.io/Hajarafaapp/",
      telephone: "+20-100-123-4567",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bab El Louk",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        opens: "09:00",
        closes: "23:00"
      },
      priceRange: "$$"
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto px-3.5 sm:px-6 pt-1.5 pb-4 sm:py-6 flex flex-col gap-8 sm:gap-14">

        {/* Hero Banner */}
        {(() => {
          const heroImage = HERO_IMAGES[0]!;
          return (
            <section 
              className="relative overflow-hidden rounded-2xl sm:rounded-[1.75rem] border border-border/70 bg-brand-ink shadow-elev isolate min-h-[290px] xs:min-h-[310px] sm:min-h-0 sm:aspect-[16/5] sm:max-h-[270px] lg:max-h-[300px]" 
              aria-labelledby="home-hero-title"
            >
              <img
                src={heroImage.src}
                alt={isRTL ? heroImage.altAr : heroImage.altEn}
                width={1600}
                height={500}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center scale-[1.015]"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-brand-ink/40" aria-hidden="true" />
              <div
                className={`absolute inset-0 ${
                  isRTL
                    ? "bg-[linear-gradient(270deg,rgba(13,21,17,0.94)_0%,rgba(13,21,17,0.80)_50%,rgba(13,21,17,0.45)_80%,rgba(13,21,17,0.15)_100%)] sm:bg-[linear-gradient(270deg,rgba(13,21,17,0.92)_0%,rgba(13,21,17,0.74)_34%,rgba(13,21,17,0.46)_62%,rgba(13,21,17,0.20)_100%)]"
                    : "bg-[linear-gradient(90deg,rgba(13,21,17,0.94)_0%,rgba(13,21,17,0.80)_50%,rgba(13,21,17,0.45)_80%,rgba(13,21,17,0.15)_100%)] sm:bg-[linear-gradient(90deg,rgba(13,21,17,0.92)_0%,rgba(13,21,17,0.74)_34%,rgba(13,21,17,0.46)_62%,rgba(13,21,17,0.20)_100%)]"
                }`}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,21,17,0.28)_0%,rgba(13,21,17,0.06)_42%,rgba(13,21,17,0.32)_100%)]" aria-hidden="true" />
              <div className="absolute inset-0 rounded-2xl sm:rounded-[1.75rem] ring-1 ring-inset ring-white/18" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center p-5 xs:p-6 sm:p-8 lg:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`${isRTL ? "me-auto" : ""} max-w-[21rem] xs:max-w-[24rem] sm:max-w-[34rem] select-none text-start flex flex-col items-start justify-center`}
                >
                  <h1
                    id="home-hero-title"
                    className="font-display text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold sm:whitespace-nowrap leading-[1.2] tracking-tight"
                  >
                    {t.heroHeadline}
                  </h1>
                  <p className="text-white/95 mt-2.5 sm:mt-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] text-xs xs:text-[13px] sm:text-sm md:text-base leading-relaxed max-w-[22rem] sm:max-w-[440px]">
                    {t.heroSubline}
                  </p>
                  <Link
                    to="/products"
                    className="mt-4 sm:mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-brand-terracotta hover:bg-brand-terracotta-dark text-white px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_10px_24px_rgba(147,58,16,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    aria-label={isRTL ? "تسوق جميع المنتجات الطبيعية" : "Explore all natural products"}
                  >
                    {t.explore}
                  </Link>
                </motion.div>
              </div>
            </section>
          );
        })()}

        {/* Apothecary Trust Badges Bar */}
        <section
          aria-label={isRTL ? "ضمانات ومزايا حاج عرفة" : "Haj Arafa guarantees and benefits"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            {
              icon: Truck,
              title: t.trustFastShippingTitle,
              desc: t.trustFastShippingDesc,
            },
            {
              icon: Leaf,
              title: t.trustPureHerbsTitle,
              desc: t.trustPureHerbsDesc,
            },
            {
              icon: Award,
              title: t.trustHeritageTitle,
              desc: t.trustHeritageDesc,
            },
            {
              icon: ShieldCheck,
              title: t.trustSecurePayTitle,
              desc: t.trustSecurePayDesc,
            },
          ].map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="bg-card dark:bg-zinc-900/60 rounded-2xl p-4 sm:p-5 border border-border/80 shadow-soft flex items-center gap-3.5 group hover:border-brand-terracotta/40 transition-colors duration-200"
              >
                <div className="h-11 w-11 rounded-xl bg-brand-peach/60 dark:bg-zinc-800 text-brand-terracotta flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Icon size={22} />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-display font-bold text-foreground text-xs sm:text-sm leading-tight truncate">
                    {badge.title}
                  </h3>
                  <p className="text-muted-foreground text-[11px] sm:text-xs leading-snug mt-1 line-clamp-2">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* 7 Categories Rails & Bento Placement */}
        {categories.map((cat) => {
          const items = getProductsByCategory(cat.slug).slice(0, 8);
          if (!items.length) return null;
          const catName = isRTL && cat.nameAr ? cat.nameAr : cat.name;
          const accentColor = categoryAccentColors[cat.slug] || "var(--brand-terracotta)";

          return (
            <div key={cat.slug} className="flex flex-col gap-4">
              {/* Minimalist Category Header with Accent Line */}
              <div className="flex items-center justify-between select-none">
                <div className="flex items-center gap-3">
                  {/* Vertical Accent Line */}
                  <div 
                    className="w-[3.5px] h-7 rounded-full" 
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-brand-terracotta/80 dark:text-brand-terracotta">
                      {cat.group === "foods" ? (isRTL ? "مأكولات طبيعية" : "Natural Foods") : (isRTL ? "منتجات العناية" : "Care & Wellness")}
                    </span>
                    <h2 className="font-display text-brand-forest dark:text-brand-sage-dark text-sm sm:text-base font-bold leading-tight mt-0.5">
                      {catName}
                    </h2>
                  </div>
                </div>
                <Link
                  to={`/category/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-card dark:bg-zinc-900/60 text-brand-terracotta border border-border hover:border-brand-terracotta rounded-full text-xs font-semibold shadow-sm hover:shadow-soft transition-all duration-300"
                  aria-label={isRTL ? `عرض كل منتجات ${catName}` : `View all ${catName} products`}
                >
                  <span>{isRTL ? "عرض الكل" : "View All"}</span>
                  <span className="rtl-flip">→</span>
                </Link>
              </div>

              {/* Scroll Rail */}
              <ScrollRail>
                {items.map(p => (
                  <div key={p.id} className="flex-shrink-0 snap-start w-[calc(50vw-20px)] sm:w-56 p-0.5">
                    <ProductCard product={p} />
                  </div>
                ))}
              </ScrollRail>
            </div>
          );
        })}

        {/* Recently viewed products */}
        {recentlyViewed.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <div className="w-[3.5px] h-7 rounded-full bg-brand-terracotta" />
                <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-brand-terracotta/80">
                    {isRTL ? "سجل التصفح" : "Browsing History"}
                  </span>
                  <h2 className="font-display text-brand-forest dark:text-brand-sage-dark text-sm sm:text-base font-bold leading-tight mt-0.5">
                    {isRTL ? "شوهدت مؤخراً" : "Recently Viewed"}
                  </h2>
                </div>
              </div>
            </div>
            <ScrollRail>
              {recentlyViewed.map(p => (
                <div key={p.id} className="flex-shrink-0 snap-start w-[calc(50vw-20px)] sm:w-56 p-0.5">
                  <ProductCard product={p} />
                </div>
              ))}
            </ScrollRail>
          </div>
        )}

        {/* Interactive Apothecary Wellness Advisor Banner */}
        <section
          aria-labelledby="apothecary-quiz-banner-title"
          className="relative rounded-3xl p-6 sm:p-8 bg-[#16261C] bg-gradient-to-br from-[#16261C] via-[#223829] to-[#16261C] text-white shadow-soft overflow-hidden border border-white/10"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-start space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-300 bg-white/10 border border-white/20">
                <Leaf size={14} />
                {isRTL ? "مستشارك العشبي التفاعلي" : "Interactive Apothecary Consultation"}
              </span>
              <h2 id="apothecary-quiz-banner-title" className="text-xl sm:text-2xl font-serif font-bold text-white">
                {isRTL ? "حائر في اختيار العشبة أو التركيبة المناسبة؟" : "Unsure Which Herbal Remedy Fits You?"}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {isRTL
                  ? "أجب عن ٣ أسئلة سريعة لنحدد لك برنامجاً عشبياً مخصصاً مع توصيات الجرعات وطرق التحضير المتوارثة وخصم ١٥٪ على باقتك."
                  : "Answer 3 quick wellness questions to receive a tailored herbal regimen, usage rituals, and 15% off your custom bundle."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setQuizOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-[#16261C] font-extrabold text-xs sm:text-sm transition-all shadow-md min-h-[44px] cursor-pointer flex-shrink-0 focus-visible:ring-2 focus-visible:ring-white"
              aria-label={isRTL ? "بدء استشارة المستشار العشبي" : "Start apothecary consultation"}
            >
              <Sparkles size={18} />
              <span>{isRTL ? "ابدأ استشارتك العشبية الآن" : "Start Herbal Consultation"}</span>
            </button>
          </div>
        </section>

        {/* Egyptian Heritage Gift Hamper Banner */}
        <section
          aria-labelledby="gift-hamper-banner-title"
          className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-zinc-800/80 dark:to-zinc-900 border border-brand-terracotta/20 shadow-sm overflow-hidden"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-start space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-brand-terracotta bg-brand-terracotta/10 border border-brand-terracotta/20">
                <Sparkles size={12} />
                {isRTL ? "صناديق هدايا التراث العشبي" : "Heritage Gift Collection"}
              </span>
              <h2 id="gift-hamper-banner-title" className="text-xl sm:text-2xl font-display font-bold text-foreground">
                {isRTL ? "صمم صندوق هداياك العشبي الفاخر" : "Curate Your Artisan Herbal Gift Box"}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isRTL
                  ? "اختر بين صناديق خشب الزيتون الفاخرة، العلب المخملية، أو خوص واحات سيوة، وانتقِ أجود الأعشاب والعسل مع بطاقة إهداء خاصة."
                  : "Choose handcrafted olive wood, royal velvet, or Siwa palm wicker, and fill it with authentic raw honey, spices, and custom notes."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowHamperModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-terracotta hover:bg-[#b04b25] active:scale-95 text-white font-bold text-xs sm:text-sm transition-all shadow-tactile min-h-[44px] cursor-pointer flex-shrink-0"
              aria-label={isRTL ? "فتح نافذة تصميم صندوق الهدايا" : "Open gift hamper customizer"}
            >
              <Gift size={18} />
              <span>{isRTL ? "صمم هديتك الآن" : "Customize Gift Hamper"}</span>
            </button>
          </div>
        </section>

        <GiftHamperModal open={showHamperModal} onClose={() => setShowHamperModal(false)} />

        {/* Customer reviews */}
        <section
          aria-labelledby="home-reviews-title"
          className="bg-brand-cream-2 dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-8 border border-border shadow-soft"
        >
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-1.5">
            <h2
              id="home-reviews-title"
              className="font-display text-brand-forest dark:text-brand-sage-dark font-bold text-xl sm:text-2xl"
            >
              {t.customerReviews}
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm">
              {t.customerReviewsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {[
              {
                nameAr: "سارة محمود",
                nameEn: "Sarah M.",
                cityAr: "الإسكندرية",
                cityEn: "Alexandria",
                productAr: "زيت حبة البركة الحبشي",
                productEn: "Ethiopian Black Seed Oil",
                textAr: "جودة استثنائية ونقاء لا يقارن — حبة البركة الطبيعية أحدثت فرقاً ملحوظاً في روتين عائلتي اليومي.",
                textEn: "Outstanding quality and unmatched purity — the black seed oil noticeably improved my daily wellness routine.",
              },
              {
                nameAr: "د. أحمد كمال",
                nameEn: "Dr. Ahmed K.",
                cityAr: "القاهرة",
                cityEn: "Cairo",
                productAr: "عسل سدر جبلي حر",
                productEn: "Pure Wild Sidr Honey",
                textAr: "عسل سدر خام أصلي تماماً كما هو موصوف، رائحة زهرية غنية وقوام كثيف طبيعي. ثقة مستحقة منذ عقود.",
                textEn: "Authentic raw Sidr honey, exactly as described. Rich floral aroma and thick natural texture. Deserves full trust.",
              },
              {
                nameAr: "إيما لورانس",
                nameEn: "Emma L.",
                cityAr: "الجيزة",
                cityEn: "Giza",
                productAr: "ماء ورد مقطر طبيعي",
                productEn: "Pure Distilled Rose Water",
                textAr: "ماء الورد نقي ومنعش برائحة الورد البلدي الطبيعية — ألطف تونر استخدمته لبشرتي على الإطلاق.",
                textEn: "The distilled rose water is divine and refreshing — by far the gentlest natural toner for sensitive skin.",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl p-5 border border-border shadow-soft flex flex-col justify-between hover:shadow-tactile hover:border-brand-terracotta/30 transition-all duration-200"
              >
                <div>
                  {/* Rating stars & verified badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-forest dark:text-brand-sage-dark bg-brand-sage/15 dark:bg-brand-sage/25 px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={11} className="flex-shrink-0" />
                      <span>{t.verifiedBuyer}</span>
                    </span>
                  </div>

                  {/* Review text */}
                  <p className="text-foreground text-start text-xs sm:text-sm leading-relaxed mb-4">
                    "{isRTL ? r.textAr : r.textEn}"
                  </p>
                </div>

                {/* Customer & Product attribution */}
                <div className="border-t border-border/60 pt-3 flex flex-col gap-1 text-start">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-brand-forest dark:text-brand-sage-dark font-bold">
                      {isRTL ? r.nameAr : r.nameEn}
                    </span>
                    <span className="text-muted-foreground text-[11px]">
                      {isRTL ? r.cityAr : r.cityEn}
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-terracotta font-medium line-clamp-1">
                    {t.purchasedTag}: {isRTL ? r.productAr : r.productEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
