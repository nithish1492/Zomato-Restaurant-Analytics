import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  /** 'default' = standard glass, 'elevated' = stronger blur/border for emphasis */
  variant?: 'default' | 'elevated';
  /** Applies a hover lift + glow border transition */
  hoverLift?: boolean;
  /** Wraps content, useful for setting inner padding scale */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap: Record<NonNullable<GlassCardProps['padding']>, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * Frosted glass surface used throughout the app for cards, panels, and
 * containers. Built on Framer Motion's div so it accepts animate/whileHover/etc.
 */
const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = 'default',
      hoverLift = false,
      padding = 'lg',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-[22px] border transition-colors duration-300',
          variant === 'default'
            ? 'border-white/[0.08] bg-white/[0.04] backdrop-blur-xl'
            : 'border-white/[0.1] bg-white/[0.06] backdrop-blur-2xl',
          'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]',
          hoverLift &&
            'hover:-translate-y-1.5 hover:border-brand-500/30 hover:shadow-[0_24px_64px_-16px_rgba(226,55,68,0.25),0_8px_32px_-8px_rgba(0,0,0,0.5)]',
          paddingMap[padding],
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
export type { GlassCardProps };
