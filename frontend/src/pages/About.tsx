import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import ArchitectureSection from '@/components/about/ArchitectureSection';
import PipelineOverview from '@/components/about/PipelineOverview';
import DatasetSummary from '@/components/about/DatasetSummary';
import FutureImprovements from '@/components/about/FutureImprovements';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
};

export default function About() {
  return (
    <motion.div {...pageTransition}>
      <section className="px-6 pb-4 pt-8 sm:pt-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-300">
            <Info size={13} strokeWidth={2.5} />
            About the Project
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Zomato Restaurant Analytics
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            A machine learning platform that segments restaurants into
            business clusters using unsupervised learning, and serves
            real-time predictions through a typed FastAPI interface.
          </p>
        </div>
      </section>

      <ArchitectureSection />
      <PipelineOverview />
      <DatasetSummary />
      <FutureImprovements />
    </motion.div>
  );
}
