import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { HOME_FEATURES } from '@/utils/mockData';
import { staggerContainer, staggerItem } from '@/components/ui/FadeInSection';

/**
 * Grid of core platform capabilities. Uses real ML/product language,
 * not generic marketing copy.
 */
export default function FeaturesSection() {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Core Capabilities"
          eyebrowIcon={Cpu}
          title="Built for restaurant intelligence"
          description="Every capability maps directly to a stage of the machine learning pipeline — from raw data to a live, queryable prediction."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {HOME_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={staggerItem}>
                <GlassCard hoverLift variant="elevated" padding="lg" className="h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 ring-1 ring-brand-500/20">
                    <Icon size={20} className="text-brand-400" strokeWidth={2} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
