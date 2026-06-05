import { useEffect } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";

const THRESHOLD = 500;

export function CartDrawer() {
  const { items, isCartOpen, setCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const { t, isRTL } = useAppSettings();

  useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setCartOpen]);

  const progressPct = Math.min((totalPrice / THRESHOLD) * 100, 100);
  const remaining = (THRESHOLD - totalPrice).toFixed(2);

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
            role="dialog"
            aria-modal="true"
            aria-label={isRTL ? "عربة التسوق" : "Shopping Cart"}
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
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors"
                aria-label="Close"
              >
                <X size={16} className="text-foreground" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                  <ShoppingBag size={48} className="text-border" />
                  <p className="text-foreground">{t.cartEmpty}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "0.875rem" }}>{t.cartEmptyHint}</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-2 bg-brand-terracotta text-white px-6 py-2.5 rounded-xl hover:bg-brand-terracotta-dark transition-colors active:scale-95"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {t.browseProducts}
                  </button>
                </div>
              ) : (
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
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FAF6F0] flex-shrink-0 flex items-center justify-center p-1">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground line-clamp-2 mb-0.5" style={{ fontSize: "0.875rem" }}>
                          {item.product.name}
                        </p>
                        <p className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{item.product.weight}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-brand-terracotta" style={{ fontSize: "0.875rem" }}>
                            {t.currency} {(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center hover:border-brand-terracotta transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus size={11} className="text-foreground" />
                            </button>
                            <span className="text-foreground w-5 text-center" style={{ fontSize: "0.875rem" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center hover:border-brand-terracotta transition-colors"
                              aria-label="Increase"
                            >
                              <Plus size={11} className="text-foreground" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="self-start text-muted-foreground hover:text-destructive transition-colors p-1 mt-0.5"
                        aria-label="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
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
                      <span className="text-brand-terracotta" style={{ fontSize: "0.8rem" }}>
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
                  <p className="text-center text-brand-sage" style={{ fontSize: "0.8rem" }}>
                    🎉 {t.freeShipping}
                  </p>
                )}

                <div className="flex items-center justify-center gap-2.5 text-[11px] text-brand-terracotta bg-brand-peach/40 dark:bg-zinc-800/60 border border-brand-terracotta/10 dark:border-white/5 py-2 px-3.5 rounded-xl font-medium select-none shadow-sm leading-none">
                  <Truck size={14} className="text-brand-terracotta flex-shrink-0" />
                  <span className="pt-[0.5px]">
                    {locale === "ar"
                      ? "التوصيل المتوقع: ٥ إلى ٧ أيام عمل"
                      : "Estimated delivery: 5 to 7 working days"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground" style={{ fontSize: "0.9rem" }}>{t.subtotal}</span>
                  <span className="text-foreground" style={{ fontSize: "0.9rem" }}>
                    {t.currency} {totalPrice.toFixed(2)}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="w-full bg-brand-terracotta text-white py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-terracotta-dark transition-colors active:scale-[0.98]"
                  style={{ fontSize: "0.95rem" }}
                >
                  {t.proceedToCheckout}
                  <ArrowRight size={16} className="rtl-flip" />
                </Link>
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
