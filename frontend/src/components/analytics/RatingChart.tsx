import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { TooltipProps } from "recharts";

import GlassCard from "@/components/ui/GlassCard";
import { getAnalytics } from "@/services/analyticsService";

const COLORS = [
  "#e23744",
  "#f0717c",
  "#ab1822",
  "#f7a5ac",
  "#79181f",
  "#cc1f2d",
];

interface RatingData {
  cluster: string;
  avgRating: number;
}

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900 p-3 shadow-lg">
      <p className="font-semibold text-white">{label}</p>
      <p className="text-sm text-zinc-400">
        {payload[0].value?.toFixed(1)} ★ average
      </p>
    </div>
  );
}

export default function RatingChart() {
  const [ratings, setRatings] = useState<RatingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRatings() {
      try {
        const analytics = await getAnalytics();
        setRatings(analytics.ratings);
      } catch (error) {
        console.error("Failed to load ratings:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRatings();
  }, []);

  if (loading) {
    return (
      <GlassCard padding="lg">
        <div className="py-20 text-center text-zinc-400">
          Loading ratings...
        </div>
      </GlassCard>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard padding="lg">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-white">
            Average Rating
          </h3>

          <p className="text-sm text-zinc-500">
            By business cluster (out of 5)
          </p>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratings}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />

              <XAxis
                dataKey="cluster"
                tick={{ fill: "#71717a", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                domain={[0, 5]}
                tick={{ fill: "#71717a" }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              <Bar dataKey="avgRating" radius={[8, 8, 0, 0]}>
                {ratings.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </motion.div>
  );
}