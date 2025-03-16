import { Footer } from '@/components/navigation/Footer';
import { Navigation } from '@/components/navigation/Navigation';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { SkipToContent } from '@/components/ui/SkipToContent';
import { AuthProvider } from '@/hooks/useAuth';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Roboto } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | VerdeEvent',
    default: "VerdeEvent - Organisation d'événements éco-responsables",
  },
  description:
    "VerdeEvent est une agence spécialisée dans l'organisation d'événements éco-responsables. Nous proposons des services de planification, de décoration et de coordination pour vos événements professionnels et personnels.",
  keywords: [
    'événements éco-responsables',
    'organisation événements',
    'événements durables',
    'événements verts',
    'mariage éco-responsable',
    'séminaire durable',
    'conférence verte',
  ],
  authors: [{ name: 'VerdeEvent', url: 'https://verdeevent.fr' }],
  creator: 'VerdeEvent',
  publisher: 'VerdeEvent',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://verdeevent.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "VerdeEvent - Organisation d'événements éco-responsables",
    description:
      "VerdeEvent est une agence spécialisée dans l'organisation d'événements éco-responsables. Nous proposons des services de planification, de décoration et de coordination pour vos événements professionnels et personnels.",
    url: 'https://verdeevent.fr',
    siteName: 'VerdeEvent',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "VerdeEvent - Organisation d'événements éco-responsables",
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "VerdeEvent - Organisation d'événements éco-responsables",
    description:
      "VerdeEvent est une agence spécialisée dans l'organisation d'événements éco-responsables. Nous proposons des services de planification, de décoration et de coordination pour vos événements professionnels et personnels.",
    images: ['/images/twitter-image.jpg'],
    creator: '@verdeevent',
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
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#10b981' },
    { media: '(prefers-color-scheme: dark)', color: '#047857' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${roboto.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col pt-16" suppressHydrationWarning>
        <AuthProvider>
          <SkipToContent />
          <Navigation />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </AuthProvider>
      </body>
    </html>
  );
}
