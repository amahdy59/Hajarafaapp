import { Suspense, useLayoutEffect, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Toaster } from "sonner";
import { MotionConfig } from "motion/react";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { CartDrawer } from "./components/CartDrawer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import logoImg from "../assets/logo.webp";
import { Footer } from "./components/Footer";
import { OfflineBanner } from "./components/OfflineBanner";
import { PWAInstallBanner } from "./components/PWAInstallBanner";
import { useAppSettings } from "./context/AppSettingsContext";

/* Prevent the browser and router from restoring previous page positions.
   Every route visit should start at the top, matching ecommerce expectations. */
if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}

function scrollPageToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-4 border-brand-peach border-t-brand-terracotta animate-spin" />
  </div>
);

export function Root() {
  const location = useLocation();
  const { isRTL } = useAppSettings();
  const isCheckout = location.pathname === "/checkout";
  const mainPadding = "pt-16 sm:pt-[118px]";

  /* Route changes should never inherit the previous page's scroll position. */
  useLayoutEffect(() => {
    scrollPageToTop();
    const animationFrame = requestAnimationFrame(scrollPageToTop);
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [location.pathname]);

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
      } catch {
        // Ignore invalid URLs
      }
    };
    document.addEventListener("click", handleSamePageClick);
    return () => document.removeEventListener("click", handleSamePageClick);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-foreground font-sans w-full max-w-full overflow-x-hidden">
        <OfflineBanner />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-brand-terracotta focus:text-white dark:focus:text-brand-ink focus:rounded-xl focus:shadow-elev focus:outline-none focus:ring-2 focus:ring-ring font-semibold text-sm"
        >
          {isRTL ? "الانتقال إلى المحتوى الرئيسي" : "Skip to main content"}
        </a>

        {!isCheckout && <Header />}

        {isCheckout ? (
          <div id="main-content" tabIndex={-1} className="pt-0 w-full max-w-full overflow-x-hidden outline-none">
            <div className="bg-card border-b border-border px-4 py-3.5 safe-area-pt">
              <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={logoImg} alt="Haj Arafa" className="h-8 w-auto object-contain" />
                </div>
                <span className="text-muted-foreground flex items-center gap-1" style={{ fontSize: "0.8rem" }}>
                  {isRTL ? "🔒 إتمام دفع آمن" : "🔒 Secure Checkout"}
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
            <main id="main-content" tabIndex={-1} className={`${mainPadding} pb-24 sm:pb-8 w-full max-w-full overflow-x-hidden outline-none`}>
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
        <PWAInstallBanner />

        <Toaster position="top-center" closeButton />
      </div>
    </MotionConfig>
  );
}
