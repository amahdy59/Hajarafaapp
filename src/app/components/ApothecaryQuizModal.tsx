import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Check, ChevronLeft, ChevronRight, ShoppingBag, ShieldCheck, Heart, Moon, Zap, Leaf } from "lucide-react";
import { products, Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { useDialogAccessibility } from "../hooks/useDialogAccessibility";
import { toast } from "sonner";

interface QuizAnswers {
  goal: "digestion" | "immunity_sleep" | "energy" | "beauty";
  format: "herbs" | "honey_oils" | "nutrition";
  lifestyle: "caffeine_free" | "zero_sugar" | "balanced";
}

interface RecommendationPlan {
  titleAr: string;
  titleEn: string;
  adviceAr: string;
  adviceEn: string;
  productIds: string[];
}

export function getQuizRecommendation(answers: QuizAnswers): RecommendationPlan {
  const { goal, format } = answers;

  if (goal === "digestion") {
    return {
      titleAr: "روتين توازن الجهاز الهضمي والراحة المعوية",
      titleEn: "Digestive Balance & Soothing Gut Regimen",
      adviceAr: "ينصح بتناول كوب دافئ من مغلي الينسون النقي مساءً، وملعقة صغيرة من خل التفاح الطبيعي مخففة بالماء قبل الوجبة الرئيسية.",
      adviceEn: "Steep pure anise before resting, and take one teaspoon of raw apple cider vinegar diluted in warm water before meals.",
      productIds: format === "honey_oils" ? ["p11", "p17a", "p12"] : ["p11", "p12", "p17"],
    };
  }

  if (goal === "immunity_sleep") {
    return {
      titleAr: "برنامج تقوية المناعة والنوم العميق الهادئ",
      titleEn: "Immune Shield & Deep Restorative Sleep Plan",
      adviceAr: "ملعقة من عسل حبة البركة صباحاً على الريق، مع مغلي الينسون العطري قبل النوم بساعة لتنظيم الدورة الحيوية واسترخاء الأعصاب.",
      adviceEn: "Take one spoon of black seed honey on an empty stomach, complemented with warm aromatic anise an hour before bed.",
      productIds: ["p17b", "p11", "p17"],
    };
  }

  if (goal === "energy") {
    return {
      titleAr: "باقة النشاط الحيوي والتركيز الذهني الطبيعي",
      titleEn: "Physical Stamina & Mind Focus Botanical Pack",
      adviceAr: "تناول ٣ حبات من عجوة المدينة مع ملعقة عسل جبلي بالمكسرات في الصباح لبدء يومك بطاقة مستدامة خالية من الهبوط المفاجئ.",
      adviceEn: "Consume 3 Agwa dates with mountain nut honey in the morning for sustained endurance without sugar crashes.",
      productIds: ["p3", "p17c", "p8"],
    };
  }

  // beauty
  return {
    titleAr: "إكسير النضارة العشبية والعناية الفائقة",
    titleEn: "Herbal Radiance & Skin-Hair Apothecary Elixir",
    adviceAr: "استخدم كريم اللوز والرمان للترطيب المسائي، مع قطرات من زيت العنبر الطبيعي للعناية بأطراف الشعر وحمايته من التقصف.",
    adviceEn: "Massage skin with almond pomegranate cream at night, and apply pure amber oil to hair tips for natural luster.",
    productIds: ["p4", "p7", "p24"],
  };
}

export function ApothecaryQuizModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3 | "result">(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    goal: "immunity_sleep",
    format: "honey_oils",
    lifestyle: "balanced",
  });

  const { isRTL, formatPrice } = useAppSettings();
  const { addToCart, setCartOpen } = useCart();
  const modalRef = useRef<HTMLDivElement>(null);

  useDialogAccessibility({
    containerRef: modalRef,
    onClose,
    open: isOpen,
  });

  const recommendation = getQuizRecommendation(answers);
  const recommendedProducts = recommendation.productIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const rawTotal = recommendedProducts.reduce((sum, p) => sum + p.price, 0);
  const discountedTotal = rawTotal * 0.85; // 15% apothecary bundle discount

  const handleAddBundleToCart = () => {
    recommendedProducts.forEach(p => addToCart(p, 1));
    toast.success(
      isRTL
        ? "تمت إضافة باقة وصفتك العشبية للسلة بخصم ١٥٪! 🌿"
        : "Apothecary regimen added to your cart with 15% savings! 🌿"
    );
    onClose();
    setCartOpen(true);
  };

  const resetQuiz = () => {
    setStep(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-ink/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quiz-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-xl bg-card rounded-3xl border border-border shadow-elevated z-10 overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Top Bar */}
            <div className="bg-[#16261C] bg-gradient-to-r from-[#16261C] via-[#223829] to-[#16261C] text-white p-5 flex items-center justify-between relative shadow-sm border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/15 text-amber-300 border border-white/20">
                  <Sparkles size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-200 tracking-wider uppercase block">
                    {isRTL ? "استشارة تفاعلية فورية" : "Interactive Clinical Consultation"}
                  </span>
                  <h2 id="quiz-modal-title" className="text-lg font-bold font-serif text-white">
                    {isRTL ? "مستشارك العشبي الذكي" : "Apothecary Wellness Advisor"}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer border border-white/25 focus-visible:ring-2 focus-visible:ring-white"
                aria-label={isRTL ? "إغلاق المستشار العشبي" : "Close apothecary advisor"}
              >
                <X size={18} />
              </button>
            </div>

            {/* Step Progress Bar */}
            {step !== "result" && (
              <div
                role="progressbar"
                aria-label={isRTL ? "تقدم الاستشارة العشبية" : "Apothecary consultation progress"}
                aria-valuenow={step}
                aria-valuemin={1}
                aria-valuemax={3}
                className="px-6 py-3 bg-stone-100/80 dark:bg-stone-900/60 border-b border-border flex items-center justify-between text-xs"
              >
                <span className="font-bold text-foreground">
                  {isRTL ? `الخطوة ${step} من ٣` : `Step ${step} of 3`}
                </span>
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-10 rounded-full transition-colors ${step >= 1 ? "bg-[#223829] dark:bg-[#ADC6A0]" : "bg-stone-300 dark:bg-stone-700"}`} />
                  <div className={`h-2.5 w-10 rounded-full transition-colors ${step >= 2 ? "bg-[#223829] dark:bg-[#ADC6A0]" : "bg-stone-300 dark:bg-stone-700"}`} />
                  <div className={`h-2.5 w-10 rounded-full transition-colors ${step >= 3 ? "bg-[#223829] dark:bg-[#ADC6A0]" : "bg-stone-300 dark:bg-stone-700"}`} />
                </div>
              </div>
            )}

            {/* Step 1: Health Goal */}
            {step === 1 && (
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    {isRTL ? "ما هو هدفك الصحي أو العطاري الرئيسي اليوم؟" : "What is your primary wellness goal today?"}
                  </h3>
                  <p className="text-xs text-stone-700 dark:text-stone-300 font-medium mt-1 leading-relaxed">
                    {isRTL
                      ? "سنختار لك أعشاباً وخلاصات تم اختبار فعاليتها المتوارثة لأكثر من ٧ عقود."
                      : "We will tailor botanical formulas proven across 7+ decades of apothecary wisdom."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    {
                      id: "digestion",
                      icon: Leaf,
                      titleAr: "راحة الهضم والقولون والانتفاخ",
                      titleEn: "Digestion, Gut Comfort & Detox",
                      descAr: "تهدئة المعدة، تحسين الامتصاص وطرد الغازات",
                      descEn: "Soothe digestion, reduce bloating and purify gut",
                    },
                    {
                      id: "immunity_sleep",
                      icon: Moon,
                      titleAr: "النوم الهادئ وتعزيز المناعة الطبيعية",
                      titleEn: "Restful Sleep & Immune Defense",
                      descAr: "استرخاء الجهاز العصبي وتقوية الدفاعات الحيوية",
                      descEn: "Nervous calm, restorative rest and cellular vitality",
                    },
                    {
                      id: "energy",
                      icon: Zap,
                      titleAr: "النشاط البدني والصفاء والتركيز الذهني",
                      titleEn: "Endurance, Energy & Mental Sharpness",
                      descAr: "حيوية تدوم طوال اليوم بدون إجهاد أو توتر",
                      descEn: "Long-lasting natural fuel without caffeine jitters",
                    },
                    {
                      id: "beauty",
                      icon: Heart,
                      titleAr: "العناية الطبيعية بالبشرة ونضارة الشعر",
                      titleEn: "Botanical Skin Glow & Hair Vitality",
                      descAr: "تغذية عميقة بمستخلصات الزهور والزيوت البكر",
                      descEn: "Deep hydration with virgin oils and floral extracts",
                    },
                  ].map(option => {
                    const isSelected = answers.goal === option.id;
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setAnswers(prev => ({ ...prev, goal: option.id as QuizAnswers["goal"] }))}
                        className={`w-full p-4 rounded-2xl border-2 text-start transition-all flex items-center gap-3.5 cursor-pointer ${
                          isSelected
                            ? "border-[#223829] dark:border-[#ADC6A0] bg-[#223829]/10 dark:bg-[#ADC6A0]/15 shadow-sm ring-1 ring-[#223829] dark:ring-[#ADC6A0]"
                            : "border-border hover:border-stone-400 dark:hover:border-stone-600 hover:bg-muted/40"
                        }`}
                      >
                        <div
                          className={`p-2.5 rounded-xl flex-shrink-0 ${
                            isSelected
                              ? "bg-[#223829] text-white dark:bg-[#ADC6A0] dark:text-zinc-950 font-bold"
                              : "bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground">
                            {isRTL ? option.titleAr : option.titleEn}
                          </p>
                          <p className="text-xs text-stone-700 dark:text-stone-300 font-medium mt-0.5">
                            {isRTL ? option.descAr : option.descEn}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "border-[#223829] bg-[#223829] text-white dark:border-[#ADC6A0] dark:bg-[#ADC6A0] dark:text-zinc-950"
                              : "border-stone-400 dark:border-stone-500 bg-background"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Preferred Delivery Format */}
            {step === 2 && (
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    {isRTL ? "كيف تفضل تناول وصفتك العشبية؟" : "What form of botanical regimen do you prefer?"}
                  </h3>
                  <p className="text-xs text-stone-700 dark:text-stone-300 font-medium mt-1 leading-relaxed">
                    {isRTL
                      ? "لكل شخص طقسه المفضل في الاستمتاع بفوائد الطبيعة."
                      : "Choose the herbal ritual that fits effortlessly into your lifestyle."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    {
                      id: "herbs",
                      titleAr: "مشروبات وأعشاب مغلية وزهورات عطرية",
                      titleEn: "Herbal Tisanes, Teas & Infusions",
                      descAr: "تحضير دافئ وسريع للاستمتاع برائحة العشبة ونقائها",
                      descEn: "Steeped warmth for soothing botanical aromatics",
                    },
                    {
                      id: "honey_oils",
                      titleAr: "عسل نقي معصور على البارد وزيوت نباتية",
                      titleEn: "Raw Mountain Honey & Pure Botanical Oils",
                      descAr: "جرعات يومية ملعقية مركزة ومستخلصات فاخرة",
                      descEn: "Potent single-spoon daily dosages and pure extracts",
                    },
                    {
                      id: "nutrition",
                      titleAr: "ثمار طبيعية ومكسرات فاخرة وتمر",
                      titleEn: "Superfood Nuts, Agwa Dates & Whole Foods",
                      descAr: "وجبات خفيفة غنية ومغذية متوازنة",
                      descEn: "Whole, nutrient-dense apothecary superfoods",
                    },
                  ].map(option => {
                    const isSelected = answers.format === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setAnswers(prev => ({ ...prev, format: option.id as QuizAnswers["format"] }))}
                        className={`w-full p-4 rounded-2xl border-2 text-start transition-all flex items-center gap-3.5 cursor-pointer ${
                          isSelected
                            ? "border-[#223829] dark:border-[#ADC6A0] bg-[#223829]/10 dark:bg-[#ADC6A0]/15 shadow-sm ring-1 ring-[#223829] dark:ring-[#ADC6A0]"
                            : "border-border hover:border-stone-400 dark:hover:border-stone-600 hover:bg-muted/40"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground">
                            {isRTL ? option.titleAr : option.titleEn}
                          </p>
                          <p className="text-xs text-stone-700 dark:text-stone-300 font-medium mt-0.5">
                            {isRTL ? option.descAr : option.descEn}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "border-[#223829] bg-[#223829] text-white dark:border-[#ADC6A0] dark:bg-[#ADC6A0] dark:text-zinc-950"
                              : "border-stone-400 dark:border-stone-500 bg-background"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Dietary Preference */}
            {step === 3 && (
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    {isRTL ? "هل لديك أية تفضيلات أو محاذير محددة؟" : "Any special preferences or dietary guidelines?"}
                  </h3>
                  <p className="text-xs text-stone-700 dark:text-stone-300 font-medium mt-1 leading-relaxed">
                    {isRTL
                      ? "نراعي أعلى معايير السلامة والتوافق مع نظامك الغذائي."
                      : "We prioritize clean labels and 100% botanical safety standards."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    {
                      id: "caffeine_free",
                      titleAr: "خالٍ تماماً من الكافيين والمحفزات",
                      titleEn: "100% Caffeine-Free & Non-Stimulant",
                      descAr: "مناسب للأمسيات والراحة والقلب الهادئ",
                      descEn: "Gentle formulation optimal for day or evening use",
                    },
                    {
                      id: "zero_sugar",
                      titleAr: "خالٍ من السكريات المضافة والمحليات الصناعية",
                      titleEn: "Zero Added Sugars or Sweeteners",
                      descAr: "مكونات خام طبيعية بحتة كما خرجت من الأرض",
                      descEn: "Wholesome, unadulterated botanical ingredients",
                    },
                    {
                      id: "balanced",
                      titleAr: "توازن شامل وروتين استشفاء يومي",
                      titleEn: "Balanced Daily Wellness Routine",
                      descAr: "تركيبة جامعة لتعزيز الصحة العامة بدون قيود",
                      descEn: "All-around nourishment suitable for everyday living",
                    },
                  ].map(option => {
                    const isSelected = answers.lifestyle === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setAnswers(prev => ({ ...prev, lifestyle: option.id as QuizAnswers["lifestyle"] }))}
                        className={`w-full p-4 rounded-2xl border-2 text-start transition-all flex items-center gap-3.5 cursor-pointer ${
                          isSelected
                            ? "border-[#223829] dark:border-[#ADC6A0] bg-[#223829]/10 dark:bg-[#ADC6A0]/15 shadow-sm ring-1 ring-[#223829] dark:ring-[#ADC6A0]"
                            : "border-border hover:border-stone-400 dark:hover:border-stone-600 hover:bg-muted/40"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground">
                            {isRTL ? option.titleAr : option.titleEn}
                          </p>
                          <p className="text-xs text-stone-700 dark:text-stone-300 font-medium mt-0.5">
                            {isRTL ? option.descAr : option.descEn}
                          </p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "border-[#223829] bg-[#223829] text-white dark:border-[#ADC6A0] dark:bg-[#ADC6A0] dark:text-zinc-950"
                              : "border-stone-400 dark:border-stone-500 bg-background"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Results Screen */}
            {step === "result" && (
              <div className="p-6 overflow-y-auto space-y-5 flex-1">
                {/* Result Title & Wisdom Advice */}
                <div className="p-4 rounded-2xl bg-brand-moss/10 dark:bg-brand-moss/20 border border-brand-moss/30 space-y-2">
                  <div className="flex items-center gap-2 text-brand-forest dark:text-brand-sage font-bold">
                    <ShieldCheck size={20} />
                    <h3 className="text-sm font-bold">
                      {isRTL ? recommendation.titleAr : recommendation.titleEn}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                    {isRTL ? recommendation.adviceAr : recommendation.adviceEn}
                  </p>
                </div>

                {/* Recommended Products */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {isRTL ? "مكونات الروتين المخصص (٣ منتجات)" : "Curated Formula Products (3 Items)"}
                    </h4>
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 px-2.5 py-1 rounded-full">
                      {isRTL ? "خصم ١٥٪ على المجموعة" : "15% Bundle Savings"}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {recommendedProducts.map(p => {
                      const name = isRTL && p.nameAr ? p.nameAr : p.name;
                      return (
                        <div
                          key={p.id}
                          className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border"
                        >
                          <img
                            src={p.image}
                            alt={name}
                            className="w-14 h-14 object-cover rounded-xl border border-border flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-foreground truncate">{name}</p>
                            <p className="text-[11px] text-muted-foreground">{p.weight}</p>
                            <span className="text-xs font-bold text-brand-terracotta dark:text-[#EAA06D] mt-0.5 block">
                              {formatPrice(p.price)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Price summary */}
                <div className="p-4 rounded-2xl bg-muted/40 border border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground block">
                      {isRTL ? "السعر الإجمالي للباقة:" : "Total Regimen Price:"}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-brand-terracotta dark:text-[#EAA06D]">
                        {formatPrice(discountedTotal)}
                      </span>
                      <span className="text-xs line-through text-muted-foreground">
                        {formatPrice(rawTotal)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddBundleToCart}
                    className="flex items-center gap-2 bg-[#223829] hover:bg-[#16261C] dark:bg-[#ADC6A0] dark:hover:bg-[#C0D5C2] text-white dark:text-zinc-950 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 min-h-[44px] cursor-pointer"
                  >
                    <ShoppingBag size={16} />
                    <span>{isRTL ? "إضافة الباقة للسلة" : "Add Bundle to Cart"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Actions Footer */}
            <div className="p-4 bg-card border-t border-border flex items-center justify-between">
              {step === "result" ? (
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="text-xs font-bold text-brand-forest dark:text-brand-sage hover:underline cursor-pointer min-h-[44px] flex items-center"
                >
                  {isRTL ? "إعادة الاستشارة من جديد" : "Retake questionnaire"}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={step === 1}
                  onClick={() => setStep(prev => (prev === 2 ? 1 : prev === 3 ? 2 : 1))}
                  className={`flex items-center gap-1 text-xs px-4 py-2.5 rounded-xl transition-colors min-h-[44px] ${
                    step === 1
                      ? "text-stone-400 dark:text-stone-600 bg-stone-100 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800/60 cursor-not-allowed font-semibold"
                      : "text-foreground bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 font-bold cursor-pointer"
                  }`}
                >
                  {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                  <span>{isRTL ? "السابق" : "Back"}</span>
                </button>
              )}

              {step !== "result" && (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 1) setStep(2);
                    else if (step === 2) setStep(3);
                    else if (step === 3) setStep("result");
                  }}
                  className="flex items-center gap-1.5 bg-[#223829] hover:bg-[#16261C] dark:bg-[#ADC6A0] dark:hover:bg-[#C0D5C2] text-white dark:text-zinc-950 px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 min-h-[44px] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#223829]"
                >
                  <span>{step === 3 ? (isRTL ? "عرض وصفتي العشبية" : "Reveal My Regimen") : (isRTL ? "التالي" : "Next")}</span>
                  {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
