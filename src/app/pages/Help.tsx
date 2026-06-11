import { useState, useMemo, useEffect, useRef } from "react";
import { ArrowLeft, CircleHelp, Search, ChevronDown, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  id: string;
  category: "shipping" | "payments" | "returns" | "products";
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

const mockFAQs: FAQItem[] = [
  {
    id: "q1",
    category: "shipping",
    questionEn: "What are the shipping charges?",
    questionAr: "ما هي تكاليف الشحن؟",
    answerEn: "Shipping is free for orders over LE 500. For orders below LE 500, a flat rate of LE 30 applies across all major Egypt cities.",
    answerAr: "الشحن مجاني للطلبات التي تزيد عن ٥٠٠ ج.م. للطلبات الأقل من ٥٠٠ ج.م، يتم تطبيق رسوم شحن ثابتة بقيمة ٣٠ ج.م في جميع المحافظات."
  },
  {
    id: "q2",
    category: "shipping",
    questionEn: "How long does delivery take?",
    questionAr: "كم يستغرق توصيل الطلبات؟",
    answerEn: "Delivery may take 5 to 7 working days across all governorates.",
    answerAr: "قد يستغرق التوصيل من ٥ إلى ٧ أيام عمل في جميع المحافظات."
  },
  {
    id: "q3",
    category: "payments",
    questionEn: "What payment methods do you accept?",
    questionAr: "ما هي طرق الدفع المقبولة؟",
    answerEn: "We accept Cash on Delivery (COD), Credit/Debit cards (Visa/Mastercard), and Fawry payments.",
    answerAr: "نقبل الدفع نقداً عند الاستلام (COD)، بطاقات الائتمان/الخصم المباشر (فيزا/ماستركارد)، ومدفوعات فوري."
  },
  {
    id: "q4",
    category: "returns",
    questionEn: "What is your return and refund policy?",
    questionAr: "ما هي سياسة الاستبدال والاسترجاع؟",
    answerEn: "You can request a return or exchange for any unopened product in its original packaging within 14 days of purchase. Refunds are processed via original payment or wallet transfer.",
    answerAr: "يمكنك طلب إرجاع أو استبدال أي منتج غير مفتوح وفي غلافه الأصلي خلال ١٤ يوماً من تاريخ الشراء. يتم رد المبالغ عبر نفس طريقة الدفع أو كحوالة محفظة."
  },
  {
    id: "q5",
    category: "products",
    questionEn: "Are Haj Arafa products 100% organic and natural?",
    questionAr: "هل منتجات حاج عرفة طبيعية وعضوية ١٠٠٪؟",
    answerEn: "Yes, all our herbal remedies, cold-pressed oils, raw honeys, and botanical cosmetics are completely natural, chemical-free, and ethically sourced.",
    answerAr: "نعم، جميع الأعشاب الطبية، الزيوت المعصورة على البارد، العسل الخام، ومستحضرات التجميل النباتية لدينا طبيعية بالكامل وخالية من الكيماويات ومستخلصة بطرق مستدامة."
  }
];

export function Help() {
  const { t, isRTL } = useAppSettings();
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus({ preventScroll: true });
    }
  }, []);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedCategory, setExpandedCategory] = useState<string | null>("shipping");
  const [openId, setOpenId] = useState<string | null>("q1");

  const categories = [
    { key: "all", labelEn: "All Topics", labelAr: "كل المواضيع", emoji: "🌿" },
    { key: "shipping", labelEn: "Shipping & Delivery", labelAr: "الشحن والتوصيل", emoji: "🚚" },
    { key: "payments", labelEn: "Payments & Orders", labelAr: "الدفع والطلبات", emoji: "💳" },
    { key: "returns", labelEn: "Returns & Refunds", labelAr: "الاسترجاع والاسترداد", emoji: "🔄" },
    { key: "products", labelEn: "Product Quality", labelAr: "جودة المنتجات", emoji: "🌿" }
  ];

  const filteredFAQs = useMemo(() => {
    return mockFAQs.filter(faq => {
      const matchesCat = activeCategory === "all" || faq.category === activeCategory;
      const question = (isRTL ? faq.questionAr : faq.questionEn).toLowerCase();
      const answer = (isRTL ? faq.answerAr : faq.answerEn).toLowerCase();
      const matchesSearch = question.includes(searchQuery.toLowerCase()) || answer.includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery, isRTL]);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-terracotta text-sm transition-colors w-fit">
            <ArrowLeft size={16} className="rtl-flip" />
            {t.backToHome}
          </Link>
          <div className="flex items-center gap-3">
            <CircleHelp size={24} className="text-brand-terracotta fill-brand-peach/50" />
            <h1 className="text-foreground font-display text-2xl sm:text-3xl">{t.customerService}</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-xl">
            {t.helpHeaderDesc}
          </p>
        </div>

        {/* Support quick contact banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-brand-peach/60 border border-brand-terracotta/10 p-5 rounded-2xl">
          <div className="space-y-1.5">
            <h3 className="text-brand-forest font-display text-sm sm:text-base">
              {t.needInstantHelp}
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {t.helpSupportHours}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center sm:justify-end">
            <a href="tel:17309" className="inline-flex items-center justify-center gap-2 bg-brand-terracotta text-white px-4 py-3 rounded-xl hover:bg-brand-terracotta-dark transition-all text-xs font-semibold w-full sm:w-auto h-11">
              <Phone size={14} /> {t.callSupport}
            </a>
            <a href="https://wa.me/201020401400" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#128C7E] text-white px-4 py-3 rounded-xl hover:bg-[#0e7065] transition-all text-xs font-semibold w-full sm:w-auto h-11">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>

        {/* Search FAQ */}
        <div className="relative">
          <Search size={18} className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-muted-foreground`} />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.searchFAQs}
            className={`w-full ${isRTL ? "pr-11 pl-4" : "pl-11 pr-4"} py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 transition-all text-sm`}
          />
        </div>

        {/* --- FAQ Layout (Hybrid Mobile Category Accordion vs Desktop Tabs) --- */}
        {searchQuery.trim() !== "" ? (
          /* Search Results Mode: Simple vertical list */
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft divide-y divide-border">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-2xl mb-2">🌿</p>
                <p className="text-muted-foreground text-sm">
                  {t.noMatchingFAQs}
                </p>
              </div>
            ) : (
              filteredFAQs.map(faq => {
                const isOpen = openId === faq.id;
                const catInfo = categories.find(c => c.key === faq.category);
                return (
                  <div key={faq.id} className="transition-colors">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-5 py-4 flex items-center justify-between text-start hover:bg-muted/40 transition-colors"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] text-brand-terracotta bg-brand-peach/40 px-2 py-0.5 rounded-full font-medium inline-block mb-1">
                          {isRTL ? catInfo?.labelAr : catInfo?.labelEn}
                        </span>
                        <span className="text-foreground font-medium text-sm sm:text-base block">
                          {isRTL ? faq.questionAr : faq.questionEn}
                        </span>
                      </div>
                      <ChevronDown className={`text-brand-terracotta flex-shrink-0 ml-4 rtl:mr-4 rtl:ml-0 transition-transform duration-250 ${isOpen ? "rotate-180" : ""}`} size={18} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 text-muted-foreground text-xs sm:text-sm leading-relaxed border-t border-border/20">
                            {isRTL ? faq.answerAr : faq.answerEn}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* Normal Mode */
          <>
            {/* Desktop-only Horizontal Category Filters */}
            <nav className="hidden sm:flex gap-2 overflow-x-auto pb-2 scrollbar-hide" aria-label={isRTL ? "مواضيع الأسئلة الشائعة" : "FAQ Topics"}>
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm border flex-shrink-0 font-medium transition-all ${
                    activeCategory === cat.key
                      ? "bg-brand-terracotta text-white border-brand-terracotta shadow-sm"
                      : "bg-card text-foreground border-border hover:bg-brand-peach hover:border-brand-terracotta"
                  }`}
                >
                  {isRTL ? cat.labelAr : cat.labelEn}
                </button>
              ))}
            </nav>

            {/* Desktop-only FAQs Accordion List */}
            <div className="hidden sm:block bg-card border border-border rounded-2xl overflow-hidden shadow-soft divide-y divide-border">
              {filteredFAQs.map(faq => {
                const isOpen = openId === faq.id;
                return (
                  <div key={faq.id} className="transition-colors">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-5 py-4 flex items-center justify-between text-start hover:bg-muted/40 transition-colors"
                    >
                      <span className="text-foreground font-medium text-sm sm:text-base">
                        {isRTL ? faq.questionAr : faq.questionEn}
                      </span>
                      <ChevronDown className={`text-brand-terracotta flex-shrink-0 ml-4 rtl:mr-4 rtl:ml-0 transition-transform duration-250 ${isOpen ? "rotate-180" : ""}`} size={18} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 text-muted-foreground text-xs sm:text-sm leading-relaxed border-t border-border/20">
                            {isRTL ? faq.answerAr : faq.answerEn}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Mobile-only Collapsible Category Accordion List */}
            <div className="block sm:hidden space-y-3">
              {categories.filter(c => c.key !== "all").map(cat => {
                const isCatExpanded = expandedCategory === cat.key;
                const catFAQs = mockFAQs.filter(faq => faq.category === cat.key);
                return (
                  <div key={cat.key} className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft">
                    <button
                      type="button"
                      onClick={() => setExpandedCategory(isCatExpanded ? null : cat.key)}
                      className="w-full flex items-center justify-between gap-3 px-5 py-4 text-start bg-brand-cream-2 hover:bg-brand-peach/40 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base flex-shrink-0">{cat.emoji}</span>
                        <span className="text-foreground font-display text-sm font-semibold">
                          {isRTL ? cat.labelAr : cat.labelEn}
                        </span>
                        <span className="text-[10px] text-muted-foreground bg-background/60 rounded-full px-2 py-0.5 font-medium">
                          {catFAQs.length}
                        </span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-brand-terracotta transition-transform duration-250 ${isCatExpanded ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isCatExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="divide-y divide-border/40 border-t border-border bg-brand-cream/10">
                            {catFAQs.map(faq => {
                              const isOpen = openId === faq.id;
                              return (
                                <div key={faq.id} className="transition-colors">
                                  <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full px-5 py-3.5 flex items-center justify-between text-start hover:bg-muted/40 transition-colors"
                                  >
                                    <span className="text-foreground text-xs font-medium pr-3 rtl:pl-3 rtl:pr-0 leading-snug">
                                      {isRTL ? faq.questionAr : faq.questionEn}
                                    </span>
                                    <ChevronDown
                                      size={15}
                                      className={`text-brand-terracotta flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                                    />
                                  </button>
                                  <AnimatePresence initial={false}>
                                    {isOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-5 pb-4 pt-1 text-muted-foreground text-[11px] leading-relaxed border-t border-border/10">
                                          {isRTL ? faq.answerAr : faq.answerEn}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="h-20 sm:h-6" />
    </div>
  );
}
