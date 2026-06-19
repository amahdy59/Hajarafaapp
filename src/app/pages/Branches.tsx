import { ArrowLeft, Clock, MapPin, ExternalLink, Map, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { useAppSettings } from "../context/AppSettingsContext";
import { useState } from "react";
import { motion } from "motion/react";
import { CONTACT } from "../config/contact";

/* ─── Types ─── */
interface Branch {
  nameEn: string;
  nameAr: string;
  mapQuery: string;
}

interface Region {
  nameEn: string;
  nameAr: string;
  branches: Branch[];
}

interface SellingGroupItem {
  en: string;
  ar: string;
}

interface SellingGroup {
  titleEn: string;
  titleAr: string;
  items: SellingGroupItem[];
}

/* ─── Helpers ─── */
const mapsLink = (regionName: string, branch: Branch) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Haj Arafa ${regionName} ${branch.mapQuery || branch.nameEn} Egypt`)}`;

const sellingSpotLink = (item: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item} Egypt Haj Arafa`)}`;

/* ─── Branch Data ─── */
const regions: Region[] = [
  {
    nameEn: "Nasr City",
    nameAr: "مدينة نصر",
    branches: [
      { nameEn: "Ahmed Fakhri", nameAr: "أحمد فخري", mapQuery: "أحمد فخري" },
      { nameEn: "Mostafa El Nahas", nameAr: "مصطفى النحاس", mapQuery: "مصطفى النحاس" },
      { nameEn: "Tayaran", nameAr: "الطيران", mapQuery: "الطيران" },
      { nameEn: "City Stars Mall", nameAr: "سيتي ستارز مول", mapQuery: "سيتي ستارز مول" },
      { nameEn: "Makram Abiad", nameAr: "مكرم عبيد", mapQuery: "مكرم عبيد" },
      { nameEn: "Gardenia", nameAr: "جاردينيا", mapQuery: "جاردينيا" },
    ],
  },
  {
    nameEn: "Heliopolis",
    nameAr: "مصر الجديدة",
    branches: [
      { nameEn: "Kolleyt El Banat", nameAr: "كلية البنات", mapQuery: "كلية البنات" },
      { nameEn: "El Kolleya El Harbeya", nameAr: "الكلية الحربية", mapQuery: "الكلية الحربية" },
      { nameEn: "Sheraton", nameAr: "شيراتون", mapQuery: "شيراتون" },
      { nameEn: "Roxi", nameAr: "روكسي", mapQuery: "روكسي" },
      { nameEn: "El Korba Square", nameAr: "ميدان الكوربة", mapQuery: "ميدان الكوربة" },
      { nameEn: "El Nozha", nameAr: "النزهة", mapQuery: "النزهة" },
    ],
  },
  {
    nameEn: "New Cairo & Rehab",
    nameAr: "القاهرة الجديدة والرحاب",
    branches: [
      { nameEn: "ChillOut Rehab", nameAr: "تشيل أوت الرحاب", mapQuery: "تشيل أوت الرحاب" },
      { nameEn: "Rehab - El Souq El Adem", nameAr: "الرحاب - السوق القديم", mapQuery: "الرحاب السوق القديم" },
      { nameEn: "New Cairo - Banafseg Services", nameAr: "القاهرة الجديدة - خدمات البنفسج", mapQuery: "New Cairo Banafseg Services" },
      { nameEn: "New Cairo - South Teseen", nameAr: "القاهرة الجديدة - جنوب التسعين", mapQuery: "New Cairo South Teseen" },
      { nameEn: "New Cairo - Silver Star Mall", nameAr: "القاهرة الجديدة - سيلفر ستار مول", mapQuery: "New Cairo Silver Star Mall" },
      { nameEn: "New Cairo - El Narges", nameAr: "القاهرة الجديدة - النرجس", mapQuery: "New Cairo El Narges" },
      { nameEn: "New Cairo - Arabella Plaza Mall", nameAr: "القاهرة الجديدة - أرابيلا بلازا مول", mapQuery: "New Cairo Arabella Plaza Mall" },
      { nameEn: "New Cairo - North Teseen", nameAr: "القاهرة الجديدة - شمال التسعين", mapQuery: "New Cairo North Teseen" },
      { nameEn: "El-Moshir Tantawy Axis", nameAr: "محور المشير طنطاوي", mapQuery: "محور المشير طنطاوي" },
    ],
  },
  {
    nameEn: "Madinaty & East Cairo",
    nameAr: "مدينتي وشرق القاهرة",
    branches: [
      { nameEn: "Madinaty - Arabesque Mall", nameAr: "مدينتي - أرابيسك مول", mapQuery: "مدينتي أرابيسك مول" },
      { nameEn: "Sherouk - Terrace Mall", nameAr: "الشروق - تراس مول", mapQuery: "الشروق تراس مول" },
      { nameEn: "Sherouk - Moon Yard Mall", nameAr: "الشروق - مون يارد مول", mapQuery: "الشروق مون يارد مول" },
      { nameEn: "Obour - After Golf City on Obour Axis", nameAr: "العبور - محور العبور بعد الجولف سيتي", mapQuery: "العبور محور العبور بعد الجولف سيتي" },
      { nameEn: "New Administrative Capital", nameAr: "العاصمة الإدارية الجديدة", mapQuery: "العاصمة الإدارية الجديدة" },
      { nameEn: "10th of Ramadan City", nameAr: "مدينة العاشر من رمضان", mapQuery: "مدينة العاشر من رمضان" },
    ],
  },
  {
    nameEn: "Central Cairo & Giza",
    nameAr: "وسط القاهرة والجيزة",
    branches: [
      { nameEn: "Mokattam", nameAr: "المقطم", mapQuery: "Mokattam" },
      { nameEn: "Downtown - Abdel Khalek Tharwat next to Orange", nameAr: "وسط البلد - عبدالخالق ثروت بجوار أورنج", mapQuery: "وسط البلد عبدالخالق ثروت" },
      { nameEn: "Dokki - In front of Saudi Supermarket", nameAr: "الدقي - أمام سوبر ماركت سعودي", mapQuery: "الدقي أمام سوبر ماركت سعودي" },
      { nameEn: "Dokki - Sayd Club next to Amir El Demyati", nameAr: "الدقي - نادي الصيد بجوار حلواني أمير الدمياطي", mapQuery: "الدقي نادي الصيد" },
      { nameEn: "Zamalek - 26th of July", nameAr: "الزمالك - ٢٦ يوليو", mapQuery: "الزمالك ٢٦ يوليو" },
      { nameEn: "Zamalek - Ismail Mohamed", nameAr: "الزمالك - إسماعيل محمد", mapQuery: "الزمالك إسماعيل محمد" },
      { nameEn: "Shobra Masr - Shobra Street", nameAr: "شبرا مصر - شارع شبرا", mapQuery: "Shobra Masr Shobra Street" },
    ],
  },
  {
    nameEn: "Mohandeseen & Haram",
    nameAr: "المهندسين والهرم",
    branches: [
      { nameEn: "Mohandeseen - Geziret Al Arab next to 123", nameAr: "المهندسين - جزيرة العرب بجوار ١٢٣", mapQuery: "المهندسين جزيرة العرب" },
      { nameEn: "Mohandeseen - Lebnan Street", nameAr: "المهندسين - شارع لبنان", mapQuery: "المهندسين شارع لبنان" },
      { nameEn: "El Haram - Main Haram Street", nameAr: "الهرم - شارع الهرم الرئيسي", mapQuery: "El Haram Main Haram Street" },
    ],
  },
  {
    nameEn: "6th October & Sheikh Zayed",
    nameAr: "أكتوبر والشيخ زايد",
    branches: [
      { nameEn: "Sheikh Zayed - El Khamayel", nameAr: "الشيخ زايد - الخمايل", mapQuery: "الشيخ زايد الخمايل" },
      { nameEn: "Mall of Egypt", nameAr: "مول مصر", mapQuery: "مول مصر" },
      { nameEn: "El Hosary Square - October", nameAr: "ميدان الحصري - أكتوبر", mapQuery: "ميدان الحصري أكتوبر" },
      { nameEn: "El Hosary - Al Ghazi Mall", nameAr: "الحصري - الغازي مول", mapQuery: "الحصري الغازي مول" },
    ],
  },
  {
    nameEn: "Maadi",
    nameAr: "المعادي",
    branches: [
      { nameEn: "Maadi - Nerco", nameAr: "المعادي - نيركو", mapQuery: "المعادي نيركو" },
      { nameEn: "Maadi - Kattameya next to Adidas", nameAr: "المعادي - القطامية بجوار أديداس", mapQuery: "المعادي القطامية" },
      { nameEn: "Maadi - Garden Plaza Mall", nameAr: "المعادي - جاردن بلازا مول", mapQuery: "المعادي جاردن بلازا مول" },
    ],
  },
  {
    nameEn: "Alexandria",
    nameAr: "الإسكندرية",
    branches: [
      { nameEn: "Semouha", nameAr: "سموحة", mapQuery: "سموحة" },
      { nameEn: "Semouha Club", nameAr: "نادي سموحة", mapQuery: "نادي سموحة" },
      { nameEn: "Lauran - 695, Mohamed Dory St / Al Horreya Rd", nameAr: "لوران - ٦٩٥ تقاطع شارع محمد دري مع طريق الحرية بجوار دبي فون", mapQuery: "لوران شارع محمد دري" },
      { nameEn: "Gleem", nameAr: "جليم", mapQuery: "جليم" },
      { nameEn: "El Mandara", nameAr: "المندرة", mapQuery: "المندرة" },
    ],
  },
  {
    nameEn: "Delta & Upper Egypt",
    nameAr: "الدلتا",
    branches: [
      { nameEn: "Mansoura", nameAr: "المنصورة", mapQuery: "المنصورة" },
      { nameEn: "Zagazig", nameAr: "الزقازيق", mapQuery: "الزقازيق" },
      { nameEn: "Damanhour", nameAr: "دمنهور", mapQuery: "دمنهور" },
      { nameEn: "Tanta", nameAr: "طنطا", mapQuery: "طنطا" },
      { nameEn: "Menofia", nameAr: "المنوفية", mapQuery: "المنوفية" },
    ],
  },
];

/* ─── Selling Spots ─── */
const sellingSpots: SellingGroup[] = [
  {
    titleEn: "Carrefour Locations",
    titleAr: "فروع كارفور",
    items: [
      { en: "City Centre Maadi", ar: "سيتي سنتر المعادي" },
      { en: "City Centre Alexandria", ar: "سيتي سنتر الإسكندرية" },
      { en: "Winget - Alexandria", ar: "وينجت - الإسكندرية" },
      { en: "Madinaty", ar: "مدينتي" },
      { en: "Lulu Market - 1st Settlement", ar: "لولو ماركت - التجمع الأول" },
      { en: "Rehab", ar: "الرحاب" },
      { en: "Gezira - 6th October", ar: "الجزيرة - ٦ أكتوبر" },
      { en: "Degla - Maadi", ar: "دجلة - المعادي" },
      { en: "Asmrat - Mokattam", ar: "الأسمرات - المقطم" },
      { en: "Sheraton", ar: "شيراتون" },
      { en: "Ismailiya", ar: "الإسماعيلية" },
      { en: "Shoubra", ar: "شبرا" },
      { en: "Damanhour", ar: "دمنهور" },
    ],
  },
  {
    titleEn: "Other Retail Partners",
    titleAr: "شركاء التجزئة الآخرون",
    items: [
      { en: "Fathallah Market", ar: "فتح الله ماركت" },
      { en: "Oscar", ar: "أوسكار" },
      { en: "Géant", ar: "جيان" },
      { en: "Gomla Market", ar: "جملة ماركت" },
      { en: "Mahmoud Elfar", ar: "محمود الفار" },
      { en: "LULU Market", ar: "لولو ماركت" },
    ],
  },
];

/* ─── Collapsible Region Component ─── */
function RegionSection({
  region,
  isRTL,
  index,
}: {
  region: Region;
  isRTL: boolean;
  index: number;
}) {
  const [open, setOpen] = useState(true);
  const sectionId = `branches-region-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-soft"
    >
      {/* Region header — toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={sectionId}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-start bg-brand-cream-2 hover:bg-brand-peach/40 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <MapPin size={18} className="text-brand-terracotta flex-shrink-0" />
          <h2 className="text-brand-forest font-display text-base sm:text-lg leading-snug">
            {isRTL ? region.nameAr : region.nameEn}
          </h2>
          <span className="text-xs text-muted-foreground font-medium bg-background/60 rounded-full px-2 py-0.5">
            {region.branches.length}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-brand-terracotta text-lg leading-none select-none"
        >
          ▾
        </motion.span>
      </button>

      {/* Branch list */}
      <motion.div
        id={sectionId}
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <ul className="divide-y divide-border/50">
          {region.branches.map((branch) => (
            <li
              key={branch.nameEn}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 hover:bg-brand-peach/10 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-foreground text-sm sm:text-[0.9375rem] font-medium leading-relaxed">
                  {isRTL ? branch.nameAr : branch.nameEn}
                </span>
              </div>
              <a
                href={mapsLink(region.nameEn, branch)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 h-11 bg-brand-peach/60 dark:bg-brand-peach/30 border border-brand-terracotta/25 text-brand-terracotta-dark dark:text-brand-terracotta hover:bg-brand-terracotta hover:text-white dark:hover:bg-brand-terracotta dark:hover:text-zinc-950 transition-colors flex-shrink-0 text-xs font-semibold rounded-xl px-3.5 shadow-sm"
                aria-label={`${isRTL ? branch.nameAr : branch.nameEn} - ${isRTL ? "عرض على الخريطة" : "View on Google Maps"}`}
                title={isRTL ? "عرض على الخريطة" : "View on Map"}
              >
                <Map size={14} className="flex-shrink-0" />
                <span>{isRTL ? "الخريطة" : "Map"}</span>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export function Branches() {
  const { t, isRTL } = useAppSettings();

  const totalBranches = regions.reduce((s, r) => s + r.branches.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-terracotta text-sm transition-colors w-fit"
          >
            <ArrowLeft size={16} className="rtl-flip" />
            {isRTL ? "العودة للرئيسية" : "Back to Home"}
          </Link>
          <div className="flex items-center gap-3">
            <MapPin size={24} className="text-brand-terracotta fill-brand-peach/50" />
            <div>
              <h1 className="text-brand-forest font-display text-2xl sm:text-3xl">{t.branches}</h1>
              <p className="eyebrow !text-brand-terracotta">{isRTL ? "الفروع الرئيسية" : "Our Main Branches"}</p>
            </div>
            <span className="text-xs text-muted-foreground font-medium bg-brand-peach/30 rounded-full px-2.5 py-0.5">
              {totalBranches} {isRTL ? "فرع" : "branches"}
            </span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed select-none">
            {isRTL ? (
              "تفخر شركة حاج عرفة بتقديم خدماتها من خلال فروعنا الرئيسية في مصر. تفضل بزيارتنا لتجربة منتجاتنا العشبية الطبيعية والتوابل الطازجة والزيوت العضوية."
            ) : (
              "Haj Arafa is proud to serve you from our flagship store branches across Egypt. Visit us to explore our fresh range of organic herbs, spices, and natural beauty remedies."
            )}
          </p>

          {/* Hotline Banner */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 bg-brand-peach/40 dark:bg-zinc-800/40 border border-brand-terracotta/10 dark:border-white/5 p-3.5 px-4.5 rounded-2xl text-xs sm:text-sm font-medium w-fit shadow-sm mt-1">
            <span className="text-brand-forest font-semibold">{isRTL ? "للطلب والاستفسار (الخط الساخن):" : "For orders & inquiries (Hotline):"}</span>
            <div className="flex items-center gap-3.5 flex-wrap">
              <a href={`tel:${CONTACT.hotline}`} className="text-brand-terracotta-dark dark:text-brand-terracotta hover:underline font-bold font-mono flex items-center gap-1.5">
                <Phone size={14} className="text-brand-terracotta" /> {CONTACT.hotline}
              </a>
              <span className="text-brand-line dark:text-zinc-700 select-none">|</span>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-brand-sage-dark dark:text-brand-sage hover:underline font-bold font-mono flex items-center gap-1.5">
                <MessageCircle size={14} className="text-brand-sage-dark dark:text-brand-sage" /> {CONTACT.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* ─── Region Sections ─── */}
        <div className="space-y-4 pt-2">
          {regions.map((region, i) => (
            <RegionSection key={region.nameEn} region={region} isRTL={isRTL} index={i} />
          ))}
        </div>

        {/* ─── Selling Spots ─── */}
        <div className="pt-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <Clock size={20} className="text-brand-terracotta" />
            <h2 className="text-brand-forest font-display text-xl sm:text-2xl">
              {isRTL ? "نقاط البيع" : "Selling Spots"}
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            {isRTL
              ? "يمكنك أيضًا العثور على منتجاتنا في المتاجر والسلاسل التجارية التالية."
              : "You can also find our products at the following retail stores and chains."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sellingSpots.map((group) => (
              <motion.div
                key={group.titleEn}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-soft"
              >
                <div className="px-5 py-3.5 bg-brand-cream-2">
                  <h3 className="text-brand-forest font-display text-sm sm:text-base">
                    {isRTL ? group.titleAr : group.titleEn}
                  </h3>
                </div>
                <ul className="divide-y divide-border/50">
                  {group.items.map((item) => (
                    <li key={item.en}>
                      <a
                        href={sellingSpotLink(item.en)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 text-brand-ink-soft hover:text-brand-terracotta text-sm leading-relaxed flex items-center justify-between gap-3"
                        aria-label={`${isRTL ? item.ar : item.en} - ${isRTL ? "عرض على خرائط جوجل" : "View on Google Maps"}`}
                      >
                        <span>{isRTL ? item.ar : item.en}</span>
                        <ExternalLink size={13} className="text-brand-terracotta flex-shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom spacer for mobile nav */}
      <div className="h-20 sm:h-6" />
    </div>
  );
}
