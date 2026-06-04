import { useState, useEffect } from "react";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { SettingsDrawer } from "./SettingsDrawer";
import { IconButton } from "./ui/IconButton";
import { motion, AnimatePresence } from "motion/react";
import { categories } from "../data/categories";

export function Header() {
  const { totalItems, setCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { t, isRTL } = useAppSettings();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { setSearchOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <>
      <SettingsDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      <header
        className={`fixed top-0 inset-x-0 z-30 bg-background/90 backdrop-blur-xl transition-shadow safe-area-pt ${
          scrolled ? "shadow-soft border-b border-border" : "border-b border-transparent"
        }`}
      >
        <div className="h-16 px-3 sm:px-4 max-w-[1280px] mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <IconButton onClick={() => setMenuOpen(true)} aria-label={t.menu}>
            <Menu size={20} />
          </IconButton>

          <Link to="/" className="flex items-center justify-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-full bg-brand-terracotta flex items-center justify-center flex-shrink-0">
              <span className="font-display text-white" style={{ fontSize: "1.05rem" }}>H</span>
            </div>
            <span
              className="font-display text-foreground truncate hidden xs:inline sm:inline"
              style={{ fontSize: "1.15rem", letterSpacing: "-0.01em" }}
            >
              {t.appName}
            </span>
          </Link>

          <div className="flex items-center gap-0.5">
            <IconButton onClick={() => setSearchOpen(true)} aria-label={t.searchPlaceholder}>
              <Search size={19} />
            </IconButton>
            <IconButton
              onClick={() => navigate("/wishlist")}
              aria-label={t.favourites}
              badge={wishlistItems.length}
              className="hidden sm:flex"
            >
              <Heart size={19} />
            </IconButton>
            <IconButton onClick={() => setCartOpen(true)} aria-label={t.cart} badge={totalItems}>
              <ShoppingBag size={19} />
            </IconButton>
          </div>
        </div>

        {/* Category Navigation Rail */}
        {!["/checkout", "/account"].includes(location.pathname) && (
          <div className="border-t border-border overflow-x-auto scrollbar-hide py-2 px-3 sm:px-4 w-full max-w-full">
            <div className="max-w-[1280px] mx-auto flex gap-2 w-max">
              <Link
                to="/products"
                className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all border flex-shrink-0 font-medium ${
                  location.pathname === "/products" && !searchParams.get("category")
                    ? "bg-brand-terracotta text-white border-brand-terracotta"
                    : "bg-card text-foreground border-border hover:bg-brand-peach"
                }`}
              >
                {isRTL ? "الكل" : "All Products"}
              </Link>
              {categories.map(cat => {
                const catName = isRTL && cat.nameAr ? cat.nameAr : cat.name;
                const active = location.pathname === `/category/${cat.slug}` ||
                               (location.pathname === "/products" && searchParams.get("category") === cat.slug);
                return (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all border flex-shrink-0 font-medium ${
                      active
                        ? "bg-brand-terracotta text-white border-brand-terracotta"
                        : "bg-card text-foreground border-border hover:bg-brand-peach"
                    }`}
                  >
                    <span className="me-1">{cat.icon}</span> {catName}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-ink/40 backdrop-blur-sm z-40"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed top-0 inset-x-0 z-50 bg-background safe-area-pt shadow-soft"
            >
              <form onSubmit={submit} className="px-3 sm:px-4 py-3 flex items-center gap-2 max-w-[1280px] mx-auto">
                <div className="relative flex-1 flex items-center bg-input rounded-full border border-border focus-within:border-brand-sage transition-colors">
                  <Search size={17} className="absolute start-4 text-brand-ink-soft pointer-events-none" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full ps-11 pe-4 py-3 bg-transparent text-foreground placeholder:text-brand-ink-soft outline-none"
                    style={{ fontSize: "0.95rem" }}
                  />
                </div>
                <IconButton type="button" onClick={() => setSearchOpen(false)} aria-label="Close">
                  <X size={20} />
                </IconButton>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
