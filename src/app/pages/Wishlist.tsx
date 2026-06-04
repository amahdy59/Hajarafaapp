import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useWishlist } from "../context/WishlistContext";
import { ProductCard } from "../components/ProductCard";
import { motion } from "motion/react";
import { useAppSettings } from "../context/AppSettingsContext";

export function Wishlist() {
  const { items } = useWishlist();
  const { t, isRTL } = useAppSettings();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Heart size={22} className="text-brand-terracotta fill-brand-terracotta" />
          <h1 className="text-foreground font-display">{t.wishlist}</h1>
          <span className="bg-brand-peach text-brand-terracotta text-sm px-3 py-1 rounded-full font-medium">
            {items.length} {items.length === 1 ? t.item : t.items}
          </span>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-card border border-border rounded-3xl shadow-soft"
          >
            <Heart size={56} className="text-border mx-auto mb-4" />
            <h2 className="text-foreground mb-2">{t.wishlistEmpty}</h2>
            <p className="text-muted-foreground text-sm mb-6">{t.wishlistEmptyHint}</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-brand-terracotta text-white px-6 py-3 rounded-xl hover:bg-brand-terracotta-dark transition-all active:scale-[0.98] font-medium"
            >
              {t.discoverProducts} <ArrowRight size={16} className="rtl-flip" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <div className="h-20 sm:h-4" />
    </div>
  );
}
