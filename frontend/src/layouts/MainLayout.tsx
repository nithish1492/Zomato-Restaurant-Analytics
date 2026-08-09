import type { ReactNode } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import GlowBackground from '@/components/ui/GlowBackground';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Application shell: ambient background, floating navbar, routed page
 * content, and footer. Wraps every route via App.tsx.
 */
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-bg-base">
      <GlowBackground />
      <Navbar />
      <main className="relative z-10 flex-1 pt-24">{children}</main>
      <Footer />
    </div>
  );
}
