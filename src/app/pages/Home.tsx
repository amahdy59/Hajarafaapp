import { Link } from "react-router";
import { motion } from "motion/react";
import { getProductsByCategory } from "../data/products";
import { categories } from "../data/categories";
import { ProductCard } from "../components/ProductCard";
import { ScrollRail } from "../components/ui/ScrollRail";
import { useAppSettings } from "../context/AppSettingsContext";

const HERO_IMG = "https://images.unsplash.com/photo-1758745464235-ccb8c1253074?w=1200&auto=format&fit=crop&q=80";

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
  const { t, isRTL } = useAppSettings();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-1 pb-4 sm:py-6 flex flex-col gap-8 sm:gap-14">

        {/* Hero — hidden on mobile */}
        <section className="relative rounded-2xl overflow-hidden shadow-soft hidden sm:block" style={{ aspectRatio: "16/5", maxHeight: 240 }}>
          <img 
            src={HERO_IMG} 
            alt={isRTL ? "خلفية صحية طبيعية لعشبة البابونج" : "Chamomile natural wellness background"} 
            className="absolute inset-0 w-full h-full object-cover" 
            loading="eager"
            fetchPriority="high"
          />
          <div className={`absolute inset-0 bg-gradient-to-${isRTL ? "l" : "r"} from-brand-ink/80 via-brand-ink/40 to-transparent`} />
          <div className="absolute inset-0 flex items-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md p-5 sm:p-6 rounded-xl border border-white/10 shadow-lg select-none text-start"
              style={{ backgroundColor: "rgba(27, 28, 26, 0.9)" }}
            >
              <h1
                className="font-display text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                style={{ fontSize: "clamp(1.35rem, 3.5vw, 1.85rem)", lineHeight: 1.15, letterSpacing: "-0.5px" }}
              >
                {t.heroHeadline}
              </h1>
              <p className="text-white/85 mt-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] hidden md:block" style={{ fontSize: "0.85rem", lineHeight: 1.5, maxWidth: 360 }}>
                {t.heroSubline}
              </p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-brand-terracotta text-white dark:text-zinc-950 hover:text-white dark:hover:text-white px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl hover:bg-brand-terracotta-dark transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.97] text-xs sm:text-sm font-bold uppercase tracking-wider select-none mt-4 shadow-[0_4px_12px_rgba(196,98,45,0.3)] dark:shadow-[0_4px_12px_rgba(224,139,87,0.2)]"
                aria-label={isRTL ? "تسوق جميع المنتجات الطبيعية" : "Explore all natural products"}
              >
                {t.explore}
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 7 Categories Rails & Bento Placement */}
        {categories.map((cat, idx) => {
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

        {/* Customer reviews */}
        <section className="hidden sm:block bg-brand-cream-2 rounded-2xl p-6 sm:p-8 border border-border shadow-soft">
          <h2 className="font-display text-brand-forest text-center mb-6 font-bold" style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.5rem)" }}>
            {t.customerReviews}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { name: "Sarah M.", en: "Outstanding quality — the black seed oil noticeably improved my routine.", ar: "جودة استثنائية — حبة البركة أحدثت فرقاً ملحوظاً." },
              { name: "Ahmed K.", en: "Authentic Sidr honey, exactly as described. Worth every pound.", ar: "عسل سدر أصلي تماماً كما هو موصوف." },
              { name: "Emma L.", en: "The rose water is divine — my skin has never felt better.", ar: "ماء الورد رائع — بشرتي لم تشعر بأفضل من ذلك." },
            ].map((r, i) => (
              <div key={i} className="bg-card rounded-xl p-4 border border-border shadow-soft">
                <p className="text-foreground italic mb-3 text-start" style={{ fontSize: "0.92rem", lineHeight: 1.55 }}>
                  "{isRTL ? r.ar : r.en}"
                </p>
                <p className="text-brand-forest text-start font-semibold" style={{ fontSize: "0.88rem" }}>{r.name}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
