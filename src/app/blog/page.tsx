'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Articles de blog fictifs
const blogPosts = [
  {
    id: 1,
    title: 'Comment organiser un mariage éco-responsable',
    excerpt:
      "Découvrez nos conseils pour organiser un mariage respectueux de l'environnement sans compromettre l'élégance et la beauté de votre journée spéciale.",
    date: '15 mai 2023',
    author: 'Océane Dupont',
    category: 'Événements',
    image: '/images/event-planner.jpg',
    slug: 'mariage-eco-responsable',
  },
  {
    id: 2,
    title: 'Les tendances en aménagement de jardins pour 2023',
    excerpt:
      "Explorez les dernières tendances en matière d'aménagement paysager et découvrez comment transformer votre espace extérieur en un véritable havre de paix.",
    date: '3 juin 2023',
    author: 'Thomas Martin',
    category: 'Jardins',
    image: '/images/garden-design.jpg',
    slug: 'tendances-jardins-2023',
  },
  {
    id: 3,
    title: "Comment choisir le lieu parfait pour votre événement d'entreprise",
    excerpt:
      "Le choix du lieu est crucial pour la réussite de votre événement professionnel. Voici nos conseils pour trouver l'espace qui répondra parfaitement à vos besoins.",
    date: '22 juillet 2023',
    author: 'Océane Dupont',
    category: 'Événements',
    image: '/images/testimonial-3.jpg',
    slug: 'lieu-evenement-entreprise',
  },
  {
    id: 4,
    title: 'Créer un jardin méditerranéen en Belgique : est-ce possible ?',
    excerpt:
      "Malgré le climat belge, il est tout à fait possible de créer un jardin d'inspiration méditerranéenne. Découvrez nos astuces et recommandations de plantes.",
    date: '10 août 2023',
    author: 'Thomas Martin',
    category: 'Jardins',
    image: '/images/testimonial-2.jpg',
    slug: 'jardin-mediterraneen-belgique',
  },
  {
    id: 5,
    title: "Les secrets d'une décoration florale réussie pour votre événement",
    excerpt:
      "Les fleurs jouent un rôle essentiel dans l'ambiance de votre événement. Découvrez comment créer des arrangements floraux qui impressionneront vos invités.",
    date: '5 septembre 2023',
    author: 'Océane Dupont',
    category: 'Événements',
    image: '/images/testimonial-1.jpg',
    slug: 'decoration-florale-evenement',
  },
];

// Catégories pour le filtre
const categories = ['Tous', 'Événements', 'Jardins'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrer les articles par catégorie et recherche
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white">
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/hero-bg.jpg"
            alt="Blog Verde Event"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl font-playfair">
              Notre Blog
            </h1>
            <p className="mt-6 text-lg leading-8">
              Découvrez nos articles, conseils et inspirations pour vos événements et jardins.
            </p>
            <div className="mt-10 flex gap-x-6">
              <Link
                href="#articles"
                className="rounded-md bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
              >
                Voir les articles
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Filtres et recherche */}
        <div className="mb-12 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Liste des articles */}
        <div id="articles">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between bg-white p-6">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-600">
                        <span>{post.category}</span>
                      </p>
                      <Link href={`/blog/${post.slug}`} className="mt-2 block">
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-green-600">
                          {post.title}
                        </h3>
                        <p className="mt-3 text-base text-gray-600 line-clamp-3">{post.excerpt}</p>
                      </Link>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-700 font-semibold">
                            {post.author.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={post.date}>{post.date}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">Aucun article trouvé</h3>
              <p className="mt-2 text-gray-600">
                Essayez de modifier vos critères de recherche ou de sélectionner une autre
                catégorie.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
