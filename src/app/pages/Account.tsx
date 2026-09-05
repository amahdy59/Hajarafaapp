import React, { useState } from "react";
import { Camera, Award } from "lucide-react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { useAppSettings } from "../context/AppSettingsContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { InvoiceModal, type InvoiceData } from "../components/InvoiceModal";
import {
  type UserProfile,
  type SavedAddress,
  type SavedPayment,
  type Order,
  type AccountTab,
  type NotificationPreferences,
  initialOrders,
} from "../features/account/types";
import { AccountAuth } from "../features/account/AccountAuth";
import { AccountOrders } from "../features/account/AccountOrders";
import { AccountWishlist } from "../features/account/AccountWishlist";
import { AccountProfile } from "../features/account/AccountProfile";
import { AccountAddressesModal } from "../features/account/AccountAddressesModal";
import { AccountPaymentsModal } from "../features/account/AccountPaymentsModal";

export function Account() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab: AccountTab =
    tabParam === "profile" || tabParam === "orders" || tabParam === "wishlist"
      ? tabParam
      : "profile";

  const { t, isRTL, locale } = useAppSettings();

  usePageMeta({
    description: isRTL
      ? "منطقة حساب أوضح مع تنبيه أن بيانات الحساب الحالية مخزنة محلياً على هذا الجهاز."
      : "A clearer account area with an explicit note that current account data is stored locally on this device.",
    title: isRTL ? "حسابي | حاج عرفة" : "My Account | Haj Arafa",
  });

  // Profile State with LocalStorage Persistence
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("hajarafa.profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed) && parsed.firstName) {
          if (parsed.email === "alex@example.com" || parsed.firstName === "Alex" || parsed.firstName === "alex") {
            const defaultUser: UserProfile = {
              firstName: locale === "ar" ? "أحمد" : "Ahmed",
              lastName: locale === "ar" ? "مهدي" : "Mahdy",
              email: "ahmed.mahdy@example.com",
              phone: "+20 100 123 4567",
            };
            localStorage.setItem("hajarafa.profile", JSON.stringify(defaultUser));
            return defaultUser;
          }
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse profile JSON from localStorage:", e);
      }
    }

    if (localStorage.getItem("hajarafa.logged_out") === "true") {
      return null;
    }

    const defaultUser: UserProfile = {
      firstName: locale === "ar" ? "أحمد" : "Ahmed",
      lastName: locale === "ar" ? "مهدي" : "Mahdy",
      email: "ahmed.mahdy@example.com",
      phone: "+20 100 123 4567",
    };
    localStorage.setItem("hajarafa.profile", JSON.stringify(defaultUser));
    return defaultUser;
  });

  // Avatar Upload State (Persisted in LocalStorage)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => {
    return localStorage.getItem("hajarafa.avatar") || null;
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("hajarafa.orders");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const validOrders = parsed.filter(
            (o) =>
              o &&
              typeof o === "object" &&
              typeof o.id === "string" &&
              typeof o.status === "string" &&
              typeof o.total === "number" &&
              typeof o.items === "number" &&
              typeof o.image === "string" &&
              o.receipt &&
              typeof o.receipt === "object" &&
              Array.isArray(o.products)
          );
          if (validOrders.length > 0) {
            return validOrders;
          }
        }
      } catch (e) {
        console.error("Failed to parse orders from localStorage:", e);
      }
    }
    return initialOrders;
  });

  const saveOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem("hajarafa.orders", JSON.stringify(updatedOrders));
  };

  // Addresses State
  const [addresses, setAddresses] = useState<SavedAddress[]>(() => {
    const saved = localStorage.getItem("hajarafa.addresses");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error("Failed to parse addresses:", e);
      }
    }
    return [
      { id: "1", type: isRTL ? "المنزل" : "Home", details: isRTL ? "١٢ شارع النيل، العجوزة، الجيزة" : "12 El-Nile St, Agouza, Giza" },
      { id: "2", type: isRTL ? "العمل" : "Work", details: isRTL ? "المبنى ٣، شارع التسعين، التجمع الخامس، القاهرة" : "Building 3, El-Taseen St, Fifth Settlement, Cairo" },
    ];
  });

  // Payments State
  const [payments, setPayments] = useState<SavedPayment[]>(() => {
    const saved = localStorage.getItem("hajarafa.payments");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error("Failed to parse payments:", e);
      }
    }
    return [
      { id: "1", type: "Visa", number: "**** **** **** 4242", expiry: "12/28" },
      { id: "2", type: "Mastercard", number: "**** **** **** 8821", expiry: "06/27" },
    ];
  });

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationPreferences>(() => {
    const saved = localStorage.getItem("hajarafa.notifications");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse notifications:", e);
      }
    }
    return {
      orders: true,
      promotions: true,
      newsletter: false,
    };
  });

  // Modal States
  const [isAddressesOpen, setIsAddressesOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [taxInvoiceOrder, setTaxInvoiceOrder] = useState<Order | null>(null);

  // Handlers
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(isRTL ? "حجم الصورة كبير جداً. الحد الأقصى ٢ ميجابايت." : "Image size is too large. Max limit is 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatarUrl(base64);
        localStorage.setItem("hajarafa.avatar", base64);
        toast.success(isRTL ? "تم تحديث الصورة الشخصية بنجاح!" : "Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
    localStorage.removeItem("hajarafa.avatar");
    toast.success(isRTL ? "تم إزالة الصورة الشخصية" : "Profile picture removed successfully");
  };

  const handleSignOut = () => {
    setProfile(null);
    localStorage.removeItem("hajarafa.profile");
    localStorage.removeItem("hajarafa.avatar");
    localStorage.setItem("hajarafa.logged_out", "true");
    toast.success(isRTL ? "تم تسجيل الخروج بنجاح!" : "Signed out successfully!");
  };

  const saveProfile = () => {
    if (profile) {
      localStorage.setItem("hajarafa.profile", JSON.stringify(profile));
      toast.success(isRTL ? "تم حفظ التغييرات بنجاح!" : "Changes saved successfully!");
    }
  };

  const handleTabChange = (tab: AccountTab) => {
    setSearchParams({ tab });
  };

  const handleCancelOrder = (orderId: string) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: "cancelled" as const };
      }
      return o;
    });
    saveOrders(updated);
    toast.success(isRTL ? "تم إلغاء الطلب بنجاح" : "Order cancelled successfully");
  };

  // If unauthenticated, display the dedicated authentication screen
  if (!profile) {
    return (
      <AccountAuth
        onAuthenticated={(user) => {
          setProfile(user);
          localStorage.setItem("hajarafa.profile", JSON.stringify(user));
          localStorage.removeItem("hajarafa.logged_out");
        }}
      />
    );
  }

  const accountInvoiceData: InvoiceData | null = taxInvoiceOrder
    ? {
        orderNumber: taxInvoiceOrder.id,
        date: isRTL ? taxInvoiceOrder.dateAr : taxInvoiceOrder.dateEn,
        customerName: `${profile.firstName} ${profile.lastName}`,
        customerPhone: profile.phone,
        customerAddress: isRTL ? taxInvoiceOrder.deliveryAddressAr : taxInvoiceOrder.deliveryAddress,
        paymentMethodTitle: isRTL ? "دفع مؤكد" : "Verified Payment",
        items: taxInvoiceOrder.products.map((p) => ({
          name: p.name,
          nameAr: p.nameAr,
          quantity: p.quantity,
          unitPrice: p.price,
        })),
        subtotal: taxInvoiceOrder.receipt.subtotal,
        shipping: taxInvoiceOrder.receipt.shipping,
        discount: taxInvoiceOrder.receipt.discount,
        tax: taxInvoiceOrder.receipt.subtotal * 0.14,
        total: taxInvoiceOrder.total,
      }
    : null;

  const tabs: { key: AccountTab; label: string }[] = [
    { key: "profile", label: t.yourAccount },
    { key: "orders", label: t.yourOrders },
    { key: "wishlist", label: t.yourWishlist },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 py-6">
        <h1 className="sr-only">{isRTL ? "حسابي" : "My Account"}</h1>
        <p className="mb-4 rounded-2xl border border-brand-terracotta/20 bg-brand-peach/45 px-4 py-3 text-sm text-brand-ink-soft">
          {isRTL
            ? "هذه المنطقة ما زالت نموذجاً تجريبياً، وبيانات الحساب والطلبات الحالية محفوظة محلياً على هذا الجهاز فقط."
            : "This area is still a demo, and the current account and order data are stored locally on this device only."}
        </p>

        {/* Profile header */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-border select-none">
          <div className="relative w-20 h-20 group flex-shrink-0 select-none">
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer block w-full h-full relative"
              aria-label={isRTL ? "تغيير الصورة الشخصية" : "Change profile avatar"}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={isRTL ? "الصورة الشخصية" : "User Avatar"}
                  className="w-20 h-20 rounded-xl object-cover border border-border shadow-soft transition-transform group-hover:scale-95"
                />
              ) : (
                <div className="w-20 h-20 bg-brand-peach rounded-xl flex items-center justify-center text-3xl text-brand-ink-soft transition-all group-hover:scale-95">
                  👤
                </div>
              )}
              <div className="absolute -bottom-1 -end-1 bg-brand-terracotta text-white p-1.5 rounded-full border-2 border-background shadow-sm flex items-center justify-center transition-transform hover:scale-110">
                <Camera size={12} aria-hidden="true" />
              </div>
            </label>
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-foreground text-2xl font-display leading-tight">
                {profile.firstName} {profile.lastName}
              </h2>
              <span className="bg-brand-cream-2 text-brand-forest dark:bg-brand-sage/15 dark:text-brand-sage text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold border border-brand-sage/30">
                <Award size={10} aria-hidden="true" /> {t.goldMember}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">{profile.email}</p>
            <p className="text-muted-foreground/80 text-xs mt-1.5">
              {isRTL ? "٣ طلبات هذا الشهر" : "3 orders this month"}
            </p>
          </div>
        </div>

        {/* Tabs Bar */}
        <div
          role="tablist"
          aria-label={isRTL ? "أقسام الحساب" : "Account sections"}
          className="flex bg-brand-cream-2 rounded-xl p-1.5 gap-1 mb-6 border border-border shadow-soft"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              id={`tab-${tab.key}`}
              aria-controls={`tabpanel-${tab.key}`}
              aria-selected={activeTab === tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`flex-1 py-2.5 rounded-xl text-[11px] xs:text-xs sm:text-sm transition-all font-medium cursor-pointer min-h-[44px] ${
                activeTab === tab.key
                  ? "bg-brand-terracotta text-white shadow-sm"
                  : "text-brand-ink-soft hover:text-brand-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {activeTab === "profile" && (
            <AccountProfile
              profile={profile}
              setProfile={setProfile}
              avatarUrl={avatarUrl}
              handleRemoveAvatar={handleRemoveAvatar}
              saveProfile={saveProfile}
              notifications={notifications}
              setNotifications={(newVal) => {
                setNotifications(newVal);
                if (typeof newVal === "function") {
                  // Handled if function update
                } else {
                  localStorage.setItem("hajarafa.notifications", JSON.stringify(newVal));
                }
              }}
              onOpenPayments={() => setIsPaymentsOpen(true)}
              onOpenAddresses={() => setIsAddressesOpen(true)}
              onSignOut={handleSignOut}
            />
          )}

          {activeTab === "orders" && (
            <AccountOrders
              orders={orders}
              onCancelOrder={handleCancelOrder}
              onSelectTaxInvoice={setTaxInvoiceOrder}
            />
          )}

          {activeTab === "wishlist" && <AccountWishlist />}
        </div>
      </div>

      {/* Modals */}
      <AccountAddressesModal
        open={isAddressesOpen}
        onClose={() => setIsAddressesOpen(false)}
        addresses={addresses}
        onUpdateAddresses={(newAddresses) => {
          setAddresses(newAddresses);
          localStorage.setItem("hajarafa.addresses", JSON.stringify(newAddresses));
        }}
      />

      <AccountPaymentsModal
        open={isPaymentsOpen}
        onClose={() => setIsPaymentsOpen(false)}
        payments={payments}
        onUpdatePayments={(newPayments) => {
          setPayments(newPayments);
          localStorage.setItem("hajarafa.payments", JSON.stringify(newPayments));
        }}
      />

      {accountInvoiceData && (
        <InvoiceModal
          open={Boolean(accountInvoiceData)}
          invoice={accountInvoiceData}
          onClose={() => setTaxInvoiceOrder(null)}
        />
      )}
    </div>
  );
}

export default Account;
