import { Metadata, ResolvingMetadata } from 'next';

// Cette fonction est exécutée côté serveur
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // S'assurer que params.slug est disponible avant de l'utiliser
  const slug = params.slug;

  // Dans un cas réel, vous récupéreriez les données de l'article depuis une API ou une base de données
  // Pour cet exemple, nous utilisons un titre générique
  return {
    title: `Article: ${slug} - Verde Event`,
    description: 'Découvrez nos conseils et astuces pour vos événements et jardins.',
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
