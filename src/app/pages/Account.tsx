import { useState, useEffect } from "react";
import { User, Package, Heart, Settings, ChevronRight, Bell, Shield, HelpCircle, LogOut, Star, MapPin, CreditCard, Gift, Award, Plus, Trash2, X } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings } from "../context/AppSettingsContext";

const mockOrders = [
  { id: "HJR-823047", dateEn: "Apr 15, 2025", dateAr: "١٥ أبريل ٢٠٢٥", status: "delivered", total: 67.98, items: 3, image: "https://images.unsplash.com/photo-1537035448858-6d703dbc320f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
  { id: "HJR-814523", dateEn: "Mar 28, 2025", dateAr: "٢٨ مارس ٢٠٢٥", status: "shipped", total: 45.99, items: 2, image: "https://images.unsplash.com/photo-1761416351532-ede97c29fab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
  { id: "HJR-799102", dateEn: "Mar 10, 2025", dateAr: "١٠ مارس ٢٠٢٥", status: "delivered", total: 89.97, items: 4, image: "https://images.unsplash.com/photo-1602020381634-70afae19098c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
];

const statusColors: Record<string, string> = {
  delivered: "bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400",
  shipped: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
  processing: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
};

const statusTranslations: Record<string, { en: string; ar: string }> = {
  delivered: { en: "Delivered", ar: "تم التوصيل" },
  shipped: { en: "Shipped", ar: "تم الشحن" },
  processing: { en: "Processing", ar: "قيد المعالجة" },
  cancelled: { en: "Cancelled", ar: "ملغى" },
};

type Tab = "overview" | "orders" | "settings";

export function Account() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as Tab;
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { items: wishlistItems } = useWishlist();
  const { t, isRTL, locale } = useAppSettings();

  useEffect(() => {
    if (tabParam && ["overview", "orders", "settings"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const [isAddressesOpen, setIsAddressesOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [addresses, setAddresses] = useState([
    { id: "1", type: isRTL ? "المنزل" : "Home", details: isRTL ? "١٢ شارع النيل، العجوزة، الجيزة" : "12 El-Nile St, Agouza, Giza" },
    { id: "2", type: isRTL ? "العمل" : "Work", details: isRTL ? "المبنى ٣، شارع التسعين، التجمع الخامس، القاهرة" : "Building 3, El-Taseen St, Fifth Settlement, Cairo" }
  ]);
  const [payments, setPayments] = useState([
    { id: "1", type: "Visa", number: "**** **** **** 4242", expiry: "12/28" },
    { id: "2", type: "Mastercard", number: "**** **** **** 8821", expiry: "06/27" }
  ]);

  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
  });

  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: true,
    newsletter: false,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile header */}
        <div className="bg-gradient-to-br from-brand-terracotta to-brand-sage-dark rounded-3xl p-6 mb-6 relative overflow-hidden shadow-soft">
          <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">
              👤
            </div>
            <div>
              <h2 className="text-white text-xl font-display">{profile.firstName} {profile.lastName}</h2>
              <p className="text-white/70 text-sm">{profile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-amber-400 text-amber-900 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                  <Award size={10} /> {t.goldMember}
                </span>
                <span className="text-white/60 text-xs">{isRTL ? "٣ طلبات هذا الشهر" : "3 orders this month"}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-3 mt-5">
            {[
              { label: t.myOrders, value: "12", icon: Package },
              { label: t.yourWishlist, value: wishlistItems.length.toString(), icon: Heart },
              { label: t.points, value: "240", icon: Star },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <stat.icon size={16} className="text-white/70 mx-auto mb-1" />
                <p className="text-white text-lg font-medium">{stat.value}</p>
                <p className="text-white/60 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-card rounded-2xl p-1.5 gap-1 mb-6 border border-border shadow-soft">
          {([
            { key: "overview", label: isRTL ? "نظرة عامة" : "Overview" },
            { key: "orders", label: t.myOrders },
            { key: "settings", label: t.settings }
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`flex-1 py-2.5 rounded-xl text-sm capitalize transition-all font-medium ${
                activeTab === tab.key
                  ? "bg-brand-terracotta text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Quick actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Package, label: t.myOrders, to: "#", color: "bg-blue-500/10 text-blue-500" },
                { icon: Heart, label: t.yourWishlist, to: "/wishlist", color: "bg-brand-terracotta/10 text-brand-terracotta" },
                { icon: MapPin, label: t.addresses, to: "#", color: "bg-amber-500/10 text-amber-500" },
                { icon: Gift, label: t.rewards, to: "#", color: "bg-purple-500/10 text-purple-500" },
              ].map(action => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="bg-card rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow border border-border text-center"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}>
                    <action.icon size={18} />
                  </div>
                  <span className="text-sm text-foreground/80 font-medium">{action.label}</span>
                </Link>
              ))}
            </div>

            {/* Recent orders */}
            <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-foreground font-display">{t.recentOrders}</h3>
                <button onClick={() => handleTabChange("orders")} className="text-xs text-brand-terracotta hover:underline font-medium">{t.viewAll}</button>
              </div>
              <div className="space-y-3">
                {mockOrders.slice(0, 2).map(order => (
                  <div key={order.id} className="flex items-center gap-3 bg-background rounded-xl p-3 border border-border/40">
                    <img src={order.image} alt={locale === "ar" ? "صورة المنتج لطلب " + order.id : "Product thumbnail for order " + order.id} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm text-foreground font-medium whitespace-nowrap">{order.id}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${statusColors[order.status]}`}>
                          {statusTranslations[order.status]?.[locale] || order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap text-xs text-muted-foreground mt-0.5">
                        <span>{isRTL ? order.dateAr : order.dateEn}</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span>{order.items} {t.items}</span>
                      </div>
                    </div>
                    <span className="text-sm text-brand-terracotta font-medium whitespace-nowrap">{t.currency} {order.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Loyalty points */}
            <div className="bg-gradient-to-r from-amber-500/10 to-amber-500/20 rounded-2xl p-5 border border-amber-500/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-amber-500 fill-amber-500" />
                  <h3 className="text-amber-900 dark:text-amber-400 font-display">{t.loyaltyPoints}</h3>
                </div>
                <span className="text-2xl text-amber-700 dark:text-amber-300 font-medium">240 {t.pts}</span>
              </div>
              <div className="bg-white/40 dark:bg-black/35 rounded-full h-2 mb-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "48%" }} />
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-300">260 {t.morePointsUntilGold}</p>
            </div>
          </motion.div>
        )}

        {/* Orders tab */}
        {activeTab === "orders" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h2 className="text-foreground font-display mb-4">{t.myOrders}</h2>
            {mockOrders.map(order => (
              <div key={order.id} className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-soft hover:shadow-md transition-all">
                {/* Top Row: Order ID, Status, and Total Price */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-foreground font-semibold font-mono whitespace-nowrap">#{order.id}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap ${statusColors[order.status]}`}>
                      {statusTranslations[order.status]?.[locale] || order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-between sm:justify-end">
                    <span className="text-xs text-muted-foreground sm:hidden">{isRTL ? "الإجمالي" : "Total"}</span>
                    <span className="text-sm font-semibold text-brand-terracotta whitespace-nowrap">
                      {t.currency} {order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Middle Row: Date, Items Count */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span>{isRTL ? order.dateAr : order.dateEn}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{order.items} {t.items}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">
                      {order.status === "delivered" ? t.deliveredSuccessfully : t.onTheWay}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Product Image & Details Button */}
                <div className="flex items-center justify-between gap-3 bg-background/50 p-2.5 rounded-xl border border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF6F0] p-1 flex items-center justify-center border border-border/40 flex-shrink-0">
                      <img src={order.image} alt={locale === "ar" ? "صورة المنتج" : "Product thumbnail"} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="text-xs">
                      <p className="text-foreground font-medium line-clamp-1">{isRTL ? "تفاصيل الشحنة" : "Shipment Details"}</p>
                      <p className="text-muted-foreground">{order.items} {isRTL ? "منتجات طبيعية" : "natural products"}</p>
                    </div>
                  </div>
                  <button className="text-xs bg-brand-terracotta/10 text-brand-terracotta px-3 py-1.5 rounded-lg hover:bg-brand-terracotta hover:text-white transition-all font-medium whitespace-nowrap">
                    {t.details}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Settings tab */}
        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Profile settings */}
            <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
              <h3 className="text-foreground font-display mb-4">{t.profileInformation}</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">{t.firstName}</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5">{t.lastName}</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs text-muted-foreground mb-1.5">{t.email}</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors"
                />
              </div>
              <button className="bg-brand-terracotta text-white px-6 py-2.5 rounded-xl text-sm hover:bg-brand-terracotta-dark transition-all active:scale-[0.98] font-medium shadow-sm">
                {t.saveChanges}
              </button>
            </div>

            {/* Notifications */}
            <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
              <h3 className="text-foreground font-display mb-4 flex items-center gap-2"><Bell size={18} /> {t.notifications}</h3>
              <div className="space-y-3">
                {Object.entries(notifications).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-foreground/80 capitalize">
                      {key === "newsletter" ? (isRTL ? "النشرة البريدية" : "Newsletter") : key === "orders" ? t.orderUpdates : t.promotionsDeals}
                    </span>
                    <div
                      className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${val ? "bg-brand-terracotta" : "bg-border"}`}
                      onClick={() => setNotifications(n => ({ ...n, [key]: !val }))}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${val ? (isRTL ? "-translate-x-5" : "translate-x-5") : "translate-x-1"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account actions */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft">
              {[
                { icon: CreditCard, label: t.paymentMethods, color: "text-foreground/80 hover:text-brand-terracotta", onClick: () => setIsPaymentsOpen(true) },
                { icon: MapPin, label: t.savedAddresses, color: "text-foreground/80 hover:text-brand-terracotta", onClick: () => setIsAddressesOpen(true) },
                { icon: Shield, label: t.privacySecurity, color: "text-foreground/80 hover:text-brand-terracotta", to: "/help" },
                { icon: HelpCircle, label: t.helpSupport, color: "text-foreground/80 hover:text-brand-terracotta", to: "/help" },
                { icon: LogOut, label: t.signOut, color: "text-destructive hover:text-destructive-dark font-medium", onClick: () => alert(isRTL ? "تم تسجيل الخروج بنجاح!" : "Signed out successfully!") },
              ].map((item, i) => {
                const inner = (
                  <>
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className={item.color.includes("destructive") ? "text-destructive" : "text-brand-ink-soft"} />
                      <span className={`text-sm ${item.color}`}>{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-brand-ink-soft rtl-flip" />
                  </>
                );
                const classStr = `w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted transition-colors ${i > 0 ? "border-t border-border" : ""}`;
                if (item.to) {
                  return (
                    <Link key={item.label} to={item.to} className={classStr}>
                      {inner}
                    </Link>
                  );
                }
                return (
                  <button key={item.label} onClick={item.onClick} className={classStr}>
                    {inner}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Saved Addresses Modal */}
      <AnimatePresence>
        {isAddressesOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddressesOpen(false)}
              className="fixed inset-0 bg-brand-ink/45 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 bottom-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full max-w-md bg-card border border-border rounded-3xl p-6 z-50 shadow-elev"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-foreground font-display text-base sm:text-lg">{t.savedAddresses}</h3>
                <button onClick={() => setIsAddressesOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-3">
                {addresses.map(addr => (
                  <div key={addr.id} className="bg-background border border-border/60 rounded-xl p-3.5 flex justify-between items-start">
                    <div>
                      <span className="bg-brand-peach text-brand-terracotta text-xs px-2 py-0.5 rounded-full font-medium mb-1 inline-block">
                        {addr.type}
                      </span>
                      <p className="text-foreground text-sm font-medium">{addr.details}</p>
                    </div>
                    <button 
                      onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))}
                      className="text-destructive hover:text-destructive-dark p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => {
                    const newType = prompt(isRTL ? "نوع العنوان (مثال: المنزل، العمل):" : "Address type (e.g. Home, Work):");
                    const newDetails = prompt(isRTL ? "تفاصيل العنوان بالكامل:" : "Complete address details:");
                    if (newType && newDetails) {
                      setAddresses([...addresses, { id: Date.now().toString(), type: newType, details: newDetails }]);
                    }
                  }}
                  className="w-full py-2.5 bg-brand-peach text-brand-terracotta hover:bg-brand-terracotta hover:text-white rounded-xl text-xs font-semibold uppercase transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={14} /> {isRTL ? "إضافة عنوان جديد" : "Add New Address"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Payment Methods Modal */}
      <AnimatePresence>
        {isPaymentsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPaymentsOpen(false)}
              className="fixed inset-0 bg-brand-ink/45 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 bottom-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full max-w-md bg-card border border-border rounded-3xl p-6 z-50 shadow-elev"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-foreground font-display text-base sm:text-lg">{t.paymentMethods}</h3>
                <button onClick={() => setIsPaymentsOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-3">
                {payments.map(pay => (
                  <div key={pay.id} className="bg-background border border-border/60 rounded-xl p-3.5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-brand-peach/40 rounded flex items-center justify-center font-bold text-xs text-brand-terracotta">
                        {pay.type}
                      </div>
                      <div>
                        <p className="text-foreground text-sm font-mono font-medium">{pay.number}</p>
                        <p className="text-muted-foreground text-[10px]">{isRTL ? "تنتهي في" : "Expires"} {pay.expiry}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setPayments(payments.filter(p => p.id !== pay.id))}
                      className="text-destructive hover:text-destructive-dark p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => {
                    const number = prompt(isRTL ? "رقم البطاقة (١٦ رقماً):" : "Card Number (16 digits):");
                    const expiry = prompt(isRTL ? "تاريخ الانتهاء (شهر/سنة):" : "Expiry (MM/YY):");
                    if (number && expiry) {
                      setPayments([...payments, { id: Date.now().toString(), type: number.startsWith("4") ? "Visa" : "MC", number: `**** **** **** ${number.slice(-4)}`, expiry }]);
                    }
                  }}
                  className="w-full py-2.5 bg-brand-peach text-brand-terracotta hover:bg-brand-terracotta hover:text-white rounded-xl text-xs font-semibold uppercase transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={14} /> {isRTL ? "إضافة بطاقة جديدة" : "Add New Card"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="h-20 sm:h-4" />
    </div>
  );
}
