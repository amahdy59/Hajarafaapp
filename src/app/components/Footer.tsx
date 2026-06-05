import { Link } from "react-router";
import { Mail, Phone, Facebook, Instagram, MessageCircle, ShieldCheck } from "lucide-react";
import { useAppSettings } from "../context/AppSettingsContext";

export function Footer() {
  const { t, isRTL, locale } = useAppSettings();

  return (
    <footer className="hidden sm:block bg-[#14201A] dark:bg-[#070b09] text-[#FAF6F0] dark:text-[#EFECE6] border-t border-white/5 dark:border-white/10 pt-12 pb-24 sm:pb-12 mt-16 select-none relative overflow-hidden">
      {/* Subtle organic background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sage/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-terracotta/5 rounded-full blur-3xl pointer-events-none" />

      {/* Artistic green paint brush stroke and leaves background (Left side) */}
      <svg 
        className="absolute left-0 bottom-0 w-[420px] h-[240px] text-brand-sage/10 dark:text-brand-sage/5 pointer-events-none z-0 transform -translate-x-12 translate-y-12 select-none" 
        viewBox="0 0 500 300" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M -50,180 C 100,100 220,280 380,140 C 420,105 480,120 520,150 C 440,240 280,310 -50,260 Z" opacity="0.5" />
        <path d="M -50,220 C 80,140 180,290 320,180 C 350,155 420,160 480,210 C 380,290 220,320 -50,290 Z" opacity="0.3" />
        <path d="M 120,80 Q 150,110 120,140 Q 90,110 120,80" transform="rotate(15 120 110)" opacity="0.6" />
        <path d="M 220,110 Q 255,135 228,170 Q 200,145 220,110" transform="rotate(-25 220 140)" opacity="0.5" />
        <path d="M 320,70 Q 345,95 325,120 Q 305,95 320,70" transform="rotate(40 320 95)" opacity="0.5" />
      </svg>

      {/* Organic leaf branch background (Right side) */}
      <svg 
        className="absolute right-0 top-0 w-[350px] h-[350px] text-brand-sage/12 dark:text-brand-sage/6 pointer-events-none z-0 transform translate-x-16 -translate-y-16 select-none rtl:left-0 rtl:right-auto rtl:-translate-x-16 rtl:translate-x-0" 
        viewBox="0 0 200 200" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 180,20 Q 110,60 50,150" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M 140,42 Q 155,25 170,30 Q 158,48 140,42" opacity="0.7" />
        <path d="M 115,63 Q 100,45 110,35 Q 128,48 115,63" opacity="0.7" />
        <path d="M 100,78 Q 120,65 135,70 Q 122,88 100,78" opacity="0.7" />
        <path d="M 82,98 Q 65,85 75,72 Q 92,90 82,98" opacity="0.7" />
        <path d="M 70,116 Q 90,105 105,110 Q 92,128 70,116" opacity="0.7" />
        <path d="M 58,135 Q 40,125 48,112 Q 68,128 58,135" opacity="0.7" />
      </svg>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 relative z-10">
        
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

        {/* Column 2: Customer Care (Useful Links) */}
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

        {/* Column 3: WhatsApp Direct & Support */}
        <div className="space-y-3.5">
          <h4 className="text-brand-peach font-display text-sm font-semibold tracking-wider uppercase border-b border-white/10 pb-2 w-fit">
            {locale === "ar" ? "الدعم المباشر" : "Direct Support"}
          </h4>
          <div className="space-y-4 flex flex-col items-start">
            <a
              href="https://wa.me/201020401400"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#1EBE57] px-4.5 py-2.5 rounded-xl transition-all text-xs font-bold w-fit shadow-sm select-none"
            >
              <MessageCircle size={16} />
              <span>{locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
            </a>
            
            <div className="text-xs text-[#FAF6F0]/85 dark:text-[#EFECE6]/85 space-y-2.5 w-full">
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
