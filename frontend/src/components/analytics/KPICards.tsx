import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import { KPI_ICONS } from "@/utils/mockData";
import { staggerContainer, staggerItem } from "@/components/ui/FadeInSection";
import {
  getAnalytics,
  type AnalyticsResponse,
} from "@/services/analyticsService";

export default function KPICards() {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-zinc-400">
        Loading analytics...
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-10 text-red-400">
        Failed to load analytics.
      </div>
    );
  }

  const metrics = [
    {
      label: "Total Restaurants",
      value: analytics.total_restaurants.toLocaleString(),
    },
    {
      label: "Average Rating",
      value: analytics.average_rating.toFixed(2),
    },
    {
      label: "Average Cost",
      value: `₹${analytics.average_cost}`,
    },
    {
      label: "Positive Sentiment",
      value: `${analytics.positive_sentiment}%`,
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {metrics.map((metric, index) => {
        const Icon = KPI_ICONS[index];

        return (
          <motion.div key={metric.label} variants={staggerItem}>
            <GlassCard
              hoverLift
              padding="lg"
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 ring-1 ring-brand-500/20">
                  <Icon
                    size={16}
                    className="text-brand-400"
                    strokeWidth={2.25}
                  />
                </div>

                <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-400">
                  <ArrowUpRight size={12} />
                  Live
                </span>
              </div>

              <div>
                <div className="text-2xl font-bold text-white">
                  {metric.value}
                </div>

                <div className="mt-1 text-sm text-zinc-500">
                  {metric.label}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
}