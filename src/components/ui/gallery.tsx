'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { AspectRatioImage, OptimizedImage } from './optimized-image';

interface GalleryProps {
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  className?: string;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

export function Gallery({ images, className, columns = 3, gap = 'md' }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const gapSizes = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  const handlePrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setSelectedIndex(null);
  };

  return (
    <>
      <div className={cn('grid grid-cols-1 gap-4', gridCols[columns], gapSizes[gap], className)}>
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => setSelectedIndex(index)}
            className="relative group overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <AspectRatioImage
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-7xl bg-black/95 border-none p-0" onKeyDown={handleKeyDown}>
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full p-2"
            aria-label="Fermer la galerie"
          >
            <X className="h-6 w-6" />
          </button>

          {selectedIndex !== null && (
            <div className="relative aspect-video">
              <OptimizedImage
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain"
                priority
              />

              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full p-2"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-full p-2"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
