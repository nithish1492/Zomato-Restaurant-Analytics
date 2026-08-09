import { NavLink } from 'react-router-dom';
import { ChartNoAxesCombined, Github, Linkedin, Mail } from 'lucide-react';

const FOOTER_LINKS = [
  {
    heading: 'Platform',
    links: [
      { label: 'Home', path: '/' },
      { label: 'Analytics Dashboard', path: '/analytics' },
      { label: 'Prediction Engine', path: '/prediction' },
      { label: 'About the Project', path: '/about' },
    ],
  },
];

/**
 * Minimal premium footer with brand identity, sitemap links, and
 * project meta information.
 */
export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 shadow-[0_4px_16px_-2px_rgba(226,55,68,0.5)]">
              <ChartNoAxesCombined size={18} className="text-white" strokeWidth={2.25} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-tight text-white">
                Zomato Restaurant Analytics
              </span>
              <span className="mt-0.5 text-[11px] font-medium text-zinc-500">
                Restaurant Segmentation Intelligence
              </span>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            A machine learning platform for clustering restaurant business
            segments and predicting classification from rating, cost, and
            sentiment signals.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:border-brand-500/30 hover:text-brand-400"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:border-brand-500/30 hover:text-brand-400"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:contact@example.com"
              aria-label="Send email"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:border-brand-500/30 hover:text-brand-400"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="flex gap-16">
          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {group.heading}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-zinc-600 sm:flex-row">
        <span>© {new Date().getFullYear()} Zomato Restaurant Analytics. All rights reserved.</span>
        <span>Built with React, TypeScript & Machine Learning</span>
      </div>
    </footer>
  );
}
