import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { Button } from "../../components/ui/Button";
import { useAppSettings } from "../../context/AppSettingsContext";
import type { UserProfile } from "./types";
import logoImg from "../../../assets/logo.webp";

interface AccountAuthProps {
  onAuthenticated: (user: UserProfile) => void;
}

export function AccountAuth({ onAuthenticated }: AccountAuthProps) {
  const { t, isRTL } = useAppSettings();
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      toast.error(isRTL ? "يرجى ملء جميع الحقول المطلوبة." : "Please fill in all required fields.");
      return;
    }
    const user: UserProfile = {
      firstName: authEmail.split("@")[0] || "Customer",
      lastName: "Customer",
      email: authEmail,
      phone: "+20 100 123 4567",
    };
    onAuthenticated(user);
    toast.success(isRTL ? "مرحباً بك مجدداً!" : "Welcome back!");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authName || !authEmail || !authPassword) {
      toast.error(isRTL ? "يرجى ملء جميع الحقول المطلوبة." : "Please fill in all required fields.");
      return;
    }
    const names = authName.trim().split(" ");
    const fName = names[0] || "User";
    const lName = names.slice(1).join(" ") || "Customer";
    const user: UserProfile = {
      firstName: fName,
      lastName: lName,
      email: authEmail,
      phone: authPhone || "+20 100 000 0000",
    };
    onAuthenticated(user);
    toast.success(isRTL ? "تم إنشاء الحساب بنجاح!" : "Account created successfully!");
  };

  const handleSocialLogin = (platform: string) => {
    const user: UserProfile = {
      firstName: "Guest",
      lastName: platform,
      email: `${platform.toLowerCase()}user@example.com`,
      phone: "+20 100 888 9999",
    };
    onAuthenticated(user);
    toast.success(
      isRTL 
        ? `تم تسجيل الدخول بنجاح عبر ${platform}` 
        : `Successfully signed in via ${platform}`
    );
  };

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-background flex items-center justify-center py-10 px-4 sm:px-6 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-md bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-elev relative z-10"
      >
        {/* Logo Brand Header */}
        <div className="flex justify-center mb-6 select-none cursor-pointer">
          <Link to="/">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src={logoImg} 
              alt="Haj Arafa" 
              className="h-16 sm:h-18 w-auto object-contain drop-shadow-sm" 
            />
          </Link>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-brand-forest dark:text-brand-sage-dark text-xl sm:text-2xl font-display font-bold">
            {isRTL ? "مرحباً بك في حاج عرفة" : "Welcome to Haj Arafa"}
          </h2>
          <p className="text-brand-ink-soft dark:text-zinc-300 text-xs mt-1">
            {isRTL ? "أنشئ حساباً أو سجل دخولك لإتمام عملية الشراء" : "Sign in or register to manage your natural boutique account"}
          </p>
        </div>

        {/* Form Tabs */}
        <div className="flex bg-brand-cream-2 dark:bg-zinc-800/80 rounded-xl p-1 gap-1 mb-6 border border-border relative select-none">
          <button
            onClick={() => {
              setAuthTab("signin");
              setShowPassword(false);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase transition-all duration-300 relative z-10 cursor-pointer ${
              authTab === "signin" 
                ? "bg-brand-terracotta text-white shadow-soft" 
                : "text-brand-ink-soft dark:text-zinc-300 hover:text-brand-forest dark:hover:text-white"
            }`}
          >
            {isRTL ? "تسجيل الدخول" : "Sign In"}
          </button>
          <button
            onClick={() => {
              setAuthTab("signup");
              setShowPassword(false);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase transition-all duration-300 relative z-10 cursor-pointer ${
              authTab === "signup" 
                ? "bg-brand-terracotta text-white shadow-soft" 
                : "text-brand-ink-soft dark:text-zinc-300 hover:text-brand-forest dark:hover:text-white"
            }`}
          >
            {isRTL ? "حساب جديد" : "Sign Up"}
          </button>
        </div>

        {/* Forms */}
        <AnimatePresence mode="wait">
          {authTab === "signin" ? (
            <motion.form 
              key="signin"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSignIn}
              className="space-y-4"
            >
              {/* Floating Email Field */}
              <div className="relative group">
                <div className="absolute start-4 top-1/2 -translate-y-1/2 text-brand-ink-soft/75 dark:text-zinc-300 group-focus-within:text-brand-terracotta transition-colors z-10">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                  className="w-full ps-11 pe-4 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 transition-all font-medium"
                />
                <label
                  className={`absolute start-11 transition-all pointer-events-none ${
                    focusedField === "email" || authEmail !== ""
                      ? "top-1.5 text-[9px] font-bold text-brand-terracotta uppercase" 
                      : "top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
                  }`}
                >
                  {t.email}
                </label>
              </div>

              {/* Floating Password Field */}
              <div className="relative group">
                <div className="absolute start-4 top-1/2 -translate-y-1/2 text-brand-ink-soft/75 dark:text-zinc-300 group-focus-within:text-brand-terracotta transition-colors z-10">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  value={authPassword}
                  onChange={e => setAuthPassword(e.target.value)}
                  className="w-full ps-11 pe-12 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 transition-all font-medium"
                />
                <label
                  className={`absolute start-11 transition-all pointer-events-none ${
                    focusedField === "password" || authPassword !== ""
                      ? "top-1.5 text-[9px] font-bold text-brand-terracotta uppercase" 
                      : "top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
                  }`}
                >
                  {isRTL ? "كلمة المرور" : "Password"}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-4 top-1/2 -translate-y-1/2 text-brand-ink-soft/60 dark:text-zinc-300 hover:text-brand-terracotta transition-colors z-10 p-1"
                  aria-label={showPassword ? (isRTL ? "إخفاء كلمة المرور" : "Hide password") : (isRTL ? "إظهار كلمة المرور" : "Show password")}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="text-end select-none">
                <a 
                  href="#forgot" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    toast.info(isRTL ? "سيتم إرسال كود استعادة كلمة المرور قريباً." : "Reset email will be dispatched shortly."); 
                  }} 
                  className="text-[11px] text-brand-terracotta hover:underline font-semibold"
                >
                  {isRTL ? "نسيت كلمة المرور؟" : "Forgot Password?"}
                </a>
              </div>

              <Button
                type="submit"
                size="lg"
                fullWidth
                className="w-full uppercase font-bold text-xs"
              >
                {isRTL ? "تسجيل الدخول" : "Sign In"}
              </Button>
            </motion.form>
          ) : (
            <motion.form 
              key="signup"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSignUp}
              className="space-y-4"
            >
              {/* Full Name */}
              <div className="relative group">
                <div className="absolute start-4 top-1/2 -translate-y-1/2 text-brand-ink-soft/75 dark:text-zinc-300 group-focus-within:text-brand-terracotta transition-colors z-10">
                  <Mail size={16} />
                </div>
                <input
                  type="text"
                  required
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  value={authName}
                  onChange={e => setAuthName(e.target.value)}
                  className="w-full ps-11 pe-4 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 transition-all font-medium"
                />
                <label
                  className={`absolute start-11 transition-all pointer-events-none ${
                    focusedField === "name" || authName !== ""
                      ? "top-1.5 text-[9px] font-bold text-brand-terracotta uppercase" 
                      : "top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
                  }`}
                >
                  {isRTL ? "الاسم بالكامل" : "Full Name"}
                </label>
              </div>

              {/* Floating Email */}
              <div className="relative group">
                <div className="absolute start-4 top-1/2 -translate-y-1/2 text-brand-ink-soft/75 dark:text-zinc-300 group-focus-within:text-brand-terracotta transition-colors z-10">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                  className="w-full ps-11 pe-4 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 transition-all font-medium"
                />
                <label
                  className={`absolute start-11 transition-all pointer-events-none ${
                    focusedField === "email" || authEmail !== ""
                      ? "top-1.5 text-[9px] font-bold text-brand-terracotta uppercase" 
                      : "top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
                  }`}
                >
                  {t.email}
                </label>
              </div>

              {/* Floating Phone (Optional) */}
              <div className="relative group">
                <div className="absolute start-4 top-1/2 -translate-y-1/2 text-brand-ink-soft/75 dark:text-zinc-300 group-focus-within:text-brand-terracotta transition-colors z-10">
                  <Phone size={16} />
                </div>
                <input
                  type="tel"
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  value={authPhone}
                  onChange={e => setAuthPhone(e.target.value)}
                  className="w-full ps-11 pe-4 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 transition-all font-medium"
                />
                <label
                  className={`absolute start-11 transition-all pointer-events-none ${
                    focusedField === "phone" || authPhone !== ""
                      ? "top-1.5 text-[9px] font-bold text-brand-terracotta uppercase" 
                      : "top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
                  }`}
                >
                  {t.phone} ({isRTL ? "اختياري" : "Optional"})
                </label>
              </div>

              {/* Floating Password */}
              <div className="relative group">
                <div className="absolute start-4 top-1/2 -translate-y-1/2 text-brand-ink-soft/75 dark:text-zinc-300 group-focus-within:text-brand-terracotta transition-colors z-10">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  value={authPassword}
                  onChange={e => setAuthPassword(e.target.value)}
                  className="w-full ps-11 pe-12 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 transition-all font-medium"
                />
                <label
                  className={`absolute start-11 transition-all pointer-events-none ${
                    focusedField === "password" || authPassword !== ""
                      ? "top-1.5 text-[9px] font-bold text-brand-terracotta uppercase" 
                      : "top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
                  }`}
                >
                  {isRTL ? "كلمة المرور" : "Password"}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-4 top-1/2 -translate-y-1/2 text-brand-ink-soft/60 dark:text-zinc-300 hover:text-brand-terracotta transition-colors z-10 p-1"
                  aria-label={showPassword ? (isRTL ? "إخفاء كلمة المرور" : "Hide password") : (isRTL ? "إظهار كلمة المرور" : "Show password")}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <Button
                type="submit"
                size="lg"
                fullWidth
                className="w-full uppercase font-bold text-xs"
              >
                {isRTL ? "إنشاء حساب" : "Create Account"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Social Logins Divider */}
        <div className="relative my-6 flex items-center justify-center select-none">
          <div className="border-t border-border/70 w-full absolute" />
          <span className="relative z-10 bg-card px-3 text-[10px] uppercase font-bold text-brand-ink-soft dark:text-zinc-300 tracking-wider">
            {isRTL ? "أو الاستمرار بواسطة" : "Or continue with"}
          </span>
        </div>

        {/* Social Sign-In buttons */}
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSocialLogin("Google")}
            className="py-3 px-4 border border-border bg-brand-cream-2 dark:bg-zinc-800/80 hover:bg-brand-peach dark:hover:bg-zinc-700 text-brand-forest dark:text-zinc-200 rounded-xl flex items-center justify-center shadow-sm transition-all cursor-pointer"
            title="Google"
            aria-label="Google"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" className="flex-shrink-0">
              <path fill="currentColor" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.37 3.68 1.48 7.58l3.99 3.1A6.99 6.99 0 0 1 12 5.04z" />
              <path fill="currentColor" d="M23.45 12.3c0-.82-.07-1.6-.21-2.3H12v4.35h6.43a5.5 5.5 0 0 1-2.39 3.6l3.7 2.87c2.16-2 3.71-4.94 3.71-8.52z" />
              <path fill="currentColor" d="M5.47 10.68A6.9 6.9 0 0 1 5 12c0 .46.05.9.14 1.32l-3.99 3.1A11.96 11.96 0 0 1 1 12c0-1.63.32-3.18.9-4.62l3.57 3.3z" />
              <path fill="currentColor" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.7-2.87c-1.03.69-2.34 1.1-4.26 1.1-3.28 0-6.07-2.2-7.07-5.18l-3.99 3.1C3.37 20.32 7.35 23 12 23z" />
            </svg>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSocialLogin("Facebook")}
            className="py-3 px-4 border border-border bg-brand-cream-2 dark:bg-zinc-800/80 hover:bg-brand-peach dark:hover:bg-zinc-700 text-brand-forest dark:text-zinc-200 rounded-xl flex items-center justify-center shadow-sm transition-all cursor-pointer"
            title="Facebook"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="flex-shrink-0">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSocialLogin("Apple")}
            className="py-3 px-4 border border-border bg-brand-cream-2 dark:bg-zinc-800/80 hover:bg-brand-peach dark:hover:bg-zinc-700 text-brand-forest dark:text-zinc-200 rounded-xl flex items-center justify-center shadow-sm transition-all cursor-pointer"
            title="Apple"
            aria-label="Apple"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="flex-shrink-0">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C3.8 16.32 3.66 9.88 7.54 9.6c1.17.07 2.03.7 2.76.7.74 0 1.95-.8 3.5-.66 1.63.14 2.87.8 3.6 1.86-3.22 1.9-2.7 6.13.25 7.32-.6 1.54-1.34 3.12-2.6 1.46zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
