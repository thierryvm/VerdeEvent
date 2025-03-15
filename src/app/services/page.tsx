import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Section, SectionHeader } from '@/components/ui/section';
import { Check } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - VerdeEvent | Événementiel & Jardinage',
  description:
    "Découvrez nos services d'organisation d'événements et d'aménagement paysager. Solutions sur mesure pour particuliers et professionnels.",
  openGraph: {
    title: 'Services - VerdeEvent',
    description: "Services d'événementiel et de jardinage écologique",
    images: [{ url: '/images/services-og.jpg', width: 1200, height: 630 }],
  },
};

const eventServices = [
  {
    title: 'Mariages',
    description: 'Organisation complète ou partielle de votre mariage',
    features: [
      'Coordination jour J',
      'Sélection des prestataires',
      'Décoration personnalisée',
      'Planning détaillé',
    ],
  },
  {
    title: "Événements d'entreprise",
    description: 'Solutions professionnelles pour vos événements corporate',
    features: [
      'Séminaires et conférences',
      'Team building',
      "Soirées d'entreprise",
      'Lancements de produits',
    ],
  },
  {
    title: 'Événements privés',
    description: 'Des moments inoubliables pour toutes vos célébrations',
    features: ['Anniversaires', 'Baptêmes', 'Fêtes de famille', 'Cérémonies spéciales'],
  },
];

const gardenServices = [
  {
    title: 'Conception paysagère',
    description: 'Création de jardins sur mesure selon vos envies',
    features: [
      'Plans 3D',
      'Sélection des végétaux',
      'Aménagement durable',
      'Conseils personnalisés',
    ],
  },
  {
    title: 'Aménagement',
    description: 'Réalisation et installation de vos espaces verts',
    features: ['Plantation', "Systèmes d'irrigation", 'Terrasses et allées', 'Éclairage paysager'],
  },
  {
    title: 'Entretien',
    description: 'Maintenance régulière de vos espaces verts',
    features: [
      'Taille et élagage',
      'Tonte de pelouse',
      'Désherbage écologique',
      'Fertilisation naturelle',
    ],
  },
];

export default function ServicesPage() {
  return (
    <main>
      <Section variant="primary">
        <SectionHeader
          title="Nos Services"
          description="Une expertise double pour répondre à tous vos besoins"
          centered
        />
      </Section>

      <Section>
        <SectionHeader
          title="Océane Event Planner"
          description="Des événements sur mesure, de la conception à la réalisation"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {eventServices.map((service) => (
            <Card key={service.title} className="transform hover:scale-[1.02] transition-transform">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="secondary">
        <SectionHeader title="Vertiyo" description="L'art du jardinage écologique et durable" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gardenServices.map((service) => (
            <Card key={service.title} className="transform hover:scale-[1.02] transition-transform">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
