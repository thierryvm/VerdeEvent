import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://verdeevent.be';

  // Routes principales
  const routes = [
    '',
    '/oceane-event-planner',
    '/vertiyo',
    '/contact',
    '/blog',
    '/conditions-generales',
    '/services',
  ];

  // Articles de blog (à remplacer par une requête à la base de données dans un cas réel)
  const blogSlugs = [
    'organisation-mariage-belgique',
    'amenagement-jardin-ecologique',
    'tendances-decoration-evenements',
    'jardin-mediterraneen-belgique',
    'decoration-florale-evenement',
  ];

  const routeEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  })) as MetadataRoute.Sitemap;

  const blogEntries = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  })) as MetadataRoute.Sitemap;

  return [...routeEntries, ...blogEntries];
}
