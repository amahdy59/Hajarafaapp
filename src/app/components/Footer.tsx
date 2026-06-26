import { Link } from "react-router";
import {
  Banknote,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Truck,
} from "lucide-react";
import { useAppSettings } from "../context/AppSettingsContext";
import { CONTACT, DELIVERY_NOTICE } from "../config/contact";

type PaymentMark = "visa" | "mastercard" | "meeza" | "vodafone" | "cod";

function PaymentLogo({ type, label }: { type: PaymentMark; label: string }) {
  const base =
    "h-[22px] min-w-[44px] rounded border border-white/10 bg-white/95 text-[#14201A] px-1.5 flex items-center justify-center shadow-sm select-none transition-opacity hover:opacity-100";

  if (type === "visa") {
    return (
      <span className={`${base} font-black italic tracking-tighter text-[#173B8F] text-[8px]`} role="img" aria-label={label} title={label}>
        VISA
      </span>
    );
  }

  if (type === "mastercard") {
    return (
      <span className={`${base} gap-1`} role="img" aria-label={label} title={label}>
        <span className="relative flex h-2 w-3.5 items-center">
          <span className="absolute left-0 h-2 w-2 rounded-full bg-[#EA001B]" />
          <span className="absolute right-0 h-2 w-2 rounded-full bg-[#FFB000] mix-blend-multiply" />
        </span>
        <span className="text-[7.5px] font-black uppercase tracking-tight">Mastercard</span>
      </span>
    );
  }

  if (type === "meeza") {
    return (
      <span className={`${base} gap-1`} role="img" aria-label={label} title={label}>
        <span className="grid h-2.5 w-2.5 grid-cols-2 gap-0.5">
          <span className="rounded-[0.5px] bg-[#E53935]" />
          <span className="rounded-[0.5px] bg-[#1E88E5]" />
          <span className="rounded-[0.5px] bg-[#43A047]" />
          <span className="rounded-[0.5px] bg-[#FDD835]" />
        </span>
        <span className="text-[7.5px] font-black tracking-tight">Meeza</span>
      </span>
    );
  }

  if (type === "vodafone") {
    return (
      <span className={`${base} gap-1`} role="img" aria-label={label} title={label}>
        <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#E60000] text-[6px] font-black text-white leading-none">
          V
        </span>
        <span className="text-[7.5px] font-black tracking-tight">Cash</span>
      </span>
    );
  }

  return (
    <span className={`${base} gap-1 bg-[#F4E7DA]/95 border-[#F4E7DA]/10 text-[#14201A]`} role="img" aria-label={label} title={label}>
      <Banknote size={10} className="text-[#334537] flex-shrink-0" />
      <span className="text-[7.5px] font-black uppercase tracking-tight">COD</span>
    </span>
  );
}

export function Footer() {
  const { locale } = useAppSettings();
  const isArabic = locale === "ar";

  const careLinks = [
    { to: "/about", label: isArabic ? "عن حاج عرفة" : "About Haj Arafa" },
    { to: "/branches", label: isArabic ? "فروعنا" : "Our Branches" },
    { to: "/contact", label: isArabic ? "اتصل بنا" : "Contact Us" },
    { to: "/help", label: isArabic ? "الأسئلة الشائعة" : "FAQs & Support" },
  ];

  const paymentLabels = {
    visa: isArabic ? "فيزا" : "Visa",
    mastercard: isArabic ? "ماستركارد" : "Mastercard",
    meeza: isArabic ? "ميزة" : "Meeza",
    vodafone: isArabic ? "فودافون كاش" : "Vodafone Cash",
    cod: isArabic ? "الدفع عند الاستلام" : "Cash on Delivery",
  };

  return (
    <footer className="hidden sm:block bg-[#0D1511] text-[#FAF6F0] border-t border-white/10 mt-16 select-none relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_0%,rgba(141,163,146,0.10),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(244,231,218,0.07),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F4E7DA]/30 to-transparent" />

      {/* Top Delivery Notice Bar */}
      <div className="relative z-10 border-b border-white/5 bg-white/[0.01] py-3.5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-[#FAF6F0] text-center select-none font-medium">
          <Truck size={14} className="text-brand-sage-dark dark:text-brand-sage flex-shrink-0" />
          <span>
            {isArabic ? DELIVERY_NOTICE.ar : DELIVERY_NOTICE.en}
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Brand Info */}
          <section className="col-span-12 md:col-span-5 space-y-4" aria-labelledby="footer-brand-title">
            <Link to="/" className="inline-flex w-fit no-underline">
              <span id="footer-brand-title" className="font-display font-bold text-2xl tracking-wide text-[#F4E7DA] hover:text-white transition-colors">
                {isArabic ? "حاج عرفة" : "Haj Arafa"}
              </span>
            </Link>
            <p className="max-w-sm text-xs leading-6 text-[#FAF6F0]">
              {isArabic
                ? "تراث الأعشاب المصرية منذ 1970. جودة ونقاء في كل منتج طبيعي."
                : "Egyptian herbal heritage since 1970. Quality and purity in every natural product."}
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full bg-white/5 border border-white/5 text-[#FAF6F0] flex items-center justify-center hover:bg-[#F4E7DA] hover:text-[#14201A] transition-all duration-200"
                aria-label="Facebook - opens in a new tab"
              >
                <Facebook size={15} />
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full bg-white/5 border border-white/5 text-[#FAF6F0] flex items-center justify-center hover:bg-[#F4E7DA] hover:text-[#14201A] transition-all duration-200"
                aria-label="Instagram - opens in a new tab"
              >
                <Instagram size={15} />
              </a>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full bg-white/5 border border-white/5 text-[#FAF6F0] flex items-center justify-center hover:bg-[#F4E7DA] hover:text-[#14201A] transition-all duration-200"
                aria-label="WhatsApp - opens in a new tab"
              >
                <MessageCircle size={15} />
              </a>
            </div>
          </section>

          {/* Column 2: Customer Care Links */}
          <nav className="col-span-6 md:col-span-3 space-y-4" aria-label={isArabic ? "روابط خدمة العملاء" : "Customer care"}>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">
              {isArabic ? "خدمة العملاء" : "Customer Care"}
            </h4>
            <ul className="space-y-3">
              {careLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-block text-xs text-[#FAF6F0] hover:text-[#F4E7DA] hover:translate-x-1 duration-200 transition-all no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Direct Support */}
          <section className="col-span-6 md:col-span-4 space-y-4" aria-labelledby="footer-support-title">
            <h4 id="footer-support-title" className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">
              {isArabic ? "الدعم المباشر" : "Direct Support"}
            </h4>
            
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-[#F4E7DA]/20 bg-transparent px-4 text-xs font-bold text-[#F4E7DA] hover:bg-[#F4E7DA] hover:text-[#14201A] transition-all no-underline shadow-sm"
              aria-label="Chat on WhatsApp - opens in a new tab"
            >
              <MessageCircle size={15} />
              <span>{isArabic ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
            </a>

            <div className="space-y-2.5 text-xs text-[#FAF6F0] pt-1">
              <a href={`tel:${CONTACT.hotline}`} className="flex items-center gap-2.5 hover:text-white transition-colors no-underline">
                <Phone size={14} className="text-[#F4E7DA]" />
                <span>{isArabic ? `الخط الساخن: ${CONTACT.hotline}` : `Hotline: ${CONTACT.hotline}`}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 hover:text-white transition-colors no-underline">
                <Mail size={14} className="text-[#F4E7DA]" />
                <span className="break-all">{CONTACT.email}</span>
              </a>
              <Link to="/branches" className="flex items-center gap-2.5 hover:text-white transition-colors no-underline">
                <MapPin size={14} className="text-[#F4E7DA]" />
                <span>{isArabic ? "اعثر على أقرب فرع" : "Find your nearest branch"}</span>
              </Link>
            </div>
          </section>

        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-white/5 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between select-none">
          <p className="text-[11px] text-[#FAF6F0] text-center sm:text-start">
            © {new Date().getFullYear()} {isArabic ? "حاج عرفة. جميع الحقوق محفوظة." : "Haj Arafa. All rights reserved."}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
            <PaymentLogo type="visa" label={paymentLabels.visa} />
            <PaymentLogo type="mastercard" label={paymentLabels.mastercard} />
            <PaymentLogo type="meeza" label={paymentLabels.meeza} />
            <PaymentLogo type="vodafone" label={paymentLabels.vodafone} />
            <PaymentLogo type="cod" label={paymentLabels.cod} />
          </div>
        </div>

      </div>
    </footer>
  );
}
