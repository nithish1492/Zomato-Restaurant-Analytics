import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Sparkles, BarChart3, ArrowUpRight } from "lucide-react";

import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import { HOME_STATS } from "@/utils/mockData";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-6xl text-center"
        >
          {/* Badge */}

          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-5 py-2 text-sm text-brand-300 backdrop-blur-xl">
              <Sparkles size={16} />
              Powered by Machine Learning Clustering
            </div>
          </motion.div>

          {/* Heading */}

          <motion.h1
            variants={itemVariants}
            className="mt-8 text-6xl font-black leading-[0.95] tracking-tight text-white md:text-7xl lg:text-[7rem]"
          >
            Restaurant business
            <br />
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-600 bg-clip-text text-transparent">
              intelligence, clustered.
            </span>
          </motion.h1>

          {/* Description */}

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-zinc-400"
          >
            Zomato Restaurant Analytics segments restaurants into business
            clusters using ratings, pricing and sentiment analysis, then
            predicts the best matching category for any restaurant using
            Machine Learning.
          </motion.p>

          {/* Buttons */}

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <NavLink to="/prediction">
              <Button
                variant="primary"
                size="lg"
                icon={Sparkles}
                iconPosition="right"
              >
                Run a Prediction
              </Button>
            </NavLink>

            <NavLink to="/analytics">
              <Button
                variant="secondary"
                size="lg"
                icon={BarChart3}
                iconPosition="right"
              >
                Explore Analytics
              </Button>
            </NavLink>
          </motion.div>

          {/* Learn More */}

          <motion.div variants={itemVariants} className="mt-8">
            <NavLink
              to="/about"
              className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-zinc-300"
            >
              Learn how the ML pipeline works

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </NavLink>
          </motion.div>
        </motion.div>

        {/* Stats */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
          className="mt-24 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {HOME_STATS.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}