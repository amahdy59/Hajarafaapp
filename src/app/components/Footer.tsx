import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import {
  Banknote,
  ChevronUp,
  Facebook,
  Instagram,
  Leaf,
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
    "h-[26px] min-w-[50px] rounded-md border border-white/15 bg-white/95 text-neutral-900 px-2 flex items-center justify-center shadow-sm select-none transition-transform hover:scale-105";

  if (type === "visa") {
    return (
      <span className={`${base} font-black italic tracking-tighter text-[#173B8F] text-[9px]`} role="img" aria-label={label} title={label}>
        VISA
      </span>
    );
  }

  if (type === "mastercard") {
    return (
      <span className={`${base} gap-1`} role="img" aria-label={label} title={label}>
        <span className="relative flex h-2.5 w-4 items-center">
          <span className="absolute left-0 h-2.5 w-2.5 rounded-full bg-[#EA001B]" />
          <span className="absolute right-0 h-2.5 w-2.5 rounded-full bg-[#FFB000] mix-blend-multiply" />
        </span>
        <span className="text-[8px] font-black uppercase tracking-tight text-neutral-900">Mastercard</span>
      </span>
    );
  }

  if (type === "meeza") {
    return (
      <span className={`${base} gap-1`} role="img" aria-label={label} title={label}>
        <span className="grid h-3 w-3 grid-cols-2 gap-0.5">
          <span className="rounded-[0.5px] bg-[#E53935]" />
          <span className="rounded-[0.5px] bg-[#1E88E5]" />
          <span className="rounded-[0.5px] bg-[#43A047]" />
          <span className="rounded-[0.5px] bg-[#FDD835]" />
        </span>
        <span className="text-[8px] font-black tracking-tight text-neutral-900">Meeza</span>
      </span>
    );
  }

  if (type === "vodafone") {
    return (
      <span className={`${base} gap-1`} role="img" aria-label={label} title={label}>
        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#E60000] text-[7px] font-black text-white leading-none">
          V
        </span>
        <span className="text-[8px] font-black tracking-tight text-neutral-900">Cash</span>
      </span>
    );
  }

  return (
    <span className={`${base} gap-1 bg-amber-50/95 border-amber-200/40 text-neutral-900`} role="img" aria-label={label} title={label}>
      <Banknote size={12} className="text-emerald-950 flex-shrink-0" />
      <span className="text-[8px] font-black uppercase tracking-tight">COD</span>
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
      title: isArabic ? "نقاء وأعشاب طبيعية ١٠٠٪" : "100% Pure & Natural Harvest",
      desc: isArabic ? "محاصيل منتقاة وخالية من الإضافات الكيميائية" : "Certified botanical sources, zero additives",
    },
    {
      icon: ShieldCheck,
      title: isArabic ? "أصالة مصرية منذ ١٩٦٨" : "Egyptian Heritage Since 1968",
      desc: isArabic ? "أكثر من ٥٥ عاماً من خبرة العطارة المتوارثة" : "Over 55 years of apothecary mastery",
    },
    {
      icon: Truck,
      title: isArabic ? "توصيل سريع لجميع المحافظات" : "Nationwide Express Delivery",
      desc: isArabic ? "شحن معتمد لكافة المحافظات والمراكز" : "Safe door-to-door delivery across Egypt",
    },
    {
      icon: Sparkles,
      title: isArabic ? "ضمان الجودة والاسترجاع" : "Guaranteed Satisfaction",
      desc: isArabic ? "خدمة عملاء ودعم مستمر لراحتكم" : "Dedicated customer care and satisfaction",
    },
  ];

  const quickCategories = [
    { to: "/category/spices", label: isArabic ? "بهارات وتوابل شرقية" : "Artisan Spices & Grains" },
    { to: "/category/honey", label: isArabic ? "عسل نحل طبيعي وتمور" : "Raw Honey & Mountain Dates" },
    { to: "/category/coffee-drinks", label: isArabic ? "قهوة ومشروبات عشبية" : "Specialty Coffee & Infusions" },
    { to: "/category/wellness", label: isArabic ? "حلول صحية مخصصة" : "Targeted Herbal Wellness" },
    { to: "/category/cosmetics", label: isArabic ? "مستحضرات تجميل طبيعية" : "Natural Cosmetics & Oils" },
    { to: "/category/nuts", label: isArabic ? "مكسرات وتسالي ممتازة" : "Gourmet Nuts & Healthy Snacks" },
  ];

  const careLinks = [
    { to: "/about", label: isArabic ? "عن حاج عرفة وتاريخنا" : "About Haj Arafa & Heritage" },
    { to: "/branches", label: isArabic ? "فروعنا ومنافذ البيع" : "Store Locations & Branches" },
    { to: "/contact", label: isArabic ? "اتصل بفريق خدمة العملاء" : "Contact Customer Support" },
    { to: "/help", label: isArabic ? "الأسئلة الشائعة وسياسة الإرجاع" : "FAQs & Return Policy" },
    { to: "/account", label: isArabic ? "تتبع ومتابعة الطلبات" : "Track My Orders" },
  ];

  const paymentLabels = {
    visa: isArabic ? "فيزا" : "Visa",
    mastercard: isArabic ? "ماستركارد" : "Mastercard",
    meeza: isArabic ? "ميزة الدفع الوطني" : "Meeza National Payment",
    vodafone: isArabic ? "فودافون كاش" : "Vodafone Cash",
    cod: isArabic ? "الدفع نقداً عند الاستلام" : "Cash on Delivery",
  };

  return (
    <footer className="bg-[#0D1511] dark:bg-[#070B09] text-zinc-100 border-t border-white/10 mt-12 sm:mt-20 select-none relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_0%,rgba(141,163,146,0.12),transparent_35%),radial-gradient(circle_at_90%_20%,rgba(200,90,50,0.08),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />

      {/* 1. Value Propositions Grid */}
      <section className="relative z-10 border-b border-white/10 bg-white/[0.015]" aria-label={isArabic ? "مزايا حاج عرفة" : "Haj Arafa Value Pillars"}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {valueProps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-200/30 hover:bg-white/[0.05] transition-all duration-200 group"
                >
                  <div className="h-11 w-11 rounded-xl bg-amber-100/10 text-amber-200 border border-amber-200/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-amber-100 group-hover:text-zinc-950 transition-all duration-200">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-100 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-zinc-300 mt-1 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Interactive Herbal Club Newsletter Banner */}
      <section className="relative z-10 border-b border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent py-8 sm:py-10" aria-labelledby="footer-newsletter-heading">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="rounded-3xl p-6 sm:p-8 border border-white/10 bg-white/[0.03] backdrop-blur-sm flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center lg:text-start space-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-amber-200 text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-amber-200/10 border border-amber-200/20">
                <Sparkles size={12} />
                {isArabic ? "نادي أصدقاء حاج عرفة" : "The Herbal Circle Privilege"}
              </span>
              <h2 id="footer-newsletter-heading" className="text-lg sm:text-xl font-display font-bold text-white tracking-wide">
                {isArabic
                  ? "انضم لعائلة التراث العشبي واحصل على وصفات حصرية"
                  : "Join Our Heritage Circle for Curated Remedies & Seasonal Offers"}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300">
                {isArabic
                  ? "سجل بريدك الإلكتروني للحصول على نصائح خبرائنا وخصم خاص على أول طلب لك."
                  : "Subscribe for weekly herbal recipes, harvest alerts, and 10% off your first order."}
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md flex flex-col gap-2" noValidate>
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  {isArabic ? "عنوان البريد الإلكتروني" : "Email address"}
                </label>
                <div className="relative flex-1">
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formError) setFormError("");
                    }}
                    placeholder={isArabic ? "أدخل بريدك الإلكتروني..." : "Enter your email address..."}
                    className="w-full h-11 sm:h-12 rounded-xl bg-white/10 border border-white/15 px-4 text-xs sm:text-sm text-white placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent transition-all"
                    aria-describedby={formError ? "footer-newsletter-error" : undefined}
                    aria-invalid={Boolean(formError)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={subscribing}
                  className="h-11 sm:h-12 px-5 sm:px-6 rounded-xl bg-brand-terracotta hover:bg-[#b04b25] active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {subscribing ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <>
                      <span>{isArabic ? "انضمام" : "Subscribe"}</span>
                      <Send size={14} className={isRTL ? "rotate-180" : ""} />
                    </>
                  )}
                </button>
              </div>
              {formError && (
                <p id="footer-newsletter-error" role="alert" className="text-xs text-rose-300 font-medium px-1">
                  {formError}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 3. Main Navigation Grid */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Heritage */}
          <section className="col-span-12 md:col-span-4 lg:col-span-4 space-y-4" aria-labelledby="footer-brand-title">
            <Link to="/" className="inline-flex items-center gap-3 no-underline group">
              <img
                src={logoImg}
                alt="Haj Arafa Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain rounded-xl bg-white/10 p-1 border border-white/15 group-hover:scale-105 transition-transform"
              />
              <div>
                <span id="footer-brand-title" className="font-display font-bold text-xl tracking-wide text-amber-100 group-hover:text-white transition-colors block">
                  {isArabic ? "حاج عرفة" : "Haj Arafa"}
                </span>
                <span className="text-[10px] text-zinc-300 uppercase tracking-widest block font-sans">
                  {isArabic ? "عطارة وأعشاب طبيعية منذ ١٩٦٨" : "Egyptian Apothecary Since 1968"}
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-zinc-300 max-w-sm">
              {isArabic
                ? "تراث العطارة المصرية الأصيلة يمتد لأكثر من خمسة عقود. نقدم لكم أجود أنواع التوابل، الأعشاب النقية، العسل والزيوت الطبيعية بأعلى معايير الجودة."
                : "Preserving Egypt's apothecary heritage for over five decades. Sourcing pure herbs, artisan spices, raw honey, and cold-pressed oils with uncompromising purity."}
            </p>

            {/* Live Concierge Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-medium text-[11px]">
                {isArabic ? "خدمة العملاء متاحة الآن (٩ ص - ١٠ م)" : "Customer Concierge Live (9 AM - 10 PM)"}
              </span>
            </div>

            {/* Tactile Social Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center hover:bg-amber-100 hover:text-zinc-950 active:scale-95 transition-all duration-200"
                aria-label={isArabic ? "فيسبوك (يفتح في نافذة جديدة)" : "Facebook (opens in a new tab)"}
              >
                <Facebook size={16} />
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center hover:bg-amber-100 hover:text-zinc-950 active:scale-95 transition-all duration-200"
                aria-label={isArabic ? "إنستغرام (يفتح في نافذة جديدة)" : "Instagram (opens in a new tab)"}
              >
                <Instagram size={16} />
              </a>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center hover:bg-emerald-500 hover:text-white active:scale-95 transition-all duration-200"
                aria-label={isArabic ? "واتساب (يفتح في نافذة جديدة)" : "WhatsApp (opens in a new tab)"}
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </section>

          {/* Column 2: Herbal Categories */}
          <nav className="col-span-12 xs:col-span-6 md:col-span-3 lg:col-span-3 space-y-3.5" aria-label={isArabic ? "أقسام المتجر" : "Store Collections"}>
            <h4 className="text-[11px] font-bold text-amber-200 uppercase tracking-[0.2em] flex items-center gap-1.5">
              <Leaf size={12} />
              <span>{isArabic ? "أقسام المتجر" : "Collections"}</span>
            </h4>
            <ul className="space-y-2.5">
              {quickCategories.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex items-center min-h-[32px] text-xs text-zinc-300 hover:text-amber-100 hover:translate-x-1 rtl:hover:-translate-x-1 duration-200 transition-all no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Customer Care & Services */}
          <nav className="col-span-12 xs:col-span-6 md:col-span-2 lg:col-span-2 space-y-3.5" aria-label={isArabic ? "خدمة العملاء والمعلومات" : "Customer care and info"}>
            <h4 className="text-[11px] font-bold text-amber-200 uppercase tracking-[0.2em] flex items-center gap-1.5">
              <ShieldCheck size={12} />
              <span>{isArabic ? "خدمة العملاء" : "Customer Care"}</span>
            </h4>
            <ul className="space-y-2.5">
              {careLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center min-h-[32px] text-xs text-zinc-300 hover:text-amber-100 hover:translate-x-1 rtl:hover:-translate-x-1 duration-200 transition-all no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Direct Concierge & Support */}
          <section className="col-span-12 md:col-span-3 lg:col-span-3 space-y-4" aria-labelledby="footer-concierge-heading">
            <h4 id="footer-concierge-heading" className="text-[11px] font-bold text-amber-200 uppercase tracking-[0.2em] flex items-center gap-1.5">
              <Phone size={12} />
              <span>{isArabic ? "الدعم المباشر" : "Direct Support"}</span>
            </h4>

            {/* WhatsApp Quick Order Assistant Button */}
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-600 hover:text-white px-4 text-xs font-bold text-emerald-300 transition-all no-underline shadow-sm active:scale-95"
              aria-label={isArabic ? "تواصل عبر واتساب (يفتح في نافذة جديدة)" : "Chat on WhatsApp (opens in a new tab)"}
            >
              <MessageCircle size={16} />
              <span>{isArabic ? "مساعد الطلبات عبر واتساب" : "WhatsApp Order Assistant"}</span>
            </a>

            <div className="space-y-2.5 text-xs text-zinc-300 pt-1">
              <a
                href={`tel:${CONTACT.hotline}`}
                className="flex items-center gap-2.5 min-h-[36px] hover:text-white transition-colors no-underline group"
              >
                <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-200 group-hover:bg-amber-100 group-hover:text-zinc-950 transition-colors">
                  <Phone size={13} />
                </div>
                <span>{isArabic ? `الخط الساخن: ${CONTACT.hotline}` : `Hotline: ${CONTACT.hotline}`}</span>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2.5 min-h-[36px] hover:text-white transition-colors no-underline group"
              >
                <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-200 group-hover:bg-amber-100 group-hover:text-zinc-950 transition-colors">
                  <Mail size={13} />
                </div>
                <span className="break-all">{CONTACT.email}</span>
              </a>

              <Link
                to="/branches"
                className="flex items-center gap-2.5 min-h-[36px] hover:text-white transition-colors no-underline group"
              >
                <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-200 group-hover:bg-amber-100 group-hover:text-zinc-950 transition-colors">
                  <MapPin size={13} />
                </div>
                <span>{isArabic ? "فروعنا في أنحاء مصر" : "Branches Across Egypt"}</span>
              </Link>
            </div>
          </section>

        </div>

        {/* 4. Bottom Legal & Payment Matrix Bar */}
        <div className="mt-12 sm:mt-16 border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
          <p className="text-[11px] sm:text-xs text-zinc-300 text-center sm:text-start">
            © {new Date().getFullYear()} {isArabic ? "حاج عرفة للأعشاب والمنتجات الطبيعية. جميع الحقوق محفوظة." : "Haj Arafa Natural Products. All rights reserved."}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
            <PaymentLogo type="meeza" label={paymentLabels.meeza} />
            <PaymentLogo type="vodafone" label={paymentLabels.vodafone} />
            <PaymentLogo type="visa" label={paymentLabels.visa} />
            <PaymentLogo type="mastercard" label={paymentLabels.mastercard} />
            <PaymentLogo type="cod" label={paymentLabels.cod} />
          </div>

          {/* Smooth Back to Top Action */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 hover:text-amber-100 hover:bg-white/10 active:scale-95 transition-all group min-h-[44px] cursor-pointer"
            aria-label={isArabic ? "العودة إلى أعلى الصفحة" : "Back to top of page"}
          >
            <span>{isArabic ? "إلى الأعلى" : "Back to Top"}</span>
            <ChevronUp size={15} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
