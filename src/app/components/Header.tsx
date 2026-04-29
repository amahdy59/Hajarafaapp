import { useState, useEffect } from "react";
import { Search, ShoppingBag, Heart, Mic, MapPin, Menu, Sun, Moon, Languages } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { SettingsDrawer } from "./SettingsDrawer";
import { motion } from "motion/react";

export function Header() {
  const { totalItems, setCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { t, isRTL, theme, toggleTheme, locale, toggleLocale } = useAppSettings();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const departmentPills = [
    { label: t.shopAll, to: "/products", icon: "🛍" },
    { label: isRTL ? "قهوة" : "Coffee", to: "/category/coffee-drinks", icon: "☕" },
    { label: isRTL ? "بهارات" : "Spices", to: "/category/spices", icon: "🌶" },
    { label: isRTL ? "مكسرات" : "Nuts", to: "/category/nuts", icon: "🌰" },
    { label: isRTL ? "عسل" : "Honey", to: "/category/honey", icon: "🍯" },
    { label: isRTL ? "تمور" : "Dates", to: "/category/yamish-dates", icon: "🌴" },
    { label: isRTL ? "تجميل" : "Cosmetics", to: "/category/cosmetics", icon: "✨" },
    { label: isRTL ? "بخور" : "Incense", to: "/category/incense", icon: "🪔" },
    { label: t.todaysDeals, to: "/products?filter=deals", icon: "🔥" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
    <SettingsDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    <header
      className={`fixed top-0 left-0 right-0 z-30 bg-background/85 backdrop-blur-xl transition-shadow ${
        scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      {/* Row 1: brand + actions */}
      <div className="px-4 sm:px-6 pt-[max(env(safe-area-inset-top),8px)] pb-2 flex items-center gap-1.5">
        <button
          onClick={() => setMenuOpen(true)}
          className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center"
          aria-label={t.menu}
        >
          <Menu size={22} className="text-foreground" />
        </button>

        <Link to="/" className="flex items-center gap-2 flex-shrink-0 mr-auto">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-display">H</span>
          </div>
          <div className="leading-none">
            <span className="block text-foreground tracking-tight font-display">{t.appName}</span>
            <span className="hidden sm:block text-muted-foreground tracking-wide uppercase" style={{ fontSize: "10px" }}>
              {t.appTagline}
            </span>
          </div>
        </Link>

        <button
          onClick={toggleLocale}
          className="h-10 px-3 rounded-full hover:bg-muted flex items-center gap-1 text-foreground"
          aria-label={t.language}
          title={t.language}
        >
          <Languages size={18} />
          <span style={{ fontSize: "0.75rem" }}>{locale === "en" ? "EN" : "ع"}</span>
        </button>

        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center text-foreground"
          aria-label={t.theme}
          title={t.theme}
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <Link
          to="/wishlist"
          className="hidden sm:flex relative w-10 h-10 rounded-full hover:bg-muted items-center justify-center"
          aria-label={t.favourites}
        >
          <Heart size={20} className="text-foreground" />
          {wishlistItems.length > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 bg-primary text-primary-foreground rounded-full flex items-center justify-center" style={{ fontSize: "10px" }}>
              {wishlistItems.length}
            </span>
          )}
        </Link>

        <button
          onClick={() => setCartOpen(true)}
          className="relative w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center"
          aria-label={t.cart}
        >
          <ShoppingBag size={20} className="text-foreground" />
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 bg-primary text-primary-foreground rounded-full flex items-center justify-center"
              style={{ fontSize: "10px" }}
            >
              {totalItems}
            </motion.span>
          )}
        </button>
      </div>

      {/* Deliver-to row */}
      <div className="px-4 sm:px-6 pb-1.5 flex items-center gap-1.5 text-muted-foreground" style={{ fontSize: "11px" }}>
        <MapPin size={12} className="text-primary" />
        <span>{t.deliverTo}</span>
        <span className="text-foreground">{t.location}</span>
      </div>

      {/* Row 2: pill search */}
      <div className="px-4 sm:px-6 pb-2">
        <form onSubmit={handleSearch}>
          <div className="relative flex items-center bg-card rounded-full border border-border focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/15 transition-all">
            <Search size={17} className={`absolute ${isRTL ? "right-4" : "left-4"} text-muted-foreground`} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full ${isRTL ? "pr-11 pl-12" : "pl-11 pr-12"} py-2.5 bg-transparent rounded-full text-foreground placeholder:text-muted-foreground outline-none`}
              style={{ fontSize: "0.875rem" }}
            />
            <button
              type="button"
              aria-label="Voice search"
              className={`absolute ${isRTL ? "left-1" : "right-1"} w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center`}
            >
              <Mic size={17} className="text-muted-foreground" />
            </button>
          </div>
        </form>
      </div>

      {/* Row 3: department chips */}
      <nav className="border-t border-border/70 bg-background/60">
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {departmentPills.map(p => {
            const active = location.pathname + location.search === p.to ||
              (p.to.startsWith("/category/") && location.pathname === p.to);
            return (
              <Link
                key={p.to}
                to={p.to}
                className={`snap-start flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  active
                    ? "bg-foreground text-background"
                    : "bg-card text-foreground border border-border hover:border-primary/40"
                }`}
                style={{ fontSize: "0.75rem" }}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
    </>
  );
}
