import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCcw } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import FormField from './FormField';
import { PREDICTION_FIELDS, DEFAULT_PREDICTION_VALUES } from '@/utils/mockData';
import { clamp } from '@/utils/formatters';
import type { PredictionFormValues } from '@/types/prediction';

interface PredictionFormProps {
  onSubmit: (values: PredictionFormValues) => void;
  isSubmitting: boolean;
}

const SENTIMENT_FIELDS: (keyof PredictionFormValues)[] = [
  'positive_percent',
  'negative_percent',
  'neutral_percent',
];

/**
 * Nine-field numeric form for restaurant metrics, submitted to the
 * clustering model. Validates that sentiment percentages are within
 * range and warns (non-blocking) if they don't sum to 100%.
 */
export default function PredictionForm({ onSubmit, isSubmitting }: PredictionFormProps) {
  const [values, setValues] = useState<PredictionFormValues>(DEFAULT_PREDICTION_VALUES);

  const sentimentTotal =
    values.positive_percent + values.negative_percent + values.neutral_percent;
  const sentimentWarning = Math.abs(sentimentTotal - 100) > 0.5;

  const handleChange =
    (name: keyof PredictionFormValues, min: number, max: number) => (value: number) => {
      setValues((prev) => ({ ...prev, [name]: clamp(value, min, max) }));
    };

  const handleReset = () => setValues(DEFAULT_PREDICTION_VALUES);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit}
    >
      <GlassCard variant="elevated" padding="lg">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Restaurant Metrics</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Enter the nine input features used by the trained clustering model.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
          >
            <RefreshCcw size={12} />
            Reset
          </button>
        </div>

        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {PREDICTION_FIELDS.map((field) => (
            <FormField
              key={field.name}
              id={field.name}
              label={field.label}
              description={field.description}
              unit={field.unit}
              value={values[field.name]}
              min={field.min}
              max={field.max}
              step={field.step}
              onChange={handleChange(field.name, field.min, field.max)}
              error={
                SENTIMENT_FIELDS.includes(field.name) && sentimentWarning
                  ? 'Sentiment percentages should total 100%'
                  : undefined
              }
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600">
            Sentiment total:{' '}
            <span className={sentimentWarning ? 'font-semibold text-amber-400' : 'font-semibold text-zinc-400'}>
              {sentimentTotal.toFixed(1)}%
            </span>
          </p>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Sparkles}
            iconPosition="right"
            isLoading={isSubmitting}
            fullWidth
            className="sm:w-auto"
          >
            Predict Business Segment
          </Button>
        </div>
      </GlassCard>
    </motion.form>
  );
}
