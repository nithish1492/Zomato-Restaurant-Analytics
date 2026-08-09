import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  RotateCcw,
  Layers,
} from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import type {
  PredictionResponse,
  PredictionStatus,
} from "@/types/prediction";
import { formatClusterLabel } from "@/utils/formatters";

interface PredictionResultProps {
  status: PredictionStatus;
  result: PredictionResponse | null;
  errorMessage: string | null;
  onReset: () => void;
}

/**
 * Displays the outcome of a prediction request: loading spinner state,
 * success card with predicted cluster + business segment, or an error
 * card with a readable message and retry action.
 */
export default function PredictionResult({
  status,
  result,
  errorMessage,
  onReset,
}: PredictionResultProps) {
  return (
    <>
      {status === "loading" && (
        <motion.div
          key="loading"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
        >
          <GlassCard>
            <div className="relative flex flex-col items-center py-8 text-center">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/10">
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <Sparkles size={22} className="text-brand-400" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                Running inference…
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Sending metrics to the clustering model for classification.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {status === "success" && result && (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <GlassCard className="p-10 text-center">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                <CheckCircle2
                  size={30}
                  className="text-emerald-400"
                />
              </div>
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white">
              Prediction Complete
            </h2>

            <p className="mt-2 text-zinc-400">
              The ML model successfully classified the restaurant.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-2 flex items-center gap-2 text-zinc-400">
                  <Layers size={16} />
                  Predicted Cluster
                </div>

                <h3 className="text-4xl font-bold text-white">
                  {formatClusterLabel(result.cluster)}
                </h3>
              </div>

              <div className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-6">
                <div className="mb-2 flex items-center gap-2 text-brand-400">
                  <Sparkles size={16} />
                  Business Segment
                </div>

                <h3 className="text-2xl font-bold text-white">
                  {result.segment}
                </h3>
              </div>
            </div>

            <Button
              variant="secondary"
              className="mt-8"
              icon={RotateCcw}
              onClick={onReset}
            >
              Run Another Prediction
            </Button>
          </GlassCard>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          key="error"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
        >
          <GlassCard>
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/25">
                <XCircle
                  size={26}
                  className="text-red-400"
                  strokeWidth={2}
                />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                Prediction failed
              </h3>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
                {errorMessage}
              </p>

              <Button
                variant="secondary"
                size="md"
                icon={RotateCcw}
                iconPosition="left"
                onClick={onReset}
                className="mt-6"
              >
                Try Again
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </>
  );
}