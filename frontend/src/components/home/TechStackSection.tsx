import { motion } from 'framer-motion';
import { Layers3 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { TECH_STACK } from '@/utils/mockData';
import { staggerContainer, staggerItem } from '@/components/ui/FadeInSection';

/**
 * Technology stack showcase, grouped by Frontend / ML-Backend. Uses a
 * compact pill grid rather than large cards to keep visual weight low.
 */
export default function TechStackSection() {
  const frontend = TECH_STACK.filter((t) => t.category === 'Frontend');
  const backend = TECH_STACK.filter((t) => t.category === 'ML / Backend');

  const groups = [
    { label: 'Frontend', items: frontend },
    { label: 'ML / Backend', items: backend },
  ];

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Technology"
          eyebrowIcon={Layers3}
          title="Engineered end-to-end"
          description="A modern frontend paired with a Python-based machine learning backend, connected through a typed REST interface."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.label}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {group.label}
              </h4>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-wrap gap-2.5"
              >
                {group.items.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      variants={staggerItem}
                      whileHover={{ y: -3 }}
                      className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 backdrop-blur-xl transition-colors hover:border-brand-500/30"
                    >
                      <Icon size={15} className="text-brand-400" strokeWidth={2} />
                      <span className="text-sm font-medium text-zinc-200">
                        {tech.name}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
