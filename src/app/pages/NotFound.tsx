import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useAppSettings } from "../context/AppSettingsContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function NotFound() {
  const { t, isRTL } = useAppSettings();

  usePageMeta({
    title: isRTL ? "الصفحة غير موجودة | حاج عرفة" : "404 - Page Not Found | Haj Arafa",
    description: isRTL
      ? "عذراً، لم نتمكن من العثور على الصفحة المطلوبة في متجر حاج عرفة."
      : "Sorry, the page you are looking for could not be found at Haj Arafa.",
  });

  return (
    <div className="min-h-[70vh] bg-background flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <p className="text-6xl mb-4" role="img" aria-label={isRTL ? "نبتة" : "Plant"}>🌿</p>
        <h1 className="text-foreground text-5xl font-display font-bold mb-3">404</h1>
        <h2 className="text-foreground text-xl font-display font-semibold mb-2">
          {isRTL ? "الصفحة غير موجودة" : "Page Not Found"}
        </h2>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          {isRTL
            ? "عذراً، يبدو أن الصفحة التي تبحث عنها غير متوفرة أو تم نقلها."
            : "Oops! The page you're looking for seems to have wandered off into the wilderness."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-brand-terracotta text-white px-6 py-3 rounded-xl hover:bg-brand-terracotta-dark transition-colors font-medium text-sm shadow-sm min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta focus-visible:ring-offset-2"
        >
          <ArrowLeft size={16} className="rtl-flip" />
          <span>{t.backToHome}</span>
        </Link>
      </div>
    </div>
  );
}
