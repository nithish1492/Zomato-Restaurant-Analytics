import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import KPICards from '@/components/analytics/KPICards';
import ClusterPieChart from '@/components/analytics/ClusterPieChart';
import RatingChart from '@/components/analytics/RatingChart';
import CostChart from '@/components/analytics/CostChart';
import SentimentChart from '@/components/analytics/SentimentChart';
import BusinessSummaryCards from '@/components/analytics/BusinessSummaryCards';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Analytics() {
  return (
    <motion.div {...pageTransition} className="px-6 pb-24 pt-4 sm:pt-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-2">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-300">
            <LayoutDashboard size={13} strokeWidth={2.5} />
            Analytics Dashboard
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Restaurant clustering overview
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Aggregated metrics from the trained K-Means model. Data shown is
            representative — connect the FastAPI backend to power this
            dashboard with live results.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <KPICards />

          <div className="grid gap-6 lg:grid-cols-2">
            <ClusterPieChart />
            <RatingChart />
            <CostChart />
            <SentimentChart />
          </div>

          <BusinessSummaryCards />
        </div>
      </div>
    </motion.div>
  );
}
