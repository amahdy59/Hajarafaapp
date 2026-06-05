import { Link } from "react-router";
import { motion } from "motion/react";
import { Truck } from "lucide-react";
import { getProductsByCategory } from "../data/products";
import { categories } from "../data/categories";
import { ProductCard } from "../components/ProductCard";
import { ScrollRail } from "../components/ui/ScrollRail";
import { useAppSettings } from "../context/AppSettingsContext";

const HERO_IMG = "https://images.unsplash.com/photo-1758745464235-ccb8c1253074?w=1400&auto=format&fit=crop";
const HERITAGE_IMG = "https://images.unsplash.com/photo-1509156396595-449e10c5cd3e?w=900&auto=format&fit=crop";

export function Home() {
  const { t, isRTL } = useAppSettings();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-10 sm:gap-14">

        {/* Hero — hidden on mobile */}
        <section className="relative rounded-2xl overflow-hidden shadow-soft hidden sm:block" style={{ aspectRatio: "16/5", maxHeight: 240 }}>
          <img src={HERO_IMG} alt={isRTL ? "خلفية صحية طبيعية لعشبة البابونج" : "Chamomile natural wellness background"} className="absolute inset-0 w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-${isRTL ? "l" : "r"} from-brand-ink/80 via-brand-ink/40 to-transparent`} />
          <div className="absolute inset-0 flex items-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md bg-black/20 backdrop-blur-[2px] p-4.5 rounded-xl border border-white/5 shadow-lg select-none"
            >
              <span className="eyebrow text-brand-peach drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{t.appTagline}</span>
              <h1
                className="font-display text-white mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                style={{ fontSize: "clamp(1.35rem, 3.5vw, 1.85rem)", lineHeight: 1.15, letterSpacing: "-0.5px" }}
              >
                {t.heroHeadline}
              </h1>
              <p className="text-white/85 mt-1.5 mb-3.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] hidden md:block" style={{ fontSize: "0.85rem", lineHeight: 1.4, maxWidth: 360 }}>
                {t.heroSubline}
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-brand-terracotta text-white px-4.5 py-1.5 rounded-lg hover:bg-brand-terracotta-dark transition-colors active:scale-95 eyebrow text-xs font-semibold mt-1"
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

          return (
            <div key={cat.slug} className="flex flex-col gap-6">
              {/* Category-specific Banners */}
              <div className="relative h-18 sm:h-22 rounded-2xl overflow-hidden shadow-soft select-none border border-border/40">
                <img 
                  src={cat.image} 
                  alt={catName} 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className={`absolute inset-0 bg-gradient-to-${isRTL ? "l" : "r"} from-black/70 via-black/45 to-black/25`} />
                <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8.5 h-8.5 rounded-xl bg-white/20 flex items-center justify-center text-base backdrop-blur-sm border border-white/10">
                      {cat.icon}
                    </div>
                    <h2 className="font-display text-white text-base sm:text-xl font-bold drop-shadow-sm">
                      {catName}
                    </h2>
                  </div>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-xs sm:text-sm font-semibold text-brand-peach hover:text-white transition-colors duration-200 flex items-center gap-1.5 drop-shadow-sm"
                  >
                    <span>{isRTL ? "عرض الكل" : "View All"}</span>
                    <span className="rtl-flip">→</span>
                  </Link>
                </div>
              </div>

              {/* Scroll Rail */}
              <ScrollRail>
                {items.map(p => (
                  <div key={p.id} className="flex-shrink-0 snap-start w-[calc(50vw-28px)] sm:w-56">
                    <ProductCard product={p} />
                  </div>
                ))}
              </ScrollRail>

              {/* Insert Bento promo after the second category (index 1) */}
              {idx === 1 && (
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-4">
                  <div className="bg-brand-peach border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[182px] shadow-soft">
                    <Truck size={32} className="text-brand-terracotta mb-3" strokeWidth={1.5} />
                    <p className="text-foreground mb-1 font-semibold" style={{ fontSize: "1.2rem", letterSpacing: "0.6px" }}>
                      {t.freeDelivery}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>
                      {t.freeDeliveryNote} {t.currency} 500
                    </p>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-border min-h-[182px] shadow-soft">
                    <img src={HERITAGE_IMG} alt={isRTL ? "هاون خشبي تقليدي وأعشاب مجففة" : "Traditional wooden mortar and dried herbs"} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/85 via-brand-forest/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="font-display text-brand-peach mb-2 font-bold" style={{ fontSize: "1.4rem" }}>
                        {t.heritage}
                      </h3>
                      <p className="text-brand-peach/90 max-w-xs" style={{ fontSize: "0.88rem", lineHeight: 1.5 }}>
                        {t.heritageDesc}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>
          );
        })}

        {/* Customer reviews */}
        <section className="bg-brand-cream-2 rounded-2xl p-6 sm:p-8 border border-border shadow-soft">
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
