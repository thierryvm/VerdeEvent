import { Footer } from '@/components/navigation/Footer';
import { Navigation } from '@/components/navigation/Navigation';
import { SchemaOrg } from '@/components/SchemaOrg';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { SkipToContent } from '@/components/ui/SkipToContent';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Roboto } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  preload: true,
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://verdeevent.be'),
  title: {
    default: 'VerdeEvent - Wedding Planner et Aménagement Paysager en Belgique',
    template: '%s | VerdeEvent',
  },
  description:
    'Spécialiste en organisation de mariage et aménagement de jardin en Belgique. Wedding planner professionnel et services de paysagiste pour des événements et espaces verts inoubliables.',
  keywords: [
    'wedding planner',
    'organisation mariage',
    'aménagement jardin',
    'paysagiste',
    'événementiel',
    'mariage Belgique',
    'décoration florale',
    'jardin écologique',
    'espaces verts',
  ],
  authors: [{ name: 'VerdeEvent' }],
  creator: 'VerdeEvent',
  openGraph: {
    type: 'website',
    locale: 'fr_BE',
    url: 'https://verdeevent.be',
    siteName: 'VerdeEvent',
    title: 'VerdeEvent - Wedding Planner et Aménagement Paysager en Belgique',
    description:
      'Spécialiste en organisation de mariage et aménagement de jardin en Belgique. Wedding planner professionnel et services de paysagiste pour des événements et espaces verts inoubliables.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VerdeEvent - Wedding Planner et Aménagement Paysager',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VerdeEvent - Wedding Planner et Aménagement Paysager en Belgique',
    description: 'Spécialiste en organisation de mariage et aménagement de jardin en Belgique.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${roboto.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <SchemaOrg />
      </head>
      <body className="min-h-screen flex flex-col pt-16">
        <SkipToContent />
        <Navigation />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
