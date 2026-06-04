import { Outlet, useLocation } from "react-router";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { CartDrawer } from "./components/CartDrawer";

export function Root() {
  const location = useLocation();
  const isCheckout = location.pathname === "/checkout";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans w-full max-w-full overflow-x-hidden">
      {!isCheckout && <Header />}

      {isCheckout ? (
        <div className="pt-0 w-full max-w-full overflow-x-hidden">
          <div className="bg-card border-b border-border px-4 py-3.5 safe-area-pt">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-terracotta rounded-full flex items-center justify-center">
                  <span className="text-white font-display" style={{ fontSize: "0.95rem" }}>H</span>
                </div>
                <span className="text-foreground font-display" style={{ fontSize: "1rem" }}>HajArafa</span>
              </div>
              <span className="text-muted-foreground flex items-center gap-1" style={{ fontSize: "0.8rem" }}>
                🔒 Secure Checkout
              </span>
            </div>
          </div>
          <Outlet />
        </div>
      ) : (
        <main className={`${!["/checkout", "/account"].includes(location.pathname) ? "pt-[108px]" : "pt-16"} pb-24 sm:pb-8 w-full max-w-full overflow-x-hidden`}>
          <Outlet />
        </main>
      )}

      <CartDrawer />
      <BottomNav />
      <Toaster position="top-center" />
    </div>
  );
}
