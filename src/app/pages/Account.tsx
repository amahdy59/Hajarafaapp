import { useState, useEffect } from "react";
import { 
  User, Package, Heart, Settings, ChevronRight, Bell, Shield, 
  HelpCircle, LogOut, Star, MapPin, CreditCard, Award, 
  Plus, Trash2, X, Camera, Languages, Sun, Moon 
} from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { toast } from "sonner";
import { ProductCard } from "../components/ProductCard";

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

type Tab = "overview" | "orders" | "wishlist" | "settings";

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
            type="button"
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

export function Account() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as Tab;
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { items: wishlistItems } = useWishlist();
  const { theme, setTheme, locale, setLocale, t, isRTL } = useAppSettings();

  // Avatar Upload State (Persisted in LocalStorage)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => {
    return localStorage.getItem("hajarafa.avatar") || null;
  });

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

  useEffect(() => {
    if (tabParam && ["overview", "orders", "wishlist", "settings"].includes(tabParam)) {
      setActiveTab(tabParam);
    } else if (tabParam === "account") {
      setActiveTab("overview");
      setSearchParams({ tab: "overview" }, { replace: true });
    } else {
      setActiveTab("overview");
    }
  }, [tabParam, setSearchParams]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === "overview") {
      setSearchParams({});
    } else {
      setSearchParams({ tab });
    }
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

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("hajarafa.profile");
    return saved ? JSON.parse(saved) : {
      firstName: "Alex",
      lastName: "Johnson",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
    };
  });

  const saveProfile = () => {
    localStorage.setItem("hajarafa.profile", JSON.stringify(profile));
    toast.success(isRTL ? "تم حفظ التغييرات بنجاح!" : "Changes saved successfully!");
  };

  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: true,
    newsletter: false,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Profile header (Always visible dashboard card) */}
        <div className="bg-gradient-to-br from-brand-terracotta to-brand-sage-dark rounded-3xl p-6 mb-6 relative overflow-hidden shadow-soft">
          <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10 flex items-center gap-4">
            
            {/* Avatar uploader widget with visible Camera badge */}
            <div className="relative w-20 h-20 group flex-shrink-0 select-none">
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <label htmlFor="avatar-upload" className="cursor-pointer block w-full h-full relative">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-2xl object-cover border border-white/20 shadow-md transition-transform group-hover:scale-95"
                  />
                ) : (
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-3xl text-white backdrop-blur-sm hover:bg-white/30 transition-all group-hover:scale-95">
                    👤
                  </div>
                )}
                <div className="absolute -bottom-1 -end-1 bg-brand-terracotta text-white p-1.5 rounded-full border-2 border-white dark:border-background shadow-sm flex items-center justify-center transition-transform hover:scale-110">
                  <Camera size={12} />
                </div>
              </label>
            </div>

            <div>
              <h2 className="text-white text-xl font-display">{profile.firstName} {profile.lastName}</h2>
              <p className="text-white/70 text-sm">{profile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-amber-400 text-amber-950 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                  <Award size={10} /> {t.goldMember}
                </span>
                <span className="text-white/60 text-xs">{isRTL ? "٣ طلبات هذا الشهر" : "3 orders this month"}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-3 mt-5">
            {[
              { label: isRTL ? "طلباتي" : "My Orders", value: mockOrders.length.toString(), icon: Package, onClick: () => handleTabChange("orders") },
              { label: isRTL ? "المفضلة" : "Wishlist", value: wishlistItems.length.toString(), icon: Heart, onClick: () => handleTabChange("wishlist") },
              { label: t.points, value: "240", icon: Star, onClick: () => toast.info(isRTL ? "رصيدك الحالي من نقاط الولاء" : "Your current loyalty points balance") },
            ].map(stat => (
              <button
                key={stat.label}
                onClick={stat.onClick}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center transition-all duration-200 hover:bg-white/20 active:scale-95 block w-full no-underline"
              >
                <stat.icon size={16} className="text-white/70 mx-auto mb-1" />
                <p className="text-white text-lg font-semibold">{stat.value}</p>
                <p className="text-white/60 text-[10.5px] uppercase tracking-wide">{stat.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs - Synced with Hamburger Menu */}
        <div className="flex bg-card rounded-2xl p-1.5 gap-1 mb-6 border border-border shadow-soft">
          {([
            { key: "overview", label: isRTL ? "نظرة عامة" : "Overview" },
            { key: "orders", label: isRTL ? "طلباتي" : "My Orders" },
            { key: "wishlist", label: isRTL ? "المفضلة" : "Wishlist" },
            { key: "settings", label: isRTL ? "الإعدادات" : "Settings" }
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`flex-1 py-2.5 rounded-xl text-sm transition-all font-medium ${
                activeTab === tab.key
                  ? "bg-brand-terracotta text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content containers */}
        
        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* Loyalty points card */}
            <div className="bg-gradient-to-r from-amber-500/10 to-amber-500/20 rounded-2xl p-5 border border-amber-500/20 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-amber-500 fill-amber-500" />
                  <h3 className="text-amber-900 dark:text-amber-400 font-display text-sm sm:text-base">{t.loyaltyPoints}</h3>
                </div>
                <span className="text-xl text-amber-700 dark:text-amber-300 font-semibold">240 {t.pts}</span>
              </div>
              <div className="bg-white/40 dark:bg-black/35 rounded-full h-2 mb-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "48%" }} />
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-300">260 {t.morePointsUntilGold}</p>
            </div>

            {/* Teaser columns: Recent Orders & Wishlist Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Recent Orders teaser */}
              <div className="bg-card rounded-2xl p-5 border border-border shadow-soft flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-foreground font-display text-base flex items-center gap-2">
                      <Package size={18} className="text-brand-terracotta" />
                      {isRTL ? "آخر طلب" : "Recent Order"}
                    </h3>
                    <button onClick={() => handleTabChange("orders")} className="text-brand-terracotta hover:underline text-xs font-semibold flex items-center gap-1">
                      {isRTL ? "عرض الكل" : "View All"} <ChevronRight size={14} className="rtl-flip" />
                    </button>
                  </div>

                  <div className="bg-background/40 border border-border/60 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-foreground">#{mockOrders[0].id}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${statusColors[mockOrders[0].status]}`}>
                        {statusTranslations[mockOrders[0].status]?.[locale] || mockOrders[0].status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{isRTL ? mockOrders[0].dateAr : mockOrders[0].dateEn}</span>
                      <span className="font-semibold text-brand-terracotta">{t.currency} {mockOrders[0].total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleTabChange("orders")}
                  className="w-full mt-4 py-2 bg-brand-peach/40 hover:bg-brand-peach text-brand-terracotta text-xs rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Package size={14} /> {isRTL ? "تتبع الطلب" : "Track Order Status"}
                </button>
              </div>

              {/* Wishlist Preview teaser */}
              <div className="bg-card rounded-2xl p-5 border border-border shadow-soft flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-foreground font-display text-base flex items-center gap-2">
                      <Heart size={18} className="text-brand-terracotta fill-brand-terracotta" />
                      {isRTL ? "المفضلة" : "Wishlist"}
                    </h3>
                    <button onClick={() => handleTabChange("wishlist")} className="text-brand-terracotta hover:underline text-xs font-semibold flex items-center gap-1">
                      {isRTL ? "عرض الكل" : "View All"} <ChevronRight size={14} className="rtl-flip" />
                    </button>
                  </div>

                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-4 bg-background/20 rounded-xl border border-dashed border-border/80">
                      <Heart size={20} className="text-muted-foreground/40 mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">{t.wishlistEmpty}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide py-1">
                      {wishlistItems.slice(0, 3).map(item => (
                        <div key={item.id} className="w-12 h-12 rounded-lg bg-background p-1 flex items-center justify-center border border-border flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                      ))}
                      {wishlistItems.length > 3 && (
                        <div className="w-10 h-10 rounded-full bg-brand-peach/40 text-brand-terracotta text-xs font-semibold flex items-center justify-center border border-border flex-shrink-0">
                          +{wishlistItems.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleTabChange("wishlist")}
                  className="w-full mt-4 py-2 bg-brand-peach/40 hover:bg-brand-peach text-brand-terracotta text-xs rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Heart size={14} /> {isRTL ? "عرض قائمة الأمنيات الكلية" : "View Full Wishlist"}
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* Tab 2: Orders history */}
        {activeTab === "orders" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h2 className="text-foreground font-display mb-4">{t.myOrders}</h2>
            {mockOrders.map(order => (
              <div key={order.id} className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-soft hover:shadow-md transition-all">
                {/* Top Row */}
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

                {/* Middle Row */}
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

                {/* Bottom Row */}
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

        {/* Tab 3: Wishlist items embedded directly */}
        {activeTab === "wishlist" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Heart size={20} className="text-brand-terracotta fill-brand-terracotta" />
              <h3 className="text-foreground font-display text-base sm:text-lg">{t.wishlist}</h3>
              <span className="bg-brand-peach text-brand-terracotta text-xs px-2.5 py-0.5 rounded-full font-medium">
                {wishlistItems.length} {wishlistItems.length === 1 ? t.item : t.items}
              </span>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-3xl shadow-soft">
                <Heart size={44} className="text-border mx-auto mb-3" />
                <h4 className="text-foreground font-medium mb-1">{t.wishlistEmpty}</h4>
                <p className="text-muted-foreground text-xs mb-5">{t.wishlistEmptyHint}</p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-brand-terracotta text-white px-5 py-2.5 rounded-xl hover:bg-brand-terracotta-dark transition-all active:scale-[0.98] text-xs font-semibold"
                >
                  {t.discoverProducts} <ChevronRight size={14} className="rtl-flip animate-pulse" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {wishlistItems.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Tab 4: Settings (Consolidated Settings Pane) */}
        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left side settings: Profile edit form + App Preferences */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Edit Profile Form */}
              <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                <h3 className="text-foreground font-display text-base sm:text-lg mb-4">{t.profileInformation}</h3>
                
                {avatarUrl && (
                  <div className="mb-4 pb-4 border-b border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{isRTL ? "الصورة الشخصية مضافة" : "Profile picture added"}</span>
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="text-xs text-destructive hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Trash2 size={13} /> {isRTL ? "إزالة الصورة" : "Remove Photo"}
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">{t.email}</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">{t.phone}</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={saveProfile}
                  className="bg-brand-terracotta text-white px-6 py-2.5 rounded-xl text-sm hover:bg-brand-terracotta-dark transition-all active:scale-[0.98] font-medium shadow-sm"
                >
                  {t.saveChanges}
                </button>
              </div>

              {/* App Preferences: Language & Theme selectors inside Settings Page */}
              <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                <h3 className="text-foreground font-display text-base sm:text-lg mb-4 flex items-center gap-2">
                  <Settings size={18} className="text-brand-terracotta" /> {isRTL ? "تفضيلات التطبيق" : "App Preferences"}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/80 flex items-center gap-2.5">
                      <Languages size={17} className="text-brand-ink-soft" />
                      {t.language}
                    </span>
                    <Segmented<"en" | "ar">
                      value={locale}
                      onChange={setLocale}
                      options={[{ value: "en", label: "English" }, { value: "ar", label: "العربية" }]}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm text-foreground/80 flex items-center gap-2.5">
                      {theme === "light" ? <Sun size={17} className="text-brand-ink-soft" /> : <Moon size={17} className="text-brand-ink-soft" />}
                      {t.theme}
                    </span>
                    <Segmented<"light" | "dark">
                      value={theme}
                      onChange={setTheme}
                      options={[{ value: "light", label: t.light }, { value: "dark", label: t.dark }]}
                    />
                  </div>
                </div>
              </div>

              {/* Notifications switches */}
              <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                <h3 className="text-foreground font-display text-base sm:text-lg mb-4 flex items-center gap-2">
                  <Bell size={18} className="text-brand-terracotta" /> {isRTL ? "إشعارات البريد والهاتف" : "Notification Preferences"}
                </h3>
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

            </div>

            {/* Right side settings: Actions, addresses, card triggers */}
            <div className="space-y-6">
              
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft">
                {[
                  { icon: CreditCard, label: t.paymentMethods, color: "text-foreground/80 hover:text-brand-terracotta", onClick: () => setIsPaymentsOpen(true) },
                  { icon: MapPin, label: t.savedAddresses, color: "text-foreground/80 hover:text-brand-terracotta", onClick: () => setIsAddressesOpen(true) },
                  { icon: Shield, label: t.privacySecurity, color: "text-foreground/80 hover:text-brand-terracotta hover:underline", to: "/help" },
                  { icon: HelpCircle, label: t.helpSupport, color: "text-foreground/80 hover:text-brand-terracotta hover:underline", to: "/help" },
                  { icon: LogOut, label: t.signOut, color: "text-destructive hover:text-destructive-dark font-medium", onClick: () => toast.success(isRTL ? "تم تسجيل الخروج بنجاح!" : "Signed out successfully!") },
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
                    <button key={item.label} type="button" onClick={item.onClick} className={classStr}>
                      {inner}
                    </button>
                  );
                })}
              </div>

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
                      onClick={() => {
                        setAddresses(addresses.filter(a => a.id !== addr.id));
                        toast.success(isRTL ? "تم حذف العنوان بنجاح" : "Address deleted successfully");
                      }}
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
                      onClick={() => {
                        setPayments(payments.filter(p => p.id !== pay.id));
                        toast.success(isRTL ? "تم إزالة بطاقة الدفع بنجاح" : "Payment card removed successfully");
                      }}
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
