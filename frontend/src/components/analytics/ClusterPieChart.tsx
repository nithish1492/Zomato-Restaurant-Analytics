import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

interface ClusterData {
  name: string;
  value: number;
  color: string;
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  const item = payload[0];

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900 p-3 shadow-lg">
      <p className="font-semibold text-white">{item.name}</p>
      <p className="text-sm text-zinc-400">
        {item.value?.toLocaleString()} restaurants
      </p>
    </div>
  );
}

export default function ClusterPieChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [data, setData] = useState<ClusterData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const analytics = await getAnalytics();

        const chartData = analytics.clusters.map((cluster, index) => ({
          name: cluster.name,
          value: cluster.count,
          color: COLORS[index % COLORS.length],
        }));

        setData(chartData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <GlassCard padding="lg">
        <div className="py-20 text-center text-zinc-400">
          Loading chart...
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
            Cluster Distribution
          </h3>

          <p className="text-sm text-zinc-500">
            Restaurant count by business segment
          </p>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="85%"
                paddingAngle={3}
                cornerRadius={6}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    opacity={
                      activeIndex === null || activeIndex === index ? 1 : 0.35
                    }
                    stroke="rgba(9,9,11,0.8)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip />} />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs text-zinc-400">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </motion.div>
  );
}