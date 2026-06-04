import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

type Variant = "ghost" | "solid" | "outline";
type Size = "sm" | "md" | "lg";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  badge?: number;
  children: ReactNode;
}

const sizeMap: Record<Size, string> = {
  sm: "w-9 h-9",
  md: "w-10 h-10",
  lg: "w-11 h-11",
};

const variantMap: Record<Variant, string> = {
  ghost: "text-brand-ink-soft hover:bg-muted",
  solid: "bg-brand-sage text-white hover:bg-brand-sage-dark",
  outline: "border border-border text-brand-ink-soft hover:bg-muted",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "ghost", size = "md", badge, className = "", children, ...rest }, ref) => (
    <button
      ref={ref}
      className={`relative rounded-full flex items-center justify-center transition-colors ${sizeMap[size]} ${variantMap[variant]} ${className}`}
      {...rest}
    >
      {children}
      {badge && badge > 0 ? (
        <span
          className="absolute -top-0.5 -end-0.5 min-w-[16px] h-4 px-1 bg-brand-terracotta text-white rounded-full flex items-center justify-center"
          style={{ fontSize: "10px", letterSpacing: 0 }}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      ) : null}
    </button>
  )
);
IconButton.displayName = "IconButton";
