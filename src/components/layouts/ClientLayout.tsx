'use client';

import Footer from '@/components/navigation/Footer';
import { Header } from '@/components/navigation/Header';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { Toaster } from 'sonner';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ScrollToTop />
      </div>
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
}
