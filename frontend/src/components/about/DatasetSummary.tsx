import { motion } from 'framer-motion';
import { Database, FileSpreadsheet } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { staggerContainer, staggerItem } from '@/components/ui/FadeInSection';

const DATASET_FIELDS = [
  { field: 'average_rating', type: 'float', description: 'Mean customer rating (0–5 scale)' },
  { field: 'average_cost', type: 'float', description: 'Average cost for two people' },
  { field: 'review_count', type: 'integer', description: 'Total number of reviews' },
  { field: 'average_pictures', type: 'float', description: 'Mean photos attached per review' },
  { field: 'positive_percent', type: 'float', description: 'Share of positive-sentiment reviews' },
  { field: 'negative_percent', type: 'float', description: 'Share of negative-sentiment reviews' },
  { field: 'neutral_percent', type: 'float', description: 'Share of neutral-sentiment reviews' },
  { field: 'cuisine_encoded', type: 'integer', description: 'Encoded primary cuisine category' },
  { field: 'collection_encoded', type: 'integer', description: 'Encoded curated collection membership' },
];

const DATASET_STATS = [
  { label: 'Total Records', value: '12,450' },
  { label: 'Feature Columns', value: '9' },
  { label: 'Derived Clusters', value: '6' },
  { label: 'Review Text Samples', value: '380K' },
];

/**
 * Documents the dataset schema and summary statistics feeding the model —
 * the nine input features exactly match the Prediction form fields.
 */
export default function DatasetSummary() {
  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Dataset"
          eyebrowIcon={Database}
          title="Dataset summary"
          description="The model is trained on structured restaurant records with engineered sentiment and encoding features."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DATASET_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <GlassCard padding="md" className="text-center">
                <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-zinc-500 sm:text-sm">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          <GlassCard variant="elevated" padding="lg">
            <div className="mb-5 flex items-center gap-2">
              <FileSpreadsheet size={16} className="text-brand-400" />
              <h3 className="text-base font-semibold text-white">Feature Schema</h3>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="overflow-x-auto"
            >
              <table className="w-full min-w-[520px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] text-left text-xs uppercase tracking-wider text-zinc-500">
                    <th className="pb-3 pr-4 font-semibold">Field</th>
                    <th className="pb-3 pr-4 font-semibold">Type</th>
                    <th className="pb-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {DATASET_FIELDS.map((row) => (
                    <motion.tr
                      key={row.field}
                      variants={staggerItem}
                      className="border-b border-white/[0.04] last:border-0"
                    >
                      <td className="py-3 pr-4">
                        <code className="rounded-md bg-brand-500/10 px-2 py-1 text-xs font-medium text-brand-300">
                          {row.field}
                        </code>
                      </td>
                      <td className="py-3 pr-4 text-xs text-zinc-500">{row.type}</td>
                      <td className="py-3 text-xs text-zinc-400 sm:text-sm">{row.description}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
