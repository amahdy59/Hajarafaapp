import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import {
  Banknote,
  CheckCircle2,
  ChevronUp,
  Facebook,
  Instagram,
  Leaf,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { useAppSettings } from "../context/AppSettingsContext";
import { CONTACT } from "../config/contact";
import logoImg from "../../assets/logo.webp";

type PaymentMark = "visa" | "mastercard" | "meeza" | "vodafone" | "cod";

function PaymentLogo({ type, label }: { type: PaymentMark; label: string }) {
  const base =
    "h-7 min-w-[54px] rounded-lg border border-white/20 bg-white/95 text-neutral-900 px-2 flex items-center justify-center shadow-sm select-none transition-transform hover:scale-105";

  if (type === "visa") {
    return (
      <span className={`${base} font-black italic tracking-tighter text-[#173B8F] text-[10px]`} role="img" aria-label={label} title={label}>
        VISA
      </span>
    );
  }

  if (type === "mastercard") {
    return (
      <span className={`${base} gap-1`} role="img" aria-label={label} title={label}>
        <span className="relative flex h-3 w-4.5 items-center">
          <span className="absolute left-0 h-3 w-3 rounded-full bg-[#EA001B]" />
          <span className="absolute right-0 h-3 w-3 rounded-full bg-[#FFB000] mix-blend-multiply" />
        </span>
        <span className="text-[8px] font-black uppercase tracking-tight text-neutral-900">Mastercard</span>
      </span>
    );
  }

  if (type === "meeza") {
    return (
      <span className={`${base} gap-1.5`} role="img" aria-label={label} title={label}>
        <span className="grid h-3 w-3 grid-cols-2 gap-0.5">
          <span className="rounded-[0.5px] bg-[#E53935]" />
          <span className="rounded-[0.5px] bg-[#1E88E5]" />
          <span className="rounded-[0.5px] bg-[#43A047]" />
          <span className="rounded-[0.5px] bg-[#FDD835]" />
        </span>
        <span className="text-[8.5px] font-black tracking-tight text-neutral-900">ميزة</span>
      </span>
    );
  }

  if (type === "vodafone") {
    return (
      <span className={`${base} gap-1`} role="img" aria-label={label} title={label}>
        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#E60000] text-[7.5px] font-black text-white leading-none">
          V
        </span>
        <span className="text-[8px] font-black tracking-tight text-neutral-900">Cash</span>
      </span>
    );
  }

  return (
    <span className={`${base} gap-1.5 bg-amber-50/95 border-amber-200/50 text-neutral-900`} role="img" aria-label={label} title={label}>
      <Banknote size={13} className="text-emerald-900 flex-shrink-0" />
      <span className="text-[8.5px] font-black uppercase tracking-tight">COD</span>
    </span>
  );
}

export function Footer() {
  const { locale, isRTL } = useAppSettings();
  const isArabic = locale === "ar";
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError(isArabic ? "يرجى إدخال بريد إلكتروني صحيح" : "Please enter a valid email address");
      return;
    }

    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setEmail("");
      toast.success(
        isArabic
          ? "🌿 أهلاً بك في نادي أصدقاء حاج عرفة! تم تسجيل اشتراكك بنجاح."
          : "🌿 Welcome to the Haj Arafa Herbal Circle! Subscription confirmed."
      );
    }, 600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const valueProps = [
    {
      icon: Leaf,
      title: isArabic ? "أعشاب طبيعية ١٠٠٪" : "100% Pure Botanical",
      desc: isArabic ? "محاصيل منتقاة بعناية" : "Finest natural harvest",
    },
    {
      icon: ShieldCheck,
      title: isArabic ? "أصالة منذ ١٩٦٨" : "Heritage Since 1968",
      desc: isArabic ? "خبرة عطارة عريقة" : "Over 55 years of mastery",
    },
    {
      icon: Truck,
      title: isArabic ? "توصيل لكافة المحافظات" : "Express Delivery Across Egypt",
      desc: isArabic ? "شحن آمن حتى باب بيتك" : "Direct to your doorstep",
    },
    {
      icon: Sparkles,
      title: isArabic ? "ضمان الجودة والاسترجاع" : "Guaranteed Satisfaction",
      desc: isArabic ? "استرجاع سهل ودعم مستمر" : "Zero-hassle returns",
    },
  ];

  const quickCategories = [
    { to: "/category/spices", label: isArabic ? "بهارات وتوابل شرقية أصيلة" : "Artisan Spices & Grains" },
    { to: "/category/honey", label: isArabic ? "عسل نحل جبلي وتمور فاخرة" : "Raw Mountain Honey & Dates" },
    { to: "/category/coffee-drinks", label: isArabic ? "قهوة محوجة ومشروبات عشبية" : "Specialty Coffee & Herbal Teas" },
    { to: "/category/wellness", label: isArabic ? "حلول صحية ومكملات طبيعية" : "Targeted Herbal Wellness" },
    { to: "/category/cosmetics", label: isArabic ? "زيوت طبيعية وعناية عشبية" : "Cold-Pressed Oils & Cosmetics" },
  ];

  const careLinks = [
    { to: "/account", label: isArabic ? "تتبع ومتابعة الطلبات" : "Track My Orders" },
    { to: "/branches", label: isArabic ? "فروعنا ومنافذ البيع" : "Store Locations & Branches" },
    { to: "/help", label: isArabic ? "الأسئلة الشائعة وسياسة الإرجاع" : "FAQs & Return Policy" },
    { to: "/contact", label: isArabic ? "تواصل مع فريق الدعم" : "Contact Customer Support" },
    { to: "/about", label: isArabic ? "عن حاج عرفة وتاريخنا منذ ١٩٦٨" : "About Haj Arafa (Since 1968)" },
  ];

  const paymentLabels = {
    visa: isArabic ? "فيزا" : "Visa",
    mastercard: isArabic ? "ماستركارد" : "Mastercard",
    meeza: isArabic ? "بطاقة ميزة الوطنية للدفع" : "Meeza National Payment",
    vodafone: isArabic ? "محفظة فودافون كاش" : "Vodafone Cash Wallet",
    cod: isArabic ? "الدفع نقداً عند الاستلام" : "Cash on Delivery",
  };

  return (
    <footer className="bg-[#142318] dark:bg-[#080D0A] text-zinc-100 border-t border-amber-500/20 mt-12 sm:mt-20 select-none relative overflow-hidden pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] sm:pb-8">
      {/* Subtle ambient glows for Egyptian Heritage Apothecary */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_0%,rgba(245,215,127,0.06),transparent_40%),radial-gradient(circle_at_85%_15%,rgba(131,52,15,0.09),transparent_45%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />

      {/* Row 1: Compact, uncluttered Value Pillars Ribbon */}
      <section className="relative z-10 border-b border-white/10 bg-black/20" aria-label={isArabic ? "مزايا حاج عرفة" : "Haj Arafa Value Pillars"}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {valueProps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5 sm:gap-3 py-1">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-amber-400/15 text-amber-300 border border-amber-400/25 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-[13px] font-bold text-zinc-100 leading-tight truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-zinc-300 leading-tight mt-0.5 truncate hidden xs:block">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Row 2: Arranged 4-Column Main IA Grid */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Col 1: Brand & Heritage Identity (4 cols) */}
          <section className="lg:col-span-4 space-y-4" aria-labelledby="footer-brand-title">
            <Link to="/" className="inline-flex items-center gap-3 no-underline group">
              <img
                src={logoImg}
                alt="Haj Arafa Logo"
                width={44}
                height={44}
                className="h-11 w-11 object-contain rounded-xl bg-white/10 p-1 border border-white/15 group-hover:scale-105 transition-transform"
              />
              <div>
                <span id="footer-brand-title" className="font-display font-bold text-xl tracking-wide text-amber-200 group-hover:text-white transition-colors block">
                  {isArabic ? "حاج عرفة" : "Haj Arafa"}
                </span>
                <span className="text-[10px] text-zinc-300 uppercase tracking-widest block font-sans">
                  {isArabic ? "العطارة والأغذية الطبيعية منذ ١٩٦٨" : "Egyptian Natural Apothecary Since 1968"}
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-zinc-300 max-w-sm">
              {isArabic
                ? "تراث العطارة المصرية الأصيلة منذ عام ١٩٦٨ في قلب القاهرة. نقدم أجود محاصيل التوابل، الأعشاب الطبيعية، والعسل والزيوت بأعلى معايير النقاء."
                : "Preserving Egypt's apothecary heritage since 1968. Pure medicinal herbs, artisan spices, raw honey, and cold-pressed botanical oils."}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-medium text-[11px]">
                {isArabic ? "خدمة العملاء متاحة الآن (٩ ص - ١٠ م)" : "Customer Concierge Live (9 AM - 10 PM)"}
              </span>
            </div>

            {/* Social Touch Targets (>= 44px) */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center hover:bg-amber-300 hover:text-zinc-950 active:scale-95 transition-all"
                aria-label={isArabic ? "فيسبوك (يفتح في نافذة جديدة)" : "Facebook (opens in a new tab)"}
              >
                <Facebook size={17} />
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center hover:bg-amber-300 hover:text-zinc-950 active:scale-95 transition-all"
                aria-label={isArabic ? "إنستغرام (يفتح في نافذة جديدة)" : "Instagram (opens in a new tab)"}
              >
                <Instagram size={17} />
              </a>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center hover:bg-[#25D366] hover:text-white active:scale-95 transition-all"
                aria-label={isArabic ? "واتساب (يفتح في نافذة جديدة)" : "WhatsApp (opens in a new tab)"}
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </section>

          {/* Col 2: Top Collections (2.5 cols) */}
          <nav className="lg:col-span-2 space-y-3" aria-label={isArabic ? "أقسام المتجر" : "Store Collections"}>
            <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Leaf size={13} className="text-amber-300" />
              <span>{isArabic ? "أقسام المتجر" : "Collections"}</span>
            </h4>
            <ul className="space-y-0.5">
              {quickCategories.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex items-center min-h-[44px] text-xs font-medium text-zinc-300 hover:text-amber-200 hover:translate-x-1.5 rtl:hover:-translate-x-1.5 duration-200 transition-all no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Customer Care (2.5 cols) */}
          <nav className="lg:col-span-2 space-y-3" aria-label={isArabic ? "خدمة العملاء والمعلومات" : "Customer care and info"}>
            <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-amber-300" />
              <span>{isArabic ? "خدمة العملاء" : "Customer Care"}</span>
            </h4>
            <ul className="space-y-0.5">
              {careLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center min-h-[44px] text-xs font-medium text-zinc-300 hover:text-amber-200 hover:translate-x-1.5 rtl:hover:-translate-x-1.5 duration-200 transition-all no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4: Concise Newsletter & Direct WhatsApp Assistant (3 cols) */}
          <section className="lg:col-span-4 space-y-3.5" aria-labelledby="footer-newsletter-heading">
            <h4 id="footer-newsletter-heading" className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={13} className="text-amber-300" />
              <span>{isArabic ? "نادي أصدقاء حاج عرفة" : "The Herbal Circle"}</span>
            </h4>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {isArabic
                ? "اشترك في نشرتنا البريدية لتصلك أحدث النصائح العشبية ووصفات العطارة وخصم ١٠٪."
                : "Subscribe for curated remedies, harvest alerts, and 10% off your next order."}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2" noValidate>
              <div className="flex items-center gap-2">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  {isArabic ? "عنوان البريد الإلكتروني" : "Email address"}
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formError) setFormError("");
                  }}
                  placeholder={isArabic ? "بريدك الإلكتروني..." : "Your email address..."}
                  className="flex-1 h-11 rounded-xl bg-white/10 border border-white/20 px-3.5 text-xs text-white placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all"
                  aria-describedby={formError ? "footer-newsletter-error" : undefined}
                  aria-invalid={Boolean(formError)}
                  data-no-focus-ring
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="h-11 px-4 rounded-xl bg-brand-terracotta hover:bg-[#b04b25] active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {subscribing ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <span>{isArabic ? "انضمام" : "Join"}</span>
                      <Send size={13} className={isRTL ? "rotate-180" : ""} />
                    </>
                  )}
                </button>
              </div>
              {formError && (
                <p id="footer-newsletter-error" role="alert" className="text-xs text-rose-300 font-medium">
                  {formError}
                </p>
              )}
            </form>

            <div className="flex items-center gap-1.5 text-[11px] text-amber-200/90 font-medium">
              <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
              <span>{isArabic ? "بدون رسائل مزعجة • يمكنك إلغاء الاشتراك في أي وقت" : "Zero spam • Unsubscribe at any time with 1 click"}</span>
            </div>

            {/* Direct WhatsApp Concierge Order Button (min-h-[48px]) */}
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 hover:bg-[#25D366] hover:text-zinc-950 px-4 text-xs font-bold text-emerald-300 transition-all no-underline shadow-sm active:scale-95 cursor-pointer"
              aria-label={isArabic ? "تواصل عبر واتساب (يفتح في نافذة جديدة)" : "Chat on WhatsApp (opens in a new tab)"}
            >
              <MessageCircle size={16} />
              <span>{isArabic ? "مساعد الطلبات السريعة عبر واتساب" : "WhatsApp Quick Order Assistant"}</span>
            </a>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 pt-1">
              <a
                href={`tel:${CONTACT.hotline}`}
                className="flex items-center gap-1.5 min-h-[44px] hover:text-amber-200 transition-colors no-underline font-medium"
              >
                <Phone size={13} className="text-amber-300" />
                <span>{isArabic ? `الخط الساخن: ${CONTACT.hotline}` : `Hotline: ${CONTACT.hotline}`}</span>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-1.5 min-h-[44px] hover:text-amber-200 transition-colors no-underline font-medium"
              >
                <Mail size={13} className="text-amber-300" />
                <span>{CONTACT.email}</span>
              </a>

              <Link
                to="/branches"
                className="flex items-center gap-1.5 min-h-[44px] hover:text-amber-200 transition-colors no-underline font-medium"
              >
                <MapPin size={13} className="text-amber-300" />
                <span>{isArabic ? "فروعنا في مصر" : "Branches in Egypt"}</span>
              </Link>
            </div>
          </section>

        </div>

        {/* Row 3: Bottom Legal, Security, Payment & Smooth Back to Top */}
        <div className="mt-10 sm:mt-12 border-t border-white/10 pt-5 sm:pt-6 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
          <div className="flex flex-col sm:flex-row items-center gap-2.5 text-center sm:text-start">
            <p className="text-[11px] sm:text-xs text-zinc-300 font-medium">
              © {new Date().getFullYear()} {isArabic ? "حاج عرفة للمنتجات الطبيعية. جميع الحقوق محفوظة." : "Haj Arafa Natural Products. All rights reserved."}
            </p>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-amber-300/80 font-medium">
              <Lock size={12} className="text-emerald-400" />
              <span>{isArabic ? "دفع آمن ومحمي بأعلى معايير التشفير SSL" : "256-Bit SSL Encrypted & Secure Checkout"}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            <PaymentLogo type="meeza" label={paymentLabels.meeza} />
            <PaymentLogo type="vodafone" label={paymentLabels.vodafone} />
            <PaymentLogo type="visa" label={paymentLabels.visa} />
            <PaymentLogo type="mastercard" label={paymentLabels.mastercard} />
            <PaymentLogo type="cod" label={paymentLabels.cod} />
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-amber-200 hover:bg-white/10 active:scale-95 transition-all min-h-[44px] cursor-pointer"
            aria-label={isArabic ? "العودة إلى أعلى الصفحة" : "Back to top of page"}
          >
            <span>{isArabic ? "إلى الأعلى" : "Back to Top"}</span>
            <ChevronUp size={15} />
          </button>
        </div>

      </div>
    </footer>
  );
}
