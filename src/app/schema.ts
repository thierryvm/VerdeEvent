export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VerdeEvent',
  url: 'https://verdeevent.be',
  logo: 'https://verdeevent.be/images/logo.png',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61572107505592',
    'https://www.instagram.com/verdevent_snc/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+32496066603',
    contactType: 'customer service',
    availableLanguage: ['French', 'Dutch', 'English'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BE',
  },
  description:
    "VerdeEvent est une entreprise spécialisée dans l'organisation d'événements et l'aménagement paysager en Belgique.",
};

export const weddingPlannerSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Océane Event Planner - Services de Wedding Planner',
  provider: {
    '@type': 'Organization',
    name: 'VerdeEvent - Océane Event Planner',
    url: 'https://verdeevent.be/oceane-event-planner',
    sameAs: [
      'https://www.facebook.com/profile.php?id=61569451644244',
      'https://www.instagram.com/oceane_eventplanner/',
    ],
  },
  serviceType: 'Wedding Planning',
  areaServed: {
    '@type': 'Country',
    name: 'Belgium',
  },
  description:
    "Services professionnels de wedding planner et organisation d'événements en Belgique. Organisation complète ou partielle de votre mariage.",
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'EUR',
    },
  },
};

export const landscapingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: "Vertiyo - Services d'aménagement paysager",
  provider: {
    '@type': 'Organization',
    name: 'VerdeEvent - Vertiyo',
    url: 'https://verdeevent.be/vertiyo',
    sameAs: ['https://www.instagram.com/vertiyoparcsetjardins/'],
  },
  serviceType: 'Landscaping',
  areaServed: {
    '@type': 'Country',
    name: 'Belgium',
  },
  description:
    "Services professionnels d'aménagement et d'entretien de jardins en Belgique. Création d'espaces verts écologiques et durables.",
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'EUR',
    },
  },
};
