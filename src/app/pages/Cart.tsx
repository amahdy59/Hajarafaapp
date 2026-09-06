import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, Sparkles, Truck, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/ui/Button";
import { DELIVERY_NOTICE, SHIPPING_CONFIG, CONTACT } from "../config/contact";
import { usePageMeta } from "../hooks/usePageMeta";

const SHIPPING_THRESHOLD = SHIPPING_CONFIG.freeThreshold;
const SHIPPING_COST = SHIPPING_CONFIG.flatRate;

export function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const { t, isRTL, locale, formatPrice } = useAppSettings();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const discount = couponApplied ? totalPrice * 0.1 : 0;
  const shipping = totalPrice >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const finalTotal = totalPrice - discount + shipping;
  const suggestedProducts = products.filter(p => !items.find(i => i.product.id === p.id)).slice(0, 4);

  usePageMeta({
    description: isRTL
      ? "راجع سلتك قبل الانتقال إلى الدفع مع ملخص أوضح للطلب."
      : "Review your cart before checkout with a clearer order summary.",
    title: isRTL ? "سلة التسوق | حاج عرفة" : "Shopping Cart | Haj Arafa",
  });

  const applyCoupon = () => {
    if (!couponCode.trim()) return;
    if (couponCode.trim().toUpperCase() === "NATURE10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError(isRTL ? "كود الخصم غير صحيح أو منتهي الصلاحية" : "Invalid or expired coupon code");
    }
  };

  const handleWhatsAppCartOrder = () => {
    if (items.length === 0) return;
    const itemList = items.map(item => {
      const name = isRTL && item.product.nameAr ? item.product.nameAr : item.product.name;
      return `• ${item.quantity}× ${name} (${(item.product.price * item.quantity).toFixed(2)} ج.م)`;
    }).join("\n");
    const text = isRTL
      ? `مرحباً حاج عرفة 🌿\nأود إتمام طلب السلة بالكامل:\n${itemList}\n\n• *الإجمالي:* ${finalTotal.toFixed(2)} ج.م\n\nيرجى تأكيد استلام الطلب لتزويدكم ببيانات العنوان ورقم الهاتف.`
      : `Hello Haj Arafa 🌿\nI would like to order my entire cart:\n${itemList}\n\n• *Total:* ${finalTotal.toFixed(2)} EGP\n\nPlease confirm my order.`;
    const url = `https://wa.me/${CONTACT.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto px-3.5 sm:px-6 py-6">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag size={22} className="text-brand-terracotta" />
          <h1 className="text-foreground text-2xl font-bold font-display">{t.shoppingCart}</h1>
          {totalItems > 0 && (
            <span className="bg-brand-peach text-brand-terracotta px-3 py-1 rounded-full text-sm font-semibold">
              {totalItems} {totalItems === 1 ? t.item : t.items}
            </span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-border">
            <ShoppingBag size={56} className="text-border mx-auto mb-4" />
            <h2 className="text-foreground mb-2 text-xl font-bold font-display">{t.cartEmpty}</h2>
            <p className="text-muted-foreground mb-6 text-sm">{t.cartEmptyHint}</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-brand-terracotta text-white px-6 py-3 rounded-xl hover:bg-brand-terracotta-dark transition-colors active:scale-95 text-sm font-semibold"
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
                    <span className="text-brand-terracotta font-semibold text-sm">
                      {formatPrice(SHIPPING_THRESHOLD - totalPrice)} {t.away}
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={Math.round(totalPrice)}
                    aria-valuemin={0}
                    aria-valuemax={SHIPPING_THRESHOLD}
                    aria-label={t.freeShipping}
                    className="bg-white/50 rounded-full h-2 overflow-hidden"
                  >
                    <div
                      className="bg-brand-terracotta h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((totalPrice / SHIPPING_THRESHOLD) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {totalPrice >= SHIPPING_THRESHOLD && (
                <div className="rounded-2xl border border-brand-sage/30 bg-brand-sage/10 p-4">
                  <div className="flex items-center gap-2 text-brand-sage-dark">
                    <Sparkles size={17} className="flex-shrink-0" />
                    <span className="font-semibold text-sm">
                      {t.freeShippingQualifiedTitle}
                    </span>
                  </div>
                  <p className="mt-1.5 text-muted-foreground text-xs">
                    {t.freeShippingQualifiedNote}
                  </p>
                </div>
              )}

              <AnimatePresence>
                {items.map(item => {
                  const itemName = isRTL && item.product.nameAr ? item.product.nameAr : item.product.name;
                  return (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="bg-card rounded-2xl p-4 flex gap-4 border border-border"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <Link to={`/products/${item.product.id}`}>
                              <h3 className="text-foreground line-clamp-2 hover:text-brand-terracotta transition-colors font-semibold text-sm">
                                {itemName}
                              </h3>
                            </Link>
                            <p className="text-muted-foreground mt-0.5 text-xs">
                              {item.product.weight} · {item.product.origin}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 p-1"
                            aria-label={isRTL ? `إزالة ${itemName} من السلة` : `Remove ${item.product.name} from cart`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border rounded-xl overflow-hidden">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-11 h-11 flex items-center justify-center hover:bg-muted transition-colors text-foreground"
                              aria-label={isRTL ? `تقليل كمية ${itemName}` : `Decrease quantity for ${item.product.name}`}
                            >
                              <Minus size={13} />
                            </button>
                            <span className="min-w-8 text-center text-foreground font-medium text-sm">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-11 h-11 flex items-center justify-center hover:bg-muted transition-colors text-foreground"
                              aria-label={isRTL ? `زيادة كمية ${itemName}` : `Increase quantity for ${item.product.name}`}
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <div className="text-end">
                            <p className="text-brand-terracotta font-semibold text-sm">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-muted-foreground text-xs">
                                {formatPrice(item.product.price)} {isRTL ? "للقطعة" : "each"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <Link to={`/products/${item.product.id}`} tabIndex={-1} aria-hidden="true" className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden product-media-surface flex-shrink-0 flex items-center justify-center p-2">
                        <img src={item.product.image} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="space-y-4">
              <div className="bg-card rounded-2xl p-5 space-y-4 border border-border">
                <h2 className="text-foreground text-base font-bold font-display">{t.orderSummary}</h2>

                {/* Free delivery promo banner */}
                <div className={`${shipping === 0 ? "bg-brand-sage/10 text-brand-sage-dark border-brand-sage/30" : "bg-brand-peach/40 text-brand-terracotta border-brand-peach/30"} text-xs font-semibold px-4.5 py-3 rounded-xl border flex items-center gap-2 select-none`}>
                  <Sparkles size={14} className="flex-shrink-0" />
                  <span>{shipping === 0 ? t.freeShippingQualifiedTitle : t.freeShipping}</span>
                </div>

                {/* Coupon */}
                {!couponApplied ? (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <input
                          type="text"
                          aria-label={t.couponCode}
                          placeholder={t.couponCode}
                          value={couponCode}
                          onChange={e => {
                            setCouponCode(e.target.value);
                            if (couponError) setCouponError("");
                          }}
                          aria-invalid={!!couponError}
                          aria-describedby={couponError ? "coupon-error-msg" : undefined}
                          className="w-full ps-9 pe-3 py-2.5 border border-border rounded-xl bg-background text-foreground outline-none focus:border-brand-terracotta transition-colors text-sm"
                        />
                      </div>
                      <Button
                        onClick={applyCoupon}
                        size="sm"
                        className="h-11 px-4 rounded-xl text-sm"
                      >
                        {t.apply}
                      </Button>
                    </div>
                    {couponError && (
                      <p id="coupon-error-msg" role="alert" className="text-xs text-destructive font-medium">
                        {couponError}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-brand-peach rounded-xl p-3">
                    <span className="text-brand-terracotta text-sm font-semibold">
                      ✓ NATURE10 — 10% {t.discount}
                    </span>
                    <button
                      onClick={() => { setCouponApplied(false); setCouponCode(""); }}
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs font-semibold"
                    >
                      {t.remove}
                    </button>
                  </div>
                )}
                <p className="text-muted-foreground text-xs">{t.tryCode}</p>

                <div className="space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t.subtotal} ({totalItems} {totalItems === 1 ? t.item : t.items})</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-brand-sage-dark">
                      <span>{t.discount} (10%)</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t.shipping}</span>
                    <span>
                      {shipping === 0
                        ? <span className="text-brand-sage-dark font-medium">{t.free}</span>
                        : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-foreground border-t border-border pt-2 font-bold">
                    <span>{t.total}</span>
                    <span className="text-brand-terracotta">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2.5 text-[11px] text-brand-terracotta bg-brand-peach/40 dark:bg-zinc-800/60 border border-brand-terracotta/10 dark:border-white/5 py-2 px-3.5 rounded-xl font-medium select-none shadow-sm leading-none">
                  <Truck size={14} className="text-brand-terracotta flex-shrink-0" />
                  <span className="pt-[0.5px]">
                    {locale === "ar"
                      ? DELIVERY_NOTICE.ar
                      : DELIVERY_NOTICE.en}
                  </span>
                </div>

                <Button
                  onClick={() => navigate("/checkout")}
                  size="lg"
                  fullWidth
                  className="w-full text-base font-bold"
                >
                  {t.proceedToCheckout}
                </Button>

                <button
                  type="button"
                  onClick={handleWhatsAppCartOrder}
                  className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-[#25D366]/12 hover:bg-[#25D366]/22 text-[#0d7337] dark:text-[#25D366] border border-[#25D366]/30 font-bold text-sm transition-all duration-200 active:scale-[0.99] cursor-pointer"
                  aria-label={t.orderCartViaWhatsApp}
                >
                  <MessageCircle size={18} className="text-[#25D366] flex-shrink-0" />
                  <span>{t.orderCartViaWhatsApp}</span>
                </button>

                <div className="flex items-center justify-center gap-3 text-muted-foreground pt-1 text-xs">
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
            <h2 className="text-foreground mb-5 text-lg font-bold font-display">{t.youMightAlsoLike}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
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
