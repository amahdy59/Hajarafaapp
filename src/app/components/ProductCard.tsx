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
  if (p.isBestSeller) return { label: isRTL ? "الأفضل" : "Best", tone: "sage" };
  if (p.isOrganic) return { label: isRTL ? "عضوي" : "Organic", tone: "sage" };
  return null;
}

const badgeCls: Record<BadgeTone, string> = {
  sage: "bg-brand-cream-2 text-brand-sage border-brand-sage",
  terracotta: "bg-brand-peach text-brand-terracotta border-brand-terracotta",
};

export function ProductCard({ product, view = "grid" }: ProductCardProps) {
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
        className="bg-card rounded-md border border-border overflow-hidden"
      >
        <Link to={`/products/${product.id}`} className="flex gap-3 p-3">
          <div className="relative w-24 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-[#FAF6F0]">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply p-2" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between gap-1">
            <div className="flex flex-col gap-0.5">
              {product.isOrganic && (
                <span className="inline-flex items-center gap-1 text-brand-sage eyebrow" style={{ fontSize: "10px" }}>
                  <Leaf size={10} /> {isRTL ? "عضوي" : "Organic"}
                </span>
              )}
              <h3 className="text-foreground line-clamp-2" style={{ fontSize: "0.95rem", lineHeight: 1.3, letterSpacing: "0.3px" }}>
                {isRTL && product.nameAr ? product.nameAr : product.name}
              </h3>
              <span className="text-brand-ink-soft" style={{ fontSize: "0.8rem" }}>{product.weight}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-brand-forest" style={{ fontSize: "1rem", letterSpacing: "0.4px" }}>{price}</span>
              <button
                onClick={onAdd}
                aria-label={t.addToCart}
                className="w-9 h-9 rounded-md bg-brand-terracotta text-white flex items-center justify-center hover:bg-brand-terracotta-dark transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ type: "tween", duration: 0.18 }}
      className="bg-card rounded-md border border-border overflow-hidden flex flex-col h-full"
    >
      <Link to={`/products/${product.id}`} className="flex flex-col flex-1">
        <div className="relative aspect-square bg-[#FAF6F0] overflow-hidden flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 hover:scale-[1.03]"
            loading="lazy"
          />

          {badge && (
            <span
              className={`absolute top-2 start-2 px-2 py-0.5 rounded-sm border ${badgeCls[badge.tone]} eyebrow`}
              style={{ fontSize: "10px" }}
            >
              {badge.label}
            </span>
          )}

          <button
            onClick={onWish}
            aria-label="Wishlist"
            className="absolute top-2 end-2 w-8 h-8 bg-card/90 backdrop-blur rounded-full flex items-center justify-center border border-border hover:scale-110 transition-transform"
          >
            <Heart size={14} className={wishlisted ? "fill-brand-terracotta text-brand-terracotta" : "text-brand-ink-soft"} />
          </button>
        </div>

        <div className="p-3 flex flex-col gap-1 flex-1">
          <h3
            className="text-foreground line-clamp-1"
            style={{ fontSize: "0.98rem", letterSpacing: "0.4px" }}
          >
            {isRTL && product.nameAr ? product.nameAr : product.name}
          </h3>
          <span className="text-brand-ink-soft" style={{ fontSize: "0.8rem" }}>
            {product.weight || product.category}
          </span>
          <div className="flex items-center justify-between pt-2 mt-auto">
            <span className="text-brand-forest" style={{ fontSize: "1rem", letterSpacing: "0.4px" }}>
              {price}
            </span>
            <button
              onClick={onAdd}
              aria-label={t.addToCart}
              className="w-8 h-8 rounded-md bg-brand-terracotta text-white flex items-center justify-center hover:bg-brand-terracotta-dark transition-colors active:scale-95"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
