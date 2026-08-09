import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';
import { SENTIMENT_BY_CLUSTER } from '@/utils/mockData';

const SENTIMENT_COLORS = {
  positive: '#22c55e',
  neutral: '#71717a',
  negative: '#e23744',
};

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-black/90 px-3.5 py-2.5 shadow-2xl backdrop-blur-xl">
      <p className="mb-1.5 text-xs font-medium text-zinc-400">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-xs font-semibold" style={{ color: entry.color }}>
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  );
}

/**
 * Stacked bar chart showing positive / neutral / negative sentiment
 * composition per business cluster.
 */
export default function SentimentChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard variant="elevated" padding="lg">
        <div className="mb-5">
          <h3 className="text-base font-semibold text-white">Sentiment Breakdown</h3>
          <p className="mt-1 text-sm text-zinc-500">
            Review sentiment composition by cluster
          </p>
        </div>

        <div className="h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SENTIMENT_BY_CLUSTER} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: '#71717a', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#71717a', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-xs text-zinc-400">{value}</span>}
              />
              <Bar dataKey="positive" name="Positive" stackId="sentiment" fill={SENTIMENT_COLORS.positive} radius={[0, 0, 0, 0]} maxBarSize={40} />
              <Bar dataKey="neutral" name="Neutral" stackId="sentiment" fill={SENTIMENT_COLORS.neutral} maxBarSize={40} />
              <Bar dataKey="negative" name="Negative" stackId="sentiment" fill={SENTIMENT_COLORS.negative} radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </motion.div>
  );
}
