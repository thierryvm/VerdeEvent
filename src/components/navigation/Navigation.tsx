'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Leaf, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/oceane-event-planner', label: 'Océane Event Planner' },
  { href: '/vertiyo', label: 'Vertiyo' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary shadow-md h-16">
      <nav className="container mx-auto px-4 h-full flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="flex items-center justify-center h-10 w-10 mr-2 bg-primary rounded-full">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-playfair font-bold text-white">VerdeEvent</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href ? 'text-primary font-semibold' : 'text-white'
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            className="rounded-full bg-primary hover:bg-primary-dark text-white"
          >
            <Link href="/contact">Demander un devis</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          onClick={() => setMobileMenuOpen(true)}
          aria-expanded="false"
        >
          <span className="sr-only">Ouvrir le menu</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DialogContent className="sm:max-w-sm p-0 h-full bg-secondary">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-secondary-light">
              <div className="flex items-center">
                <div className="flex items-center justify-center h-10 w-10 mr-2 bg-primary rounded-full">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-playfair font-bold text-white">VerdeEvent</span>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Fermer le menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <div className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-base font-medium transition-colors hover:text-primary',
                      pathname === item.href ? 'text-primary font-semibold' : 'text-white'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-4 w-full rounded-full bg-primary hover:bg-primary-dark text-white"
                >
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Demander un devis
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
