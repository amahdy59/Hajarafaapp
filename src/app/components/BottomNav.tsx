import { Home, ShoppingBag, Heart, Menu } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAppSettings } from "../context/AppSettingsContext";
import { SettingsDrawer } from "./SettingsDrawer";
import { motion } from "motion/react";

export function BottomNav() {
  const location = useLocation();
  const { totalItems, setCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { t } = useAppSettings();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === "/";
  const isFav = location.pathname.startsWith("/wishlist");

  type Item = {
    key: string;
    icon: typeof Home;
    label: string;
    active: boolean;
    badge?: number;
    onClick?: () => void;
    to?: string;
  };

  const items: Item[] = [
    { key: "home", icon: Home, label: t.home, active: isHome, to: "/" },
    { key: "fav", icon: Heart, label: t.favourites, active: isFav, badge: wishlistItems.length, to: "/wishlist" },
    { key: "cart", icon: ShoppingBag, label: t.cart, active: false, badge: totalItems, onClick: () => setCartOpen(true) },
    { key: "menu", icon: Menu, label: t.menu, active: menuOpen, onClick: () => setMenuOpen(true) },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-card/95 backdrop-blur-xl border-t border-border safe-area-pb">
        <div className="grid grid-cols-4">
          {items.map(item => {
            const Icon = item.icon;
            const inner = (
              <div className="flex flex-col items-center justify-center pt-2 pb-1.5 relative">
                {item.active && (
                  <motion.div
                    layoutId="bottomNavBar"
                    className="absolute top-0 h-0.5 w-10 bg-primary rounded-full"
                  />
                )}
                <div className="relative">
                  <Icon
                    size={24}
                    className={`transition-colors ${item.active ? "text-primary" : "text-muted-foreground"}`}
                    strokeWidth={item.active ? 2.2 : 1.8}
                    fill={item.active && item.key === "fav" ? "currentColor" : "none"}
                  />
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 bg-primary text-primary-foreground rounded-full flex items-center justify-center" style={{ fontSize: "10px" }}>
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className={`mt-1 transition-colors ${item.active ? "text-primary" : "text-muted-foreground"}`} style={{ fontSize: "10.5px" }}>
                  {item.label}
                </span>
              </div>
            );

            if (item.to && !item.onClick) {
              return (
                <Link key={item.key} to={item.to} className="active:bg-muted/50 transition-colors">
                  {inner}
                </Link>
              );
            }
            return (
              <button key={item.key} onClick={item.onClick} className="active:bg-muted/50 transition-colors">
                {inner}
              </button>
            );
          })}
        </div>
      </nav>

      <SettingsDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
