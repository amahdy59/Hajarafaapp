import { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useAppSettings } from "../../context/AppSettingsContext";

interface SectionProps {
  title?: string;
  eyebrow?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  align?: "start" | "center";
  bleed?: boolean;
  children: ReactNode;
  className?: string;
}

export function Section({
  title,
  eyebrow,
  viewAllHref,
  viewAllLabel,
  align = "start",
  bleed = false,
  children,
  className = "",
}: SectionProps) {
  const { t } = useAppSettings();
  const label = viewAllLabel ?? t.viewAll;

  return (
    <section className={`flex flex-col gap-5 ${className}`}>
      {(title || viewAllHref) && (
        <header
          className={`flex items-end justify-between gap-4 ${bleed ? "px-4 sm:px-0" : ""}`}
        >
          <div className={`flex flex-col gap-1 ${align === "center" ? "items-center mx-auto text-center" : "items-start"}`}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && (
              <h2 className="font-display text-brand-forest" style={{ fontSize: "clamp(1.4rem, 4vw, 1.75rem)", lineHeight: 1.15 }}>
                {title}
              </h2>
            )}
          </div>
          {viewAllHref && (
            <Link
              to={viewAllHref}
              className="inline-flex items-center gap-1.5 text-brand-terracotta hover:gap-2.5 transition-all eyebrow"
            >
              {label}
              <ArrowRight size={14} className="rtl-flip" />
            </Link>
          )}
        </header>
      )}
      <div>{children}</div>
    </section>
  );
}
