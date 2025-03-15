'use client';

import { SocialLinks } from '@/components/SocialLinks';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer className="bg-white border-t border-border">
      {/* CTA Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="bg-primary/5 rounded-xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-primary">
            Prêt à concrétiser votre projet ?
          </h2>
          <p className="text-foreground mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de votre événement ou de votre projet
            d'aménagement paysager.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium bg-primary text-white hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Nous contacter
          </Link>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4 text-primary">VerdeEvent</h3>
            <p className="text-foreground mb-4">
              Des événements inoubliables et des espaces verts magnifiques pour embellir votre
              quotidien.
            </p>
            <SocialLinks />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/oceane-event-planner"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Océane Event Planner
                </Link>
              </li>
              <li>
                <Link
                  href="/vertiyo"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Vertiyo
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/conditions-generales"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Conditions générales
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Nos services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/oceane-event-planner"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Organisation de mariages
                </Link>
              </li>
              <li>
                <Link
                  href="/oceane-event-planner"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Événements privés
                </Link>
              </li>
              <li>
                <Link
                  href="/oceane-event-planner"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Événements d'entreprise
                </Link>
              </li>
              <li>
                <Link
                  href="/vertiyo"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Aménagement de jardins
                </Link>
              </li>
              <li>
                <Link
                  href="/vertiyo"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  Entretien d'espaces verts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5 mr-3" />
                <span className="text-foreground">Belgique</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0 mr-3" />
                <a
                  href={pathname.includes('/vertiyo') ? 'tel:+32471513857' : 'tel:+32496066603'}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {pathname.includes('/vertiyo') ? '+32 471 513 857' : '+32 496 066 603'}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0 mr-3" />
                <a
                  href="mailto:contact@verdeevent.be"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  contact@verdeevent.be
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-foreground text-sm">
          <p>© {currentYear} VerdeEvent. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
