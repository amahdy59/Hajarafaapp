import { memo } from "react";
import { Heart, Plus, Leaf } from "lucide-react";
import { Link } from "react-router";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Button } from "./ui/Button";


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
  sage: "bg-brand-sage/10 !text-brand-forest dark:!text-brand-sage-dark border-brand-sage/20",
  terracotta: "bg-brand-terracotta/10 !text-brand-terracotta-dark dark:!text-[#FFCFB3] border-brand-terracotta/20",
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
        className="bg-card rounded-2xl border-0 sm:border border-border dark:border-zinc-700/60 overflow-hidden hover:shadow-soft hover:border-brand-terracotta/40 transition-all duration-300 group"
      >
        <Link to={`/products/${product.id}`} className="flex gap-4 p-3 items-center">
          <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-1 px-1.5 sm:px-3">
            <div className="flex flex-col gap-1">
              {product.isOrganic && (
                <span className="inline-flex items-center gap-1 text-brand-forest dark:text-brand-sage-dark eyebrow" style={{ fontSize: "9px" }}>
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
              <Button
                onClick={onAdd}
                size="sm"
                className="h-11 text-xs font-semibold rounded-xl"
                leftIcon={<Plus size={13} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              >
                {isRTL ? "أضف" : "Add"}
              </Button>
            </div>
          </div>
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden product-media-surface flex items-center justify-center border border-border/40 p-1 sm:p-1.5">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-[93%] h-[93%] object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:-translate-y-1" 
              loading="lazy" 
            />
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
      className="bg-card rounded-2xl border-0 sm:border border-border dark:border-zinc-700/60 overflow-hidden flex flex-col h-full hover:shadow-soft hover:border-brand-terracotta/40 transition-all duration-300 group"
    >
      <Link to={`/products/${product.id}`} className="flex flex-col flex-1">
        <div className="relative aspect-[1.1] sm:aspect-square product-media-surface overflow-hidden flex items-center justify-center p-1 sm:p-1.5 border-b-0 sm:border-b border-border/20">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-2.5 sm:p-3 mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:-translate-y-1"
            loading="lazy"
          />

          {badge && (
            <span
              className={`absolute top-2.5 sm:top-3.5 start-2.5 sm:start-3.5 px-1.5 sm:px-2.5 py-0.5 rounded border ${badgeCls[badge.tone]} eyebrow shadow-sm hidden sm:inline-block`}
              style={{ fontSize: "9px" }}
            >
              {badge.label}
            </span>
          )}

          <motion.button
            onClick={onWish}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={wishlisted}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="absolute top-2.5 sm:top-3.5 end-2.5 sm:end-3.5 w-11 h-11 bg-card/90 backdrop-blur rounded-full flex items-center justify-center border border-border text-brand-ink-soft hover:text-brand-terracotta hover:border-brand-terracotta shadow-sm transition-colors duration-200 z-10"
          >
            <motion.span
              animate={wishlisted ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex items-center justify-center"
            >
              <Heart className={`w-3.5 h-3.5 sm:w-[15px] sm:h-[15px] ${wishlisted ? "fill-brand-terracotta text-brand-terracotta" : ""}`} />
            </motion.span>
          </motion.button>
        </div>

        <div className="px-2.5 sm:px-4 py-3 sm:py-3.5 flex flex-col flex-1">
          <div className="flex flex-col gap-1.5">
            <h3
              className="text-foreground text-sm sm:text-base font-semibold line-clamp-2 leading-snug min-h-[2.4rem] sm:min-h-[2.75rem] group-hover:text-brand-terracotta transition-colors"
            >
              {isRTL && product.nameAr ? product.nameAr : product.name}
            </h3>
            <span className="text-brand-ink-soft text-[11px] sm:text-xs font-medium">
              {product.weight || product.category}
            </span>
            <span className="text-brand-forest font-bold text-sm sm:text-base mt-0.5">
              {price}
            </span>
          </div>

          <div className="pt-3 sm:pt-3.5 mt-auto w-full">
            <Button
              onClick={onAdd}
              size="sm"
              fullWidth
              className="h-11 text-xs font-semibold rounded-xl"
              leftIcon={<Plus size={13} />}
            >
              {isRTL ? "أضف" : "Add"}
            </Button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
});
