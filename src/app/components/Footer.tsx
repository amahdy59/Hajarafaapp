import { Link } from "react-router";
import { Mail, Phone, Facebook, Instagram, MessageCircle, ShieldCheck } from "lucide-react";
import { useAppSettings } from "../context/AppSettingsContext";

export function Footer() {
  const { t, isRTL, locale } = useAppSettings();

  const categoriesLinks = [
    { slug: "coffee-drinks", en: "Coffee & Drinks", ar: "قهوة ومشروبات" },
    { slug: "honey", en: "Honey & Dates", ar: "عسل وتمور" },
    { slug: "spices", en: "Spices & Grains", ar: "بهارات وحبوب" },
    { slug: "nuts", en: "Nuts & Snacks", ar: "مكسرات وتسالي" },
    { slug: "wellness", en: "Targeted Wellness", ar: "حلول صحية مخصصة" },
    { slug: "cosmetics", en: "Natural Cosmetics", ar: "تجميل طبيعي" },
    { slug: "incense", en: "Incense & Fragrance", ar: "بخور وعطور" },
  ];

  return (
    <footer className="hidden sm:block bg-[#14201A] dark:bg-[#070b09] text-[#FAF6F0] dark:text-[#EFECE6] border-t border-white/5 dark:border-white/10 pt-12 pb-24 sm:pb-12 mt-16 select-none relative overflow-hidden">
      {/* Subtle organic background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sage/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-terracotta/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        
        {/* Column 1: Brand & Heritage */}
        <div className="space-y-3.5">
          <Link to="/" className="inline-block select-none cursor-pointer">
            <span className="font-display font-bold text-2xl tracking-wide text-brand-peach hover:text-white transition-colors">
              {locale === "ar" ? "حاج عرفة" : "Haj Arafa"}
            </span>
          </Link>
          <p className="text-[#FAF6F0]/85 dark:text-[#EFECE6]/85 text-xs sm:text-sm leading-relaxed max-w-sm">
            {locale === "ar" 
              ? "تراث الأعشاب المصرية منذ ١٩٧٠. جودة ونقاء في كل منتج طبيعي." 
              : "Egyptian herbal heritage since 1970. Quality and purity in every natural product."}
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a href="https://www.facebook.com/hajarafaeg?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1877F2] text-[#FAF6F0] flex items-center justify-center transition-all" aria-label="Facebook">
              <Facebook size={15} />
            </a>
            <a href="https://www.instagram.com/hajarafa/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E1306C] text-[#FAF6F0] flex items-center justify-center transition-all" aria-label="Instagram">
              <Instagram size={15} />
            </a>
            <a href="https://wa.me/201020401400" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#25D366] text-[#FAF6F0] flex items-center justify-center transition-all" aria-label="WhatsApp">
              <MessageCircle size={15} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links (IA Navigation) */}
        <div className="space-y-3.5">
          <h4 className="text-brand-peach font-display text-sm font-semibold tracking-wider uppercase border-b border-white/10 pb-2 w-fit">
            {locale === "ar" ? "تسوق الفئات" : "Shop Categories"}
          </h4>
          <ul className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
            {categoriesLinks.map(cat => (
              <li key={cat.slug}>
                <Link 
                  to={`/category/${cat.slug}`} 
                  className="text-[#FAF6F0]/85 dark:text-[#EFECE6]/80 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[10px] text-brand-peach/40">✦</span>
                  {locale === "ar" ? cat.ar : cat.en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Customer Care */}
        <div className="space-y-3.5">
          <h4 className="text-brand-peach font-display text-sm font-semibold tracking-wider uppercase border-b border-white/10 pb-2 w-fit">
            {locale === "ar" ? "الدعم والخدمات" : "Customer Care"}
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link to="/about" className="text-[#FAF6F0]/85 dark:text-[#EFECE6]/80 hover:text-white transition-colors flex items-center gap-1.5">
                <span className="text-[10px] text-brand-peach/40">✦</span>
                <span>{locale === "ar" ? "عن حاج عرفة" : "About Haj Arafa"}</span>
              </Link>
            </li>
            <li>
              <Link to="/branches" className="text-[#FAF6F0]/85 dark:text-[#EFECE6]/80 hover:text-white transition-colors flex items-center gap-1.5">
                <span className="text-[10px] text-brand-peach/40">✦</span>
                <span>{locale === "ar" ? "فروعنا" : "Our Branches"}</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-[#FAF6F0]/85 dark:text-[#EFECE6]/80 hover:text-white transition-colors flex items-center gap-1.5">
                <span className="text-[10px] text-brand-peach/40">✦</span>
                <span>{locale === "ar" ? "اتصل بنا" : "Contact Us"}</span>
              </Link>
            </li>
            <li>
              <Link to="/help" className="text-[#FAF6F0]/85 dark:text-[#EFECE6]/80 hover:text-white transition-colors flex items-center gap-1.5">
                <span className="text-[10px] text-brand-peach/40">✦</span>
                <span>{locale === "ar" ? "الأسئلة الشائعة" : "FAQs & Support"}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: WhatsApp Direct & Support */}
        <div className="space-y-3.5">
          <h4 className="text-brand-peach font-display text-sm font-semibold tracking-wider uppercase border-b border-white/10 pb-2 w-fit">
            {locale === "ar" ? "الدعم المباشر" : "Direct Support"}
          </h4>
          <div className="space-y-3">
            <a
              href="https://wa.me/201020401400"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE57] px-4 py-2.5 rounded-xl transition-all text-xs font-bold w-full shadow-sm select-none"
            >
              <MessageCircle size={16} />
              <span>{locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
            </a>
            
            <div className="text-xs text-[#FAF6F0]/85 dark:text-[#EFECE6]/85 space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-brand-peach flex-shrink-0" />
                <span>{locale === "ar" ? "الخط الساخن: ١٧٣٠٩" : "Hotline: 17309"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-brand-peach flex-shrink-0" />
                <a href="mailto:Marketing@hajarafa.com" className="hover:underline">Marketing@hajarafa.com</a>
              </div>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-brand-peach/95 bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg w-fit">
                <span>🚚</span>
                <span>
                  {locale === "ar" 
                    ? "التوصيل خلال ٥ إلى ٧ أيام" 
                    : "Delivery: 5 to 7 working days"}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright & Guarantee */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs relative z-10">
        
        <div className="text-[#FAF6F0]/70 dark:text-[#EFECE6]/70 text-center sm:text-start flex items-center justify-center sm:justify-start gap-1 flex-wrap select-none">
          <span>© {new Date().getFullYear()}</span>
          <span>{locale === "ar" ? "حاج عرفة. جميع الحقوق محفوظة." : "Haj Arafa. All rights reserved."}</span>
          <span className="block sm:inline sm:ms-2 mt-1 sm:mt-0 text-[10px] text-[#FAF6F0]/50 dark:text-[#EFECE6]/50">
            {locale === "ar" ? "صنع بكل حب لعافيتك 🧡" : "Crafted with love for your wellness 🧡"}
          </span>
        </div>

        {/* Payment Badges & Guarantee */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="flex items-center gap-1.5 text-[11px] text-[#FAF6F0]/80 dark:text-[#EFECE6]/80">
            <ShieldCheck size={14} className="text-brand-sage" />
            <span>{locale === "ar" ? "دفع آمن ١٠٠٪" : "100% Secure Payment"}</span>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded bg-white/5 text-[#FAF6F0]/80 dark:text-[#EFECE6]/80 border border-white/10 font-semibold text-[9px]">VISA</span>
            <span className="px-2 py-1 rounded bg-white/5 text-[#FAF6F0]/80 dark:text-[#EFECE6]/80 border border-white/10 font-semibold text-[9px]">MC</span>
            <span className="px-2 py-1 rounded bg-white/5 text-[#FAF6F0]/80 dark:text-[#EFECE6]/80 border border-white/10 font-semibold text-[9px]">{locale === "ar" ? "الدفع عند الاستلام" : "COD"}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
