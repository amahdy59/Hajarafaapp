import { X, Sun, Moon, Languages, User, Package, Heart, HelpCircle, Info, MapPin, Phone, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAppSettings } from "../context/AppSettingsContext";
import { IconButton } from "./ui/IconButton";

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

function Segmented<T extends string>({
  value, onChange, options,
}: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div className="inline-flex items-center bg-background border border-border rounded-full p-0.5">
      {options.map(opt => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1 rounded-full transition-all ${active ? "bg-brand-terracotta text-white" : "text-muted-foreground hover:text-foreground"}`}
            style={{ fontSize: "12px", letterSpacing: "0.8px" }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Row({ icon: Icon, label, to, onClick }: { icon: typeof User; label: string; to?: string; onClick?: () => void }) {
  const inner = (
    <>
      <span className="flex items-center gap-3">
        <Icon size={18} className="text-brand-ink-soft" strokeWidth={1.6} />
        <span style={{ fontSize: "0.95rem" }}>{label}</span>
      </span>
      <ChevronRight size={16} className="text-brand-ink-soft rtl-flip" />
    </>
  );
  const cls = "w-full flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors text-foreground";
  if (to) return <Link to={to} className={cls} onClick={onClick}>{inner}</Link>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
}

export function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const { theme, setTheme, locale, setLocale, t, isRTL } = useAppSettings();

  const account = [
    { icon: User, label: t.yourAccount, to: "/account" },
    { icon: Package, label: t.yourOrders, to: "/account?tab=orders" },
    { icon: Heart, label: t.yourWishlist, to: "/wishlist" },
  ];
  const help = [
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
            className="fixed inset-0 bg-brand-ink/45 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: isRTL ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className={`fixed top-0 bottom-0 ${isRTL ? "right-0" : "left-0"} w-[88%] max-w-sm bg-card text-card-foreground z-50 overflow-y-auto shadow-elev`}
          >
            <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between safe-area-pt">
              <Link to="/" onClick={onClose} className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-brand-terracotta flex items-center justify-center">
                  <span className="font-display text-white" style={{ fontSize: "1.05rem" }}>H</span>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-foreground" style={{ fontSize: "1.05rem" }}>{t.appName}</span>
                  <span className="eyebrow" style={{ fontSize: "10px" }}>{t.appTagline}</span>
                </div>
              </Link>
              <IconButton onClick={onClose} aria-label="Close">
                <X size={18} />
              </IconButton>
            </div>

            <div className="p-4 flex flex-col gap-6">
              <Link
                to="/account"
                onClick={onClose}
                className="bg-brand-terracotta text-white rounded-md p-4 flex items-center justify-between hover:bg-brand-terracotta-dark transition-colors"
              >
                <div className="flex flex-col">
                  <span style={{ fontSize: "0.78rem", opacity: 0.85, letterSpacing: "1px" }}>{t.welcomeTo} {t.appName}</span>
                  <span style={{ fontSize: "1.05rem", letterSpacing: "0.4px" }}>{t.signIn}</span>
                </div>
                <ChevronRight size={18} className="rtl-flip" />
              </Link>

              <div className="flex flex-col gap-2">
                <span className="eyebrow px-1">{t.settings}</span>
                <div className="bg-muted/50 rounded-md overflow-hidden border border-border">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <span className="flex items-center gap-3 text-foreground">
                      {theme === "light" ? <Sun size={18} className="text-brand-ink-soft" /> : <Moon size={18} className="text-brand-ink-soft" />}
                      <span style={{ fontSize: "0.95rem" }}>{t.theme}</span>
                    </span>
                    <Segmented<"light" | "dark">
                      value={theme}
                      onChange={setTheme}
                      options={[{ value: "light", label: t.light }, { value: "dark", label: t.dark }]}
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="flex items-center gap-3 text-foreground">
                      <Languages size={18} className="text-brand-ink-soft" />
                      <span style={{ fontSize: "0.95rem" }}>{t.language}</span>
                    </span>
                    <Segmented<"en" | "ar">
                      value={locale}
                      onChange={setLocale}
                      options={[{ value: "en", label: "EN" }, { value: "ar", label: "ع" }]}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="eyebrow px-1">{t.account}</span>
                <div className="bg-muted/50 rounded-md overflow-hidden border border-border divide-y divide-border">
                  {account.map(r => <Row key={r.to} {...r} onClick={onClose} />)}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="eyebrow px-1">{t.helpSettings}</span>
                <div className="bg-muted/50 rounded-md overflow-hidden border border-border divide-y divide-border">
                  {help.map(r => <Row key={r.to} {...r} onClick={onClose} />)}
                </div>
              </div>

              <p className="text-brand-ink-soft text-center pt-2" style={{ fontSize: "0.75rem" }}>
                © {new Date().getFullYear()} {t.appName} · {t.appTagline}
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
