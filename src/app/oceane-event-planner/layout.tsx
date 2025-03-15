import { weddingPlannerSchema } from '@/app/schema';
import { SchemaOrg } from '@/components/SchemaOrg';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Océane Event Planner - Wedding Planner et Organisation d'Événements",
  description:
    "Services professionnels de wedding planner et organisation d'événements en Belgique. Créez des moments inoubliables avec notre expertise en planification de mariages et événements.",
  keywords: [
    'wedding planner',
    'organisation mariage',
    'événementiel',
    'mariage Belgique',
    'décoration événement',
    'planification mariage',
  ],
  openGraph: {
    title: "Océane Event Planner - Wedding Planner et Organisation d'Événements",
    description:
      "Services professionnels de wedding planner et organisation d'événements en Belgique.",
    images: [{ url: '/images/event-planner.jpg', width: 1200, height: 630 }],
  },
};

export default function OceaneEventPlannerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaOrg schema={weddingPlannerSchema} />
      {children}
    </>
  );
}
