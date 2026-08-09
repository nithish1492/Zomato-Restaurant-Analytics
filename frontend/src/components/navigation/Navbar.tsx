import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChartNoAxesCombined, Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { NavItem } from '@/types/common';
import MobileMenu from './MobileMenu';

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Analytics', path: '/analytics' },
  { label: 'Prediction', path: '/prediction' },
  { label: 'About', path: '/about' },
];

/**
 * Floating frosted-glass navbar. Fixed to the top of the viewport, shrinks
 * subtly on scroll, and highlights the active route.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <div
          className={cn(
            'flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-2xl transition-all duration-300 sm:px-5',
            scrolled
              ? 'border-white/10 bg-black/50 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]'
              : 'border-white/[0.06] bg-white/[0.03]',
          )}
        >
          {/* Logo / Brand identity */}
          <NavLink to="/" className="flex items-center gap-3 pr-2">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 shadow-[0_4px_16px_-2px_rgba(226,55,68,0.5)]">
              <ChartNoAxesCombined size={18} className="text-white" strokeWidth={2.25} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight text-white">
                Zomato Restaurant Analytics
              </span>
              <span className="mt-0.5 text-[11px] font-medium tracking-wide text-zinc-500">
                Restaurant Segmentation Intelligence
              </span>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-zinc-100',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl bg-brand-500/15 ring-1 ring-brand-500/25"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden items-center md:flex">
            <NavLink
              to="/prediction"
              className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(226,55,68,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-8px_rgba(226,55,68,0.65)]"
            >
              Run Prediction
              <Sparkles size={14} className="transition-transform group-hover:rotate-12" />
            </NavLink>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-200 md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <MobileMenu
        items={NAV_ITEMS}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
