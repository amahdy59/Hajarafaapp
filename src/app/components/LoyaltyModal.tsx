import { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Award, Sparkles, TrendingUp, Gift, Clock, CheckCircle2 } from "lucide-react";
import { useLoyalty, LOYALTY_TIERS } from "../context/LoyaltyContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { useDialogAccessibility } from "../hooks/useDialogAccessibility";

export function LoyaltyModal() {
  const {
    isLoyaltyModalOpen,
    setLoyaltyModalOpen,
    points,
    transactions,
    tier,
    nextTier,
    pointsToNextTier,
    pointsToDiscountEgp,
  } = useLoyalty();

  const { isRTL, formatNumber, formatPrice } = useAppSettings();
  const modalRef = useRef<HTMLDivElement>(null);

  useDialogAccessibility({
    containerRef: modalRef,
    onClose: () => setLoyaltyModalOpen(false),
    open: isLoyaltyModalOpen,
  });

  const discountValEgp = pointsToDiscountEgp(points);

  return (
    <AnimatePresence>
      {isLoyaltyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLoyaltyModalOpen(false)}
            className="fixed inset-0 bg-brand-ink/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="loyalty-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-lg bg-card rounded-3xl border border-border shadow-elevated z-10 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header Banner */}
            <div className="relative bg-[#16261C] bg-gradient-to-r from-[#16261C] via-[#223829] to-[#16261C] p-6 text-white shadow-sm border-b border-white/10">
              <button
                type="button"
                onClick={() => setLoyaltyModalOpen(false)}
                className="absolute top-4 end-4 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer border border-white/25 focus-visible:ring-2 focus-visible:ring-white"
                aria-label={isRTL ? "إغلاق نافذة نقاط عرفة" : "Close loyalty modal"}
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Award className="text-amber-300" size={24} />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-200 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                  {isRTL ? "نادي عرفة للأعشاب" : "Haj Arafa Herbal Club"}
                </span>
              </div>

              <h2 id="loyalty-modal-title" className="text-2xl font-bold font-serif text-white">
                {isRTL ? "نقاطك ومكافآتك العشبية" : "Your Loyalty & Rewards"}
              </h2>
              <p className="text-sm text-stone-200 mt-1 leading-relaxed">
                {isRTL
                  ? "اجمع النقاط مع كل طلب واستبدلها بخصومات حقيقية ومنتجات حصرية"
                  : "Earn points with every botanical order and redeem them for real discounts"}
              </p>

              {/* Points Card Highlight */}
              <div className="mt-5 p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-200 font-bold">
                    {isRTL ? "رصيدك الحالي" : "Current Balance"}
                  </p>
                  <p className="text-3xl font-extrabold tracking-tight mt-0.5 text-white">
                    {formatNumber(points)} <span className="text-base font-normal text-amber-300">{isRTL ? "نقطة" : "pts"}</span>
                  </p>
                </div>
                <div className="text-end">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-[#16261C] shadow-sm">
                    {isRTL ? tier.nameAr : tier.nameEn}
                  </span>
                  <p className="text-xs text-white mt-1 font-semibold">
                    {isRTL ? `تعادل خصم ${formatPrice(discountValEgp)}` : `Value: ${formatPrice(discountValEgp)}`}
                  </p>
                </div>
              </div>

              {/* Progress to next tier */}
              {nextTier && (
                <div className="mt-4 pt-3 border-t border-white/15">
                  <div className="flex justify-between text-xs text-white/80 mb-1.5 font-medium">
                    <span>
                      {isRTL ? `المستوى التالي: ${nextTier.nameAr}` : `Next Tier: ${nextTier.nameEn}`}
                    </span>
                    <span>
                      {isRTL
                        ? `باقي ${formatNumber(pointsToNextTier)} نقطة`
                        : `${formatNumber(pointsToNextTier)} pts needed`}
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-amber-300 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.round((points / nextTier.minPoints) * 100))}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* How to Earn & Redeem */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-muted/50 border border-border flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-brand-sage/20 text-brand-sage-dark dark:text-brand-sage flex-shrink-0">
                    <TrendingUp size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">
                      {isRTL ? "اكسب مع كل طلب" : "Earn on Orders"}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isRTL ? "١ نقطة لكل ١٠ ج.م مشتريات" : "1 pt for every 10 EGP spent"}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-muted/50 border border-border flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-brand-terracotta/20 text-brand-terracotta flex-shrink-0">
                    <Gift size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">
                      {isRTL ? "استبدال فوري عند الدفع" : "Instant Redemption"}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isRTL ? "١٠٠ نقطة = ٢٥ ج.م خصم مباشر" : "100 pts = 25 EGP checkout discount"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tiers List */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
                  <Sparkles size={16} className="text-amber-500" />
                  {isRTL ? "مستويات العضوية والمزايا" : "Membership Tiers & Perks"}
                </h3>
                <div className="space-y-2">
                  {LOYALTY_TIERS.map(t => {
                    const isCurrent = t.id === tier.id;
                    return (
                      <div
                        key={t.id}
                        className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                          isCurrent
                            ? "border-brand-moss bg-brand-moss/5 dark:bg-brand-moss/10 shadow-sm ring-1 ring-brand-moss"
                            : "border-border bg-card/60 opacity-80"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-3 h-3 rounded-full bg-gradient-to-br ${t.color}`}
                            aria-hidden="true"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-foreground">
                                {isRTL ? t.nameAr : t.nameEn}
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] bg-brand-moss text-white px-2 py-0.5 rounded-full font-bold">
                                  {isRTL ? "مستواك الحالي" : "Current"}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {isRTL ? t.perksAr : t.perksEn}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                          {formatNumber(t.minPoints)}+ {isRTL ? "نقطة" : "pts"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Transaction History */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
                  <Clock size={16} className="text-muted-foreground" />
                  {isRTL ? "سجل النشاطات والنقاط" : "Points Ledger"}
                </h3>
                {transactions.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    {isRTL ? "لا توجد حركات مسجلة حتى الآن." : "No transactions recorded yet."}
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pe-1">
                    {transactions.map(tx => {
                      const isPositive = tx.points > 0;
                      return (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/50 text-xs"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {isPositive ? (
                              <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                            ) : (
                              <Gift size={16} className="text-brand-terracotta flex-shrink-0" />
                            )}
                            <div className="truncate">
                              <p className="font-medium text-foreground truncate">
                                {isRTL ? tx.reasonAr : tx.reasonEn}
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {new Date(tx.date).toLocaleDateString(isRTL ? "ar-EG" : "en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`font-bold whitespace-nowrap ps-2 ${
                              isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-brand-terracotta"
                            }`}
                          >
                            {isPositive ? `+${formatNumber(tx.points)}` : formatNumber(tx.points)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-muted/30 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={() => setLoyaltyModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-[#223829] hover:bg-[#16261C] dark:bg-[#ADC6A0] dark:hover:bg-[#C0D5C2] text-white dark:text-zinc-950 text-sm font-bold transition-all min-h-[44px] min-w-[100px] active:scale-[0.98] cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-[#223829]"
              >
                {isRTL ? "تم، شكراً" : "Got it"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
