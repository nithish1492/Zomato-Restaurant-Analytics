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
import { CLUSTER_COLORS } from "@/utils/mockData";

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 shadow-xl">
      <p className="text-sm font-semibold text-white">{label}</p>
      <p className="text-sm text-brand-400">
        ₹{payload[0].value?.toLocaleString()}
      </p>
    </div>
  );
}

export default function CostChart() {
  const [costData, setCostData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const analytics = await getAnalytics();

        if (analytics.costs) {
          setCostData(analytics.costs);
        }
      } catch (err) {
        console.error("Failed to load cost data", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <GlassCard padding="lg">
        <div className="flex h-72 items-center justify-center text-zinc-400">
          Loading Cost Data...
        </div>
      </GlassCard>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <GlassCard padding="lg">
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-white">
            Average Cost
          </h3>

          <p className="mt-1 text-zinc-400">
            Average cost for two by business cluster
          </p>
        </div>

        <div className="h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={costData}
              margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />

              <XAxis
                dataKey="cluster"
                tick={{ fill: "#71717a", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              />

              <YAxis
                tick={{ fill: "#71717a", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
                content={<CustomTooltip />}
              />

              <Bar dataKey="avgCost" radius={[8, 8, 0, 0]} maxBarSize={45}>
                {costData.map((_item, index) => (
                  <Cell
                    key={index}
                    fill={CLUSTER_COLORS[index % CLUSTER_COLORS.length]}
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