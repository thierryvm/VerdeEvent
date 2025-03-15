import { landscapingSchema } from '@/app/schema';
import { SchemaOrg } from '@/components/SchemaOrg';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vertiyo - Aménagement Paysager et Entretien de Jardins',
  description:
    "Services professionnels d'aménagement paysager et d'entretien de jardins en Belgique. Création d'espaces verts écologiques et durables par des paysagistes experts.",
  keywords: [
    'aménagement jardin',
    'paysagiste',
    'jardin écologique',
    'espaces verts',
    'entretien jardin',
    'création jardin',
  ],
  openGraph: {
    title: 'Vertiyo - Aménagement Paysager et Entretien de Jardins',
    description:
      "Services professionnels d'aménagement paysager et d'entretien de jardins en Belgique.",
    images: [{ url: '/images/garden-design.jpg', width: 1200, height: 630 }],
  },
};

export default function VertiyoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaOrg schema={landscapingSchema} />
      {children}
    </>
  );
}
