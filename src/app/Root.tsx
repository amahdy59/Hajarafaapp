import { Suspense, useLayoutEffect, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { CartDrawer } from "./components/CartDrawer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import logoImg from "../assets/logo.webp";
import { Footer } from "./components/Footer";

/* Prevent the browser and router from restoring previous page positions.
   Every route visit should start at the top, matching ecommerce expectations. */
if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}

function scrollPageToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  const primaryScrollContainers = [
    document.scrollingElement,
    document.documentElement,
    document.body,
    document.getElementById("root"),
  ];

  primaryScrollContainers.forEach((element) => {
    if (!element) return;
    element.scrollTop = 0;
    element.scrollLeft = 0;
  });

  document.querySelectorAll<HTMLElement>("*").forEach((element) => {
    if (element.scrollTop > 0) element.scrollTop = 0;
  });
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

  /* Route changes should never inherit the previous page's scroll position.
     Repeat the reset briefly to cover lazy routes and image/layout shifts. */
  useLayoutEffect(() => {
    scrollPageToTop();
    const animationFrame = requestAnimationFrame(scrollPageToTop);
    const timers = [
      setTimeout(scrollPageToTop, 50),
      setTimeout(scrollPageToTop, 150),
      setTimeout(scrollPageToTop, 350),
    ];
    return () => {
      cancelAnimationFrame(animationFrame);
      timers.forEach(clearTimeout);
    };
  }, [location.pathname, location.search]);

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
                <img src={logoImg} alt="Haj Arafa" className="h-8 w-auto object-contain" />
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
    </div>
  );
}
