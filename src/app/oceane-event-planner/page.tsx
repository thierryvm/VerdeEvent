'use client';

import { SocialLinks } from '@/components/SocialLinks';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Section, SectionHeader } from '@/components/ui/section';
import { Calendar, CheckCircle2, Clock, Heart, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function OceaneEventPlannerPage() {
  const services = [
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: 'Mariages',
      description:
        'Organisation complète ou partielle de votre mariage, de la recherche du lieu à la coordination le jour J.',
      features: [
        'Recherche de lieux et prestataires',
        'Planification et coordination',
        'Décoration personnalisée',
        'Gestion des invités',
      ],
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: 'Événements privés',
      description:
        'Anniversaires, baby showers, fiançailles et autres célébrations familiales inoubliables.',
      features: [
        'Thématiques originales',
        'Décoration sur mesure',
        'Animation et divertissement',
        'Traiteur et restauration',
      ],
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Événements d'entreprise",
      description: "Séminaires, lancements de produits, team buildings et soirées d'entreprise.",
      features: [
        'Lieux adaptés à vos besoins',
        'Logistique complète',
        'Activités de cohésion',
        'Restauration professionnelle',
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Sophie & Thomas',
      event: 'Mariage',
      quote:
        'Océane a transformé notre mariage en un jour parfait. Son attention aux détails et sa créativité ont dépassé toutes nos attentes.',
      rating: 5,
    },
    {
      name: 'Marie Dubois',
      event: 'Baby Shower',
      quote:
        'Une organisation impeccable pour ma baby shower. Tout était magnifique et mes invités ont adoré la décoration et les animations.',
      rating: 5,
    },
    {
      name: 'Entreprise XYZ',
      event: "Séminaire d'entreprise",
      quote:
        'Professionnalisme et efficacité pour notre séminaire annuel. Océane a su répondre à toutes nos exigences avec brio.',
      rating: 4,
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
            src="/images/event-planner.jpg"
            alt="Océane Event Planner - Organisation d'événements"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary/50" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4">
              Océane Event Planner
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
              Organisation d'événements sur mesure
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary-dark text-white font-medium"
            >
              <Link href="/contact">Demander un devis</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/testimonial-3.jpg"
              alt="À propos d'Océane Event Planner"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
              style={{ objectPosition: '50% 20%' }}
            />
          </div>
          <div>
            <h2 className="text-3xl font-playfair font-bold mb-4">À propos d'Océane</h2>
            <p className="mb-4">
              Passionnée par l'organisation d'événements, Océane met son expertise et sa créativité
              au service de vos moments les plus précieux. Avec une attention méticuleuse aux
              détails et un sens aigu de l'esthétique, elle transforme vos rêves en réalités
              mémorables.
            </p>
            <p className="mb-6">
              Que ce soit pour un mariage féerique, un anniversaire festif ou un événement
              d'entreprise professionnel, Océane Event Planner vous accompagne de la conception à la
              réalisation, en veillant à ce que chaque détail reflète votre personnalité et vos
              souhaits.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <span>10+ ans d'expérience</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                <span>200+ événements réussis</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-primary mr-2" />
                <span>Satisfaction garantie</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section className="bg-background-secondary">
        <SectionHeader
          title="Nos Services"
          description="Des prestations sur mesure pour tous vos événements"
          centered
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-playfair font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
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
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/contact">Contactez-nous pour en savoir plus</Link>
          </Button>
        </div>
      </Section>

      {/* Process Section */}
      <Section>
        <SectionHeader
          title="Notre Approche"
          description="Un processus simple et efficace pour des événements réussis"
          centered
        />

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              number: '01',
              title: 'Consultation',
              description:
                'Nous discutons de vos idées, besoins et budget pour comprendre votre vision.',
            },
            {
              number: '02',
              title: 'Planification',
              description:
                'Nous élaborons un plan détaillé incluant tous les aspects de votre événement.',
            },
            {
              number: '03',
              title: 'Coordination',
              description:
                'Nous gérons tous les prestataires et la logistique pour un événement sans stress.',
            },
            {
              number: '04',
              title: 'Réalisation',
              description:
                'Le jour J, nous veillons à ce que tout se déroule parfaitement selon le plan établi.',
            },
          ].map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section className="bg-background-secondary">
        <SectionHeader
          title="Témoignages"
          description="Ce que nos clients disent de nous"
          centered
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <div className="mt-auto">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.event}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold mb-4">
            Prêt à créer un événement inoubliable ?
          </h2>
          <p className="mb-8">
            Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous
            pouvons vous aider à réaliser l'événement de vos rêves.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Demander un devis gratuit</Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}
