import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/utils/cn';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** Direction the content enters from */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Distance in px the element travels during the entrance */
  distance?: number;
  /** Fraction of the element that must be visible to trigger the animation */
  amount?: number;
  /** Only animate once, on first scroll into view */
  once?: boolean;
}

const getInitialOffset = (
  direction: FadeInSectionProps['direction'],
  distance: number,
) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * Scroll-triggered fade-in wrapper. Use around any section or card grid
 * to reveal content smoothly as the user scrolls it into view.
 */
export default function FadeInSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 28,
  amount = 0.25,
  once = true,
}: FadeInSectionProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getInitialOffset(direction, distance),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container: wrap a group of children (e.g. cards in a grid) with
 * this, and each direct motion child with `staggerItem` variants to get
 * a staggered reveal effect.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};
