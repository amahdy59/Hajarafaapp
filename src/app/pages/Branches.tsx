import { ArrowLeft, Clock, MapPin, Phone, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion } from "motion/react";

interface Branch {
  id: string;
  nameEn: string;
  nameAr: string;
  addressEn: string;
  addressAr: string;
  phone: string;
  hoursEn: string;
  hoursAr: string;
  mapUrl: string;
}

const mockBranches: Branch[] = [
  {
    id: "br1",
    nameEn: "Downtown Cairo Branch",
    nameAr: "فرع وسط البلد - القاهرة",
    addressEn: "12 Talaat Harb St, Downtown, Cairo",
    addressAr: "١٢ شارع طلعت حرب، وسط البلد، القاهرة",
    phone: "+20 2 2393 1102",
    hoursEn: "Everyday: 10:00 AM - 11:00 PM",
    hoursAr: "يومياً: ١٠:٠٠ ص - ١١:٠٠ م",
    mapUrl: "https://maps.google.com"
  },
  {
    id: "br2",
    nameEn: "Al Attarin Alexandria Branch",
    nameAr: "فرع العطارين - الإسكندرية",
    addressEn: "45 El-Horeya St, Al Attarin, Alexandria",
    addressAr: "٤٥ طريق الحرية، العطارين، الإسكندرية",
    phone: "+20 3 4877 654",
    hoursEn: "Everyday: 10:00 AM - 10:00 PM",
    hoursAr: "يومياً: ١٠:٠٠ ص - ١٠:٠٠ م",
    mapUrl: "https://maps.google.com"
  },
  {
    id: "br3",
    nameEn: "El Haram Giza Branch",
    nameAr: "فرع الهرم - الجيزة",
    addressEn: "154 El-Haram St, Near Giza Square, Giza",
    addressAr: "١٥٤ شارع الهرم، بالقرب من ميدان الجيزة، الجيزة",
    phone: "+20 2 3584 9012",
    hoursEn: "Everyday: 10:00 AM - 11:00 PM",
    hoursAr: "يومياً: ١٠:٠٠ ص - ١١:٠٠ م",
    mapUrl: "https://maps.google.com"
  },
  {
    id: "br4",
    nameEn: "New Cairo Branch",
    nameAr: "فرع القاهرة الجديدة",
    addressEn: "Block 15, El-Taseen St, Fifth Settlement, New Cairo",
    addressAr: "مربع ١٥، شارع التسعين، التجمع الخامس، القاهرة الجديدة",
    phone: "+20 100 2345 678",
    hoursEn: "Everyday: 10:00 AM - Midnight",
    hoursAr: "يومياً: ١٠:٠٠ ص - ١٢:٠٠ منتصف الليل",
    mapUrl: "https://maps.google.com"
  }
];

export function Branches() {
  const { t, isRTL } = useAppSettings();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-terracotta text-sm transition-colors w-fit">
            <ArrowLeft size={16} className="rtl-flip" />
            {isRTL ? "العودة للرئيسية" : "Back to Home"}
          </Link>
          <div className="flex items-center gap-3">
            <MapPin size={24} className="text-brand-terracotta fill-brand-peach/50" />
            <h1 className="text-foreground font-display text-2xl sm:text-3xl">{t.branches}</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-xl">
            {isRTL 
              ? "تفخر شركة حاج عارفة بتقديم خدماتها من خلال فروعنا الرئيسية في مصر. تفضل بزيارتنا لتجربة منتجاتنا العشبية الطبيعية والتوابل الطازجة والزيوت العضوية." 
              : "HajArafa is proud to serve you from our flagship store branches across Egypt. Visit us to explore our fresh range of organic herbs, spices, and natural beauty remedies."}
          </p>
        </div>

        {/* Branches list grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
          {mockBranches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border hover:border-brand-sage rounded-2xl p-5 shadow-soft hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="border-b border-border/50 pb-3">
                  <h3 className="text-foreground font-display text-base sm:text-lg">
                    {isRTL ? branch.nameAr : branch.nameEn}
                  </h3>
                </div>

                <div className="space-y-2.5 text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-2.5">
                    <MapPin className="text-brand-terracotta flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-muted-foreground">
                      {isRTL ? branch.addressAr : branch.addressEn}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2.5">
                    <Phone className="text-brand-terracotta flex-shrink-0" size={16} />
                    <a href={`tel:${branch.phone}`} className="text-foreground font-medium hover:underline hover:text-brand-terracotta transition-colors">
                      {branch.phone}
                    </a>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-2.5">
                    <Clock className="text-brand-terracotta flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-muted-foreground">
                      {isRTL ? branch.hoursAr : branch.hoursEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Get directions button */}
              <div className="pt-5 mt-5 border-t border-border/40">
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-peach hover:bg-brand-terracotta text-brand-terracotta hover:text-white px-4 py-2.5 rounded-xl transition-all text-xs font-semibold uppercase tracking-wider"
                >
                  {isRTL ? "عرض الاتجاهات على الخريطة" : "Get Directions"} <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="h-20 sm:h-6" />
    </div>
  );
}
