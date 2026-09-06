import { memo } from "react";
import { Heart, Plus, Leaf, Minus } from "lucide-react";
import { Link } from "react-router";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { toast } from "sonner";
import { Button } from "./ui/Button";
import logoImg from "../../assets/logo.webp";

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
  sage: "bg-brand-forest !text-brand-cream border-brand-forest",
  terracotta: "bg-brand-terracotta !text-brand-cream border-brand-terracotta",
};

export const ProductCard = memo(function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const { addToCart, items, updateQuantity, removeFromCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { t, isRTL, formatPrice } = useAppSettings();
  const wishlisted = isWishlisted(product.id);
  const badge = deriveBadge(product, isRTL);
  const productName = isRTL && product.nameAr ? product.nameAr : product.name;
  const cartItem = items.find(i => i.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${productName} • ${formatPrice(product.price)}`);
  };

  const onIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantityInCart + 1);
  };

  const onDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantityInCart <= 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, quantityInCart - 1);
    }
  };

  const onWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const price = `${product.priceFrom ? `${t.from} ` : ""}${formatPrice(product.price)}`;

  if (view === "list") {
    return (
      <article
        className="bg-card rounded-2xl border-0 sm:border border-border dark:border-zinc-700/60 overflow-hidden hover:shadow-tactile hover:border-brand-terracotta/40 transition-all duration-200 group flex gap-4 p-3 items-center active:scale-[0.995]"
      >
        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-1 px-1.5 sm:px-3">
          <div className="flex flex-col gap-1">
            {product.isOrganic && (
              <span className="inline-flex items-center gap-1 text-brand-forest dark:text-brand-sage-dark eyebrow" style={{ fontSize: "9px" }}>
                <Leaf size={9} /> {isRTL ? "عضوي" : "Organic"}
              </span>
            )}
            <h3 className="line-clamp-2" style={{ fontSize: "0.95rem", lineHeight: 1.3 }}>
              <Link
                to={`/products/${product.id}`}
                className="text-foreground font-semibold group-hover:text-brand-terracotta transition-colors outline-none focus-visible:underline"
              >
                {productName}
              </Link>
            </h3>
            <span className="text-brand-ink-soft text-xs font-medium">{product.weight || product.category}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-brand-forest font-bold" style={{ fontSize: "1.05rem" }}>{price}</span>
            {quantityInCart > 0 ? (
              <div className="flex h-11 items-center justify-between rounded-xl border border-brand-terracotta bg-brand-peach/40 dark:bg-zinc-800 px-1 min-w-[100px] select-none shadow-sm">
                <button
                  type="button"
                  onClick={onDecrement}
                  className="flex h-11 w-8 items-center justify-center rounded-lg text-brand-terracotta hover:bg-brand-peach active:scale-[0.92] transition-transform cursor-pointer"
                  aria-label={isRTL ? `إنقاص كمية ${productName}` : `Decrease quantity of ${product.name}`}
                >
                  <Minus size={13} />
                </button>
                <span className="font-bold text-xs text-brand-terracotta px-1">
                  {quantityInCart}
                </span>
                <button
                  type="button"
                  onClick={onIncrement}
                  className="flex h-11 w-8 items-center justify-center rounded-lg text-brand-terracotta hover:bg-brand-peach active:scale-[0.92] transition-transform cursor-pointer"
                  aria-label={isRTL ? `زيادة كمية ${productName}` : `Increase quantity of ${product.name}`}
                >
                  <Plus size={13} />
                </button>
              </div>
            ) : (
              <Button
                onClick={onAdd}
                size="sm"
                className="h-11 min-w-[44px] text-xs font-semibold rounded-xl"
                leftIcon={<Plus size={13} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              >
                {isRTL ? "أضف" : "Add"}
              </Button>
            )}
          </div>
        </div>
        <Link
          to={`/products/${product.id}`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden product-media-surface flex items-center justify-center border border-border/40 p-1 sm:p-1.5"
        >
          <img 
            src={product.image} 
            alt="" 
            width={112}
            height={112}
            decoding="async"
            className="w-[93%] h-[93%] object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:-translate-y-1" 
            loading="lazy" 
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = logoImg; }}
          />
        </Link>
      </article>
    );
  }

  return (
    <article
      className="bg-card rounded-2xl border-0 sm:border border-border dark:border-zinc-700/60 overflow-hidden flex flex-col h-full hover:shadow-tactile hover:border-brand-terracotta/40 transition-all duration-200 group active:scale-[0.99]"
    >
      <div className="relative isolate aspect-[1.1] sm:aspect-square product-media-surface overflow-hidden flex items-center justify-center p-1 sm:p-1.5 border-b-0 sm:border-b border-border/20">
        <Link
          to={`/products/${product.id}`}
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src={product.image}
            alt=""
            width={300}
            height={300}
            decoding="async"
            className="relative z-0 w-full h-full object-contain p-2.5 sm:p-3 mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:-translate-y-1"
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = logoImg; }}
          />
        </Link>

        {badge && (
          <span
            className={`absolute top-2.5 sm:top-3.5 start-2.5 sm:start-3.5 z-20 h-[22px] inline-flex items-center px-2 py-0.5 rounded-md border ${badgeCls[badge.tone]} eyebrow shadow-sm hidden sm:inline-flex pointer-events-none`}
            style={{ fontSize: "9.5px" }}
          >
            {badge.label}
          </span>
        )}

        <button
          type="button"
          onClick={onWish}
          aria-label={
            wishlisted
              ? (isRTL ? `إزالة ${productName} من قائمة الرغبات` : `Remove ${product.name} from wishlist`)
              : (isRTL ? `إضافة ${productName} إلى قائمة الرغبات` : `Add ${product.name} to wishlist`)
          }
          aria-pressed={wishlisted}
          className="absolute top-2.5 sm:top-3.5 end-2.5 sm:end-3.5 w-11 h-11 bg-card/95 rounded-full flex items-center justify-center border border-border text-brand-ink-soft hover:text-brand-terracotta hover:border-brand-terracotta shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 z-20 cursor-pointer"
        >
          <span
            className={`flex items-center justify-center transition-transform duration-200 ${wishlisted ? "scale-110" : "scale-100"}`}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-[15px] sm:h-[15px] ${wishlisted ? "fill-brand-terracotta text-brand-terracotta" : ""}`} />
          </span>
        </button>
      </div>

      <div className="px-2.5 sm:px-4 py-3 sm:py-3.5 flex flex-col flex-1">
        <div className="flex flex-col gap-1.5">
          <h3 className="min-h-[2.4rem] sm:min-h-[2.75rem]">
            <Link
              to={`/products/${product.id}`}
              className="text-foreground text-sm sm:text-base font-semibold line-clamp-2 leading-snug group-hover:text-brand-terracotta transition-colors outline-none focus-visible:underline"
            >
              {productName}
            </Link>
          </h3>
          <span className="text-brand-ink-soft text-[11px] sm:text-xs font-medium">
            {product.weight || product.category}
          </span>
          <span className="text-brand-forest font-bold text-sm sm:text-base mt-0.5">
            {price}
          </span>
        </div>

        <div className="pt-3 sm:pt-3.5 mt-auto w-full">
          {quantityInCart > 0 ? (
            <div className="flex h-11 items-center justify-between overflow-hidden rounded-xl border border-brand-terracotta bg-brand-peach/40 dark:bg-zinc-800 px-1 w-full select-none shadow-sm">
              <button
                type="button"
                onClick={onDecrement}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-brand-terracotta hover:bg-brand-peach transition-colors cursor-pointer"
                aria-label={isRTL ? `إنقاص كمية ${productName}` : `Decrease quantity of ${product.name}`}
              >
                <Minus size={14} />
              </button>
              <span className="font-bold text-xs text-brand-terracotta-dark dark:text-brand-terracotta px-1 truncate text-center">
                {quantityInCart} {isRTL ? "في السلة" : "in cart"}
              </span>
              <button
                type="button"
                onClick={onIncrement}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-brand-terracotta hover:bg-brand-peach transition-colors cursor-pointer"
                aria-label={isRTL ? `زيادة كمية ${productName}` : `Increase quantity of ${product.name}`}
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <Button
              onClick={onAdd}
              size="sm"
              fullWidth
              className="h-11 min-h-[44px] text-xs font-semibold rounded-xl"
              leftIcon={<Plus size={13} />}
            >
              {isRTL ? "أضف" : "Add"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
});
