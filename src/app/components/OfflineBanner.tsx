import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useAppSettings } from "../context/AppSettingsContext";

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(() => typeof navigator !== "undefined" ? !navigator.onLine : false);
  const { t } = useAppSettings();

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast.success(t.backOnline);
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [t.backOnline]);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 inset-x-0 z-50 bg-brand-forest text-white dark:bg-zinc-900 dark:text-zinc-100 border-b border-white/10 shadow-elev py-2 px-4 text-center select-none"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-xs font-medium">
            <WifiOff size={15} className="text-brand-terracotta flex-shrink-0" />
            <span className="font-bold">{t.offlineMode}:</span>
            <span>{t.offlineMessage}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
