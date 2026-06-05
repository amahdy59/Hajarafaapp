import { ArrowLeft, Award, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion } from "motion/react";
import ABOUT_IMG from "../../assets/natural_about_bg.webp";

export function About() {
  const { t, isRTL } = useAppSettings();

  // Localized copy
  const content = {
    titleEn: "About Haj Arafa",
    titleAr: "عن حاج عرفة",
    subtitleEn: "Since 1968 · Pure Nature in Every Product",
    subtitleAr: "منذ ١٩٦٨ · الطبيعة النقية في كل منتج",
    storyTitleEn: "Our Heritage & Story",
    storyTitleAr: "تاريخنا وقصتنا",
    storyEn: "began in 1968 in the historic Al-Azhar district of Cairo as Arafa El Attar. Dedicated to sourcing the highest quality natural herbs, raw honey, pure oils, spices, and cosmetics, we have evolved over the decades into Egypt's leading natural food brand while remaining committed to authentic wellness traditions.",
    storyAr: "بدأت المسيرة في عام ١٩٦٨ بحي الأزهر التاريخي بالقاهرة باسم 'عرفة العطار'. ومنذ ذلك الحين التزمنا بتقديم أجود الأعشاب الطبيعية، العسل الخام، الزيوت النقية، التوابل، ومستحضرات التجميل، لنتطور عبر العقود إلى العلامة الرائدة في مصر للمنتجات الطبيعية مع الحفاظ على أصالة التقاليد والعافية.",
    valuesTitleEn: "Our Core Principles",
    valuesTitleAr: "مبادئنا الأساسية",
    values: [
      {
        icon: Leaf,
        titleEn: "100% Organic Sourcing",
        titleAr: "مصادر عضوية ١٠٠٪",
        descEn: "We source directly from farms that prioritize ecological balance and sustainable agriculture.",
        descAr: "نحصل على منتجاتنا مباشرة من المزارع التي تعطي الأولوية للتوازن البيئي والزراعة المستدامة."
      },
      {
        icon: Award,
        titleEn: "Premium Quality Standards",
        titleAr: "معايير جودة ممتازة",
        descEn: "Every batch is rigorously tested for purity, authenticity, and bioactive potency.",
        descAr: "يتم اختبار كل دفعة بدقة للتأكد من نقائها وأصالتها وفعاليتها الحيوية."
      },
      {
        icon: ShieldCheck,
        titleEn: "Trusted Chemical-Free",
        titleAr: "خالٍ من الكيماويات وموثوق",
        descEn: "No artificial additives, synthetic fragrances, or harsh preservatives ever.",
        descAr: "لا توجد أي إضافات صناعية، عطور تخليقية، أو مواد حافظة ضارة على الإطلاق."
      },
      {
        icon: Sparkles,
        titleEn: "Traditional & Modern Fusion",
        titleAr: "دمج بين الأصالة والمعاصرة",
        descEn: "Time-tested herbal wisdom meets modern science for targeted wellness solutions.",
        descAr: "تلتقي الحكمة العشبية التي أثبتها الزمن مع العلم الحديث لتقديم حلول صحية مخصصة."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="relative h-64 sm:h-80 overflow-hidden bg-brand-forest/90">
        <img src={ABOUT_IMG} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/35" />
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl space-y-2 select-none"
          >
            <h1 className="text-white text-3xl sm:text-4xl font-display flex items-center justify-center gap-2 flex-wrap select-none">
              <span>{isRTL ? "عن حاج عرفة" : "About Haj Arafa"}</span>
            </h1>
            <p className="text-brand-peach font-medium text-sm sm:text-base select-none">
              {isRTL ? content.subtitleAr : content.subtitleEn}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Navigation */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-terracotta text-sm transition-colors">
            <ArrowLeft size={16} className="rtl-flip" />
            {isRTL ? "العودة للرئيسية" : "Back to Home"}
          </Link>
        </div>

        {/* Our Story Block */}
        <section className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-soft grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-foreground font-display text-2xl">
              {isRTL ? content.storyTitleAr : content.storyTitleEn}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              <span className="font-semibold text-brand-forest">{isRTL ? "حاج عرفة " : "Haj Arafa "}</span>
              <span>{isRTL ? content.storyAr : content.storyEn}</span>
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-border bg-[#FAF6F0] p-3 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop" 
              alt="Herbal apothecary" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </section>

        {/* Core Values */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-foreground font-display text-2xl mb-2">
              {isRTL ? content.valuesTitleAr : content.valuesTitleEn}
            </h2>
            <div className="w-16 h-1 bg-brand-terracotta mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4">
            {content.values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-card border border-border hover:border-brand-sage rounded-2xl p-5 shadow-soft hover:shadow-md transition-all flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-peach flex items-center justify-center flex-shrink-0">
                    <Icon className="text-brand-terracotta" size={20} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-foreground font-medium text-sm sm:text-base">
                      {isRTL ? val.titleAr : val.titleEn}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {isRTL ? val.descAr : val.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to action */}
        <div className="text-center pt-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-brand-terracotta text-white px-8 py-3 rounded-xl hover:bg-brand-terracotta-dark transition-all active:scale-[0.98] font-medium shadow-sm"
          >
            {isRTL ? "تسوق منتجاتنا الطبيعية" : "Shop Natural Wellness"}
          </Link>
        </div>
      </div>
      <div className="h-20 sm:h-6" />
    </div>
  );
}
