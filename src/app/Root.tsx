import { Suspense, useLayoutEffect, useEffect } from "react";
import { Outlet, useLocation, useNavigationType, ScrollRestoration } from "react-router";
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

  const navType = useNavigationType();

  /* Aggressive scroll-to-top on every forward navigation.
     For PUSH/REPLACE navigations, we force the scroll position to the top
     multiple times to handle async lazy-loaded route mounts.
     POP navigations are handled naturally by react-router's ScrollRestoration. */
  useLayoutEffect(() => {
    if (navType === "PUSH" || navType === "REPLACE") {
      window.scrollTo(0, 0);
      const timers = [
        setTimeout(() => window.scrollTo(0, 0), 30),
        setTimeout(() => window.scrollTo(0, 0), 80),
        setTimeout(() => window.scrollTo(0, 0), 150),
        setTimeout(() => window.scrollTo(0, 0), 300),
        setTimeout(() => window.scrollTo(0, 0), 500),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [location.pathname, navType]);

  /* Global listener to smoothly scroll the page to top if the user clicks
     a link pointing to the current path (e.g. Logo, active navigation items). */
  useEffect(() => {
    const handleSamePageClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      try {
        const url = new URL(href, window.location.href);
        if (url.origin === window.location.origin && url.pathname === window.location.pathname && !url.hash) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch (err) {
        // Ignore invalid URLs
      }
    };
    document.addEventListener("click", handleSamePageClick);
    return () => document.removeEventListener("click", handleSamePageClick);
  }, []);

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
