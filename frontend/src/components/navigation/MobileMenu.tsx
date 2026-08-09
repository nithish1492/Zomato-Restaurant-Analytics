import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { NavItem } from '@/types/common';
import { cn } from '@/utils/cn';

interface MobileMenuProps {
  items: NavItem[];
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen frosted-glass mobile navigation overlay, shown below the
 * navbar on small viewports.
 */
export default function MobileMenu({ items, open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-24 z-50 rounded-2xl border border-white/10 bg-black/80 p-3 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.7)] backdrop-blur-2xl md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <nav className="flex flex-col gap-1">
              {items.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                >
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors',
                        isActive
                          ? 'bg-brand-500/15 text-white ring-1 ring-brand-500/25'
                          : 'text-zinc-400 hover:bg-white/[0.06] hover:text-white',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * items.length, duration: 0.3 }}
                className="mt-2 border-t border-white/10 pt-3"
              >
                <NavLink
                  to="/prediction"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(226,55,68,0.55)]"
                >
                  Run Prediction
                  <Sparkles size={14} />
                </NavLink>
              </motion.div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
