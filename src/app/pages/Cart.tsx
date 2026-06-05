import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, Truck } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

const SHIPPING_THRESHOLD = 500;
const SHIPPING_COST = 49;

export function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const { t, isRTL, locale } = useAppSettings();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const discount = couponApplied ? totalPrice * 0.1 : 0;
  const shipping = totalPrice >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = totalPrice - discount + shipping;
  const suggestedProducts = products.filter(p => !items.find(i => i.product.id === p.id)).slice(0, 4);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "NATURE10") setCouponApplied(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag size={22} className="text-brand-terracotta" />
          <h1 className="text-foreground" style={{ fontSize: "1.4rem" }}>{t.shoppingCart}</h1>
          {totalItems > 0 && (
            <span className="bg-brand-peach text-brand-terracotta px-3 py-1 rounded-full" style={{ fontSize: "0.875rem" }}>
              {totalItems} {totalItems === 1 ? t.item : t.items}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-border">
            <ShoppingBag size={56} className="text-border mx-auto mb-4" />
            <h2 className="text-foreground mb-2">{t.cartEmpty}</h2>
            <p className="text-muted-foreground mb-6" style={{ fontSize: "0.875rem" }}>{t.cartEmptyHint}</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-brand-terracotta text-white px-6 py-3 rounded-xl hover:bg-brand-terracotta-dark transition-colors active:scale-95"
              style={{ fontSize: "0.875rem" }}
            >
              {t.browseProducts} <ArrowRight size={16} className="rtl-flip" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-3">
              {/* Free shipping progress */}
              {totalPrice < SHIPPING_THRESHOLD && (
                <div className="bg-brand-peach rounded-2xl p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-brand-terracotta" style={{ fontSize: "0.875rem" }}>
                      🚚 {t.currency} {(SHIPPING_THRESHOLD - totalPrice).toFixed(2)} {t.away}
                    </span>
                  </div>
                  <div className="bg-white/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-brand-terracotta h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((totalPrice / SHIPPING_THRESHOLD) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="bg-card rounded-2xl p-4 flex gap-4 border border-border"
                  >
                    <Link to={`/products/${item.product.id}`} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#FAF6F0] flex-shrink-0 flex items-center justify-center p-2">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <Link to={`/products/${item.product.id}`}>
                            <h3 className="text-foreground line-clamp-2 hover:text-brand-terracotta transition-colors" style={{ fontSize: "0.9rem" }}>
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-muted-foreground mt-0.5" style={{ fontSize: "0.78rem" }}>
                            {item.product.weight} · {item.product.origin}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 p-1"
                          aria-label="Remove"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors text-foreground"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center text-foreground" style={{ fontSize: "0.875rem" }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors text-foreground"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <div className="text-end">
                          <p className="text-brand-terracotta" style={{ fontSize: "0.9rem" }}>
                            {t.currency} {(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>
                              {t.currency} {item.product.price.toFixed(2)} {isRTL ? "للقطعة" : "each"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="space-y-4">
              <div className="bg-card rounded-2xl p-5 space-y-4 border border-border">
                <h2 className="text-foreground" style={{ fontSize: "1rem" }}>{t.orderSummary}</h2>

                {/* Free delivery promo banner */}
                <div className="bg-brand-peach/40 text-brand-terracotta text-xs font-semibold px-4.5 py-3 rounded-xl border border-brand-peach/30 flex items-center gap-2 select-none">
                  <span>✨</span>
                  <span>{t.freeShipping}</span>
                </div>

                {/* Coupon */}
                {!couponApplied ? (
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-muted-foreground`} />
                      <input
                        type="text"
                        placeholder={t.couponCode}
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                        className={`w-full ${isRTL ? "pr-9 pl-3" : "pl-9 pr-3"} py-2.5 border border-border rounded-xl bg-background text-foreground outline-none focus:border-brand-terracotta transition-colors`}
                        style={{ fontSize: "0.875rem" }}
                      />
                    </div>
                    <button
                      onClick={applyCoupon}
                      className="bg-brand-terracotta text-white px-4 py-2.5 rounded-xl hover:bg-brand-terracotta-dark transition-colors active:scale-95"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {t.apply}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-brand-peach rounded-xl p-3">
                    <span className="text-brand-terracotta" style={{ fontSize: "0.875rem" }}>
                      ✓ NATURE10 — 10% {t.discount}
                    </span>
                    <button
                      onClick={() => { setCouponApplied(false); setCouponCode(""); }}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {t.remove}
                    </button>
                  </div>
                )}
                <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{t.tryCode}</p>

                <div className="space-y-2 border-t border-border pt-4" style={{ fontSize: "0.875rem" }}>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t.subtotal} ({totalItems} {totalItems === 1 ? t.item : t.items})</span>
                    <span>{t.currency} {totalPrice.toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-brand-sage">
                      <span>{t.discount} (10%)</span>
                      <span>-{t.currency} {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t.shipping}</span>
                    <span>
                      {shipping === 0
                        ? <span className="text-brand-sage">{t.free}</span>
                        : `${t.currency} ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-foreground border-t border-border pt-2">
                    <span>{t.total}</span>
                    <span className="text-brand-terracotta">{t.currency} {finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2.5 text-[11px] text-brand-terracotta bg-brand-peach/40 dark:bg-zinc-800/60 border border-brand-terracotta/10 dark:border-white/5 py-2 px-3.5 rounded-xl font-medium select-none shadow-sm leading-none">
                  <Truck size={14} className="text-brand-terracotta flex-shrink-0" />
                  <span className="pt-[0.5px]">
                    {locale === "ar"
                      ? "التوصيل المتوقع: ٥ إلى ٧ أيام عمل"
                      : "Estimated delivery: 5 to 7 working days"}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="w-full block bg-brand-terracotta text-white py-3.5 rounded-xl text-center hover:bg-brand-terracotta-dark transition-colors active:scale-[0.98]"
                  style={{ fontSize: "0.95rem" }}
                >
                  {t.proceedToCheckout}
                </Link>

                <div className="flex items-center justify-center gap-3 text-muted-foreground pt-1" style={{ fontSize: "0.75rem" }}>
                  <span>{t.secureCheckoutNote}</span>
                  <span>·</span>
                  <span>{t.returnsNote}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Suggested products */}
        {suggestedProducts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-foreground mb-5" style={{ fontSize: "1.1rem" }}>{t.youMightAlsoLike}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {suggestedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
      <div className="h-20 sm:h-4" />
    </div>
  );
}
