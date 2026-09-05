import { useState, useEffect } from "react";
import { Download, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppSettings } from "../context/AppSettingsContext";
import logoImg from "../../assets/logo.webp";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PWAInstallBanner() {
  const { isRTL } = useAppSettings();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if user previously dismissed in this session
    if (sessionStorage.getItem("hajarafa_pwa_dismissed")) return;

    // Check if already in standalone PWA mode
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setShowBanner(false);
      }
    } catch {
      // Ignore prompt failure
    } finally {
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem("hajarafa_pwa_dismissed", "true");
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.aside
        role="region"
        aria-label={isRTL ? "تثبيت تطبيق حاج عرفة" : "Install Haj Arafa app"}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
        className="fixed bottom-20 sm:bottom-6 start-4 end-4 sm:start-auto sm:end-6 sm:max-w-md z-40 bg-card border border-border/80 shadow-elev rounded-2xl p-3.5 sm:p-4 select-none backdrop-blur-md bg-card/95"
      >
        <div className="flex items-start gap-3">
          <img
            src={logoImg}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-xl object-contain p-1 bg-amber-50 dark:bg-zinc-800 border border-border flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-foreground leading-tight">
                {isRTL ? "تثبيت تطبيق حاج عرفة" : "Install Haj Arafa App"}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-brand-forest dark:text-brand-sage-dark bg-brand-forest/10 px-1.5 py-0.5 rounded-full">
                <Sparkles size={9} />
                {isRTL ? "سريع وآمن" : "Fast & Offline"}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
              {isRTL
                ? "تصفح أسرع، استشارات عشبية بدون إنترنت، ووصول فوري لعروضك."
                : "Faster browsing, offline herbal guides, and instant access to orders."}
            </p>

            <div className="flex items-center gap-2 mt-2.5">
              <button
                type="button"
                onClick={handleInstall}
                className="flex-1 min-h-[38px] px-3.5 py-1.5 rounded-xl bg-brand-terracotta hover:bg-[#b04b25] active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                aria-label={isRTL ? "تثبيت التطبيق الآن على جهازك" : "Install app on your device"}
              >
                <Download size={13} />
                <span>{isRTL ? "تثبيت التطبيق" : "Install Now"}</span>
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="min-h-[38px] px-3 py-1.5 rounded-xl bg-muted hover:bg-border active:scale-95 text-muted-foreground hover:text-foreground text-xs font-semibold transition-all cursor-pointer"
                aria-label={isRTL ? "إغلاق إشعار التثبيت" : "Dismiss install prompt"}
              >
                {isRTL ? "لاحقاً" : "Later"}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
            aria-label={isRTL ? "إغلاق" : "Close"}
          >
            <X size={14} />
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
