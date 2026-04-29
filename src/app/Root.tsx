import { Outlet, useLocation } from "react-router";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { CartDrawer } from "./components/CartDrawer";

export function Root() {
  const location = useLocation();
  const isCheckout = location.pathname === "/checkout";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {!isCheckout && <Header />}

      {isCheckout ? (
        <div className="pt-0">
          <div className="bg-card border-b border-border px-4 py-4">
            <div className="max-w-5xl mx-auto flex items-center gap-2">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground" style={{ fontSize: "0.75rem" }}>🌿</span>
              </div>
              <span className="text-primary">Secure Checkout</span>
            </div>
          </div>
          <Outlet />
        </div>
      ) : (
        <main className="pt-[164px] sm:pt-[168px] pb-20 sm:pb-0">
          <Outlet />
        </main>
      )}

      <CartDrawer />
      <BottomNav />
      <Toaster position="top-center" />
    </div>
  );
}
