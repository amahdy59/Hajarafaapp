import { useState, useRef, useId } from "react";
import { X, Gift, Check, Sparkles, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useAppSettings } from "../context/AppSettingsContext";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { useDialogAccessibility } from "../hooks/useDialogAccessibility";
import { Button } from "./ui/Button";

interface GiftHamperModalProps {
  open: boolean;
  onClose: () => void;
}

interface BoxOption {
  id: string;
  name: string;
  nameAr: string;
  desc: string;
  descAr: string;
  price: number;
  icon: string;
}

const BOX_OPTIONS: BoxOption[] = [
  {
    id: "box-wood",
    name: "Heritage Olive Wood Casket",
    nameAr: "صندوق خشب زيتون أندلسي فاخر",
    desc: "Handcrafted natural wood with laser-engraved Arabesque brass clasp",
    descAr: "خشب طبيعي محفور بنقوش أرابيسك وقفل نحاسي عتيق",
    price: 150,
    icon: "🪵",
  },
  {
    id: "box-velvet",
    name: "Royal Embroidered Velvet Box",
    nameAr: "علبة مخملية مطرزة ملكية",
    desc: "Forest green velvet casket with gold-threaded calligraphy",
    descAr: "مخمل ملكي أخضر داكن مطرز بخيوط ذهبية أنيقة",
    price: 120,
    icon: "👑",
  },
  {
    id: "box-wicker",
    name: "Siwa Oasis Palm Wicker Hamper",
    nameAr: "سلة خوص نخيل واحات طبيعية",
    desc: "Eco-friendly traditional hand-woven palm fronds with silk ribbon",
    descAr: "خوص نخيل واحات سيوة الطبيعي المجدول يدوياً برباط حريري",
    price: 80,
    icon: "🧺",
  },
];

export function GiftHamperModal({ open, onClose }: GiftHamperModalProps) {
  const { isRTL, formatPrice } = useAppSettings();
  const { addToCart } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);
  const headingId = useId();

  useDialogAccessibility({
    containerRef: modalRef,
    open,
    onClose,
  });

  // Default selection: first box and first 3 popular products
  const [selectedBoxId, setSelectedBoxId] = useState<string>("box-wood");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    products[0]?.id || "p-honey-sidr",
    products[1]?.id || "p-coffee-arabic",
    products[2]?.id || "p-spices-bbq",
  ]);
  const [recipientName, setRecipientName] = useState("");
  const [greetingMessage, setGreetingMessage] = useState("");

  const selectedBox = BOX_OPTIONS.find((b) => b.id === selectedBoxId) || BOX_OPTIONS[0]!;
  const selectedProducts = products.filter((p) => selectedProductIds.includes(p.id));

  const totalHamperPrice =
    selectedBox.price +
    selectedProducts.reduce((sum, p) => sum + p.price, 0);

  const toggleProduct = (productId: string) => {
    if (selectedProductIds.includes(productId)) {
      if (selectedProductIds.length <= 1) {
        toast.error(
          isRTL
            ? "يرجى اختيار منتج واحد على الأقل داخل الصندوق"
            : "Please select at least 1 product for the gift box"
        );
        return;
      }
      setSelectedProductIds(selectedProductIds.filter((id) => id !== productId));
    } else {
      if (selectedProductIds.length >= 4) {
        toast.error(
          isRTL
            ? "الحد الأقصى لكل صندوق هو ٤ منتجات مختارة"
            : "Maximum 4 curated items per gift box"
        );
        return;
      }
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  const handleAddToCart = () => {
    // Add packaging and all selected items
    selectedProducts.forEach((p) => addToCart(p));

    const boxName = isRTL ? selectedBox.nameAr : selectedBox.name;
    toast.success(
      isRTL
        ? `🎁 تم تجهيز ${boxName} وإضافته بنجاح إلى السلة!`
        : `🎁 Custom ${boxName} added to cart successfully!`
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-ink/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-card border border-border shadow-elev rounded-3xl overflow-hidden z-10 my-6 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-amber-50/50 dark:bg-zinc-800/50">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-brand-terracotta/10 text-brand-terracotta flex items-center justify-center flex-shrink-0">
                  <Gift size={20} />
                </div>
                <div>
                  <h2 id={headingId} className="text-base sm:text-lg font-display font-bold text-foreground leading-tight">
                    {isRTL ? "صمم صندوق هداياك العشبي المخصص" : "Curate Your Heritage Gift Hamper"}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {isRTL ? "اختر التغليف التراثي، انتقِ المنتجات، واكتب إهداءك الخاص" : "Select artisan packaging, pick 1–4 items, and add a personalized card"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-border transition-colors cursor-pointer"
                aria-label={isRTL ? "إغلاق" : "Close"}
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Step 1: Packaging Style */}
              <section aria-labelledby="step-box-title">
                <h3 id="step-box-title" className="text-xs font-bold text-brand-terracotta uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>{isRTL ? "١. اختر نمط التغليف التراثي" : "1. Choose Packaging Style"}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {BOX_OPTIONS.map((box) => {
                    const isSelected = selectedBoxId === box.id;
                    return (
                      <button
                        key={box.id}
                        type="button"
                        onClick={() => setSelectedBoxId(box.id)}
                        className={`p-3.5 rounded-2xl border text-start flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? "border-brand-terracotta bg-brand-peach/40 dark:bg-zinc-800 ring-2 ring-brand-terracotta/20"
                            : "border-border bg-card hover:border-brand-terracotta/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{box.icon}</span>
                          <span className="text-xs font-bold text-brand-forest dark:text-brand-sage-dark">
                            +{formatPrice(box.price)}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-foreground leading-tight">
                            {isRTL ? box.nameAr : box.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">
                            {isRTL ? box.descAr : box.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Step 2: Choose Products */}
              <section aria-labelledby="step-items-title">
                <div className="flex items-center justify-between mb-3">
                  <h3 id="step-items-title" className="text-xs font-bold text-brand-terracotta uppercase tracking-wider flex items-center gap-1.5">
                    <Check size={13} />
                    <span>{isRTL ? "٢. انتقِ محتويات الصندوق (١ - ٤ منتجات)" : "2. Curate Hamper Contents (1–4 Items)"}</span>
                  </h3>
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {selectedProductIds.length}/4 {isRTL ? "مختارة" : "selected"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto p-1">
                  {products.slice(0, 8).map((p) => {
                    const isSelected = selectedProductIds.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => toggleProduct(p.id)}
                        className={`p-2.5 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition-all cursor-pointer relative ${
                          isSelected
                            ? "border-brand-terracotta bg-brand-peach/30 dark:bg-zinc-800"
                            : "border-border bg-card hover:border-brand-terracotta/40"
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-1.5 end-1.5 w-5 h-5 rounded-full bg-brand-terracotta text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                            ✓
                          </span>
                        )}
                        <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-zinc-700/50 p-1 flex items-center justify-center">
                          <img src={p.image} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                        </div>
                        <p className="text-[11px] font-bold text-foreground line-clamp-1 w-full">
                          {isRTL && p.nameAr ? p.nameAr : p.name}
                        </p>
                        <p className="text-[10px] font-semibold text-brand-terracotta">
                          {formatPrice(p.price)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Step 3: Personalized Greeting Card */}
              <section aria-labelledby="step-card-title">
                <h3 id="step-card-title" className="text-xs font-bold text-brand-terracotta uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Heart size={13} />
                  <span>{isRTL ? "٣. بطاقة إهداء مخصصة (مجاناً)" : "3. Handwritten Gift Card (Free)"}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="hamper-recipient" className="block text-xs font-semibold text-foreground mb-1">
                      {isRTL ? "اسم المهدي إليه" : "Recipient Name"}
                    </label>
                    <input
                      id="hamper-recipient"
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder={isRTL ? "مثال: الوالدة الكريمة، الصديق العزيز..." : "e.g., Dearest Mother, Best Friend..."}
                      className="w-full h-11 rounded-xl bg-background border border-border px-3.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
                    />
                  </div>
                  <div>
                    <label htmlFor="hamper-message" className="block text-xs font-semibold text-foreground mb-1">
                      {isRTL ? "نص رسالة الإهداء" : "Gift Greeting Note"}
                    </label>
                    <input
                      id="hamper-message"
                      type="text"
                      value={greetingMessage}
                      onChange={(e) => setGreetingMessage(e.target.value)}
                      placeholder={isRTL ? "مع أطيب تمنياتي بالصحة والعافية..." : "Wishing you wellness and happiness..."}
                      className="w-full h-11 rounded-xl bg-background border border-border px-3.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Summary & Action */}
            <div className="px-6 py-4 border-t border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-muted-foreground">{isRTL ? "إجمالي الهدية:" : "Hamper Total:"}</span>
                  <span className="text-lg font-extrabold text-brand-forest dark:text-brand-sage-dark">
                    {formatPrice(totalHamperPrice)}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {isRTL ? "يشمل الصندوق الفاخر والمنتجات وبطاقة الإهداء" : "Includes artisan box, products & gift card"}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  onClick={handleAddToCart}
                  size="md"
                  className="flex-1 sm:flex-none min-h-[44px] px-6 rounded-xl font-bold"
                  leftIcon={<Gift size={16} />}
                >
                  {isRTL ? "إضافة الهدية إلى السلة" : "Add Gift Hamper to Cart"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
