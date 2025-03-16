'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Section, SectionHeader } from '@/components/ui/section';
import { ArrowRight, Calendar, CheckCircle2, Heart, Leaf, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="VerdeEvent - Aménagement paysager et Wedding Planner"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4">
              VerdeEvent
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-6">
              Aménagement paysager et organisation d'événements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white font-medium"
              >
                <Link href="/oceane-event-planner">Événements</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/20 font-medium"
              >
                <Link href="/vertiyo">Espaces verts</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-playfair font-bold mb-4">Bienvenue chez VerdeEvent</h2>
            <p className="mb-4 text-text-primary">
              VerdeEvent est une entreprise spécialisée dans l'aménagement paysager et
              l'organisation d'événements en Belgique. Nous proposons des services de qualité pour
              créer des espaces verts magnifiques et des événements inoubliables.
            </p>
            <p className="mb-6 text-text-primary">
              Notre équipe de professionnels passionnés met son expertise à votre service pour
              réaliser vos projets les plus ambitieux, qu'il s'agisse de transformer votre jardin ou
              d'organiser le plus beau jour de votre vie.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                <span>Service personnalisé</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                <span>Équipe professionnelle</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                <span>Approche écologique</span>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                <span>Satisfaction garantie</span>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/garden1.jpg"
              alt="Jardin aménagé par VerdeEvent"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section className="bg-primary/5">
        <SectionHeader
          title="Nos Services"
          description="Découvrez nos deux pôles d'expertise"
          centered
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Oceane Event Planner */}
          <Card className="h-full overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/images/event-planner.jpg"
                alt="Océane Event Planner"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-playfair font-semibold">Océane Event Planner</h3>
              </div>
              <p className="mb-4">
                Organisation d'événements privés et professionnels. Mariages, anniversaires,
                séminaires et plus encore.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Mariages</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Événements privés</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Événements d'entreprise</span>
                </div>
              </div>
              <Button asChild className="w-full bg-primary hover:bg-primary-dark text-white">
                <Link href="/oceane-event-planner" className="flex items-center justify-center">
                  Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Vertiyo */}
          <Card className="h-full overflow-hidden">
            <div className="relative h-64">
              <Image
                src="/images/garden-design.jpg"
                alt="Vertiyo"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Leaf className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-playfair font-semibold">Vertiyo</h3>
              </div>
              <p className="mb-4">
                Création et entretien d'espaces verts écologiques. Jardins, terrasses, balcons et
                aménagements paysagers durables.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Création de jardins</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Entretien écologique</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm">Aménagement paysager</span>
                </div>
              </div>
              <Button asChild className="w-full bg-primary hover:bg-primary-dark text-white">
                <Link href="/vertiyo" className="flex items-center justify-center">
                  Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Values Section */}
      <Section>
        <SectionHeader title="Nos Valeurs" description="Ce qui nous guide au quotidien" centered />

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <CheckCircle2 className="h-10 w-10 text-primary" />,
              title: 'Qualité',
              description:
                'Nous nous engageons à offrir des services de la plus haute qualité, avec une attention méticuleuse aux détails.',
            },
            {
              icon: <Leaf className="h-10 w-10 text-primary" />,
              title: 'Écologie',
              description:
                "Le respect de l'environnement est au cœur de notre approche, tant pour les événements que pour les espaces verts.",
            },
            {
              icon: <Heart className="h-10 w-10 text-primary" />,
              title: 'Passion',
              description:
                'Notre passion pour notre métier se reflète dans chaque projet que nous réalisons pour nos clients.',
            },
          ].map((value, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-playfair font-semibold mb-2">{value.title}</h3>
                <p className="text-text-secondary">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary/5">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold mb-4">
            Prêt à créer un événement inoubliable ?
          </h2>
          <p className="mb-8 text-text-primary">
            Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous
            pouvons vous aider à réaliser l'événement de vos rêves.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary-dark text-white font-medium"
          >
            <Link href="/contact">Demander un devis gratuit</Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}
