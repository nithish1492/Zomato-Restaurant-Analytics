import { motion } from 'framer-motion';
import { Workflow } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { PIPELINE_STEPS } from '@/utils/mockData';

/**
 * Visual walkthrough of the end-to-end ML pipeline, from data collection
 * to the live inference API. Rendered as a connected horizontal timeline
 * on desktop, stacked vertically on mobile.
 */
export default function PipelineSection() {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Machine Learning Pipeline"
          eyebrowIcon={Workflow}
          title="From raw data to live prediction"
          description="Five stages take restaurant data from ingestion through feature engineering, clustering, evaluation, and finally a served inference endpoint."
        />

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-6 hidden h-px w-[calc(100%-4rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />

          <div className="grid gap-5 lg:grid-cols-5">
            {PIPELINE_STEPS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <GlassCard hoverLift padding="md" className="h-full text-center lg:text-left">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_8px_20px_-6px_rgba(226,55,68,0.5)] lg:mx-0">
                      <Icon size={18} className="text-white" strokeWidth={2.25} />
                    </div>
                    <span className="mt-4 block text-xs font-semibold uppercase tracking-widest text-brand-400">
                      Step {item.step}
                    </span>
                    <h3 className="mt-1.5 text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                      {item.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
