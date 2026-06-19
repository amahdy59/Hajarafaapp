import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { motion } from "motion/react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const variantMap: Record<ButtonVariant, string> = {
  primary: "bg-brand-terracotta text-white hover:bg-brand-terracotta-dark shadow-sm disabled:bg-brand-terracotta/60",
  secondary: "bg-brand-peach text-brand-terracotta hover:bg-brand-peach/80 shadow-sm disabled:opacity-60",
  outline: "border border-border text-brand-ink-soft hover:bg-muted disabled:opacity-60",
  ghost: "text-brand-ink-soft hover:bg-muted disabled:opacity-60",
};

const sizeMap: Record<ButtonSize, string> = {
  sm: "h-11 px-4 text-xs font-semibold rounded-lg",
  md: "h-11 px-5 text-sm font-semibold rounded-xl",
  lg: "h-12 px-6 text-base font-bold rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      className = "",
      children,
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        aria-disabled={disabled || isLoading || undefined}
        className={`inline-flex items-center justify-center gap-2 transition-all duration-200 select-none cursor-pointer disabled:cursor-not-allowed font-sans border-0 font-medium ${
          variantMap[variant]
        } ${sizeMap[size]} ${
          fullWidth ? "w-full" : ""
        } ${className}`}
        {...rest}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
