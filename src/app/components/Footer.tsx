import { Link } from "react-router";
import {
  Banknote,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useAppSettings } from "../context/AppSettingsContext";
import { CONTACT, DELIVERY_NOTICE } from "../config/contact";

type PaymentMark = "visa" | "mastercard" | "meeza" | "vodafone" | "cod";

function PaymentLogo({ type, label }: { type: PaymentMark; label: string }) {
  const base =
    "h-8 min-w-14 rounded-lg border border-white/12 bg-white text-[#14201A] px-2.5 flex items-center justify-center shadow-sm";

  if (type === "visa") {
    return (
      <span className={`${base} font-black italic tracking-tight text-[#173B8F]`} aria-label={label} title={label}>
        VISA
      </span>
    );
  }

  if (type === "mastercard") {
    return (
      <span className={`${base} gap-1.5`} aria-label={label} title={label}>
        <span className="relative flex h-4 w-7 items-center">
          <span className="absolute left-0 h-4 w-4 rounded-full bg-[#EA001B]" />
          <span className="absolute right-0 h-4 w-4 rounded-full bg-[#FFB000] mix-blend-multiply" />
        </span>
        <span className="text-[9px] font-black uppercase tracking-tight">Mastercard</span>
      </span>
    );
  }

  if (type === "meeza") {
    return (
      <span className={`${base} gap-1.5`} aria-label={label} title={label}>
        <span className="grid h-4 w-4 grid-cols-2 gap-0.5">
          <span className="rounded-sm bg-[#E53935]" />
          <span className="rounded-sm bg-[#1E88E5]" />
          <span className="rounded-sm bg-[#43A047]" />
          <span className="rounded-sm bg-[#FDD835]" />
        </span>
        <span className="text-[10px] font-black">Meeza</span>
      </span>
    );
  }

  if (type === "vodafone") {
    return (
      <span className={`${base} gap-1.5`} aria-label={label} title={label}>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#E60000] text-[10px] font-black text-white">
          V
        </span>
        <span className="text-[10px] font-black">Cash</span>
      </span>
    );
  }

  return (
    <span className={`${base} gap-1.5 bg-[#F4E7DA]`} aria-label={label} title={label}>
      <Banknote size={15} className="text-[#334537]" />
      <span className="text-[10px] font-black uppercase">COD</span>
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
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_0%,rgba(141,163,146,0.10),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(244,231,218,0.07),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F4E7DA]/30 to-transparent" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-10">
          <section className="col-span-12 lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex w-fit no-underline">
              <span className="font-display font-bold text-3xl tracking-wide text-[#F4E7DA] hover:text-white transition-colors">
                {isArabic ? "حاج عرفة" : "Haj Arafa"}
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-7 text-[#EFECE6]/86">
              {isArabic
                ? "تراث الأعشاب المصرية منذ 1970. جودة ونقاء في كل منتج طبيعي."
                : "Egyptian herbal heritage since 1970. Quality and purity in every natural product."}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full bg-white/8 border border-white/10 text-[#FAF6F0] flex items-center justify-center hover:bg-[#F4E7DA] hover:text-[#14201A] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={17} />
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full bg-white/8 border border-white/10 text-[#FAF6F0] flex items-center justify-center hover:bg-[#F4E7DA] hover:text-[#14201A] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-full bg-white/8 border border-white/10 text-[#FAF6F0] flex items-center justify-center hover:bg-[#F4E7DA] hover:text-[#14201A] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </section>

          <nav className="col-span-6 lg:col-span-3" aria-label={isArabic ? "روابط خدمة العملاء" : "Customer care"}>
            <h4 className="text-[#F4E7DA] font-display text-sm font-semibold uppercase tracking-[0.16em]">
              {isArabic ? "خدمة العملاء" : "Customer Care"}
            </h4>
            <div className="mt-3 h-px w-28 bg-[#F4E7DA]/20" />
            <ul className="mt-5 space-y-3.5">
              {careLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2.5 text-sm font-medium text-[#EFECE6]/88 hover:text-white transition-colors no-underline"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8DA392] transition-transform group-hover:scale-125" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section className="col-span-6 lg:col-span-3 space-y-5">
            <div>
              <h4 className="text-[#F4E7DA] font-display text-sm font-semibold uppercase tracking-[0.16em]">
                {isArabic ? "الدعم المباشر" : "Direct Support"}
              </h4>
              <div className="mt-3 h-px w-28 bg-[#F4E7DA]/20" />
            </div>

            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#F4E7DA] px-5 text-sm font-bold text-[#14201A] hover:bg-white transition-colors shadow-sm no-underline"
            >
              <MessageCircle size={17} />
              <span>{isArabic ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
            </a>

            <div className="space-y-3 text-sm text-[#EFECE6]/90">
              <a href={`tel:${CONTACT.hotline}`} className="flex items-center gap-3 hover:text-white transition-colors no-underline">
                <Phone size={16} className="text-[#F4E7DA]" />
                <span>{isArabic ? `الخط الساخن: ${CONTACT.hotline}` : `Hotline: ${CONTACT.hotline}`}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-white transition-colors no-underline">
                <Mail size={16} className="text-[#F4E7DA]" />
                <span className="break-all">{CONTACT.email}</span>
              </a>
              <Link to="/branches" className="flex items-center gap-3 hover:text-white transition-colors no-underline">
                <MapPin size={16} className="text-[#F4E7DA]" />
                <span>{isArabic ? "اعثر على أقرب فرع" : "Find your nearest branch"}</span>
              </Link>
            </div>
          </section>

          <section className="col-span-12 lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Truck size={18} className="text-[#F4E7DA] mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">{isArabic ? "التوصيل" : "Delivery"}</h4>
                  <p className="mt-1 text-xs leading-5 text-[#EFECE6]/82">
                    {isArabic ? DELIVERY_NOTICE.shortAr : DELIVERY_NOTICE.shortEn}
                  </p>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-[#8DA392] mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">{isArabic ? "دفع آمن" : "Secure Payment"}</h4>
                  <p className="mt-1 text-xs leading-5 text-[#EFECE6]/82">
                    {isArabic ? "خيارات دفع متعددة وموثوقة." : "Multiple trusted payment options."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-[#EFECE6]/78">
            © {new Date().getFullYear()} {isArabic ? "حاج عرفة. جميع الحقوق محفوظة." : "Haj Arafa. All rights reserved."}
          </p>

          <div className="flex flex-col gap-3 lg:items-end">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#EFECE6]/84">
              <ShieldCheck size={15} className="text-[#8DA392]" />
              <span>{isArabic ? "طرق الدفع المقبولة" : "Accepted payment methods"}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <PaymentLogo type="visa" label={paymentLabels.visa} />
              <PaymentLogo type="mastercard" label={paymentLabels.mastercard} />
              <PaymentLogo type="meeza" label={paymentLabels.meeza} />
              <PaymentLogo type="vodafone" label={paymentLabels.vodafone} />
              <PaymentLogo type="cod" label={paymentLabels.cod} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
