import { useState, useEffect, useRef } from "react";
import { 
  User, Package, Heart, Settings, ChevronRight, Bell, Shield, 
  HelpCircle, LogOut, Star, MapPin, CreditCard, Award, 
  Plus, Trash2, X, Camera, Languages, Sun, Moon, Copy, Check, Info
} from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { toast } from "sonner";
import { ProductCard } from "../components/ProductCard";

// Mock Orders with detailed products and receipt breakdowns
const initialOrders = [
  { 
    id: "HJR-845102", 
    dateEn: "Jun 04, 2026", 
    dateAr: "٤ يونيو ٢٠٢٦", 
    status: "processing", 
    total: 120.00, 
    items: 1, 
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    courier: null,
    deliveryAddress: "12 El-Nile St, Agouza, Giza (Home)",
    deliveryAddressAr: "١٢ شارع النيل، العجوزة، الجيزة (المنزل)",
    receipt: { subtotal: 110.00, shipping: 15.00, discount: 5.00 },
    products: [
      { name: "Sidr Honey", nameAr: "عسل سدر", quantity: 1, price: 110.00, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" }
    ]
  },
  { 
    id: "HJR-823047", 
    dateEn: "Apr 15, 2025", 
    dateAr: "١٥ أبريل ٢٠٢٥", 
    status: "delivered", 
    total: 67.98, 
    items: 2, 
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    courier: { company: "Aramex", trackingCode: "AR-883719-EG", phone: "+20 100 123 4567", estDateEn: "Apr 18, 2025", estDateAr: "١٨ أبريل ٢٠٢٥" },
    deliveryAddress: "Building 3, El-Taseen St, Fifth Settlement, Cairo (Work)",
    deliveryAddressAr: "المبنى ٣، شارع التسعين، التجمع الخامس، القاهرة (العمل)",
    receipt: { subtotal: 60.00, shipping: 15.00, discount: 7.02 },
    products: [
      { name: "BBQ Spice Mix", nameAr: "بهارات مشاوي", quantity: 1, price: 35.00, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
      { name: "Bay Leaves", nameAr: "ورق لاورو", quantity: 1, price: 25.00, image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" }
    ]
  },
  { 
    id: "HJR-814523", 
    dateEn: "Mar 28, 2025", 
    dateAr: "٢٨ مارس ٢٠٢٥", 
    status: "shipped", 
    total: 45.99, 
    items: 1, 
    image: "https://images.unsplash.com/photo-1761416351532-ede97c29fab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    courier: { company: "Haj Arafa Express", trackingCode: "HA-09921-EG", phone: "+20 112 345 6789", estDateEn: "Apr 01, 2025", estDateAr: "٠١ أبريل ٢٠٢٥" },
    deliveryAddress: "12 El-Nile St, Agouza, Giza (Home)",
    deliveryAddressAr: "١٢ شارع النيل، العجوزة، الجيزة (المنزل)",
    receipt: { subtotal: 45.99, shipping: 0.00, discount: 0.00 },
    products: [
      { name: "Date Maamoul", nameAr: "معمول تمر", quantity: 1, price: 45.99, image: "https://images.unsplash.com/photo-1761416351532-ede97c29fab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" }
    ]
  },
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


interface LeafletMapProps {
  centerCoords: { lat: number; lng: number };
  onLocationSelect: (address: string, coords: { lat: number; lng: number }) => void;
  isRTL: boolean;
}

function LeafletMap({ centerCoords, onLocationSelect, isRTL }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    // Add Leaflet CSS if not loaded
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const initMap = () => {
      const L = (window as any).L;
      if (!L || !mapRef.current) return;
      if (mapInstanceRef.current) {
        // Just update center if map already exists
        mapInstanceRef.current.setView([centerCoords.lat, centerCoords.lng], 15);
        if (markerRef.current) {
          markerRef.current.setLatLng([centerCoords.lat, centerCoords.lng]);
        }
        return;
      }

      const map = L.map(mapRef.current).setView([centerCoords.lat, centerCoords.lng], 13);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
      }).addTo(map);

      // Create a gorgeous red pin icon to bypass Vite path issues
      const svgIcon = L.divIcon({
        html: `<div class="flex flex-col items-center transform -translate-y-1/2">
                 <svg class="text-destructive fill-destructive/20 drop-shadow-md animate-bounce" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                   <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                   <circle cx="12" cy="10" r="3"></circle>
                 </svg>
                 <div class="w-2.5 h-1.5 bg-black/30 rounded-full blur-[1.5px] mt-[-4px] transform scale-x-150"></div>
               </div>`,
        className: 'custom-leaflet-pin',
        iconSize: [34, 45],
        iconAnchor: [17, 45]
      });

      const marker = L.marker([centerCoords.lat, centerCoords.lng], { draggable: true, icon: svgIcon }).addTo(map);
      markerRef.current = marker;

      const reverseGeocode = async (lat: number, lng: number) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
            headers: { "Accept-Language": isRTL ? "ar" : "en" }
          });
          const data = await res.json();
          if (data && data.display_name) {
            onLocationSelect(data.display_name, { lat, lng });
          } else {
            onLocationSelect(`${lat.toFixed(5)}, ${lng.toFixed(5)}`, { lat, lng });
          }
        } catch {
          onLocationSelect(`${lat.toFixed(5)}, ${lng.toFixed(5)}`, { lat, lng });
        }
      };

      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        reverseGeocode(lat, lng);
      });

      marker.on("dragend", () => {
        const position = marker.getLatLng();
        reverseGeocode(position.lat, position.lng);
      });

      reverseGeocode(centerCoords.lat, centerCoords.lng);
    };

    // Load Leaflet JS if not loaded
    if (!(window as any).L) {
      if (!document.getElementById("leaflet-js")) {
        const script = document.createElement("script");
        script.id = "leaflet-js";
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.async = true;
        script.onload = initMap;
        document.head.appendChild(script);
      }
    } else {
      initMap();
    }

    return () => {
      // Clean up map instance on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [centerCoords, isRTL]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border shadow-soft my-2">
      <div ref={mapRef} className="h-44 w-full z-0" />
      <div className="absolute bottom-2 left-2 right-2 z-10 bg-card/90 backdrop-blur-sm px-2.5 py-1.5 rounded-xl text-[10px] text-muted-foreground shadow-sm pointer-events-none text-center">
        {isRTL ? "📍 انقر على الخريطة أو اسحب الدبوس لتحديد موقعك" : "📍 Tap the map or drag the pin to select location"}
      </div>
    </div>
  );
}

type Tab = "account" | "orders" | "wishlist" | "settings";

export function Account() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as Tab;
  const [activeTab, setActiveTab] = useState<Tab>("account");
  const { items: wishlistItems } = useWishlist();
  const { t, isRTL, locale } = useAppSettings();

  // Authentication State
  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  } | null>(() => {
    const saved = localStorage.getItem("hajarafa.profile");
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("hajarafa.orders");
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const saveOrders = (updatedOrders: typeof orders) => {
    setOrders(updatedOrders);
    localStorage.setItem("hajarafa.orders", JSON.stringify(updatedOrders));
  };

  // Auth Form State
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      toast.error(isRTL ? "يرجى ملء جميع الحقول المطلوبة." : "Please fill in all required fields.");
      return;
    }
    const mockUser = {
      firstName: authEmail.split("@")[0],
      lastName: "Johnson",
      email: authEmail,
      phone: "+1 (555) 123-4567",
    };
    setProfile(mockUser);
    localStorage.setItem("hajarafa.profile", JSON.stringify(mockUser));
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
    const newUser = {
      firstName: fName,
      lastName: lName,
      email: authEmail,
      phone: authPhone || "+1 (555) 000-0000",
    };
    setProfile(newUser);
    localStorage.setItem("hajarafa.profile", JSON.stringify(newUser));
    toast.success(isRTL ? "تم إنشاء الحساب بنجاح!" : "Account created successfully!");
  };

  const handleSocialLogin = (platform: string) => {
    const mockUser = {
      firstName: "Alex",
      lastName: platform,
      email: `${platform.toLowerCase()}user@example.com`,
      phone: "+1 (555) 888-9999",
    };
    setProfile(mockUser);
    localStorage.setItem("hajarafa.profile", JSON.stringify(mockUser));
    toast.success(isRTL 
      ? `تم تسجيل الدخول بنجاح عبر ${platform}` 
      : `Successfully signed in via ${platform}`
    );
  };

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

  const handleSignOut = () => {
    setProfile(null);
    localStorage.removeItem("hajarafa.profile");
    localStorage.removeItem("hajarafa.avatar");
    toast.success(isRTL ? "تم تسجيل الخروج بنجاح!" : "Signed out successfully!");
  };

  useEffect(() => {
    if (tabParam && ["account", "orders", "wishlist", "settings"].includes(tabParam)) {
      setActiveTab(tabParam);
    } else {
      setActiveTab("account");
    }
  }, [tabParam]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Modal Interactive Form States
  const [isAddressesOpen, setIsAddressesOpen] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddrType, setNewAddrType] = useState("");
  const [newAddrDetails, setNewAddrDetails] = useState("");
  const [mapSearch, setMapSearch] = useState("");
  const [isMapSearching, setIsMapSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 30.0444, lng: 31.2357 });

  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardName, setNewCardName] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");
  const [newCardCvv, setNewCardCvv] = useState("");

  // Detailed Order Modal States
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const [addresses, setAddresses] = useState([
    { id: "1", type: isRTL ? "المنزل" : "Home", details: isRTL ? "١٢ شارع النيل، العجوزة، الجيزة" : "12 El-Nile St, Agouza, Giza" },
    { id: "2", type: isRTL ? "العمل" : "Work", details: isRTL ? "المبنى ٣، شارع التسعين، التجمع الخامس، القاهرة" : "Building 3, El-Taseen St, Fifth Settlement, Cairo" }
  ]);
  
  const [payments, setPayments] = useState([
    { id: "1", type: "Visa", number: "**** **** **** 4242", expiry: "12/28" },
    { id: "2", type: "Mastercard", number: "**** **** **** 8821", expiry: "06/27" }
  ]);

  const saveProfile = () => {
    if (profile) {
      localStorage.setItem("hajarafa.profile", JSON.stringify(profile));
      toast.success(isRTL ? "تم حفظ التغييرات بنجاح!" : "Changes saved successfully!");
    }
  };

  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: true,
    newsletter: false,
  });

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrType || !newAddrDetails) {
      toast.error(isRTL ? "يرجى إدخال جميع الحقول أو تحديد موقعك على الخريطة" : "Please fill in all fields or pick from Google Maps");
      return;
    }
    setAddresses([...addresses, {
      id: Date.now().toString(),
      type: newAddrType,
      details: newAddrDetails
    }]);
    setNewAddrType("");
    setNewAddrDetails("");
    setMapSearch("");
    setIsAddingAddress(false);
    toast.success(isRTL ? "تم إضافة العنوان بنجاح" : "Location added successfully");
  };

  // Google Maps / OpenStreetMap geocoded search
  const handleMapSearch = async () => {
    if (!mapSearch.trim()) return;
    setIsMapSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mapSearch)}&limit=1`, {
        headers: {
          "Accept-Language": isRTL ? "ar" : "en",
          "User-Agent": "HajArafaApp"
        }
      });
      const data = await res.json();
      if (data && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lng = parseFloat(item.lon);
        setMapCenter({ lat, lng });
        setNewAddrDetails(item.display_name);
        toast.success(isRTL ? "تم العثور على الموقع وتحديث الخريطة!" : "Location found on Google Maps!");
      } else {
        toast.error(isRTL ? "لم يتم العثور على الموقع" : "Location not found");
      }
    } catch {
      // Fallback in case of network issue
      const suffix = isRTL ? "، القاهرة، مصر" : ", Cairo, Egypt";
      setNewAddrDetails(mapSearch + suffix);
      toast.success(isRTL ? "تم تحديد الموقع (نسخة احتياطية)" : "Location set (offline backup)");
    } finally {
      setIsMapSearching(false);
    }
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardNumber || !newCardName || !newCardExpiry) {
      toast.error(isRTL ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in required fields");
      return;
    }
    const cleanNum = newCardNumber.replace(/\s+/g, "");
    const cardBrand = cleanNum.startsWith("4") ? "Visa" : cleanNum.startsWith("5") ? "Mastercard" : "Card";
    setPayments([...payments, {
      id: Date.now().toString(),
      type: cardBrand,
      number: `**** **** **** ${cleanNum.slice(-4) || "0000"}`,
      expiry: newCardExpiry
    }]);
    setNewCardNumber("");
    setNewCardName("");
    setNewCardExpiry("");
    setNewCardCvv("");
    setIsAddingCard(false);
    toast.success(isRTL ? "تم إضافة بطاقة الدفع بنجاح" : "Payment card added successfully");
  };

  const handleCancelOrder = (orderId: string) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: "cancelled" };
      }
      return o;
    });
    saveOrders(updated);
    if (selectedOrder) {
      setSelectedOrder({ ...selectedOrder, status: "cancelled" });
    }
    toast.success(isRTL ? "تم إلغاء الطلب بنجاح" : "Order cancelled successfully");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success(isRTL ? "تم نسخ كود التتبع!" : "Tracking code copied!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Detect card brand dynamically for inline styling
  const detectedBrand = newCardNumber.replace(/\s+/g, "").startsWith("4") 
    ? "Visa" 
    : newCardNumber.replace(/\s+/g, "").startsWith("5") 
      ? "Mastercard" 
      : "";

  // Render Login flow if profile is null
  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-10 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-soft"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-brand-forest text-2xl font-display font-bold">
              {isRTL ? "مرحباً بك في حاج عرفة" : "Welcome to Haj Arafa"}
            </h2>
            <p className="text-muted-foreground text-xs mt-1">
              {isRTL ? "أنشئ حساباً أو سجل دخولك لإتمام عملية الشراء" : "Sign in or register to manage your natural boutique account"}
            </p>
          </div>

          {/* Form Tabs */}
          <div className="flex bg-muted rounded-xl p-1 gap-1 mb-6 border border-border">
            <button
              onClick={() => setAuthTab("signin")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase transition-all ${
                authTab === "signin" ? "bg-brand-terracotta text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isRTL ? "تسجيل الدخول" : "Sign In"}
            </button>
            <button
              onClick={() => setAuthTab("signup")}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase transition-all ${
                authTab === "signup" ? "bg-brand-terracotta text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isRTL ? "حساب جديد" : "Sign Up"}
            </button>
          </div>

          {/* Email / Password Forms */}
          <AnimatePresence mode="wait">
            {authTab === "signin" ? (
              <motion.form 
                key="signin"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                onSubmit={handleSignIn}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">{t.email}</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">{isRTL ? "كلمة المرور" : "Password"}</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-terracotta text-white text-xs rounded-xl font-bold uppercase hover:bg-brand-terracotta-dark active:scale-[0.98] transition-all shadow-sm"
                >
                  {isRTL ? "تسجيل الدخول" : "Sign In"}
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="signup"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                onSubmit={handleSignUp}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">{isRTL ? "الاسم بالكامل" : "Full Name"}</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Johnson"
                    value={authName}
                    onChange={e => setAuthName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">{t.email}</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">{t.phone} ({isRTL ? "اختياري" : "Optional"})</label>
                  <input
                    type="text"
                    placeholder="+1 (555) 123-4567"
                    value={authPhone}
                    onChange={e => setAuthPhone(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">{isRTL ? "كلمة المرور" : "Password"}</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={e => setAuthPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-terracotta text-white text-xs rounded-xl font-bold uppercase hover:bg-brand-terracotta-dark active:scale-[0.98] transition-all shadow-sm"
                >
                  {isRTL ? "إنشاء حساب" : "Create Account"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Social Logins Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="border-t border-border w-full absolute" />
            <span className="relative z-10 bg-card px-3 text-[10px] uppercase font-semibold text-muted-foreground tracking-wide">
              {isRTL ? "أو الاستمرار بواسطة" : "Or continue with"}
            </span>
          </div>

          {/* Social Sign-In buttons */}
          <div className="space-y-2.5">
            {/* Google / Gmail */}
            <button
              onClick={() => handleSocialLogin("Google")}
              className="w-full py-2.5 border border-border bg-background hover:bg-muted text-foreground rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" className="flex-shrink-0">
                <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 1 12 1 7.35 1 3.37 3.68 1.48 7.58l3.99 3.1A6.99 6.99 0 0 1 12 5.04z" />
                <path fill="#4285F4" d="M23.45 12.3c0-.82-.07-1.6-.21-2.3H12v4.35h6.43a5.5 5.5 0 0 1-2.39 3.6l3.7 2.87c2.16-2 3.71-4.94 3.71-8.52z" />
                <path fill="#FBBC05" d="M5.47 10.68A6.9 6.9 0 0 1 5 12c0 .46.05.9.14 1.32l-3.99 3.1A11.96 11.96 0 0 1 1 12c0-1.63.32-3.18.9-4.62l3.57 3.3z" />
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.7-2.87c-1.03.69-2.34 1.1-4.26 1.1-3.28 0-6.07-2.2-7.07-5.18l-3.99 3.1C3.37 20.32 7.35 23 12 23z" />
              </svg>
              <span>{isRTL ? "متابعة باستخدام جوجل" : "Continue with Google"}</span>
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleSocialLogin("Facebook")}
              className="w-full py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="white" className="flex-shrink-0">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>{isRTL ? "متابعة باستخدام فيسبوك" : "Continue with Facebook"}</span>
            </button>

            {/* Apple */}
            <button
              onClick={() => handleSocialLogin("Apple")}
              className="w-full py-2.5 bg-black hover:bg-zinc-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-sm dark:bg-white dark:hover:bg-zinc-100 dark:text-black"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="flex-shrink-0">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C3.8 16.32 3.66 9.88 7.54 9.6c1.17.07 2.03.7 2.76.7.74 0 1.95-.8 3.5-.66 1.63.14 2.87.8 3.6 1.86-3.22 1.9-2.7 6.13.25 7.32-.6 1.54-1.34 3.12-2.6 1.46zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span>{isRTL ? "متابعة باستخدام أبل" : "Continue with Apple"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Profile header (Minimal borderless transparent layout, no colored card) */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-border select-none">
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
                  className="w-20 h-20 rounded-2xl object-cover border border-border shadow-soft transition-transform group-hover:scale-95"
                />
              ) : (
                <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center text-3xl text-muted-foreground transition-all group-hover:scale-95">
                  👤
                </div>
              )}
              <div className="absolute -bottom-1 -end-1 bg-brand-terracotta text-white p-1.5 rounded-full border-2 border-background shadow-sm flex items-center justify-center transition-transform hover:scale-110">
                <Camera size={12} />
              </div>
            </label>
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-foreground text-2xl font-display leading-tight">{profile.firstName} {profile.lastName}</h2>
              <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold border border-amber-200/50">
                <Award size={10} /> {t.goldMember}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">{profile.email}</p>
            <p className="text-muted-foreground/80 text-xs mt-1.5">{isRTL ? "٣ طلبات هذا الشهر" : "3 orders this month"}</p>
          </div>
        </div>

        {/* Tabs - Synced with Hamburger Menu */}
        <div className="flex bg-card rounded-2xl p-1.5 gap-1 mb-6 border border-border shadow-soft">
          {([
            { key: "account", label: t.yourAccount },
            { key: "orders", label: t.yourOrders },
            { key: "wishlist", label: t.yourWishlist },
            { key: "settings", label: t.settings }
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
        
        {/* Tab 1: My Account / Overview */}
        {activeTab === "account" && (
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
                      <span className="text-xs font-mono font-semibold text-foreground">#{orders[0].id}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${statusColors[orders[0].status]}`}>
                        {statusTranslations[orders[0].status]?.[locale] || orders[0].status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{isRTL ? orders[0].dateAr : orders[0].dateEn}</span>
                      <span className="font-semibold text-brand-terracotta">{t.currency} {orders[0].total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedOrder(orders[0])}
                  className="w-full mt-4 py-2 bg-brand-peach/40 hover:bg-brand-peach text-brand-terracotta text-xs rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Package size={14} /> {isRTL ? "تفاصيل وتتبع الطلب" : "Details & Tracking"}
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
                  <Heart size={14} /> {isRTL ? "عرض قائمة المفضلة" : "View Full Wishlist"}
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* Tab 2: My Orders history */}
        {activeTab === "orders" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h2 className="text-foreground font-display mb-4">{t.myOrders}</h2>
            {orders.map(order => (
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
                      {order.status === "delivered" ? t.deliveredSuccessfully : order.status === "cancelled" ? (isRTL ? "تم إلغاء هذا الطلب" : "This order has been cancelled") : t.onTheWay}
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
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="text-xs bg-brand-terracotta/10 text-brand-terracotta px-3 py-1.5 rounded-lg hover:bg-brand-terracotta hover:text-white transition-all font-semibold whitespace-nowrap"
                  >
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
            
            {/* Left side settings: Profile edit form */}
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
                      onChange={e => setProfile(p => p ? { ...p, firstName: e.target.value } : null)}
                      className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">{t.lastName}</label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={e => setProfile(p => p ? { ...p, lastName: e.target.value } : null)}
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
                      onChange={e => setProfile(p => p ? { ...p, email: e.target.value } : null)}
                      className="w-full px-4 py-2.5 border border-border bg-background text-foreground rounded-xl text-sm outline-none focus:border-brand-terracotta transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">{t.phone}</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={e => setProfile(p => p ? { ...p, phone: e.target.value } : null)}
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
                  { icon: LogOut, label: t.signOut, color: "text-destructive hover:text-destructive-dark font-medium", onClick: handleSignOut },
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

      {/* Saved Addresses Modal (With Google Maps Mock Locator Picker) */}
      <AnimatePresence>
        {isAddressesOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddressesOpen(false);
                setIsAddingAddress(false);
              }}
              className="fixed inset-0 bg-brand-ink/45 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 bottom-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full max-w-md bg-card border border-border rounded-3xl p-6 z-50 shadow-elev overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-foreground font-display text-base sm:text-lg">{t.savedAddresses}</h3>
                <button 
                  onClick={() => {
                    setIsAddressesOpen(false);
                    setIsAddingAddress(false);
                  }} 
                  className="text-muted-foreground hover:text-foreground p-1"
                >
                  <X size={18} />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isAddingAddress ? (
                  <motion.form
                    key="add-address-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleSaveAddress}
                    className="space-y-4 border border-border/80 rounded-2xl p-4 bg-background/50 mb-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase text-brand-terracotta">
                        {isRTL ? "إضافة عنوان جديد" : "Add New Location"}
                      </h4>
                      <span className="text-[10px] bg-brand-peach text-brand-terracotta px-2 py-0.5 rounded-full font-medium flex items-center gap-1 select-none">
                        📍 Google Maps Enabled
                      </span>
                    </div>

                    {/* Google Maps Visual Interactive Simulator Block */}
                    <div className="border border-border rounded-2xl overflow-hidden relative">
                      {/* Search header on map */}
                      <div className="p-2 bg-card/95 backdrop-blur-md border-b border-border flex gap-2 relative z-10">
                        <input
                          type="text"
                          placeholder={isRTL ? "ابحث في خرائط جوجل..." : "Search Google Maps..."}
                          value={mapSearch}
                          onChange={e => setMapSearch(e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-background border border-border rounded-xl text-xs outline-none text-foreground placeholder:text-muted-foreground focus:border-brand-terracotta"
                          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleMapSearch())}
                        />
                        <button
                          type="button"
                          onClick={handleMapSearch}
                          disabled={isMapSearching}
                          className="px-4 py-1.5 bg-brand-terracotta text-white rounded-xl text-xs font-semibold hover:bg-brand-terracotta-dark disabled:opacity-50 transition-colors"
                        >
                          {isMapSearching ? "..." : (isRTL ? "بحث" : "Search")}
                        </button>
                      </div>

                      <LeafletMap 
                        centerCoords={mapCenter} 
                        isRTL={isRTL} 
                        onLocationSelect={(addr, coords) => {
                          setNewAddrDetails(addr);
                          setMapCenter(coords);
                        }} 
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-muted-foreground mb-1">
                        {isRTL ? "اسم وتصنيف العنوان (مثال: المنزل، العمل)" : "Label / Address Type (e.g. Home, Work)"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isRTL ? "المنزل" : "Home"}
                        value={newAddrType}
                        onChange={e => setNewAddrType(e.target.value)}
                        className="w-full px-3 py-2 border border-border bg-card text-foreground rounded-lg text-xs outline-none focus:border-brand-terracotta"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] text-muted-foreground mb-1">
                        {isRTL ? "تفاصيل العنوان الجغرافي المستلم" : "Geocoded Street Address / Location Coordinates"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isRTL ? "انقر على الخريطة للحصول على الموقع" : "Tap the map above to autofill location info"}
                        value={newAddrDetails}
                        onChange={e => setNewAddrDetails(e.target.value)}
                        className="w-full px-3 py-2 border border-border bg-card text-foreground rounded-lg text-xs outline-none focus:border-brand-terracotta"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-brand-terracotta text-white rounded-lg text-xs font-semibold hover:bg-brand-terracotta-dark"
                      >
                        {isRTL ? "حفظ العنوان" : "Save Location"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingAddress(false);
                          setNewAddrDetails("");
                          setNewAddrType("");
                        }}
                        className="px-4 py-2 border border-border text-foreground hover:bg-muted rounded-lg text-xs"
                      >
                        {isRTL ? "إلغاء" : "Cancel"}
                      </button>
                    </div>
                  </motion.form>
                ) : null}
              </AnimatePresence>

              <div className="space-y-3">
                {addresses.map(addr => (
                  <div key={addr.id} className="bg-background border border-border/60 rounded-xl p-3.5 flex justify-between items-start">
                    <div>
                      <span className="bg-brand-peach text-brand-terracotta text-xs px-2.5 py-0.5 rounded-full font-medium mb-1 inline-block">
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

                {!isAddingAddress && (
                  <button 
                    onClick={() => setIsAddingAddress(true)}
                    className="w-full py-2.5 bg-brand-peach text-brand-terracotta hover:bg-brand-terracotta hover:text-white rounded-xl text-xs font-semibold uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={14} /> {isRTL ? "تحديد عنوان جديد بخرائط جوجل" : "Pin Location on Google Maps"}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Payment Methods Modal (With clean card brand detection form) */}
      <AnimatePresence>
        {isPaymentsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsPaymentsOpen(false);
                setIsAddingCard(false);
              }}
              className="fixed inset-0 bg-brand-ink/45 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 bottom-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full max-w-md bg-card border border-border rounded-3xl p-6 z-50 shadow-elev overflow-y-auto max-h-[85vh]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-foreground font-display text-base sm:text-lg">{t.paymentMethods}</h3>
                <button 
                  onClick={() => {
                    setIsPaymentsOpen(false);
                    setIsAddingCard(false);
                  }} 
                  className="text-muted-foreground hover:text-foreground p-1"
                >
                  <X size={18} />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isAddingCard ? (
                  <motion.form
                    key="add-card-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleSaveCard}
                    className="space-y-3.5 border border-border/80 rounded-2xl p-4 bg-background/50 mb-3"
                  >
                    <h4 className="text-xs font-semibold uppercase text-brand-terracotta">
                      {isRTL ? "إضافة بطاقة دفع جديدة" : "Add New Payment Card"}
                    </h4>
                    
                    <div>
                      <label className="block text-[10px] text-muted-foreground mb-1">{t.cardNumber}</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={19}
                          placeholder="4242 4242 4242 4242"
                          value={newCardNumber}
                          onChange={e => {
                            const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                            setNewCardNumber(v);
                          }}
                          className="w-full px-3 py-2 border border-border bg-card text-foreground rounded-lg text-xs outline-none focus:border-brand-terracotta font-mono"
                        />
                        <span className="absolute end-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-brand-terracotta uppercase">
                          {detectedBrand || <CreditCard size={14} className="text-muted-foreground" />}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-muted-foreground mb-1">{t.cardName}</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Johnson"
                        value={newCardName}
                        onChange={e => setNewCardName(e.target.value)}
                        className="w-full px-3 py-2 border border-border bg-card text-foreground rounded-lg text-xs outline-none focus:border-brand-terracotta"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-muted-foreground mb-1">{t.expiry} (MM/YY)</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="12/28"
                          value={newCardExpiry}
                          onChange={e => {
                            let v = e.target.value.replace(/\D/g, "");
                            if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2, 4)}`;
                            setNewCardExpiry(v);
                          }}
                          className="w-full px-3 py-2 border border-border bg-card text-foreground rounded-lg text-xs outline-none focus:border-brand-terracotta text-center font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-muted-foreground mb-1">CVV</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          placeholder="***"
                          value={newCardCvv}
                          onChange={e => setNewCardCvv(e.target.value.replace(/\D/g, ""))}
                          className="w-full px-3 py-2 border border-border bg-card text-foreground rounded-lg text-xs outline-none focus:border-brand-terracotta text-center font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-brand-terracotta text-white rounded-lg text-xs font-semibold hover:bg-brand-terracotta-dark"
                      >
                        {isRTL ? "إضافة البطاقة" : "Save Card"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingCard(false)}
                        className="px-4 py-2 border border-border text-foreground hover:bg-muted rounded-lg text-xs"
                      >
                        {isRTL ? "إلغاء" : "Cancel"}
                      </button>
                    </div>
                  </motion.form>
                ) : null}
              </AnimatePresence>

              <div className="space-y-3">
                {payments.map(pay => (
                  <div key={pay.id} className="bg-background border border-border/60 rounded-xl p-3.5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-7 bg-brand-peach/40 rounded flex items-center justify-center font-bold text-[10px] text-brand-terracotta uppercase border border-brand-terracotta/10">
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

                {!isAddingCard && (
                  <button 
                    onClick={() => setIsAddingCard(true)}
                    className="w-full py-2.5 bg-brand-peach text-brand-terracotta hover:bg-brand-terracotta hover:text-white rounded-xl text-xs font-semibold uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={14} /> {isRTL ? "إضافة بطاقة جديدة" : "Add New Card"}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Amazon-Style Order Details & Progress Tracking Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-brand-ink/45 backdrop-blur-sm z-50 animate-fade-in"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="fixed inset-x-4 bottom-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full max-w-2xl bg-card border border-border rounded-3xl p-5 sm:p-6 z-50 shadow-elev overflow-y-auto max-h-[92vh] scrollbar-hide"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-border/80 pb-4 mb-4 select-none">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{isRTL ? "تفاصيل الطلب" : "Order details"}</span>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <h3 className="text-foreground text-base sm:text-lg font-bold font-mono">#{selectedOrder.id}</h3>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${statusColors[selectedOrder.status]}`}>
                      {statusTranslations[selectedOrder.status]?.[locale] || selectedOrder.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {isRTL ? "تاريخ الطلب:" : "Ordered on:"} {isRTL ? selectedOrder.dateAr : selectedOrder.dateEn}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)} 
                  className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Delivery Progress Stages Tracker */}
              <div className="bg-background/40 border border-border/60 rounded-2xl p-4 sm:p-5 mb-5 select-none">
                <h4 className="text-xs font-semibold text-foreground mb-4">
                  {isRTL ? "حالة شحنتك ومراحل التوصيل" : "Delivery Progress & Tracking Timeline"}
                </h4>
                
                {/* Cancellation status timeline override */}
                {selectedOrder.status === "cancelled" ? (
                  <div className="flex items-center gap-3 bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/30 p-3 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      ✕
                    </div>
                    <div>
                      <p className="text-xs font-bold text-red-700 dark:text-red-400">{isRTL ? "تم إلغاء هذا الطلب" : "This order has been cancelled"}</p>
                      <p className="text-[10px] text-muted-foreground">{isRTL ? "تمت معالجة الإلغاء بناءً على طلبك" : "The order cancellation has been processed successfully"}</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Horizontal Connector Line for desktop, vertical for mobile */}
                    <div className="absolute top-[13px] start-4 end-4 h-0.5 bg-muted hidden sm:block" />
                    <div className="absolute top-4 bottom-4 start-[13px] w-0.5 bg-muted sm:hidden" />
                    
                    {/* Progress Fill bar (Desktop) */}
                    <div 
                      className="absolute top-[13px] start-4 h-0.5 bg-brand-terracotta hidden sm:block transition-all duration-500" 
                      style={{ 
                        width: selectedOrder.status === "delivered" 
                          ? "92%" 
                          : selectedOrder.status === "shipped" 
                            ? "61%" 
                            : "30%" 
                      }} 
                    />

                    {/* Timeline steps */}
                    <div className="flex flex-col sm:flex-row justify-between gap-5 sm:gap-2 relative z-10">
                      {[
                        { step: "placed", labelEn: "Placed", labelAr: "تم الطلب", dateEn: selectedOrder.dateEn, dateAr: selectedOrder.dateAr, active: true },
                        { step: "processing", labelEn: "Processing", labelAr: "قيد التحضير", dateEn: selectedOrder.dateEn, dateAr: selectedOrder.dateAr, active: true },
                        { step: "shipped", labelEn: "Shipped", labelAr: "شحن الطلب", dateEn: selectedOrder.courier?.estDateEn || "In Transit", dateAr: selectedOrder.courier?.estDateAr || "قيد الشحن", active: ["shipped", "delivered"].includes(selectedOrder.status) },
                        { step: "delivered", labelEn: "Delivered", labelAr: "تم التوصيل", dateEn: selectedOrder.courier?.estDateEn || "Expected soon", dateAr: selectedOrder.courier?.estDateAr || "متوقع قريباً", active: selectedOrder.status === "delivered" }
                      ].map((stage, idx) => (
                        <div key={stage.step} className="flex sm:flex-col items-start sm:items-center text-center gap-3 sm:gap-1.5 flex-1">
                          {/* Circle Badge Indicator */}
                          <div 
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all flex-shrink-0 ${
                              stage.active 
                                ? "bg-brand-terracotta border-brand-terracotta text-white shadow-sm" 
                                : "bg-card border-muted text-muted-foreground"
                            }`}
                          >
                            {stage.active ? "✓" : idx + 1}
                          </div>
                          <div className="text-start sm:text-center leading-tight">
                            <p className={`text-xs font-semibold ${stage.active ? "text-foreground" : "text-muted-foreground"}`}>
                              {isRTL ? stage.labelAr : stage.labelEn}
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {isRTL ? stage.dateAr : stage.dateEn}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Courier Panel (Rendered if shipped or delivered) */}
              {selectedOrder.courier && selectedOrder.status !== "cancelled" && (
                <div className="bg-brand-peach/25 border border-brand-terracotta/10 rounded-2xl p-4 mb-5 flex items-center justify-between gap-4 select-none flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🚚</span>
                    <div className="text-xs">
                      <p className="text-foreground font-semibold">
                        {isRTL ? `الشحن عبر ${selectedOrder.courier.company}` : `Shipped with ${selectedOrder.courier.company}`}
                      </p>
                      <p className="text-muted-foreground mt-0.5">
                        {isRTL 
                          ? `كود التتبع: ${selectedOrder.courier.trackingCode}` 
                          : `Tracking Code: ${selectedOrder.courier.trackingCode}`
                        }
                      </p>
                      {selectedOrder.courier.phone && (
                        <p className="text-muted-foreground mt-0.5 flex items-center gap-1">
                          📞 {isRTL ? "هاتف المندوب:" : "Courier Phone:"} <span className="font-mono text-foreground font-semibold">{selectedOrder.courier.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => copyToClipboard(selectedOrder.courier.trackingCode)}
                    className="py-1.5 px-3 bg-brand-peach text-brand-terracotta text-[10px] font-bold rounded-lg border border-brand-terracotta/20 hover:bg-brand-terracotta hover:text-white transition-all flex items-center gap-1.5"
                  >
                    {isCopied ? <Check size={12} /> : <Copy size={12} />}
                    {isCopied ? (isRTL ? "تم النسخ" : "Copied!") : (isRTL ? "نسخ الكود" : "Copy Code")}
                  </button>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3.5 mb-6">
                <h4 className="text-xs font-semibold uppercase text-brand-ink-soft select-none">
                  {isRTL ? "محتويات الشحنة" : "Shipment Items"}
                </h4>
                {selectedOrder.products?.map((prod: any, i: number) => (
                  <div key={i} className="flex justify-between items-center gap-3 border-b border-border/40 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted p-1 rounded-xl flex items-center justify-center flex-shrink-0 border border-border/30">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="text-xs">
                        <p className="text-foreground font-medium">{isRTL ? prod.nameAr : prod.name}</p>
                        <p className="text-muted-foreground mt-0.5">{isRTL ? "الكمية:" : "Qty:"} {prod.quantity}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-foreground font-mono">
                      {t.currency} {prod.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Amazon-Style Receipt Breakdown Grid */}
              <div className="border-t border-border pt-4 mb-6">
                <h4 className="text-xs font-semibold uppercase text-brand-ink-soft mb-3 select-none">
                  {isRTL ? "تفاصيل الدفع وملخص الحساب" : "Payment & Order Pricing Summary"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-muted/20 border border-border/60 rounded-2xl p-4">
                  {/* Left Column: Payment Details & Shipping Address */}
                  <div className="space-y-4 border-b sm:border-b-0 sm:border-e border-border/80 pb-3 sm:pb-0 sm:pe-6">
                    <div>
                      <p className="text-muted-foreground uppercase text-[10px] tracking-wider font-semibold select-none">
                        {isRTL ? "طريقة الدفع" : "Payment Method"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <CreditCard size={15} className="text-brand-ink-soft" />
                        <span className="font-mono text-foreground font-medium">Visa **** 4242</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1 select-none">
                        🔒 {t.paymentSecureNote}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground uppercase text-[10px] tracking-wider font-semibold select-none">
                        {isRTL ? "عنوان الشحن" : "Shipping Address"}
                      </p>
                      <p className="text-foreground font-medium mt-1 font-sans">
                        {isRTL ? selectedOrder.deliveryAddressAr : selectedOrder.deliveryAddress}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Receipt Breakdown (Amazon Style) */}
                  <div className="space-y-2 font-mono">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{isRTL ? "المجموع الفرعي:" : "Subtotal:"}</span>
                      <span className="text-foreground font-medium">{t.currency} {selectedOrder.receipt.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{isRTL ? "الشحن:" : "Shipping:"}</span>
                      <span className="text-foreground font-medium">
                        {selectedOrder.receipt.shipping === 0 
                          ? (isRTL ? "مجاني" : "FREE") 
                          : `${t.currency} ${selectedOrder.receipt.shipping.toFixed(2)}`
                        }
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-red-600 dark:text-red-400">
                      <span>{isRTL ? "خصم الكوبون:" : "Discount:"}</span>
                      <span>-{t.currency} {selectedOrder.receipt.discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border/80 pt-2 text-sm font-bold text-brand-terracotta">
                      <span className="font-sans select-none">{isRTL ? "الإجمالي الكلي:" : "Total Charged:"}</span>
                      <span>{t.currency} {selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer (Render Cancel button if placed or processing) */}
              <div className="flex gap-2 justify-end select-none">
                {["placed", "processing"].includes(selectedOrder.status) ? (
                  <button
                    onClick={() => {
                      if (confirm(isRTL ? "هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟" : "Are you sure you want to cancel this order?")) {
                        handleCancelOrder(selectedOrder.id);
                      }
                    }}
                    className="w-full sm:w-auto py-2.5 px-6 bg-red-600 text-white hover:bg-red-700 text-xs rounded-xl font-bold uppercase transition-colors shadow-sm"
                  >
                    {isRTL ? "إلغاء الطلب" : "Cancel Order"}
                  </button>
                ) : selectedOrder.status === "cancelled" ? (
                  <p className="text-xs text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-950/20 px-3 py-1.5 rounded-xl border border-red-200/50 border-dashed">
                    ⚠️ {isRTL ? "تم إلغاء هذه العملية بنجاح" : "This purchase transaction is cancelled"}
                  </p>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/40 border border-border/80 px-3.5 py-1.5 rounded-xl">
                    <Info size={14} className="text-brand-ink-soft" />
                    <span>
                      {selectedOrder.status === "delivered" 
                        ? (isRTL ? "تم التوصيل ولا يمكن إلغاؤه" : "Order delivered, cancellation closed")
                        : (isRTL ? "الطلب قيد الشحن ولا يمكن إلغاؤه" : "Order shipped, cancellation closed")
                      }
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="h-20 sm:h-4" />
    </div>
  );
}
