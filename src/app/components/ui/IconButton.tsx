import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

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
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`relative rounded-full flex items-center justify-center transition-colors ${sizeMap[size]} ${variantMap[variant]} ${className}`}
      {...rest}
    >
      {children}
      <AnimatePresence mode="wait">
        {badge && badge > 0 ? (
          <motion.span
            key={badge}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="absolute -top-0.5 -end-0.5 min-w-[16px] h-4 px-1 bg-brand-terracotta text-white rounded-full flex items-center justify-center border border-background"
            style={{ fontSize: "9px", letterSpacing: 0 }}
          >
            {badge > 99 ? "99+" : badge}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  )
);
IconButton.displayName = "IconButton";
