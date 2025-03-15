import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Verde Event',
  description:
    'Contactez-nous pour organiser votre événement ou aménager votre jardin. Nous sommes à votre disposition pour répondre à toutes vos questions.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
