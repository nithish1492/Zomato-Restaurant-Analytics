import { motion } from 'framer-motion';
import Hero from '@/components/home/Hero';
import FeaturesSection from '@/components/home/FeaturesSection';
import PipelineSection from '@/components/home/PipelineSection';
import TechStackSection from '@/components/home/TechStackSection';
import CTASection from '@/components/home/CTASection';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Home() {
  return (
    <motion.div {...pageTransition}>
      <Hero />
      <FeaturesSection />
      <PipelineSection />
      <TechStackSection />
      <CTASection />
    </motion.div>
  );
}
