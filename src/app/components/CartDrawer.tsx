import { useRef, useState, useMemo } from "react";
import { 
  X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Sparkles, 
  Truck, Tag, MessageCircle, Check, Percent 
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/Button";
import { DELIVERY_NOTICE } from "../config/contact";
import { useDialogAccessibility } from "../hooks/useDialogAccessibility";
import { products, Product } from "../data/products";
import { generateWhatsAppOrderLink } from "../config/cloudflare";
import { toast } from "sonner";

const THRESHOLD = 500;

export function CartDrawer() {
  const { 
    items, isCartOpen, setCartOpen, updateQuantity, removeFromCart, 
    totalPrice, totalItems, discountAmount, effectiveTotalPrice,
    coupon, applyCoupon, removeCoupon, addToCart 
  } = useCart();
  const { t, isRTL, locale } = useAppSettings();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement>(null);

  const [promoInput, setPromoInput] = useState("");

  useDialogAccessibility({
    containerRef: dialogRef,
    onClose: () => setCartOpen(false),
    open: isCartOpen,
  });

  const progressPct = Math.min((totalPrice / THRESHOLD) * 100, 100);
  const remaining = (THRESHOLD - totalPrice).toFixed(2);

  // In-cart smart upsell suggestions (items not currently in cart)
  const upsellProducts = useMemo(() => {
    const cartIds = new Set(items.map(i => i.product.id));
    return products.filter(p => !cartIds.has(p.id) && (p.isBestSeller || p.isOrganic)).slice(0, 2);
  }, [items]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput, isRTL);
    if (res.success) {
      toast.success(res.message);
      setPromoInput("");
    } else {
      toast.error(res.message);
    }
  };

  const handleWhatsAppOrder = () => {
    const summaryItems = items.map(item => ({
      name: isRTL && item.product.nameAr ? item.product.nameAr : item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));
    const waUrl = generateWhatsAppOrderLink(summaryItems, effectiveTotalPrice, t.currency, isRTL);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-ink/45 backdrop-blur-sm z-40"
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
            className={`fixed ${isRTL ? "left-0" : "right-0"} top-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col shadow-elev border-s border-border`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-brand-terracotta" />
                <h2 className="text-foreground font-display font-bold text-base">{t.shoppingCart}</h2>
                {totalItems > 0 && (
                  <span className="bg-brand-terracotta text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors text-foreground"
                aria-label={isRTL ? "إغلاق" : "Close"}
              >
                <X size={17} />
              </button>
            </div>

            {/* Items Container */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-12">
                  <div className="w-16 h-16 rounded-full bg-brand-peach flex items-center justify-center text-brand-terracotta">
                    <ShoppingBag size={28} />
                  </div>
                  <p className="text-foreground font-bold">{t.cartEmpty}</p>
                  <p className="text-muted-foreground text-xs max-w-xs">{t.cartEmptyHint}</p>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="mt-2 bg-brand-terracotta text-white px-6 py-2.5 rounded-xl hover:bg-brand-terracotta-dark transition-all active:scale-95 text-xs font-bold shadow-sm"
                  >
                    {t.browseProducts}
                  </button>
                </div>
              ) : (
                <>
                  <AnimatePresence>
                    {items.map(item => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        transition={{ type: "spring", stiffness: 350, damping: 35 }}
                        className="flex gap-3 bg-card rounded-2xl p-3 border border-border"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden product-media-surface flex-shrink-0 flex items-center justify-center p-1 border border-border/30">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-foreground font-semibold text-xs sm:text-sm line-clamp-1 mb-0.5">
                            {isRTL && item.product.nameAr ? item.product.nameAr : item.product.name}
                          </p>
                          <p className="text-muted-foreground text-[11px]">{item.product.weight || item.product.category}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-brand-terracotta font-bold text-xs sm:text-sm">
                              {t.currency} {(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center hover:border-brand-terracotta transition-colors"
                                aria-label={`Decrease quantity`}
                              >
                                <Minus size={12} className="text-foreground" />
                              </button>
                              <span className="text-foreground min-w-5 text-center text-xs font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center hover:border-brand-terracotta transition-colors"
                                aria-label={`Increase quantity`}
                              >
                                <Plus size={12} className="text-foreground" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="self-start text-muted-foreground hover:text-destructive transition-colors p-1"
                          aria-label={`Remove from cart`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* In-Cart Smart Upsells */}
                  {upsellProducts.length > 0 && (
                    <div className="pt-3 border-t border-border/50">
                      <span className="eyebrow block mb-2 text-[10px]">
                        {isRTL ? "أضف لطلبك ووفر الشحن" : "Frequently Added With Your Items"}
                      </span>
                      <div className="space-y-2">
                        {upsellProducts.map(up => (
                          <div
                            key={up.id}
                            className="flex items-center justify-between p-2 rounded-xl bg-brand-peach/30 dark:bg-zinc-800/60 border border-brand-terracotta/10 text-xs"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <img src={up.image} alt="" className="w-8 h-8 object-contain mix-blend-multiply dark:mix-blend-normal flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="font-semibold text-foreground truncate text-xs">
                                  {isRTL && up.nameAr ? up.nameAr : up.name}
                                </p>
                                <p className="text-[11px] text-brand-terracotta font-bold">
                                  {t.currency} {up.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                addToCart(up, 1);
                                toast.success(`${isRTL && up.nameAr ? up.nameAr : up.name} ${t.addedToCart}`);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-brand-terracotta text-white font-bold text-[11px] hover:bg-brand-terracotta-dark transition-all flex items-center gap-1 active:scale-95"
                            >
                              <Plus size={12} />
                              <span>{isRTL ? "أضف" : "Add"}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-border bg-card space-y-3">
                {/* Free shipping progress */}
                {totalPrice < THRESHOLD && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{t.freeShipping}</span>
                      <span className="text-brand-terracotta font-bold">
                        {t.currency} {remaining} {t.away}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-brand-terracotta h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                )}
                {totalPrice >= THRESHOLD && (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30 px-3.5 py-2 text-center text-xs">
                    <div className="flex items-center justify-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold">
                      <Sparkles size={14} />
                      <span>{t.freeShippingQualifiedTitle}</span>
                    </div>
                  </div>
                )}

                {/* Promo / Coupon Code Input */}
                <div className="pt-1">
                  {coupon ? (
                    <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold">
                        <Percent size={14} />
                        <span>{coupon.code} (-{coupon.discountPercent}% OFF)</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs text-red-600 hover:underline font-semibold"
                      >
                        {isRTL ? "إلغاء" : "Remove"}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-1.5">
                      <div className="relative flex-1">
                        <Tag size={13} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={promoInput}
                          onChange={e => setPromoInput(e.target.value)}
                          placeholder={isRTL ? "رمز الكوبون (مثال: ARAFANEW10)" : "Promo code (e.g. ARAFANEW10)"}
                          className="w-full ps-8 pe-3 py-1.5 rounded-xl border border-border bg-background text-xs font-semibold outline-none focus:border-brand-terracotta"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-muted hover:bg-brand-peach hover:text-brand-terracotta font-bold text-xs rounded-xl border border-border transition-colors"
                      >
                        {isRTL ? "تطبيق" : "Apply"}
                      </button>
                    </form>
                  )}
                </div>

                {/* Subtotal & Discount */}
                <div className="space-y-1 text-xs border-t border-border/50 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t.subtotal}</span>
                    <span className="text-foreground font-semibold">{t.currency} {totalPrice.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 font-bold">
                      <span>{isRTL ? "الخصم" : "Discount"}</span>
                      <span>-{t.currency} {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm font-bold pt-1 border-t border-border/40">
                    <span className="text-foreground">{t.total}</span>
                    <span className="text-brand-terracotta text-base">{t.currency} {effectiveTotalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <Button
                    onClick={() => {
                      setCartOpen(false);
                      navigate("/checkout");
                    }}
                    size="lg"
                    fullWidth
                    className="font-bold text-sm h-11"
                    rightIcon={<ArrowRight size={16} className="rtl-flip" />}
                  >
                    {t.proceedToCheckout}
                  </Button>

                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="w-full flex items-center justify-center gap-2 border border-emerald-600/40 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 py-2.5 rounded-xl hover:bg-emerald-100 transition-colors text-xs font-bold"
                  >
                    <MessageCircle size={15} />
                    <span>{isRTL ? "الطلب الفوري عبر واتساب" : "Quick Order via WhatsApp"}</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
