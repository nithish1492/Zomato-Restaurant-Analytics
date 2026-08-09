import { motion } from 'framer-motion';
import { Workflow } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { PIPELINE_STEPS, TECH_STACK } from '@/utils/mockData';
import { staggerContainer, staggerItem } from '@/components/ui/FadeInSection';

/**
 * Detailed restatement of the ML pipeline for the About page — deeper
 * than the homepage teaser, framed as documentation rather than marketing.
 */
export default function PipelineOverview() {
  const mlStack = TECH_STACK.filter((t) => t.category === 'ML / Backend');

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Machine Learning Pipeline"
          eyebrowIcon={Workflow}
          title="How the model is built"
          description="Every prediction served by this platform traces back to this five-stage offline training pipeline."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 flex flex-col gap-3"
        >
          {PIPELINE_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.step} variants={staggerItem}>
                <GlassCard padding="md" className="flex items-start gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-[0_6px_16px_-4px_rgba(226,55,68,0.5)]">
                    {item.step}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white sm:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-500 sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                    <Icon size={18} className="hidden shrink-0 text-brand-500/50 sm:block" />
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Built with:
          </span>
          {mlStack.map((tech) => (
            <span
              key={tech.name}
              className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300"
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
