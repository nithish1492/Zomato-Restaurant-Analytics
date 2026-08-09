import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import type { StatItem } from '@/types/common';
import GlassCard from './GlassCard';

interface StatCardProps extends StatItem {
  index?: number;
}

/**
 * KPI-style card with an animated count-up number, triggered once when
 * scrolled into view. Non-numeric values (e.g. containing commas or "K")
 * are parsed to their leading numeric portion for the count-up, then the
 * original formatted string is restored on completion.
 */
export default function StatCard({ icon: Icon, label, value, suffix, index = 0 }: StatCardProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const numericMatch = value.replace(/,/g, '').match(/[\d.]+/);
    const targetNumber = numericMatch ? parseFloat(numericMatch[0]) : 0;
    const hasDecimal = value.includes('.');

    const controls = animate(0, targetNumber, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const formatted = hasDecimal
          ? latest.toFixed(1)
          : Math.round(latest).toLocaleString('en-US');
        setDisplay(formatted);
      },
      onComplete: () => setDisplay(value),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard hoverLift padding="md" className="flex flex-col items-start gap-3 text-left">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 ring-1 ring-brand-500/20">
          <Icon size={16} className="text-brand-400" strokeWidth={2.25} />
        </div>
        <div className="flex items-baseline gap-0.5">
          <span ref={ref} className="text-2xl font-bold tabular-nums text-white sm:text-3xl">
            {display}
          </span>
          {suffix && <span className="text-2xl font-bold text-white sm:text-3xl">{suffix}</span>}
        </div>
        <span className="text-xs text-zinc-500 sm:text-sm">{label}</span>
      </GlassCard>
    </motion.div>
  );
}
