import { ReactNode } from "react";

interface ScrollRailProps {
  children: ReactNode;
  itemWidth?: string;
  gap?: string;
  className?: string;
}

export function ScrollRail({ children, gap = "0.75rem", className = "" }: ScrollRailProps) {
  return (
    <div className={`-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide snap-x snap-mandatory ${className}`}>
      <div className="flex" style={{ gap }}>
        {children}
      </div>
    </div>
  );
}
