import { Suspense, useLayoutEffect } from "react";
import { Outlet, useLocation, ScrollRestoration } from "react-router";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { CartDrawer } from "./components/CartDrawer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import logoImg from "../assets/logo.webp";
import { Footer } from "./components/Footer";

/* Prevent the browser from automatically restoring scroll positions.
   We handle this ourselves via <ScrollRestoration /> + the useLayoutEffect below. */
if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-4 border-brand-peach border-t-brand-terracotta animate-spin" />
  </div>
);

export function Root() {
  const location = useLocation();
  const isCheckout = location.pathname === "/checkout";
  const hasCategoryRail = location.pathname === "/" || location.pathname.startsWith("/category/") || location.pathname === "/products";
  const mainPadding = hasCategoryRail ? "pt-16 sm:pt-[108px]" : "pt-16";

  /* Synchronous scroll-to-top on every forward navigation.
     useLayoutEffect fires before the browser paints, guaranteeing
     the user never sees the old scroll position flash. We also use delayed
     scrolls to ensure the page remains at the top when lazy-loaded chunks mount. */
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const t1 = setTimeout(() => window.scrollTo(0, 0), 50);
    const t2 = setTimeout(() => window.scrollTo(0, 0), 150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

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
          <main className={`${mainPadding} pb-24 sm:pb-8 w-full max-w-full overflow-x-hidden`}>
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

      <Toaster position="top-center" closeButton />
      <ScrollRestoration />
    </div>
  );
}
