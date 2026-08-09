import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import PredictionForm from '@/components/prediction/PredictionForm';
import PredictionResult from '@/components/prediction/PredictionResult';
import { usePrediction } from '@/hooks/usePrediction';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Prediction() {
  const { status, result, errorMessage, submit, reset } = usePrediction();

  return (
    <motion.div {...pageTransition} className="px-6 pb-24 pt-4 sm:pt-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-300">
            <Sparkles size={13} strokeWidth={2.5} />
            Live Model Inference
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Predict a business segment
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            Enter restaurant metrics below to classify it into one of six
            business clusters using the trained K-Means model, served via
            FastAPI.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {status === 'idle' ? (
            <PredictionForm onSubmit={submit} isSubmitting={false} />
          ) : (
            <PredictionResult
              status={status}
              result={result}
              errorMessage={errorMessage}
              onReset={reset}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
