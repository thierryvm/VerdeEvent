import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Verde Event',
  description: 'Découvrez nos articles, conseils et inspirations pour vos événements et jardins.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
