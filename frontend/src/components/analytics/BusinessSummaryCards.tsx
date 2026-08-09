import { motion } from 'framer-motion';
import { Users, Star, IndianRupee, Layers } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { BUSINESS_SEGMENTS } from '@/utils/mockData';
import { staggerContainer, staggerItem } from '@/components/ui/FadeInSection';

const sentimentStyles: Record<string, string> = {
  Positive: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
  Mixed: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
  Negative: 'bg-rose-500/10 text-rose-400 ring-rose-500/20',
};

/**
 * Detailed card per business segment/cluster — the qualitative counterpart
 * to the charts above, translating cluster numbers into business meaning.
 */
export default function BusinessSummaryCards() {
  return (
    <section className="mt-16">
      <SectionHeading
        align="left"
        eyebrow="Business Segments"
        eyebrowIcon={Layers}
        title="What each cluster represents"
        description="A qualitative summary of the six clusters produced by the K-Means model, translating raw metrics into business context."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {BUSINESS_SEGMENTS.map((segment) => (
          <motion.div key={segment.clusterId} variants={staggerItem}>
            <GlassCard hoverLift padding="lg" className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: segment.color }}
                  aria-hidden="true"
                />
                <span
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ring-1 ${sentimentStyles[segment.dominantSentiment]}`}
                >
                  {segment.dominantSentiment} sentiment
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">{segment.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">
                {segment.description}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-4">
                <div className="flex flex-col items-center gap-1">
                  <Users size={14} className="text-zinc-500" />
                  <span className="text-xs font-semibold text-white">
                    {segment.restaurantCount.toLocaleString('en-US')}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Star size={14} className="text-zinc-500" />
                  <span className="text-xs font-semibold text-white">{segment.avgRating}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <IndianRupee size={14} className="text-zinc-500" />
                  <span className="text-xs font-semibold text-white">{segment.avgCost}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
