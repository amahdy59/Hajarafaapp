import { useState, useEffect, useRef } from "react";
import { X, Sun, Moon, Languages, User, Package, Heart, CircleHelp, Info, MapPin, Phone, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAppSettings } from "../context/AppSettingsContext";
import { IconButton } from "./ui/IconButton";
import logoImg from "../../assets/logo.webp";
import { useDialogAccessibility } from "../hooks/useDialogAccessibility";

interface DrawerProfile {
  firstName: string;
  lastName: string;
  email: string;
}

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
            aria-pressed={active}
            className={`min-h-11 px-3.5 py-1 rounded-full transition-all ${active ? "bg-brand-terracotta text-white" : "text-muted-foreground hover:text-foreground"}`}
            style={{ fontSize: "12px", letterSpacing: "0.8px" }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Row({ icon: Icon, label, to, onClick }: { icon: typeof User; label: React.ReactNode; to?: string; onClick?: () => void }) {
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
  const dialogRef = useRef<HTMLElement>(null);

  // Load profile dynamically when drawer is opened
  const [profile, setProfile] = useState<DrawerProfile | null>(null);
  useEffect(() => {
    if (open) {
      const saved = localStorage.getItem("hajarafa.profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && parsed.firstName) {
            if (parsed.email === "alex@example.com" || parsed.firstName === "Alex" || parsed.firstName === "alex") {
              const defaultUser = {
                firstName: locale === "ar" ? "أحمد" : "Ahmed",
                lastName: locale === "ar" ? "مهدي" : "Mahdy",
                email: "ahmed.mahdy@example.com",
                phone: "+20 100 123 4567"
              };
              localStorage.setItem("hajarafa.profile", JSON.stringify(defaultUser));
              setProfile(defaultUser);
            } else {
              setProfile(parsed);
            }
          } else {
            setProfile(null);
          }
        } catch (e) {
          console.error("Failed to parse profile JSON in SettingsDrawer:", e);
          setProfile(null);
        }
      } else {
        // If saved profile is null, check if explicitly logged out
        if (localStorage.getItem("hajarafa.logged_out") === "true") {
          setProfile(null);
        } else {
          const defaultUser = {
            firstName: locale === "ar" ? "أحمد" : "Ahmed",
            lastName: locale === "ar" ? "مهدي" : "Mahdy",
            email: "ahmed.mahdy@example.com",
            phone: "+20 100 123 4567"
          };
          localStorage.setItem("hajarafa.profile", JSON.stringify(defaultUser));
          setProfile(defaultUser);
        }
      }
    }
  }, [open, locale]);

  useDialogAccessibility({
    containerRef: dialogRef,
    onClose,
    open,
  });

  const account = [
            { icon: User, label: t.yourAccount, to: "/account?tab=profile" },
    { icon: Package, label: t.yourOrders, to: "/account?tab=orders" },
    { icon: Heart, label: t.yourWishlist, to: "/account?tab=wishlist" },
  ];
  const help = [
    { icon: CircleHelp, label: t.customerService, to: "/help" },
    { icon: Info, label: locale === "ar" ? "عن حاج عرفة" : "About Haj Arafa", to: "/about" },
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={locale === "ar" ? "قائمة التنقل" : "Navigation Menu"}
            tabIndex={-1}
            initial={{ x: isRTL ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className={`fixed top-0 bottom-0 ${isRTL ? "right-0" : "left-0"} w-full lg:max-w-sm bg-card text-card-foreground z-50 overflow-y-auto shadow-elev`}
          >
            <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between safe-area-pt">
              <Link to="/" onClick={onClose} className="flex items-center gap-2 select-none cursor-pointer">
                <img src={logoImg} alt="Haj Arafa Logo" className="h-8 w-auto object-contain select-none pointer-events-none" />
              </Link>
              <IconButton onClick={onClose} aria-label={locale === "ar" ? "إغلاق" : "Close"}>
                <X size={18} />
              </IconButton>
            </div>

            <div className="p-4 flex flex-col gap-6">
              {profile ? (
                <Link
                  to="/account"
                  onClick={onClose}
                  className="bg-brand-terracotta text-white rounded-2xl p-4 flex items-center justify-between hover:bg-brand-terracotta-dark transition-colors shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-lg backdrop-blur-sm">
                      👤
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="flex items-center gap-1" style={{ fontSize: "0.75rem", opacity: 0.85 }}>
                        <span>{locale === "ar" ? "مرحباً بك في حاج عرفة" : "Welcome to Haj Arafa"}</span>
                      </span>
                      <span className="font-semibold" style={{ fontSize: "1rem" }}>{profile.firstName} {profile.lastName}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="rtl-flip" />
                </Link>
              ) : (
                <Link
                  to="/account"
                  onClick={onClose}
                  className="bg-brand-peach border border-brand-terracotta/20 text-brand-terracotta rounded-2xl p-4 flex items-center justify-between hover:bg-brand-peach/85 transition-colors shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-terracotta text-white flex items-center justify-center text-lg font-bold">
                      🔑
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span style={{ fontSize: "0.75rem" }}>{isRTL ? "مرحباً بك في حاج عرفة" : "Welcome to Haj Arafa"}</span>
                      <span className="font-bold text-sm">{isRTL ? "تسجيل الدخول / التسجيل" : "Sign In / Register"}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="rtl-flip text-brand-terracotta" />
                </Link>
              )}

              <div className="flex flex-col gap-2 lg:hidden">
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

              <p className="text-brand-ink-soft flex items-center justify-center gap-1.5 pt-2 select-none" style={{ fontSize: "0.75rem" }}>
                <span>© {new Date().getFullYear()} {locale === "ar" ? "حاج عرفة" : "Haj Arafa"} · {t.appTagline}</span>
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
