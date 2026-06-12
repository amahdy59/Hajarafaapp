import { useState, useEffect } from "react";
import { Search, ShoppingBag, Heart, Menu, X, Languages, Sun, Moon } from "lucide-react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { SettingsDrawer } from "./SettingsDrawer";
import { IconButton } from "./ui/IconButton";
import { motion, AnimatePresence } from "motion/react";
import { categories } from "../data/categories";
import logoImg from "../../assets/logo.webp";

export function Header() {
  const { totalItems, setCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, setTheme, locale, setLocale, t, isRTL } = useAppSettings();
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
      navigate(`/products?q=${encodeURIComponent(q)}`);
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
        <div className="relative h-16 px-4 sm:px-6 max-w-[1280px] mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center justify-start z-10 -ms-2 sm:-ms-2.5">
            <IconButton onClick={() => setMenuOpen(true)} aria-label={t.menu}>
              <Menu size={20} />
            </IconButton>
          </div>

          <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center min-w-0 h-14 select-none cursor-pointer w-fit no-underline z-10">
            <img src={logoImg} alt="HajArafa Logo" className="h-9 xs:h-12 sm:h-14 w-auto object-contain max-w-[42vw] sm:max-w-[220px] select-none" />
          </Link>

          <div className="flex items-center gap-0.5 justify-end z-10 -me-2 sm:-me-2.5">
            <div className="hidden lg:flex items-center gap-0.5 me-2 border-e border-border pe-2">
              <IconButton onClick={() => setLocale(locale === "en" ? "ar" : "en")} aria-label={t.language}>
                <div className="flex items-center justify-center font-bold text-sm leading-none pt-0.5 w-5 h-5">
                  {locale === "en" ? "ع" : "EN"}
                </div>
              </IconButton>
              <IconButton onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={t.theme}>
                {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
              </IconButton>
            </div>
            <IconButton onClick={() => navigate("/products")} aria-label={t.searchPlaceholder} className="hidden sm:flex">
              <Search size={19} />
            </IconButton>
            <IconButton
              onClick={() => navigate("/account?tab=wishlist")}
              aria-label={t.favourites}
              badge={wishlistItems.length}
              className="flex"
            >
              <Heart size={19} />
            </IconButton>
            <IconButton 
              onClick={() => setCartOpen(true)} 
              aria-label={t.cart} 
              badge={totalItems}
              className="hidden sm:flex"
            >
              <ShoppingBag size={19} />
            </IconButton>
          </div>
        </div>

        {/* Category Navigation Rail */}
        {(location.pathname === "/" || location.pathname.startsWith("/category/") || location.pathname === "/products") && (
          <div className="hidden sm:block border-t border-border">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-hide py-2.5">
              <div className="flex gap-2 w-max">
                <Link
                  to="/products"
                  className={`group flex items-center gap-2 px-3.5 py-1.5 bg-card rounded-full border transition-all duration-300 hover:shadow-soft flex-shrink-0 select-none ${
                    location.pathname === "/products" && !searchParams.get("category")
                      ? "border-brand-terracotta bg-brand-peach/30"
                      : "border-border hover:border-brand-sage"
                  }`}
                >
                  <div className="w-5.5 h-5.5 rounded-full bg-brand-peach flex items-center justify-center text-[10px] flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    📦
                  </div>
                  <span className={`text-[10px] sm:text-xs font-semibold ${location.pathname === "/products" && !searchParams.get("category") ? "text-brand-terracotta font-bold" : "text-foreground"}`}>
                    {isRTL ? "الكل" : "All Products"}
                  </span>
                </Link>
                {categories.map(cat => {
                  const catName = isRTL && cat.nameAr ? cat.nameAr : cat.name;
                  const active = location.pathname === `/category/${cat.slug}` ||
                                 (location.pathname === "/products" && searchParams.get("category") === cat.slug);
                  return (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className={`group flex items-center gap-2 px-3.5 py-1.5 bg-card rounded-full border transition-all duration-300 hover:shadow-soft flex-shrink-0 select-none ${
                        active
                          ? "border-brand-terracotta bg-brand-peach/30"
                          : "border-border hover:border-brand-sage"
                      }`}
                    >
                      <div className="w-5.5 h-5.5 rounded-full bg-brand-peach flex items-center justify-center text-[10px] flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {cat.icon}
                      </div>
                      <span className={`text-[10px] sm:text-xs font-semibold ${active ? "text-brand-terracotta font-bold" : "text-foreground"}`}>
                        {catName}
                      </span>
                    </Link>
                  );
                })}
              </div>
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
              <form onSubmit={submit} className="px-4 sm:px-6 py-3 flex items-center gap-2 max-w-[1280px] mx-auto">
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
