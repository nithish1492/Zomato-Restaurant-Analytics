import { motion } from 'framer-motion';
import { Boxes, Server, Layers, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';

const ARCHITECTURE_LAYERS = [
  {
    icon: Boxes,
    title: 'Frontend Layer',
    description:
      'React 19 + TypeScript single-page application. Fetches predictions via Axios and renders analytics with Recharts, styled with Tailwind CSS v4.',
    items: ['React Router for navigation', 'Framer Motion for interaction', 'Typed API service layer'],
  },
  {
    icon: Server,
    title: 'API Layer',
    description:
      'A FastAPI service exposes a single prediction endpoint that wraps the trained scikit-learn clustering model behind a typed request/response schema.',
    items: ['POST /predict endpoint', 'Pydantic request validation', 'JSON response with cluster + segment'],
  },
  {
    icon: Layers,
    title: 'Machine Learning Layer',
    description:
      'A K-Means clustering model trained offline on preprocessed restaurant data, serialized and loaded by the API at startup for low-latency inference.',
    items: ['Scikit-learn K-Means model', 'Preprocessing pipeline (scaler + encoders)', 'Serialized with joblib'],
  },
];

/**
 * Three-layer system architecture: frontend, API, and ML model —
 * explaining how the pieces of the platform connect.
 */
export default function ArchitectureSection() {
  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="System Design"
          eyebrowIcon={Boxes}
          title="Project architecture"
          description="Three layers work together: a typed frontend, a FastAPI inference service, and the trained clustering model at the core."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {ARCHITECTURE_LAYERS.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <GlassCard hoverLift variant="elevated" padding="lg" className="h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 ring-1 ring-brand-500/20">
                    <Icon size={20} className="text-brand-400" strokeWidth={2} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{layer.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {layer.description}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2 border-t border-white/[0.06] pt-4">
                    {layer.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-zinc-500">
                        <ArrowRight size={12} className="mt-0.5 shrink-0 text-brand-500/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                {index < ARCHITECTURE_LAYERS.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-bg-base">
                      <ArrowRight size={12} className="text-zinc-600" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
