import { Link } from "react-router";
import { Mail, Phone, MapPin, Facebook, Instagram, ShieldCheck } from "lucide-react";
import { useAppSettings } from "../context/AppSettingsContext";
import logoImg from "../../assets/logo.webp";

export function Footer() {
  const { t, isRTL, locale } = useAppSettings();

  const footerTranslations = {
    aboutTextEn: "represents over 50 years of traditional Egyptian herbal wisdom, bringing you the finest natural honey, fresh spices, organic nuts, and botanical cosmetics.",
    aboutTextAr: "يمثل أكثر من ٥٠ عاماً من الحكمة العشبية المصرية التقليدية، حيث يقدم لك أجود أنواع العسل الطبيعي، التوابل الطازجة، المكسرات العضوية، ومستحضرات التجميل النباتية.",
    quickLinksEn: "Quick Links",
    quickLinksAr: "روابط سريعة",
    supportEn: "Help & Support",
    supportAr: "الدعم والمساعدة",
    contactEn: "Contact Us",
    contactAr: "اتصل بنا",
    paymentEn: "Payment Methods",
    paymentAr: "طرق الدفع",
    rightsEn: "All rights reserved.",
    rightsAr: "جميع الحقوق محفوظة.",
  };

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
    <footer className="bg-card text-foreground border-t border-border/80 pt-12 pb-24 sm:pb-12 mt-16 select-none">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <Link to="/" className="inline-block select-none cursor-pointer">
            <span className="font-display font-bold text-2xl tracking-wide text-brand-forest hover:text-brand-terracotta transition-colors">
              {locale === "ar" ? "حاج عرفة" : "Haj Arafa"}
            </span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
            <span className="text-brand-forest font-semibold">{locale === "ar" ? "حاج عرفة" : "Haj Arafa"}</span>{" "}
            <span>{locale === "ar" ? footerTranslations.aboutTextAr : footerTranslations.aboutTextEn}</span>
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="https://www.facebook.com/hajarafaeg?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-peach flex items-center justify-center text-brand-terracotta hover:bg-brand-terracotta hover:text-white transition-all" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="https://www.instagram.com/hajarafa/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-peach flex items-center justify-center text-brand-terracotta hover:bg-brand-terracotta hover:text-white transition-all" aria-label="Instagram">
              <Instagram size={16} />
            </a>
          </div>
          <div className="pt-2 text-xs text-brand-forest/90 font-medium flex items-center gap-1.5 select-none bg-brand-cream-2 border border-brand-peach/40 px-3 py-2.5 rounded-xl w-fit">
            <span>🚚</span>
            <span>
              {locale === "ar" 
                ? "قد يستغرق التوصيل من ٥ إلى ٧ أيام عمل" 
                : "Delivery may take 5 to 7 working days"}
            </span>
          </div>
        </div>

        {/* Categories Link Column */}
        <div className="space-y-4">
          <h4 className="text-foreground font-display text-base font-semibold border-b border-border/40 pb-2 w-fit">
            {locale === "ar" ? footerTranslations.quickLinksAr : footerTranslations.quickLinksEn}
          </h4>
          <ul className="grid grid-cols-1 gap-2.5 text-sm">
            {categoriesLinks.map(cat => (
              <li key={cat.slug}>
                <Link 
                  to={`/category/${cat.slug}`} 
                  className="text-muted-foreground hover:text-brand-terracotta hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[10px] text-brand-terracotta/60">✦</span>
                  {locale === "ar" ? cat.ar : cat.en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Support Column */}
        <div className="space-y-4">
          <h4 className="text-foreground font-display text-base font-semibold border-b border-border/40 pb-2 w-fit">
            {locale === "ar" ? footerTranslations.supportAr : footerTranslations.supportEn}
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-brand-terracotta hover:underline transition-colors flex items-center gap-1.5">
                <span className="text-[10px] text-brand-terracotta/60">✦</span>
                <span>{locale === "ar" ? "عن حاج عرفة" : "About Haj Arafa"}</span>
              </Link>
            </li>
            <li>
              <Link to="/branches" className="text-muted-foreground hover:text-brand-terracotta hover:underline transition-colors flex items-center gap-1.5">
                <span className="text-[10px] text-brand-terracotta/60">✦</span>
                {t.branches}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-brand-terracotta hover:underline transition-colors flex items-center gap-1.5">
                <span className="text-[10px] text-brand-terracotta/60">✦</span>
                {t.contactUs}
              </Link>
            </li>
            <li>
              <Link to="/help" className="text-muted-foreground hover:text-brand-terracotta hover:underline transition-colors flex items-center gap-1.5">
                <span className="text-[10px] text-brand-terracotta/60">✦</span>
                {t.customerService}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="space-y-4">
          <h4 className="text-foreground font-display text-base font-semibold border-b border-border/40 pb-2 w-fit">
            {locale === "ar" ? footerTranslations.contactAr : footerTranslations.contactEn}
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-brand-terracotta mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground leading-relaxed">
                {locale === "ar" ? "القاهرة، جمهورية مصر العربية" : "Cairo, Arab Republic of Egypt"}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-brand-terracotta flex-shrink-0" />
              <a href="tel:17309" className="text-muted-foreground hover:text-brand-terracotta hover:underline transition-colors">
                17309
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-brand-terracotta flex-shrink-0" />
              <a href="mailto:Marketing@hajarafa.com" className="text-muted-foreground hover:text-brand-terracotta hover:underline transition-colors">
                Marketing@hajarafa.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Copyright */}
        <div className="text-muted-foreground text-center sm:text-start flex items-center justify-center sm:justify-start gap-1 flex-wrap select-none">
          <span>© {new Date().getFullYear()}</span>
          <span>{locale === "ar" ? "حاج عرفة" : "Haj Arafa"}. {locale === "ar" ? footerTranslations.rightsAr : footerTranslations.rightsEn}</span>
          <span className="block sm:inline sm:ms-2 mt-1 sm:mt-0 text-[10px] text-muted-foreground/60 select-none">
            {locale === "ar" ? "صنع بكل حب لعافيتك 🧡" : "Crafted with love for your wellness 🧡"}
          </span>
        </div>

        {/* Badges / Payments */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <ShieldCheck size={14} className="text-brand-sage" />
            <span>{locale === "ar" ? "دفع آمن ١٠٠٪" : "100% Secure Payment"}</span>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded bg-muted-foreground/5 text-muted-foreground border border-border/40 font-semibold tracking-wider text-[10px]">VISA</span>
            <span className="px-2 py-1 rounded bg-muted-foreground/5 text-muted-foreground border border-border/40 font-semibold tracking-wider text-[10px]">MC</span>
            <span className="px-2 py-1 rounded bg-muted-foreground/5 text-muted-foreground border border-border/40 font-semibold tracking-wider text-[10px]">{locale === "ar" ? "نقدًا" : "COD"}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
