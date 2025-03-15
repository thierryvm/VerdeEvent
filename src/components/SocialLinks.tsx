'use client';

import { Facebook, Instagram } from 'lucide-react';
import { usePathname } from 'next/navigation';

// Définition des liens sociaux par service
export const socialLinks = {
  default: [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61572107505592',
      icon: Facebook,
      hoverColor: 'hover:text-[#1877F2]',
      bgColor: 'bg-[#1877F2]',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/verdevent_snc/',
      icon: Instagram,
      hoverColor: 'hover:text-[#E4405F]',
      bgColor: 'bg-[#E4405F]',
    },
  ],
  oceane: [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61569451644244',
      icon: Facebook,
      hoverColor: 'hover:text-[#1877F2]',
      bgColor: 'bg-[#1877F2]',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/oceane_eventplanner/',
      icon: Instagram,
      hoverColor: 'hover:text-[#E4405F]',
      bgColor: 'bg-[#E4405F]',
    },
  ],
  vertiyo: [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/vertiyoparcsetjardins/',
      icon: Instagram,
      hoverColor: 'hover:text-[#E4405F]',
      bgColor: 'bg-[#E4405F]',
    },
  ],
};

interface SocialLinksProps {
  variant?: 'default' | 'floating' | 'hero';
  className?: string;
}

export function SocialLinks({ variant = 'default', className = '' }: SocialLinksProps) {
  const pathname = usePathname();

  // Déterminer quels liens sociaux afficher en fonction de la page
  let currentSocialLinks = socialLinks.default;

  if (pathname.includes('/oceane-event-planner')) {
    currentSocialLinks = socialLinks.oceane;
  } else if (pathname.includes('/vertiyo')) {
    currentSocialLinks = socialLinks.vertiyo;
  }

  if (variant === 'default') {
    return (
      <div className={`flex space-x-4 ${className}`}>
        {currentSocialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-foreground transition-colors ${link.hoverColor} p-2 rounded-full bg-gray-100 shadow-sm hover:shadow-md`}
            aria-label={link.name}
          >
            <link.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <div
        className={`fixed left-4 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-40 ${className}`}
      >
        {currentSocialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.bgColor} text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110`}
            aria-label={link.name}
          >
            <link.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`flex space-x-3 ${className}`}>
        {currentSocialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
            aria-label={link.name}
          >
            <link.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    );
  }

  return null;
}
