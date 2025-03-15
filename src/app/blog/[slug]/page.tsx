'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Articles de blog fictifs (même données que dans la page blog)
const blogPosts = [
  {
    id: 1,
    title: 'Comment organiser un mariage éco-responsable',
    excerpt:
      "Découvrez nos conseils pour organiser un mariage respectueux de l'environnement sans compromettre l'élégance et la beauté de votre journée spéciale.",
    content: `
      <p>Organiser un mariage éco-responsable est une démarche de plus en plus populaire auprès des futurs mariés soucieux de l'environnement. Voici quelques conseils pour rendre votre grand jour plus respectueux de la planète sans sacrifier l'élégance et la magie de cet événement spécial.</p>

      <h2>Choisir un lieu respectueux de l'environnement</h2>
      <p>Optez pour un lieu qui partage vos valeurs écologiques. Les domaines qui utilisent des énergies renouvelables, pratiquent le recyclage et proposent une cuisine locale et de saison sont d'excellents choix. Les espaces extérieurs comme les jardins ou les parcs nécessitent généralement moins de décoration et permettent de profiter de la beauté naturelle.</p>

      <h2>Invitations et papeterie durables</h2>
      <p>Privilégiez les invitations électroniques ou, si vous préférez le papier, choisissez du papier recyclé ou ensemencé que vos invités pourront planter après l'événement. Limitez les éléments de papeterie le jour J en utilisant des panneaux réutilisables pour le menu, le plan de table, etc.</p>

      <h2>Décoration éco-responsable</h2>
      <p>Favorisez les fleurs locales et de saison, ou optez pour des plantes en pot qui pourront être replantées après la cérémonie. Évitez les ballons et le plastique à usage unique. Pensez à louer ou à acheter d'occasion certains éléments de décoration, et privilégiez les matériaux naturels comme le bois, le verre ou le tissu.</p>

      <h2>Menu durable</h2>
      <p>Travaillez avec un traiteur qui s'approvisionne localement et propose des produits de saison. Réduisez la quantité de viande au menu ou optez pour un repas entièrement végétarien. Assurez-vous que les restes seront compostés ou donnés, et évitez la vaisselle jetable.</p>

      <h2>Cadeaux et souvenirs écologiques</h2>
      <p>Pour votre liste de mariage, privilégiez les expériences plutôt que les objets, ou demandez des contributions pour un projet important (voyage, maison, etc.). Pour les cadeaux d'invités, optez pour des souvenirs utiles, durables et si possible locaux : plantes, graines à semer, produits artisanaux, etc.</p>

      <p>En suivant ces conseils, vous pourrez célébrer votre amour tout en respectant vos valeurs environnementales. N'oubliez pas que chaque petit geste compte, et que l'important est de faire des choix conscients qui vous correspondent.</p>
    `,
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
    content: `
      <p>L'aménagement paysager évolue constamment, avec de nouvelles tendances qui émergent chaque année. En 2023, nous observons un retour à la nature et une attention particulière portée à la durabilité et à la fonctionnalité des espaces extérieurs. Voici les principales tendances qui façonnent les jardins cette année.</p>

      <h2>Jardins comestibles et potagers décoratifs</h2>
      <p>Les jardins comestibles gagnent en popularité, avec une intégration harmonieuse des plantes ornementales et des cultures vivrières. Les potagers ne sont plus relégués à l'arrière du jardin mais deviennent des éléments centraux du design paysager. Les herbes aromatiques, légumes colorés et arbres fruitiers sont disposés de manière esthétique, créant des espaces à la fois beaux et productifs.</p>

      <h2>Jardins adaptés au changement climatique</h2>
      <p>Face aux défis environnementaux, les jardins économes en eau et résistants aux conditions météorologiques extrêmes sont de plus en plus recherchés. Les plantes indigènes, naturellement adaptées au climat local, sont privilégiées. Les systèmes de récupération d'eau de pluie et l'irrigation goutte-à-goutte deviennent des éléments standard dans la conception des jardins modernes.</p>

      <h2>Espaces extérieurs multifonctionnels</h2>
      <p>Les jardins ne sont plus simplement des espaces à admirer, mais des extensions de la maison où l'on vit pleinement. Les zones de cuisine extérieure, les espaces de travail en plein air et les salons de jardin confortables transforment les espaces verts en véritables pièces à vivre. L'éclairage sophistiqué permet de profiter du jardin même après le coucher du soleil.</p>

      <h2>Retour au naturel et biodiversité</h2>
      <p>Les jardins trop maîtrisés cèdent la place à des aménagements plus naturels et sauvages. Les prairies fleuries, les haies mixtes et les zones laissées volontairement moins entretenues créent des habitats pour la faune locale. Cette approche plus écologique favorise la biodiversité tout en réduisant l'entretien nécessaire.</p>

      <h2>Matériaux durables et réutilisés</h2>
      <p>L'utilisation de matériaux durables, recyclés ou récupérés s'inscrit dans la tendance éco-responsable. Le bois certifié, la pierre locale, le métal recyclé et même le plastique récupéré transformé en mobilier de jardin sont privilégiés pour leur impact environnemental réduit et leur caractère unique.</p>

      <p>Ces tendances reflètent une prise de conscience croissante de l'importance des espaces verts dans notre bien-être quotidien et notre responsabilité environnementale. En intégrant ces éléments dans votre jardin, vous créerez un espace non seulement beau et agréable, mais aussi durable et en harmonie avec la nature.</p>
    `,
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
    content: `
      <p>Le choix du lieu pour un événement d'entreprise est une décision cruciale qui peut faire toute la différence entre un événement réussi et un échec. Que vous organisiez une conférence, un séminaire, une soirée de gala ou un team building, voici les facteurs essentiels à considérer pour sélectionner le lieu idéal.</p>

      <h2>Définir clairement les objectifs et le format de l'événement</h2>
      <p>Avant de commencer vos recherches, déterminez précisément le type d'événement que vous organisez, ses objectifs, le nombre de participants attendus et le format (présentations, ateliers, networking, etc.). Ces éléments vous aideront à identifier les caractéristiques indispensables que doit posséder le lieu.</p>

      <h2>Considérer l'emplacement et l'accessibilité</h2>
      <p>Un lieu central, facilement accessible en transports en commun et disposant d'un parking suffisant est généralement préférable. Si certains participants viennent de loin, la proximité avec des hôtels et des gares/aéroports est un atout. Pensez également à l'accessibilité pour les personnes à mobilité réduite.</p>

      <h2>Évaluer la capacité et la configuration de l'espace</h2>
      <p>Assurez-vous que le lieu peut accueillir confortablement tous vos participants. La configuration doit être adaptée à votre format : disposition en théâtre pour les conférences, en U pour les discussions, tables rondes pour les ateliers, etc. La flexibilité de l'espace est un plus si votre événement comporte plusieurs activités.</p>

      <h2>Vérifier les équipements et services disponibles</h2>
      <p>Selon vos besoins, vérifiez la disponibilité d'équipements audiovisuels, de connexion Wi-Fi fiable, de services de restauration, de personnel sur place, etc. Certains lieux offrent des packages tout compris, tandis que d'autres vous demanderont de faire appel à des prestataires externes.</p>

      <h2>Prendre en compte l'ambiance et l'image</h2>
      <p>Le lieu choisi doit refléter l'image de votre entreprise et correspondre à l'atmosphère souhaitée pour votre événement. Un espace moderne et minimaliste pour un lancement de produit tech, un cadre élégant pour un dîner de gala, ou un lieu insolite pour un team building créatif.</p>

      <h2>Établir un budget réaliste</h2>
      <p>Le coût de la location n'est qu'une partie du budget à considérer. N'oubliez pas d'inclure les frais supplémentaires potentiels : équipements, personnel, restauration, décoration, etc. Demandez des devis détaillés et vérifiez ce qui est inclus dans le prix de base.</p>

      <p>En prenant le temps d'évaluer soigneusement ces différents aspects, vous augmenterez considérablement vos chances de trouver le lieu parfait pour votre événement d'entreprise. N'hésitez pas à visiter plusieurs endroits et à poser toutes vos questions avant de prendre votre décision finale.</p>
    `,
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
    content: `
      <p>Le charme des jardins méditerranéens, avec leurs couleurs chaudes, leurs parfums enivrants et leur ambiance décontractée, fait rêver de nombreux amateurs de jardinage en Belgique. Mais est-il vraiment possible de recréer cette atmosphère sous un climat plus frais et humide ? La réponse est oui, avec quelques adaptations et astuces judicieuses.</p>

      <h2>Comprendre les défis du climat belge</h2>
      <p>Le principal défi pour créer un jardin méditerranéen en Belgique réside dans les différences climatiques : hivers plus froids et humides, étés moins chauds et ensoleillés, et précipitations plus régulières tout au long de l'année. Ces conditions contrastent avec le climat méditerranéen caractérisé par des étés chauds et secs et des hivers doux.</p>

      <h2>Choisir le bon emplacement</h2>
      <p>Pour maximiser vos chances de succès, choisissez l'endroit le plus chaud et ensoleillé de votre jardin, idéalement protégé des vents dominants. Un emplacement contre un mur orienté au sud, qui emmagasinera la chaleur pendant la journée et la restituera la nuit, créera un microclimat favorable aux plantes méditerranéennes.</p>

      <h2>Améliorer le drainage du sol</h2>
      <p>Les plantes méditerranéennes détestent avoir "les pieds dans l'eau". Améliorez le drainage de votre sol en y incorporant du sable, du gravier ou de la pouzzolane. Vous pouvez également créer des plates-bandes surélevées ou des rocailles pour assurer un meilleur écoulement de l'eau.</p>

      <h2>Sélectionner des plantes adaptées</h2>
      <p>Certaines plantes méditerranéennes sont plus résistantes au froid que d'autres. Parmi les arbres et arbustes, privilégiez le chêne vert, l'olivier (certaines variétés), le laurier-sauce, le romarin, la lavande, le ciste et le genêt. Côté vivaces, optez pour la sauge, l'achillée, l'œillet, l'iris, la valériane rouge ou encore l'euphorbe. Les graminées comme la fétuque bleue ou le stipa apporteront texture et mouvement.</p>

      <h2>Protéger les plantes en hiver</h2>
      <p>Certaines plantes plus fragiles nécessiteront une protection hivernale. Paillez le pied des plantes sensibles avec des feuilles mortes ou du compost. Les plantes en pot peuvent être rentrées dans une véranda ou un garage lumineux. Pour les plantes non déplaçables, un voile d'hivernage peut être utilisé lors des périodes de gel intense.</p>

      <h2>Créer l'ambiance méditerranéenne</h2>
      <p>Au-delà des plantes, l'ambiance méditerranéenne passe aussi par les matériaux et les accessoires : dallage en terre cuite, murs en pierre sèche, graviers, poteries en terre cuite, pergola avec vigne ou glycine, mobilier en fer forgé... Ces éléments contribueront à recréer l'atmosphère des jardins du sud.</p>

      <p>En suivant ces conseils et en faisant preuve d'un peu de patience, vous pourrez créer un coin de Méditerranée dans votre jardin belge. Même si certaines adaptations sont nécessaires, le résultat vous offrira un espace chaleureux et ensoleillé, rappelant les vacances tout au long de l'année.</p>
    `,
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
    content: `
      <p>Les fleurs sont bien plus qu'une simple décoration pour un événement : elles créent une ambiance, transmettent des émotions et peuvent transformer complètement un espace. Que vous organisiez un mariage, une fête d'anniversaire, une conférence d'entreprise ou tout autre type d'événement, voici les secrets pour réussir votre décoration florale.</p>

      <h2>Définir un thème et une palette de couleurs</h2>
      <p>Avant de choisir vos fleurs, déterminez le thème et l'ambiance que vous souhaitez créer. Élégant et sophistiqué ? Rustique et champêtre ? Moderne et minimaliste ? Ensuite, sélectionnez une palette de couleurs cohérente avec votre thème et les autres éléments décoratifs de l'événement (nappes, vaisselle, éclairage, etc.).</p>

      <h2>Choisir des fleurs de saison</h2>
      <p>Opter pour des fleurs de saison présente plusieurs avantages : elles sont plus fraîches, plus belles, moins coûteuses et plus respectueuses de l'environnement. Chaque saison offre sa propre palette : pivoines et lilas au printemps, tournesols et dahlias en été, chrysanthèmes et roses d'automne en automne, amaryllis et branches de houx en hiver.</p>

      <h2>Varier les hauteurs et les volumes</h2>
      <p>Pour créer une décoration florale dynamique et intéressante, jouez avec différentes hauteurs et volumes. Alternez entre compositions hautes et basses sur vos tables, utilisez des fleurs suspendues pour habiller un plafond, ou créez un point focal avec une installation florale spectaculaire à l'entrée ou derrière une table d'honneur.</p>

      <h2>Penser au-delà des fleurs</h2>
      <p>Les feuillages, branches, herbes ornementales et même fruits peuvent enrichir vos compositions florales et leur donner du caractère. L'eucalyptus, la fougère, l'olivier ou le saule tortueux apportent texture et volume. N'hésitez pas à intégrer des éléments non végétaux comme des rubans, des perles ou des bougies pour personnaliser davantage vos arrangements.</p>

      <h2>Adapter les compositions à l'espace</h2>
      <p>La taille et le style de vos arrangements floraux doivent être en harmonie avec l'espace. Dans une grande salle avec de hauts plafonds, des compositions imposantes seront nécessaires pour avoir un impact. À l'inverse, dans un espace plus intime, des arrangements plus discrets et délicats seront plus appropriés.</p>

      <h2>Prévoir la logistique</h2>
      <p>N'oubliez pas les aspects pratiques : les fleurs doivent être préparées peu de temps avant l'événement pour garantir leur fraîcheur. Prévoyez un espace frais pour les stocker si nécessaire, et assurez-vous que vos compositions n'interfèrent pas avec la circulation des invités ou leur visibilité (notamment sur les tables).</p>

      <p>En suivant ces conseils et en faisant appel à un fleuriste professionnel si nécessaire, vous créerez une décoration florale qui enchantera vos invités et contribuera grandement au succès de votre événement. Les fleurs ont ce pouvoir unique de transformer un moment ordinaire en une expérience mémorable et sensorielle.</p>
    `,
    date: '5 septembre 2023',
    author: 'Océane Dupont',
    category: 'Événements',
    image: '/images/testimonial-1.jpg',
    slug: 'decoration-florale-evenement',
  },
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler une requête API pour récupérer l'article
    const foundPost = blogPosts.find((p) => p.slug === slug);
    setPost(foundPost);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Article non trouvé</h1>
        <p className="text-gray-600 mb-8">
          L'article que vous recherchez n'existe pas ou a été déplacé.
        </p>
        <Link
          href="/blog"
          className="flex items-center text-green-600 hover:text-green-700 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la liste des articles
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-white hover:text-green-300 mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au blog
            </Link>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl font-playfair">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-700 font-semibold">{post.author.charAt(0)}</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{post.author}</p>
                <div className="flex space-x-1 text-sm text-gray-300">
                  <time dateTime={post.date}>{post.date}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article content */}
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div
          className="prose prose-lg prose-green mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        <div className="mt-16 border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à la liste des articles
            </Link>
            <div className="flex space-x-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}&url=${encodeURIComponent(`https://verdeevent.be/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Partager sur Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  `https://verdeevent.be/blog/${post.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Partager sur Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(
                  `Je pense que cet article pourrait t'intéresser : https://verdeevent.be/blog/${post.slug}`
                )}`}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Partager par email</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
