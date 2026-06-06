import React, { Component, ErrorInfo, ReactNode } from "react";
import { RefreshCw, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error inside ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const isRTL = document.documentElement.dir === "rtl";
      return (
        this.props.fallback ?? (
          <div className="p-8 bg-brand-cream border border-brand-peach rounded-2xl text-center space-y-4 max-w-md mx-auto my-6 shadow-soft select-none">
            <span className="text-4xl block animate-pulse">🌿</span>
            <h3 className="text-brand-forest font-display text-lg font-bold">
              {isRTL ? "عذراً! حدثت هزة صغيرة من جانبنا..." : "Oops! A tiny hiccup on our side..."}
            </h3>
            <p className="text-brand-ink-soft text-sm leading-relaxed max-w-xs mx-auto">
              {isRTL
                ? "نواجه مشكلة بسيطة في تحميل هذا الجزء. لا تقلق، المشكلة من طرفنا! جرب تحديث الصفحة للاستمرار."
                : "We had a small issue loading this section. Don't worry, it's on us! Try refreshing the page to get back on track."}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2.5 bg-brand-terracotta text-white rounded-xl text-xs font-semibold hover:bg-brand-terracotta-dark transition-all active:scale-95 inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <RefreshCw size={13} />
                <span>{isRTL ? "تحديث الصفحة" : "Refresh Page"}</span>
              </button>
              <button
                type="button"
                onClick={() => this.setState({ hasError: false })}
                className="px-4 py-2.5 bg-brand-peach text-brand-terracotta rounded-xl text-xs font-semibold hover:bg-brand-peach/80 transition-all active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>{isRTL ? "المحاولة مجدداً" : "Try Again"}</span>
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

