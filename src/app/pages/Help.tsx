import { useState, useMemo } from "react";
import { ArrowLeft, CircleHelp, Search, ChevronDown, ChevronUp, Phone, MessageSquare, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "../../assets/logo.webp";

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
    questionEn: "Are HajArafa products 100% organic and natural?",
    questionAr: "هل منتجات حاج عارفة طبيعية وعضوية ١٠٠٪؟",
    answerEn: "Yes, all our herbal remedies, cold-pressed oils, raw honeys, and botanical cosmetics are completely natural, chemical-free, and ethically sourced.",
    answerAr: "نعم، جميع الأعشاب الطبية، الزيوت المعصورة على البارد، العسل الخام، ومستحضرات التجميل النباتية لدينا طبيعية بالكامل وخالية من الكيماويات ومستخلصة بطرق مستدامة."
  }
];

export function Help() {
  const { t, isRTL } = useAppSettings();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>("q1");

  const categories = [
    { key: "all", labelEn: "All Topics", labelAr: "كل المواضيع" },
    { key: "shipping", labelEn: "Shipping & Delivery", labelAr: "الشحن والتوصيل" },
    { key: "payments", labelEn: "Payments & Orders", labelAr: "الدفع والطلبات" },
    { key: "returns", labelEn: "Returns & Refunds", labelAr: "الاسترجاع والاسترداد" },
    { key: "products", labelEn: "Product Quality", labelAr: "جودة المنتجات" }
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

  const renderQuestionWithLogo = (text: string) => {
    const regex = /(HajArafa|Haj\s+Arafa|حاج\s+عارفة|حاج\s+عرفة)/gi;
    const parts = text.split(regex);
    return (
      <span className="inline-flex items-center gap-1.5 flex-wrap select-none">
        {parts.map((part, index) => {
          if (regex.test(part)) {
            return (
              <img
                key={index}
                src={logoImg}
                alt="HajArafa"
                className="h-4.5 w-auto object-contain inline-block align-middle select-none pointer-events-none"
              />
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-terracotta text-sm transition-colors w-fit">
            <ArrowLeft size={16} className="rtl-flip" />
            {isRTL ? "العودة للرئيسية" : "Back to Home"}
          </Link>
          <div className="flex items-center gap-3">
            <CircleHelp size={24} className="text-brand-terracotta fill-brand-peach/50" />
            <h1 className="text-foreground font-display text-2xl sm:text-3xl">{t.customerService}</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-xl">
            {isRTL 
              ? "ابحث عن إجابات سريعة للأسئلة الشائعة أو تواصل مع فريق خدمة العملاء للحصول على المساعدة." 
              : "Search for instant answers to frequently asked questions, or reach out directly to customer service for help."}
          </p>
        </div>

        {/* Support quick contact banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-brand-peach/60 border border-brand-terracotta/10 p-5 rounded-2xl">
          <div className="space-y-1.5">
            <h3 className="text-brand-forest font-display text-sm sm:text-base">
              {isRTL ? "هل تحتاج لمساعدة فورية؟" : "Need Instant Help?"}
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {isRTL 
                ? "فريق الدعم لدينا متاح لمساعدتك من الساعة ٩ صباحاً وحتى ١١ مساءً." 
                : "Our support agents are available to assist you from 9:00 AM to 11:00 PM."}
            </p>
          </div>
          <div className="flex items-center gap-3 justify-end sm:justify-start flex-row-reverse sm:flex-row">
            <a href="tel:17309" className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-brand-terracotta text-white px-4 py-2.5 rounded-xl hover:bg-brand-terracotta-dark transition-all text-xs font-semibold">
              <Phone size={14} /> {isRTL ? "اتصل بنا" : "Call Support"}
            </a>
            <a href="https://wa.me/201020401400" target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#128C7E] text-white px-4 py-2.5 rounded-xl hover:bg-[#0e7065] transition-all text-xs font-semibold">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>

        {/* Search FAQ */}
        <div className="relative">
          <Search size={18} className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-muted-foreground`} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={isRTL ? "ابحث في الأسئلة الشائعة..." : "Search FAQs..."}
            className={`w-full ${isRTL ? "pr-11 pl-4" : "pl-11 pr-4"} py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 transition-all text-sm`}
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
        </div>

        {/* FAQs Accordion */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft divide-y divide-border">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl mb-2">🌿</p>
              <p className="text-muted-foreground text-sm">
                {isRTL ? "لا توجد نتائج مطابقة لبحثك." : "No matching questions found."}
              </p>
            </div>
          ) : (
            filteredFAQs.map(faq => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="transition-colors">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-5 py-4 flex items-center justify-between text-start hover:bg-muted/40 transition-colors"
                  >
                    <span className="text-foreground font-medium text-sm sm:text-base">
                      {renderQuestionWithLogo(isRTL ? faq.questionAr : faq.questionEn)}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="text-brand-terracotta flex-shrink-0 ml-4 rtl:mr-4 rtl:ml-0" size={18} />
                    ) : (
                      <ChevronDown className="text-brand-ink-soft flex-shrink-0 ml-4 rtl:mr-4 rtl:ml-0" size={18} />
                    )}
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
      </div>
      <div className="h-20 sm:h-6" />
    </div>
  );
}
