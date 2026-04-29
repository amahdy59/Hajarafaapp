import { X, Sun, Moon, Languages, User, Package, Heart, HelpCircle, Info, MapPin, Phone, LogIn } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAppSettings } from "../context/AppSettingsContext";

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const { theme, toggleTheme, locale, setLocale, t, isRTL } = useAppSettings();

  const accountLinks = [
    { icon: User, label: t.yourAccount, to: "/account" },
    { icon: Package, label: t.yourOrders, to: "/account/orders" },
    { icon: Heart, label: t.yourWishlist, to: "/wishlist" },
  ];

  const helpLinks = [
    { icon: HelpCircle, label: t.customerService, to: "/help" },
    { icon: Info, label: t.aboutUs, to: "/about" },
    { icon: MapPin, label: t.branches, to: "/branches" },
    { icon: Phone, label: t.contactUs, to: "/contact" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className={`fixed top-0 ${isRTL ? "left-0" : "right-0"} bottom-0 w-[88%] max-w-sm bg-card text-card-foreground z-50 overflow-y-auto shadow-2xl`}
          >
            <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border px-5 py-4 flex items-center justify-between">
              <div>
                <div className="font-display text-primary" style={{ fontSize: "1.25rem" }}>{t.appName}</div>
                <div className="text-muted-foreground" style={{ fontSize: "0.75rem" }}>{t.helpSettings}</div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-6">
              <Link
                to="/account"
                onClick={onClose}
                className="flex items-center gap-3 w-full bg-primary text-primary-foreground rounded-2xl px-4 py-3"
              >
                <LogIn size={20} />
                <span>{t.signIn}</span>
              </Link>

              <section>
                <div className="text-muted-foreground uppercase tracking-wider mb-2 px-1" style={{ fontSize: "0.7rem" }}>
                  {t.settings}
                </div>
                <div className="bg-muted/40 rounded-2xl divide-y divide-border overflow-hidden">
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
                      <span>{t.theme}</span>
                    </div>
                    <div className="flex items-center bg-card rounded-full p-0.5 border border-border">
                      <span className={`px-3 py-1 rounded-full transition-colors ${theme === "light" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`} style={{ fontSize: "0.75rem" }}>
                        {t.light}
                      </span>
                      <span className={`px-3 py-1 rounded-full transition-colors ${theme === "dark" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`} style={{ fontSize: "0.75rem" }}>
                        {t.dark}
                      </span>
                    </div>
                  </button>

                  <div className="w-full flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Languages size={18} />
                      <span>{t.language}</span>
                    </div>
                    <div className="flex items-center bg-card rounded-full p-0.5 border border-border">
                      <button
                        onClick={() => setLocale("en")}
                        className={`px-3 py-1 rounded-full transition-colors ${locale === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                        style={{ fontSize: "0.75rem" }}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setLocale("ar")}
                        className={`px-3 py-1 rounded-full transition-colors ${locale === "ar" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                        style={{ fontSize: "0.75rem" }}
                      >
                        ع
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="text-muted-foreground uppercase tracking-wider mb-2 px-1" style={{ fontSize: "0.7rem" }}>
                  {t.account}
                </div>
                <div className="bg-muted/40 rounded-2xl divide-y divide-border overflow-hidden">
                  {accountLinks.map(link => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                      >
                        <Icon size={18} className="text-muted-foreground" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </section>

              <section>
                <div className="text-muted-foreground uppercase tracking-wider mb-2 px-1" style={{ fontSize: "0.7rem" }}>
                  {t.helpSettings}
                </div>
                <div className="bg-muted/40 rounded-2xl divide-y divide-border overflow-hidden">
                  {helpLinks.map(link => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                      >
                        <Icon size={18} className="text-muted-foreground" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
