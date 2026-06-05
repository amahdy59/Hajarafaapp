import { ReactNode } from "react";

interface ScrollRailProps {
  children: ReactNode;
  itemWidth?: string;
  gap?: string;
  className?: string;
  /** Show edge fade gradients to hint scrollable content */
  showFades?: boolean;
}

export function ScrollRail({ children, gap = "0.75rem", className = "", showFades = true }: ScrollRailProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Edge fade — start */}
      {showFades && (
        <>
          <div className="absolute top-0 bottom-0 start-0 w-4 sm:hidden z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }} />
          <div className="absolute top-0 bottom-0 end-0 w-6 sm:hidden z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }} />
        </>
      )}
      <div
        className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        <div className="flex" style={{ gap }}>
          {children}
        </div>
      </div>
    </div>
  );
}
