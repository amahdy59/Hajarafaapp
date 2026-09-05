import { Heart, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useWishlist } from "../../context/WishlistContext";
import { useAppSettings } from "../../context/AppSettingsContext";
import { ProductCard } from "../../components/ProductCard";

export function AccountWishlist() {
  const { items: wishlistItems } = useWishlist();
  const { t } = useAppSettings();

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center gap-2.5 mb-4 border-b border-border/40 pb-2">
        <Heart size={20} className="text-brand-terracotta fill-brand-peach/40" />
        <h3 className="text-brand-forest dark:text-brand-sage-dark font-display text-lg sm:text-xl font-bold">{t.wishlist}</h3>
        <span className="bg-brand-cream-2 dark:bg-zinc-800 text-brand-forest dark:text-brand-sage text-xs px-2.5 py-0.5 rounded-full font-semibold border border-brand-sage/25">
          {wishlistItems.length} {wishlistItems.length === 1 ? t.item : t.items}
        </span>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl shadow-soft">
          <Heart size={44} className="text-border mx-auto mb-3" />
          <h4 className="text-foreground font-medium mb-1">{t.wishlistEmpty}</h4>
          <p className="text-muted-foreground text-xs mb-5">{t.wishlistEmptyHint}</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-brand-terracotta text-white px-5 py-2.5 rounded-xl hover:bg-brand-terracotta-dark transition-all active:scale-[0.98] text-xs font-semibold"
          >
            {t.discoverProducts} <ChevronRight size={14} className="rtl-flip animate-pulse" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
