import { memo } from "react";
import { Heart, Plus, Leaf } from "lucide-react";
import { Link } from "react-router";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { toast } from "sonner";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  view?: "grid" | "list";
}

type BadgeTone = "sage" | "terracotta";

function deriveBadge(p: Product, isRTL: boolean): { label: string; tone: BadgeTone } | null {
  if (p.discount) return { label: `-${p.discount}%`, tone: "terracotta" };
  if (p.isNew) return { label: isRTL ? "جديد" : "New", tone: "sage" };
  if (p.isBestSeller) return { label: isRTL ? "الأكثر مبيعاً" : "Best Seller", tone: "sage" };
  if (p.isOrganic) return { label: isRTL ? "عضوي" : "Organic", tone: "sage" };
  return null;
}

const badgeCls: Record<BadgeTone, string> = {
  sage: "bg-brand-cream-2 text-brand-sage border-brand-sage",
  terracotta: "bg-brand-peach text-brand-terracotta border-brand-terracotta",
};

export const ProductCard = memo(function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { t, isRTL } = useAppSettings();
  const wishlisted = isWishlisted(product.id);
  const badge = deriveBadge(product, isRTL);

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} • ${t.currency} ${product.price.toFixed(2)}`);
  };

  const onWish = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    toggleWishlist(product);
  };

  const price = `${product.priceFrom ? `${t.from} ` : ""}${t.currency} ${product.price.toFixed(2)}`;

  if (view === "list") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.995 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="bg-card rounded-2xl border border-border dark:border-zinc-700/60 overflow-hidden hover:shadow-soft hover:border-brand-terracotta/40 transition-all duration-300 group"
      >
        <Link to={`/products/${product.id}`} className="flex gap-4 p-4 items-center">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-[#FAF6F0] flex items-center justify-center border border-border/40 p-1 sm:p-1.5">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-[93%] h-[93%] object-contain mix-blend-multiply transition-transform duration-500 group-hover:-translate-y-1" 
              loading="lazy" 
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-1.5 px-2 sm:px-4">
            <div className="flex flex-col gap-1">
              {product.isOrganic && (
                <span className="inline-flex items-center gap-1 text-brand-sage eyebrow" style={{ fontSize: "9px" }}>
                  <Leaf size={9} /> {isRTL ? "عضوي" : "Organic"}
                </span>
              )}
              <h3 className="text-foreground font-semibold group-hover:text-brand-terracotta transition-colors line-clamp-2" style={{ fontSize: "0.95rem", lineHeight: 1.3 }}>
                {isRTL && product.nameAr ? product.nameAr : product.name}
              </h3>
              <span className="text-brand-ink-soft text-xs font-medium">{product.weight || product.category}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-brand-forest font-bold" style={{ fontSize: "1.05rem" }}>{price}</span>
              <motion.button
                onClick={onAdd}
                aria-label={t.addToCart}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="w-9 h-9 rounded-xl bg-brand-terracotta text-white flex items-center justify-center hover:bg-brand-terracotta-dark shadow-sm transition-colors"
              >
                <Plus size={18} />
              </motion.button>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="bg-card rounded-2xl border border-border dark:border-zinc-700/60 overflow-hidden flex flex-col h-full hover:shadow-soft hover:border-brand-terracotta/40 transition-all duration-300 group"
    >
      <Link to={`/products/${product.id}`} className="flex flex-col flex-1">
        <div className="relative aspect-square bg-[#FAF6F0] overflow-hidden flex items-center justify-center p-1 sm:p-1.5 border-b border-border/20">
          <img
            src={product.image}
            alt={product.name}
            className="w-[93%] h-[93%] object-contain mix-blend-multiply transition-transform duration-500 group-hover:-translate-y-1.5"
            loading="lazy"
          />

          {badge && (
            <span
              className={`absolute top-3.5 start-3.5 px-2.5 py-0.5 rounded bg-card border ${badgeCls[badge.tone]} eyebrow shadow-sm`}
              style={{ fontSize: "9px" }}
            >
              {badge.label}
            </span>
          )}

          <motion.button
            onClick={onWish}
            aria-label="Wishlist"
            whileHover={{
              scale: [1, 1.25, 1.12, 1.25, 1],
              transition: {
                duration: 0.7,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            whileTap={{ scale: 0.85 }}
            className="absolute top-3.5 end-3.5 w-8.5 h-8.5 bg-card/90 backdrop-blur rounded-full flex items-center justify-center border border-border text-brand-ink-soft hover:text-brand-terracotta hover:border-brand-terracotta shadow-sm transition-colors duration-200 z-10"
          >
            <motion.span
              animate={wishlisted ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex items-center justify-center"
            >
              <Heart size={15} className={wishlisted ? "fill-brand-terracotta text-brand-terracotta" : ""} />
            </motion.span>
          </motion.button>
        </div>

        <div className="px-3 sm:px-5 py-3 sm:py-4.5 flex flex-col gap-1 flex-1">
          <h3
            className="text-foreground text-[0.82rem] sm:text-base font-semibold line-clamp-2 leading-snug group-hover:text-brand-terracotta transition-colors"
          >
            {isRTL && product.nameAr ? product.nameAr : product.name}
          </h3>
          <span className="text-brand-ink-soft text-[10px] sm:text-xs font-medium">
            {product.weight || product.category}
          </span>
          <div className="flex items-center justify-between pt-2 sm:pt-3 mt-auto">
            <span className="text-brand-forest font-bold text-sm sm:text-base">
              {price}
            </span>
            <motion.button
              onClick={onAdd}
              aria-label={t.addToCart}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-9 h-9 rounded-xl bg-brand-terracotta text-white flex items-center justify-center hover:bg-brand-terracotta-dark shadow-sm transition-colors"
            >
              <Plus size={18} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
});
