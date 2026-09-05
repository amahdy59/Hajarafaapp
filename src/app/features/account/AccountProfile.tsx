import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  User,
  Trash2,
  Lock,
  Star,
  Bell,
  CreditCard,
  MapPin,
  Shield,
  CircleHelp,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useAppSettings } from "../../context/AppSettingsContext";
import { Button } from "../../components/ui/Button";
import type { UserProfile, NotificationPreferences } from "./types";

interface AccountProfileProps {
  profile: UserProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  avatarUrl: string | null;
  handleRemoveAvatar: () => void;
  saveProfile: () => void;
  notifications: NotificationPreferences;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationPreferences>>;
  onOpenPayments: () => void;
  onOpenAddresses: () => void;
  onSignOut: () => void;
}

export const AccountProfile: React.FC<AccountProfileProps> = ({
  profile,
  setProfile,
  avatarUrl,
  handleRemoveAvatar,
  saveProfile,
  notifications,
  setNotifications,
  onOpenPayments,
  onOpenAddresses,
  onSignOut,
}) => {
  const { t, isRTL } = useAppSettings();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = () => {
    if (!currentPassword) {
      toast.error(isRTL ? "يرجى إدخال كلمة المرور الحالية" : "Please enter your current password");
      return;
    }
    if (newPassword.length < 8) {
      toast.error(isRTL ? "يجب أن تكون كلمة المرور ٨ أحرف على الأقل" : "Password must be at least 8 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(isRTL ? "كلمتا المرور غير متطابقتين" : "Passwords do not match");
      return;
    }

    toast.success(isRTL ? "تم تحديث كلمة المرور بنجاح!" : "Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left/Main column: Forms (Profile, Password) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Profile Information Form */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-soft">
          <h3 className="text-brand-forest font-display text-lg sm:text-xl font-bold flex items-center gap-2 mb-4">
            <User size={20} className="text-brand-terracotta" />
            {t.profileInformation}
          </h3>

          {avatarUrl && (
            <div className="mb-4 pb-4 border-b border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {isRTL ? "الصورة الشخصية مضافة" : "Profile picture added"}
              </span>
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="text-xs text-destructive hover:underline flex items-center gap-1 font-semibold cursor-pointer min-h-[44px] px-2"
                aria-label={isRTL ? "إزالة الصورة الشخصية" : "Remove Profile Photo"}
              >
                <Trash2 size={13} aria-hidden="true" /> {isRTL ? "إزالة الصورة" : "Remove Photo"}
              </button>
            </div>
          )}

          <div className="space-y-2.5 sm:space-y-4 mb-5">
            <div>
              <label htmlFor="account-first-name" className="block text-xs text-muted-foreground mb-1 sm:mb-1.5">
                {t.firstName}
              </label>
              <input
                id="account-first-name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={profile?.firstName || ""}
                onChange={(e) => setProfile((p) => (p ? { ...p, firstName: e.target.value } : null))}
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors min-h-[44px]"
              />
            </div>
            <div>
              <label htmlFor="account-last-name" className="block text-xs text-muted-foreground mb-1 sm:mb-1.5">
                {t.lastName}
              </label>
              <input
                id="account-last-name"
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={profile?.lastName || ""}
                onChange={(e) => setProfile((p) => (p ? { ...p, lastName: e.target.value } : null))}
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors min-h-[44px]"
              />
            </div>
            <div>
              <label htmlFor="account-email" className="block text-xs text-muted-foreground mb-1 sm:mb-1.5">
                {t.email}
              </label>
              <input
                id="account-email"
                name="email"
                type="email"
                autoComplete="email"
                value={profile?.email || ""}
                onChange={(e) => setProfile((p) => (p ? { ...p, email: e.target.value } : null))}
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors min-h-[44px]"
              />
            </div>
            <div>
              <label htmlFor="account-phone" className="block text-xs text-muted-foreground mb-1 sm:mb-1.5">
                {t.phone}
              </label>
              <input
                id="account-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={profile?.phone || ""}
                onChange={(e) => setProfile((p) => (p ? { ...p, phone: e.target.value } : null))}
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors min-h-[44px]"
              />
            </div>
          </div>
          <Button
            type="button"
            onClick={saveProfile}
            size="lg"
            fullWidth
            className="w-full md:w-auto font-medium text-sm min-h-[44px]"
          >
            {t.saveChanges}
          </Button>
        </div>

        {/* Secure Password Change Section */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-soft">
          <h3 className="text-brand-forest font-display text-lg sm:text-xl font-bold flex items-center gap-2 mb-4">
            <Lock size={20} className="text-brand-terracotta" />
            {isRTL ? "تغيير كلمة المرور" : "Change Password"}
          </h3>
          <div className="space-y-4 mb-5">
            <div>
              <label htmlFor="account-current-password" className="block text-xs text-muted-foreground mb-1.5">
                {isRTL ? "كلمة المرور الحالية" : "Current Password"}
              </label>
              <input
                id="account-current-password"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors min-h-[44px]"
              />
            </div>
            <div>
              <label htmlFor="account-new-password" className="block text-xs text-muted-foreground mb-1.5">
                {isRTL ? "كلمة المرور الجديدة" : "New Password"}
              </label>
              <input
                id="account-new-password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors min-h-[44px]"
              />
            </div>
            <div>
              <label htmlFor="account-confirm-password" className="block text-xs text-muted-foreground mb-1.5">
                {isRTL ? "تأكيد كلمة المرور الجديدة" : "Confirm New Password"}
              </label>
              <input
                id="account-confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors min-h-[44px]"
              />
            </div>
            <div className="text-start">
              <button
                type="button"
                onClick={() => {
                  toast.success(
                    isRTL
                      ? `تم إرسال رمز التحقق بنجاح إلى البريد الإلكتروني ${profile?.email || ""}`
                      : `A verification reset code has been sent to ${profile?.email || ""}`
                  );
                }}
                className="text-xs text-brand-terracotta hover:underline font-semibold cursor-pointer min-h-[44px] inline-flex items-center"
              >
                {isRTL ? "هل نسيت كلمة المرور الحالية؟ أرسل رمز التحقق" : "Forgot current password? Send verification code"}
              </button>
            </div>
          </div>
          <Button
            type="button"
            onClick={handleUpdatePassword}
            size="lg"
            fullWidth
            className="w-full md:w-auto font-medium text-sm min-h-[44px]"
          >
            {isRTL ? "حفظ كلمة المرور" : "Update Password"}
          </Button>
        </div>
      </div>

      {/* Right/Side column: Loyalty, settings, saved actions */}
      <div className="space-y-6">
        {/* Loyalty points card */}
        <div className="bg-brand-cream-2 rounded-xl p-5 border border-brand-sage/25 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star size={18} className="text-brand-sage fill-brand-sage" aria-hidden="true" />
              <h3 className="text-brand-forest font-display text-sm sm:text-base font-bold">{t.loyaltyPoints}</h3>
            </div>
            <span className="text-xl text-brand-forest font-bold">240 {t.pts}</span>
          </div>
          <div
            className="bg-background/60 rounded-full h-2 mb-2 overflow-hidden"
            role="progressbar"
            aria-valuenow={48}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t.loyaltyPoints}
          >
            <div className="bg-brand-sage h-2 rounded-full" style={{ width: "48%" }} />
          </div>
          <p className="text-xs text-brand-ink-soft">260 {t.morePointsUntilGold}</p>
        </div>

        {/* App settings pane */}
        <div className="bg-card rounded-xl p-5 border border-border shadow-soft">
          <h3 className="text-brand-forest font-display text-lg sm:text-xl font-bold flex items-center gap-2 mb-4">
            <Bell size={20} className="text-brand-terracotta" aria-hidden="true" />
            {isRTL ? "تفضيلات الإشعارات" : "Notification preferences"}
          </h3>
          <div className="space-y-3">
            {(["newsletter", "orders", "promotions"] as const).map((key) => {
              const label =
                key === "newsletter"
                  ? isRTL
                    ? "النشرة البريدية"
                    : "Newsletter"
                  : key === "orders"
                  ? t.orderUpdates
                  : t.promotionsDeals;
              const val = notifications[key];

              return (
                <div key={key} className="flex items-center justify-between text-sm py-1">
                  <span className="text-foreground/80">{label}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={val}
                    aria-label={label}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta ${
                      val ? "bg-brand-terracotta" : "bg-brand-line"
                    }`}
                    onClick={() => setNotifications((n) => ({ ...n, [key]: !val }))}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        val ? (isRTL ? "-translate-x-6" : "translate-x-6") : isRTL ? "-translate-x-1" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Saved triggers & Actions */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-soft">
          {[
            {
              icon: CreditCard,
              label: t.paymentMethods,
              color: "text-brand-ink-soft hover:text-brand-terracotta",
              onClick: onOpenPayments,
            },
            {
              icon: MapPin,
              label: t.savedAddresses,
              color: "text-brand-ink-soft hover:text-brand-terracotta",
              onClick: onOpenAddresses,
            },
            {
              icon: Shield,
              label: t.privacySecurity,
              color: "text-brand-ink-soft hover:text-brand-terracotta hover:underline",
              to: "/help",
            },
            {
              icon: CircleHelp,
              label: t.helpSupport,
              color: "text-brand-ink-soft hover:text-brand-terracotta hover:underline",
              to: "/help",
            },
            {
              icon: LogOut,
              label: t.signOut,
              color: "text-destructive hover:text-destructive-dark font-medium",
              onClick: onSignOut,
            },
          ].map((item, i) => {
            const inner = (
              <>
                <div className="flex items-center gap-3">
                  <item.icon
                    size={18}
                    className={item.color.includes("destructive") ? "text-destructive" : "text-brand-terracotta"}
                    aria-hidden="true"
                  />
                  <span className={`text-sm ${item.color}`}>{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-brand-ink-soft rtl-flip" aria-hidden="true" />
              </>
            );
            const classStr = `w-full flex items-center justify-between px-5 py-3.5 hover:bg-brand-peach/40 transition-colors cursor-pointer min-h-[44px] ${
              i > 0 ? "border-t border-border" : ""
            }`;

            if (item.to) {
              return (
                <Link key={item.label} to={item.to} className={classStr}>
                  {inner}
                </Link>
              );
            }
            return (
              <button key={item.label} type="button" onClick={item.onClick} className={classStr}>
                {inner}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
