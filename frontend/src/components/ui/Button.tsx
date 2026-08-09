import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_8px_24px_-6px_rgba(226,55,68,0.5)] hover:shadow-[0_16px_40px_-8px_rgba(226,55,68,0.65)] border border-brand-400/20',
  secondary:
    'bg-white/[0.06] text-zinc-100 border border-white/10 hover:bg-white/[0.1] hover:border-white/20 backdrop-blur-xl',
  ghost:
    'bg-transparent text-zinc-300 hover:text-white hover:bg-white/[0.06]',
  outline:
    'bg-transparent text-brand-400 border border-brand-500/40 hover:bg-brand-500/10 hover:border-brand-500/60',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-xs px-4 py-2 gap-1.5 rounded-xl',
  md: 'text-sm px-5 py-3 gap-2 rounded-2xl',
  lg: 'text-base px-7 py-4 gap-2.5 rounded-2xl',
};

const iconSizeMap: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

/**
 * Primary interactive button used across the app. Wraps Framer Motion's
 * button element for tap/hover micro-interactions.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'right',
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        disabled={isDisabled}
        whileHover={isDisabled ? undefined : { y: -2, scale: 1.015 }}
        whileTap={isDisabled ? undefined : { y: 0, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'relative inline-flex items-center justify-center font-semibold whitespace-nowrap',
          'transition-[background,border-color,box-shadow] duration-300',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
          fullWidth && 'w-full',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              aria-hidden="true"
            />
            <span>Loading…</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && (
              <Icon size={iconSizeMap[size]} strokeWidth={2.25} />
            )}
            {children}
            {Icon && iconPosition === 'right' && (
              <Icon size={iconSizeMap[size]} strokeWidth={2.25} />
            )}
          </>
        )}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
export type { ButtonProps, ButtonVariant, ButtonSize };
