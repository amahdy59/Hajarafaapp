import { Home, Store, Search, ShoppingBag, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion, AnimatePresence } from "motion/react";

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, setCartOpen } = useCart();
  const { t } = useAppSettings();

  const items = [
    { key: "home", icon: Home, label: t.home, to: "/" },
    { key: "shop", icon: Store, label: t.shopAll, to: "/products" },
    { key: "search", icon: Search, label: t.searchPlaceholder.split(" ")[0], onClick: () => navigate("/search") },
    { key: "cart", icon: ShoppingBag, label: t.cart, onClick: () => setCartOpen(true), badge: totalItems },
    { key: "profile", icon: User, label: t.account, to: "/account" },
  ];

  const activeKey = (() => {
    if (location.pathname === "/") return "home";
    if (location.pathname.startsWith("/products") || location.pathname.startsWith("/category")) return "shop";
    if (location.pathname.startsWith("/search")) return "search";
    if (location.pathname.startsWith("/account") || location.pathname.startsWith("/wishlist")) return "profile";
    return "";
  })();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-30 bg-background/95 backdrop-blur-xl border-t border-border sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex items-stretch justify-around px-1 pt-1.5">
        {items.map(item => {
          const Icon = item.icon;
          const active = activeKey === item.key;
          const inner = (
            <div className="flex flex-col items-center justify-center gap-1 pt-1.5 pb-1 min-w-[56px]">
              <div className="relative h-7 w-12 flex items-center justify-center">
                {active && (
                  <motion.div
                    layoutId="bottomNavPill"
                    className="absolute inset-0 bg-brand-terracotta rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon
                  size={18}
                  className={`relative z-10 ${active ? "text-white" : "text-brand-ink-soft"}`}
                  strokeWidth={active ? 2.2 : 1.8}
                />
                <AnimatePresence mode="wait">
                  {item.badge && item.badge > 0 ? (
                    <motion.span
                      key={item.badge}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="absolute -top-0.5 end-1 min-w-[16px] h-4 px-1 bg-brand-terracotta text-white rounded-full flex items-center justify-center z-20 border border-background"
                      style={{ fontSize: "9px" }}
                    >
                      {item.badge > 99 ? "99+" : item.badge}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </div>
              <span
                className={active ? "text-brand-forest" : "text-brand-ink-soft"}
                style={{ fontSize: "10.5px", letterSpacing: "0.6px" }}
              >
                {item.label}
              </span>
            </div>
          );

          return (
            <li key={item.key} className="flex-1">
              {item.to && !item.onClick ? (
                <Link to={item.to} className="flex justify-center w-full active:opacity-60 transition-opacity">
                  {inner}
                </Link>
              ) : (
                <button onClick={item.onClick} className="flex justify-center w-full active:opacity-60 transition-opacity">
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
