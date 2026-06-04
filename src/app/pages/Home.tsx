import { Link } from "react-router";
import { motion } from "motion/react";
import { Truck, Heart as HeartIcon, Sparkles, Flame, Sun, Leaf } from "lucide-react";
import { getBestSellers, getNewProducts, getProductsByCategory } from "../data/products";
import { departments } from "../data/categories";
import { ProductCard } from "../components/ProductCard";
import { Section } from "../components/ui/Section";
import { ScrollRail } from "../components/ui/ScrollRail";
import { useAppSettings } from "../context/AppSettingsContext";

const concerns = [
  { key: "immunity", icon: Sparkles, slug: "honey" },
  { key: "energy", icon: Flame, slug: "coffee-drinks" },
  { key: "skin", icon: Sun, slug: "cosmetics" },
  { key: "relax", icon: HeartIcon, slug: "incense" },
  { key: "digest", icon: Leaf, slug: "spices" },
];

const HERO_IMG = "https://images.unsplash.com/photo-1758745464235-ccb8c1253074?w=1400&auto=format&fit=crop";
const HERITAGE_IMG = "https://images.unsplash.com/photo-1509156396595-449e10c5cd3e?w=900&auto=format&fit=crop";

export function Home() {
  const { t, isRTL } = useAppSettings();

  const featured = [...getBestSellers().slice(0, 2), ...getNewProducts().slice(0, 2)];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-10 sm:gap-14">

        {/* Hero */}
        <section className="relative rounded-md overflow-hidden shadow-soft" style={{ aspectRatio: "16/10", maxHeight: 420 }}>
          <img src={HERO_IMG} alt={isRTL ? "خلفية صحية طبيعية لعشبة البابونج" : "Chamomile natural wellness background"} className="absolute inset-0 w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-${isRTL ? "l" : "r"} from-brand-ink/80 via-brand-ink/40 to-transparent`} />
          <div className="absolute inset-0 flex items-center p-4 sm:p-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md bg-black/20 backdrop-blur-[2px] p-5 rounded-2xl border border-white/5 shadow-lg select-none"
            >
              <span className="eyebrow text-brand-peach drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">{t.appTagline}</span>
              <h1
                className="font-display text-white mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                style={{ fontSize: "clamp(1.65rem, 5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.5px" }}
              >
                {t.heroHeadline}
              </h1>
              <p className="text-white/85 mt-2.5 mb-4.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]" style={{ fontSize: "0.92rem", lineHeight: 1.45, maxWidth: 360 }}>
                {t.heroSubline}
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-brand-terracotta text-white px-5 py-2 rounded-xl hover:bg-brand-terracotta-dark transition-colors active:scale-95 eyebrow text-xs sm:text-sm font-semibold"
              >
                {t.explore}
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Browse Departments (Updated to compact horizontal icon-only cards) */}
        <Section title={t.browseDepartments}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {departments.map(d => (
              <Link
                key={d.id}
                to={d.children.length === 1 ? `/category/${d.children[0]}` : `/products?dept=${d.slug}`}
                className="group flex items-center gap-3 p-3 bg-card rounded-xl border border-border hover:border-brand-sage hover:shadow-soft transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-full bg-brand-peach flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 select-none">
                  {d.icon}
                </div>
                <div className="min-w-0">
                  <p className="eyebrow text-brand-terracotta uppercase" style={{ fontSize: "8px", letterSpacing: "0.5px" }}>
                    {d.group === "foods" ? t.foods : t.nonFood}
                  </p>
                  <p className="text-foreground font-semibold truncate mt-0.5" style={{ fontSize: "0.85rem" }}>
                    {isRTL && d.nameAr ? d.nameAr : d.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* Herbal Essentials grid */}
        <Section
          title={t.herbalEssentials}
          viewAllHref="/products"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>

        {/* Bento: Free Delivery + Heritage */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-brand-peach border border-border rounded-md p-8 flex flex-col items-center justify-center text-center min-h-[182px]">
            <Truck size={32} className="text-brand-terracotta mb-3" strokeWidth={1.5} />
            <p className="text-foreground mb-1" style={{ fontSize: "1.2rem", letterSpacing: "0.6px" }}>
              {t.freeDelivery}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>
              {t.freeDeliveryNote} {t.currency} 500
            </p>
          </div>
          <div className="relative rounded-md overflow-hidden border border-border min-h-[182px]">
            <img src={HERITAGE_IMG} alt={isRTL ? "هاون خشبي تقليدي وأعشاب مجففة" : "Traditional wooden mortar and dried herbs"} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/85 via-brand-forest/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="font-display text-brand-peach mb-2" style={{ fontSize: "1.4rem" }}>
                {t.heritage}
              </h3>
              <p className="text-brand-peach/90 max-w-xs" style={{ fontSize: "0.88rem", lineHeight: 1.5 }}>
                {t.heritageDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Trending category rails */}
        {[
          { slug: "coffee-drinks", title: t.coffeeLovers },
          { slug: "nuts", title: t.nutsSeeds },
          { slug: "cosmetics", title: t.naturalCosmetics },
        ].map(rail => {
          const items = getProductsByCategory(rail.slug).slice(0, 8);
          if (!items.length) return null;
          return (
            <Section
              key={rail.slug}
              title={rail.title}
              viewAllHref={`/category/${rail.slug}`}
            >
              <ScrollRail>
                {items.map(p => (
                  <div key={p.id} className="flex-shrink-0 snap-start w-44 sm:w-56">
                    <ProductCard product={p} />
                  </div>
                ))}
              </ScrollRail>
            </Section>
          );
        })}

        {/* Customer reviews */}
        <section className="bg-brand-cream-2 rounded-md p-6 sm:p-8 border border-border">
          <h2 className="font-display text-brand-forest text-center mb-6" style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.5rem)" }}>
            {t.customerReviews}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { name: "Sarah M.", en: "Outstanding quality — the black seed oil noticeably improved my routine.", ar: "جودة استثنائية — حبة البركة أحدثت فرقاً ملحوظاً." },
              { name: "Ahmed K.", en: "Authentic Sidr honey, exactly as described. Worth every pound.", ar: "عسل سدر أصلي تماماً كما هو موصوف." },
              { name: "Emma L.", en: "The rose water is divine — my skin has never felt better.", ar: "ماء الورد رائع — بشرتي لم تشعر بأفضل من ذلك." },
            ].map((r, i) => (
              <div key={i} className="bg-card rounded-md p-4 border border-border">
                <p className="text-foreground italic mb-3" style={{ fontSize: "0.92rem", lineHeight: 1.55 }}>
                  "{isRTL ? r.ar : r.en}"
                </p>
                <p className="text-brand-forest" style={{ fontSize: "0.88rem" }}>{r.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
