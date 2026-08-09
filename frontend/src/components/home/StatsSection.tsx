import { motion } from 'framer-motion';
import StatCard from '@/components/ui/StatCard';
import type { StatItem } from '@/types/common';

interface StatsSectionProps {
  stats: StatItem[];
  title?: string;
}

/**
 * Reusable stats grid section. Accepts any StatItem[] so it can be reused
 * on Analytics or elsewhere, not just the homepage.
 */
export default function StatsSection({ stats, title }: StatsSectionProps) {
  return (
    <section className="px-6 py-4">
      <div className="mx-auto max-w-6xl">
        {title && (
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-500"
          >
            {title}
          </motion.h3>
        )}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
