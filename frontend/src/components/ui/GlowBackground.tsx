import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface GlowBackgroundProps {
  /** Renders the interactive cursor-following glow. Disable on pages with heavy content. */
  withMouseGlow?: boolean;
  className?: string;
}

/**
 * Ambient background layer: floating gradient blobs + optional cursor glow.
 * Fixed-position, pointer-events disabled, sits behind all page content.
 */
export default function GlowBackground({
  withMouseGlow = true,
  className,
}: GlowBackgroundProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!withMouseGlow) return;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame.current);
    };
  }, [withMouseGlow]);

  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden',
        className,
      )}
      aria-hidden="true"
    >
      {/* Base radial wash */}
      <div className="absolute inset-0 bg-bg-base" />

      {/* Floating gradient blobs */}
      <motion.div
        className="absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-brand-600/25 blur-[110px]"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-48 h-[36rem] w-[36rem] rounded-full bg-brand-500/15 blur-[130px]"
        animate={{
          x: [0, -60, 20, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.12, 1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10rem] left-1/4 h-[28rem] w-[28rem] rounded-full bg-brand-700/15 blur-[100px]"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Subtle grain texture */}
      <div className="absolute inset-0 bg-noise" />

      {/* Cursor-follow glow */}
      {withMouseGlow && (
        <div
          ref={glowRef}
          className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform md:opacity-100"
          style={{
            background:
              'radial-gradient(circle, rgba(226,55,68,0.08) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  );
}
