import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface FormFieldProps {
  id: string;
  label: string;
  description: string;
  unit?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  error?: string;
  onChange: (value: number) => void;
}

/**
 * A single numeric input paired with a synced range slider, label, and
 * helper text. Used for every field in the prediction form so behavior
 * and styling stay perfectly consistent across all nine inputs.
 */
const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ id, label, description, unit, value, min, max, step, error, onChange }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-2.5"
      >
        <div className="flex items-baseline justify-between gap-2">
          <label htmlFor={id} className="text-sm font-medium text-zinc-200">
            {label}
          </label>
          <div className="flex items-center gap-1.5">
            <input
              ref={ref}
              id={id}
              type="number"
              value={value}
              min={min}
              max={max}
              step={step}
              onChange={(e) => onChange(Number(e.target.value))}
              className={cn(
                'w-20 rounded-lg border bg-white/[0.04] px-2.5 py-1.5 text-right text-sm font-semibold text-white outline-none transition-colors',
                'border-white/10 focus:border-brand-500/50 focus:bg-white/[0.06]',
                error && 'border-rose-500/50',
              )}
            />
            {unit && <span className="text-xs text-zinc-500">{unit}</span>}
          </div>
        </div>

        <div className="relative flex items-center">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="range-slider h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 outline-none"
            style={{
              background: `linear-gradient(to right, #e23744 ${percentage}%, rgba(255,255,255,0.08) ${percentage}%)`,
            }}
            aria-label={label}
          />
        </div>

        <p className="text-xs leading-relaxed text-zinc-500">{description}</p>
        {error && <p className="text-xs font-medium text-rose-400">{error}</p>}
      </motion.div>
    );
  },
);

FormField.displayName = 'FormField';

export default FormField;
