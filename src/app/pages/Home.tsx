import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Gift, Sparkles, Leaf } from "lucide-react";
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
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-1 pb-4 sm:py-6 flex flex-col gap-8 sm:gap-14">

        {/* Hero Banner */}
        {(() => {
          const heroImage = HERO_IMAGES[0]!;
          return (
            <section className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem] border border-border/70 bg-brand-ink shadow-[0_18px_50px_rgba(20,32,26,0.16)] isolate aspect-[5/3] sm:aspect-[16/5] max-h-[260px] sm:max-h-[250px]" aria-labelledby="home-hero-title">
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
          <div className="absolute inset-0 bg-brand-ink/46" aria-hidden="true" />
          <div
            className={`absolute inset-0 ${
              isRTL
                ? "bg-[linear-gradient(270deg,rgba(13,21,17,0.92)_0%,rgba(13,21,17,0.74)_34%,rgba(13,21,17,0.46)_62%,rgba(13,21,17,0.20)_100%)]"
                : "bg-[linear-gradient(90deg,rgba(13,21,17,0.92)_0%,rgba(13,21,17,0.74)_34%,rgba(13,21,17,0.46)_62%,rgba(13,21,17,0.20)_100%)]"
            }`}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,21,17,0.28)_0%,rgba(13,21,17,0.06)_42%,rgba(13,21,17,0.32)_100%)]" aria-hidden="true" />
          <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/18" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center p-5 sm:p-8 lg:p-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`${isRTL ? "me-auto" : ""} max-w-[34rem] select-none text-start`}
            >
              <h1
                id="home-hero-title"
                className="font-display text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.72)] sm:whitespace-nowrap"
                style={{ fontSize: "clamp(1.45rem, 3.8vw, 2.45rem)", lineHeight: 1.12, letterSpacing: "0" }}
              >
                {t.heroHeadline}
              </h1>
              <p className="text-white/92 mt-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.68)]" style={{ fontSize: "0.9rem", lineHeight: 1.55, maxWidth: 440 }}>
                {t.heroSubline}
              </p>
              <Link
                to="/products"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#933A10] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_10px_24px_rgba(147,58,16,0.35)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#7A2E0C] hover:text-white hover:shadow-[0_14px_30px_rgba(147,58,16,0.42)] active:scale-[0.98] sm:px-7 sm:py-3 sm:text-sm"
                aria-label={isRTL ? "تسوق جميع المنتجات الطبيعية" : "Explore all natural products"}
              >
                {t.explore}
              </Link>
            </motion.div>
          </div>
        </section>
          );
        })()}

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
          className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-brand-moss-dark/95 via-brand-moss to-brand-moss-dark text-white shadow-soft overflow-hidden"
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
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {isRTL
                  ? "أجب عن ٣ أسئلة سريعة لنحدد لك برنامجاً عشبياً مخصصاً مع توصيات الجرعات وطرق التحضير المتوارثة وخصم ١٥٪ على باقتك."
                  : "Answer 3 quick wellness questions to receive a tailored herbal regimen, usage rituals, and 15% off your custom bundle."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setQuizOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-brand-moss-dark font-extrabold text-xs sm:text-sm transition-all shadow-md min-h-[44px] cursor-pointer flex-shrink-0"
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
        <section className="bg-brand-cream-2 rounded-2xl p-6 sm:p-8 border border-border shadow-soft">
          <h2 className="font-display text-brand-forest dark:text-brand-sage-dark text-center mb-6 font-bold text-xl sm:text-2xl">
            {t.customerReviews}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { name: "Sarah M.", en: "Outstanding quality — the black seed oil noticeably improved my routine.", ar: "جودة استثنائية — حبة البركة أحدثت فرقاً ملحوظاً." },
              { name: "Ahmed K.", en: "Authentic Sidr honey, exactly as described. Worth every pound.", ar: "عسل سدر أصلي تماماً كما هو موصوف." },
              { name: "Emma L.", en: "The rose water is divine — my skin has never felt better.", ar: "ماء الورد رائع — بشرتي لم تشعر بأفضل من ذلك." },
            ].map((r, i) => (
              <div key={i} className="bg-card rounded-xl p-4 border border-border shadow-soft">
                <p className="text-foreground italic mb-3 text-start text-sm leading-relaxed">
                  "{isRTL ? r.ar : r.en}"
                </p>
                <p className="text-brand-forest dark:text-brand-sage-dark text-start font-semibold text-sm">{r.name}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
