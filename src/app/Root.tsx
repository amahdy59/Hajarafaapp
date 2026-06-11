import { Suspense, useEffect } from "react";

// Disable browser's native scroll restoration so our custom logic has full control.
// Without this, the browser restores the previous scroll position after every navigation,
// overriding our window.scrollTo({ top: 0 }) calls.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
import { Outlet, useLocation, useNavigationType } from "react-router";
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
  const navType = useNavigationType();
  const isCheckout = location.pathname === "/checkout";

  const hasCategoryRail = location.pathname === "/" || location.pathname.startsWith("/category/") || location.pathname === "/products";
  const mainPadding = hasCategoryRail ? "pt-16 sm:pt-[108px]" : "pt-16";

  // Scroll to top on every forward navigation.
  // key={location.pathname} on Outlet (below) handles the remount;
  // this is a safety net for the window scroll position.
  useEffect(() => {
    if (navType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navType]);

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
                {/* key forces a full remount on path change — the only reliable
                    way to reset scroll when React reuses the same component
                    instance (e.g. /products/A → /products/B). */}
                <Outlet key={location.pathname} />
              </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
        </>
      )}

      <CartDrawer />
      <BottomNav />

      <Toaster position="top-center" closeButton />
    </div>
  );
}
