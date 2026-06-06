import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { CartDrawer } from "./components/CartDrawer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import logoImg from "../assets/logo.webp";
import { Footer } from "./components/Footer";

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-4 border-brand-peach border-t-brand-terracotta animate-spin" />
  </div>
);

export function Root() {
  const location = useLocation();
  const isCheckout = location.pathname === "/checkout";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.search]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans w-full max-w-full overflow-x-hidden">
      {!isCheckout && <Header />}

      {isCheckout ? (
        <div className="pt-0 w-full max-w-full overflow-x-hidden">
          <div className="bg-card border-b border-border px-4 py-3.5 safe-area-pt">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={logoImg} alt="HajArafa" className="h-8 w-auto object-contain" />
              </div>
              <span className="text-muted-foreground flex items-center gap-1" style={{ fontSize: "0.8rem" }}>
                🔒 Secure Checkout
              </span>
            </div>
          </div>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </div>
      ) : (
        <>
          <main className={`${(location.pathname === "/" || location.pathname.startsWith("/category/")) ? "pt-[108px]" : "pt-16"} pb-24 sm:pb-8 w-full max-w-full overflow-x-hidden`}>
            <ErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
        </>
      )}

      <CartDrawer />
      <BottomNav />
      <Toaster position="top-center" />
    </div>
  );
}
