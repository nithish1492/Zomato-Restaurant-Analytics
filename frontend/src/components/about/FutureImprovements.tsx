import { motion } from 'framer-motion';
import {
  Rocket,
  Gauge,
  BrainCircuit,
  RefreshCw,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import { staggerContainer, staggerItem } from '@/components/ui/FadeInSection';

const IMPROVEMENTS = [
  {
    icon: BrainCircuit,
    title: 'Ensemble Clustering',
    description:
      'Combine K-Means with hierarchical and density-based clustering to validate segment boundaries and improve robustness.',
  },
  {
    icon: RefreshCw,
    title: 'Automated Retraining',
    description:
      'Scheduled pipeline retraining as new restaurant and review data arrives, keeping cluster definitions current.',
  },
  {
    icon: Gauge,
    title: 'Live Analytics Data',
    description:
      'Replace mock analytics data with a live connection to the FastAPI backend and a production database.',
  },
  {
    icon: Globe,
    title: 'Multi-Region Datasets',
    description:
      'Expand training data beyond a single region to improve generalization across different markets.',
  },
  {
    icon: ShieldCheck,
    title: 'Model Explainability',
    description:
      'Add SHAP-based feature attribution so users can see which inputs most influenced a given prediction.',
  },
  {
    icon: Rocket,
    title: 'Production Deployment',
    description:
      'Containerize the FastAPI service and deploy behind a managed inference endpoint with monitoring and versioning.',
  },
];

/**
 * Roadmap section — honest, specific next steps rather than vague
 * marketing promises.
 */
export default function FutureImprovements() {
  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Roadmap"
          eyebrowIcon={Rocket}
          title="Future improvements"
          description="Planned enhancements to strengthen the model, the data pipeline, and the platform's production readiness."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {IMPROVEMENTS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={staggerItem}>
                <GlassCard hoverLift padding="lg" className="h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 ring-1 ring-brand-500/20">
                    <Icon size={18} className="text-brand-400" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500 sm:text-sm">
                    {item.description}
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
