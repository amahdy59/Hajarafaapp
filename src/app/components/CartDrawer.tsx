import { useRef } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Sparkles, Truck, MessageCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/Button";
import { DELIVERY_NOTICE, SHIPPING_CONFIG, CONTACT } from "../config/contact";
import { useDialogAccessibility } from "../hooks/useDialogAccessibility";

export function CartDrawer() {
  const { items, isCartOpen, setCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const { t, isRTL, locale, formatPrice } = useAppSettings();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement>(null);

  useDialogAccessibility({
    containerRef: dialogRef,
    onClose: () => setCartOpen(false),
    open: isCartOpen,
  });

  const THRESHOLD = SHIPPING_CONFIG.freeThreshold;
  const progressPct = Math.min((totalPrice / THRESHOLD) * 100, 100);
  const remaining = formatPrice(THRESHOLD - totalPrice);

  const handleWhatsAppCartOrder = () => {
    if (items.length === 0) return;
    const itemList = items.map(item => {
      const name = isRTL && item.product.nameAr ? item.product.nameAr : item.product.name;
      return `• ${item.quantity}× ${name} (${(item.product.price * item.quantity).toFixed(2)} ج.م)`;
    }).join("\n");
    const text = isRTL
      ? `مرحباً حاج عرفة 🌿\nأود إتمام طلب السلة:\n${itemList}\n\n• *المجموع:* ${totalPrice.toFixed(2)} ج.م\n\nيرجى تأكيد الطلب وتزويدي بالتفاصيل.`
      : `Hello Haj Arafa 🌿\nI would like to order my cart items:\n${itemList}\n\n• *Total:* ${totalPrice.toFixed(2)} EGP\n\nPlease confirm my order.`;
    const url = `https://wa.me/${CONTACT.whatsappPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-40"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={isRTL ? "عربة التسوق" : "Shopping Cart"}
            tabIndex={-1}
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed ${isRTL ? "left-0" : "right-0"} top-0 bottom-0 w-full max-w-sm bg-background z-50 flex flex-col shadow-elev border-s border-border`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-brand-terracotta" />
                <h2 className="text-foreground" style={{ fontSize: "1rem" }}>{t.shoppingCart}</h2>
                {totalItems > 0 && (
                  <span className="bg-brand-terracotta text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="w-11 h-11 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors"
                aria-label={isRTL ? "إغلاق" : "Close"}
              >
                <X size={16} className="text-foreground" />
              </button>
            </div>

            {/* Elevated Free Shipping Progress Meter */}
            {items.length > 0 && (
              <div className="px-5 py-3 bg-card/60 border-b border-border space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground flex items-center gap-1 font-medium">
                    <Truck size={13} className="text-brand-terracotta" />
                    {totalPrice >= THRESHOLD ? (
                      <span className="text-emerald-800 dark:text-emerald-300 font-bold">
                        {isRTL ? "🎉 شحن مجاني لكافة المحافظات!" : "🎉 Free Express Shipping Unlocked!"}
                      </span>
                    ) : (
                      <span>{t.freeShipping}</span>
                    )}
                  </span>
                  {totalPrice < THRESHOLD && (
                    <span className="text-brand-terracotta font-bold text-[11px]">
                      {t.currency} {remaining} {t.away}
                    </span>
                  )}
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={Math.round(totalPrice)}
                  aria-valuemin={0}
                  aria-valuemax={THRESHOLD}
                  aria-label={t.freeShipping}
                  className="w-full bg-muted rounded-full h-1.5 overflow-hidden"
                >
                  <div
                    className="bg-brand-terracotta h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                  <ShoppingBag size={48} className="text-border" />
                  <p className="text-foreground">{t.cartEmpty}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>{t.cartEmptyHint}</p>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="mt-2 bg-brand-terracotta text-white px-6 py-2.5 rounded-xl hover:bg-brand-terracotta-dark transition-colors active:scale-95 min-h-11"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {t.browseProducts}
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(item => {
                    const itemName = isRTL && item.product.nameAr ? item.product.nameAr : item.product.name;
                    return (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        transition={{ type: "spring", stiffness: 350, damping: 35 }}
                        className="flex gap-3 bg-card rounded-2xl p-3 border border-border"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-foreground line-clamp-2 mb-0.5" style={{ fontSize: "0.875rem" }}>
                            {itemName}
                          </p>
                          <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{item.product.weight}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-brand-terracotta font-semibold" style={{ fontSize: "0.875rem" }}>
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-11 h-11 rounded-full bg-background border border-border flex items-center justify-center hover:border-brand-terracotta transition-colors"
                                aria-label={isRTL ? `تقليل كمية ${itemName}` : `Decrease quantity for ${item.product.name}`}
                              >
                                <Minus size={13} className="text-foreground" />
                              </button>
                              <span className="text-foreground min-w-6 text-center font-medium" style={{ fontSize: "0.875rem" }}>
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-11 h-11 rounded-full bg-background border border-border flex items-center justify-center hover:border-brand-terracotta transition-colors"
                                aria-label={isRTL ? `زيادة كمية ${itemName}` : `Increase quantity for ${item.product.name}`}
                              >
                                <Plus size={13} className="text-foreground" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="w-16 h-16 rounded-xl overflow-hidden product-media-surface flex-shrink-0 flex items-center justify-center p-1">
                          <img
                            src={item.product.image}
                            alt=""
                            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="self-start text-muted-foreground hover:text-destructive transition-colors p-2 mt-0.5"
                          aria-label={isRTL ? `إزالة ${itemName} من السلة` : `Remove ${item.product.name} from cart`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-border bg-card space-y-3">
                {/* Free shipping progress */}
                {totalPrice < THRESHOLD && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground" style={{ fontSize: "0.8rem" }}>
                        {t.freeShipping}
                      </span>
                      <span className="text-brand-terracotta font-semibold" style={{ fontSize: "0.8rem" }}>
                        {remaining} {t.away}
                      </span>
                    </div>
                    <div
                      role="progressbar"
                      aria-valuenow={Math.round(totalPrice)}
                      aria-valuemin={0}
                      aria-valuemax={THRESHOLD}
                      aria-label={t.freeShipping}
                      className="w-full bg-muted rounded-full h-2 overflow-hidden"
                    >
                      <div
                        className="bg-brand-terracotta h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                )}
                {totalPrice >= THRESHOLD && (
                  <div className="rounded-2xl border border-brand-sage/30 bg-brand-sage/10 px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2 text-brand-sage-dark">
                      <Sparkles size={15} className="flex-shrink-0" />
                      <p className="font-semibold" style={{ fontSize: "0.84rem" }}>
                        {t.freeShippingQualifiedTitle}
                      </p>
                    </div>
                    <p className="mt-1 text-muted-foreground" style={{ fontSize: "0.74rem" }}>
                      {t.freeShippingQualifiedNote}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2.5 text-[11px] text-brand-terracotta bg-brand-peach/40 dark:bg-zinc-800/60 border border-brand-terracotta/10 dark:border-white/5 py-2 px-3.5 rounded-xl font-medium select-none shadow-sm leading-none">
                  <Truck size={14} className="text-brand-terracotta flex-shrink-0" />
                  <span className="pt-[0.5px]">
                    {locale === "ar"
                      ? DELIVERY_NOTICE.ar
                      : DELIVERY_NOTICE.en}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>{t.subtotal}</span>
                  <span className="text-foreground" style={{ fontSize: "0.9rem" }}>
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <Button
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/checkout");
                  }}
                  size="lg"
                  fullWidth
                  rightIcon={<ArrowRight size={16} className="rtl-flip" />}
                >
                  {t.proceedToCheckout}
                </Button>

                <button
                  type="button"
                  onClick={handleWhatsAppCartOrder}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-all min-h-[44px] active:scale-[0.98] shadow-sm cursor-pointer"
                  aria-label={isRTL ? "إرسال الطلب عبر واتساب (يفتح في نافذة جديدة)" : "Send order via WhatsApp (opens in a new tab)"}
                >
                  <MessageCircle size={15} className="text-emerald-800 dark:text-emerald-300 flex-shrink-0" />
                  <span>{isRTL ? "طلب سريع عبر واتساب" : "Quick Order via WhatsApp"}</span>
                </button>
                <Link
                  to="/cart"
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-muted-foreground hover:text-foreground transition-colors"
                  style={{ fontSize: "0.875rem" }}
                >
                  {t.viewFullCart}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
