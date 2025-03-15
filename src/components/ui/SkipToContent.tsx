'use client';

import { useEffect, useState } from 'react';

export function SkipToContent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        setIsVisible(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClick = () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      setTimeout(() => {
        mainContent.removeAttribute('tabindex');
      }, 1000);
    }
    setIsVisible(false);
  };

  return (
    <a
      href="#main"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-primary text-white px-4 py-2 rounded-md transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
        isVisible ? 'transform-none' : '-translate-y-20'
      }`}
      onClick={handleClick}
      onBlur={() => setIsVisible(false)}
    >
      Passer au contenu
    </a>
  );
}
