'use client';

import { cn } from '@/lib/utils';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  wrapperClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  wrapperClassName,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn('overflow-hidden relative', wrapperClassName)}>
      <Image
        className={cn(
          'duration-700 ease-in-out',
          isLoading ? 'scale-110 blur-2xl' : 'scale-100 blur-0',
          className
        )}
        src={src}
        alt={alt}
        quality={90}
        loading={priority ? 'eager' : 'lazy'}
        onLoadingComplete={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}

interface AspectRatioImageProps extends OptimizedImageProps {
  ratio?: number;
}

export function AspectRatioImage({ ratio = 16 / 9, ...props }: AspectRatioImageProps) {
  return (
    <div style={{ paddingBottom: `${(1 / ratio) * 100}%` }} className="relative w-full">
      <div className="absolute inset-0">
        <OptimizedImage {...props} className={cn('object-cover', props.className)} />
      </div>
    </div>
  );
}

interface BackgroundImageProps extends Omit<OptimizedImageProps, 'fill'> {
  children?: React.ReactNode;
  overlay?: boolean;
  overlayClassName?: string;
}

export function BackgroundImage({
  children,
  overlay = false,
  overlayClassName,
  wrapperClassName,
  ...props
}: BackgroundImageProps) {
  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      <OptimizedImage {...props} fill className={cn('object-cover', props.className)} />
      {overlay && <div className={cn('absolute inset-0 bg-black/50', overlayClassName)} />}
      {children}
    </div>
  );
}
