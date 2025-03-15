'use client';

import { SocialLinks } from '@/components/SocialLinks';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, SlideIn } from '@/components/ui/motion';
import { Section, SectionHeader } from '@/components/ui/section';
import { CheckCircle2, Droplets, Leaf, Recycle, Sun, Wind } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function VertiyoPage() {
  const services = [
    {
      icon: <Leaf className="h-10 w-10 text-primary" />,
      title: 'Création de jardins',
      description:
        'Conception et réalisation de jardins sur mesure, adaptés à vos envies et à votre espace.',
      features: [
        'Étude personnalisée du terrain',
        'Plans et visualisations 3D',
        'Sélection de plantes adaptées',
        'Installation complète',
      ],
    },
    {
      icon: <Droplets className="h-10 w-10 text-primary" />,
      title: 'Entretien écologique',
      description: "Entretien régulier de vos espaces verts dans le respect de l'environnement.",
      features: [
        'Taille et élagage',
        'Désherbage manuel',
        'Fertilisation naturelle',
        "Gestion raisonnée de l'eau",
      ],
    },
    {
      icon: <Sun className="h-10 w-10 text-primary" />,
      title: 'Aménagement extérieur',
      description: "Création d'espaces de vie extérieurs pour profiter pleinement de votre jardin.",
      features: [
        'Terrasses et patios',
        'Allées et chemins',
        'Éclairage paysager',
        'Mobilier de jardin',
      ],
    },
  ];

  return (
    <main>
      {/* Social Links Flottants */}
      <SocialLinks variant="floating" className="hidden md:flex" />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        <div className="absolute inset-0">
          <Image
            src="/images/garden1.jpg"
            alt="Aménagement paysager Vertiyo"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary/50" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4">
              Vertiyo
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
              Aménagement paysager écologique et durable
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary-dark text-white font-medium"
            >
              <Link href="/contact">Demander un devis gratuit</Link>
            </Button>
          </FadeIn>
        </div>
      </div>

      {/* Services Section */}
      <Section>
        <SectionHeader
          title="Nos Services"
          description="Des solutions sur mesure pour vos espaces verts"
          centered
        />

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <SlideIn key={index} direction="up" delay={index * 0.1}>
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-playfair font-semibold mb-2">{service.title}</h3>
                  <p className="text-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2 mt-auto">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </SlideIn>
          ))}
        </div>
      </Section>

      {/* Philosophy Section */}
      <Section className="bg-primary/5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div>
              <h2 className="text-3xl font-playfair font-bold mb-4">Notre Philosophie</h2>
              <p className="mb-4 text-foreground">
                Chez Vertiyo, nous croyons que chaque espace vert est unique et mérite une approche
                personnalisée. Notre philosophie repose sur le respect de l'environnement et la
                création d'espaces harmonieux qui s'intègrent parfaitement à leur environnement.
              </p>
              <p className="mb-6 text-foreground">
                Nous privilégions les techniques écologiques et les plantes adaptées au climat local
                pour créer des jardins durables qui nécessitent peu d'entretien et d'eau. Notre
                objectif est de vous offrir un espace extérieur qui vous ressemble et qui respecte
                la nature.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Wind className="h-5 w-5 text-primary mr-2" />
                  <span>Respect de la biodiversité</span>
                </div>
                <div className="flex items-center">
                  <Droplets className="h-5 w-5 text-primary mr-2" />
                  <span>Gestion raisonnée de l'eau</span>
                </div>
                <div className="flex items-center">
                  <Recycle className="h-5 w-5 text-primary mr-2" />
                  <span>Matériaux écologiques</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-primary mr-2" />
                  <span>Plantes adaptées au climat</span>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="/images/garden3.jpg"
                alt="Jardin écologique"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Process Section */}
      <Section>
        <SectionHeader
          title="Notre Processus"
          description="Comment nous travaillons avec vous"
          centered
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              number: '1',
              title: 'Consultation',
              description: 'Nous discutons de vos besoins et de vos envies pour votre espace vert.',
            },
            {
              number: '2',
              title: 'Conception',
              description:
                'Nous créons un plan détaillé et des visualisations de votre futur jardin.',
            },
            {
              number: '3',
              title: 'Réalisation',
              description:
                'Notre équipe met en œuvre le projet avec soin et attention aux détails.',
            },
            {
              number: '4',
              title: 'Suivi',
              description:
                'Nous assurons un suivi régulier pour garantir la pérennité de votre jardin.',
            },
          ].map((step, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-2">{step.title}</h3>
                <p className="text-foreground">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Gallery Section */}
      <Section className="bg-primary/5">
        <SectionHeader
          title="Nos Réalisations"
          description="Quelques exemples de nos projets récents"
          centered
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: '/images/garden1.jpg', alt: 'Jardin aménagé 1' },
            { src: '/images/garden2.jpg', alt: 'Jardin aménagé 2' },
            { src: '/images/garden3.jpg', alt: 'Jardin aménagé 3' },
            { src: '/images/garden4.jpg', alt: 'Jardin aménagé 4' },
            { src: '/images/garden5.jpg', alt: 'Jardin aménagé 5' },
            { src: '/images/garden-design.jpg', alt: 'Conception de jardin' },
          ].map((image, index) => (
            <SlideIn key={index} direction="up" delay={index * 0.05}>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
            </SlideIn>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Prêt à transformer votre espace extérieur ?
            </h2>
            <p className="mb-8 text-foreground">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous
              pouvons vous aider à créer l'espace vert de vos rêves.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary-dark text-white font-medium"
            >
              <Link href="/contact">Demander un devis gratuit</Link>
            </Button>
          </FadeIn>
        </div>
      </Section>
    </main>
  );
}
