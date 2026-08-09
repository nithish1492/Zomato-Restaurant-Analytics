import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';

/**
 * Closing call-to-action before the footer. Drives to the Prediction page.
 */
export default function CTASection() {
  return (
    <section className="px-6 py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl"
      >
        <GlassCard
          variant="elevated"
          padding="lg"
          className="relative overflow-hidden text-center sm:p-14"
        >
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/25 blur-[100px]" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_8px_24px_-6px_rgba(226,55,68,0.55)]">
              <Sparkles size={20} className="text-white" strokeWidth={2.25} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Classify a restaurant right now
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-400">
              Enter rating, cost, review, and sentiment metrics to get an
              instant business segment prediction from the trained clustering
              model.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <NavLink to="/prediction">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Open Prediction Tool
                </Button>
              </NavLink>
              <NavLink to="/analytics">
                <Button variant="ghost" size="lg">
                  View Dashboard
                </Button>
              </NavLink>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
