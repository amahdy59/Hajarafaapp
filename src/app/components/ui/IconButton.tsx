import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

type NativeIconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onAnimationStart"
  | "onDrag"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDragStart"
  | "onDrop"
>;

type Variant = "ghost" | "solid" | "outline";
type Size = "sm" | "md" | "lg";

interface IconButtonProps extends NativeIconButtonProps {
  variant?: Variant;
  size?: Size;
  badge?: number;
  children: ReactNode;
}

const sizeMap: Record<Size, string> = {
  sm: "w-11 h-11",
  md: "w-11 h-11",
  lg: "w-12 h-12",
 };

const variantMap: Record<Variant, string> = {
  ghost: "text-brand-ink-soft hover:bg-muted",
  solid: "bg-brand-forest text-white dark:text-zinc-950 hover:bg-brand-sage-dark",
  outline: "border border-border text-brand-ink-soft hover:bg-muted",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "ghost", size = "md", badge, className = "", children, ...rest }, ref) => (
    <motion.button
      ref={ref}
      whileHover={rest.disabled ? undefined : { scale: 1.03 }}
      whileTap={rest.disabled ? undefined : { scale: 0.97 }}
      className={`relative rounded-full flex items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-60 icon-button-target ${sizeMap[size]} ${variantMap[variant]} ${className}`}
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
