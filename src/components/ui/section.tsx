'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'primary' | 'secondary';
  container?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', container = true, children, ...props }, ref) => {
    const sectionClasses = cn(
      'py-16 md:py-24',
      {
        'bg-white': variant === 'default',
        'bg-primary/5': variant === 'primary',
        'bg-secondary/5': variant === 'secondary',
      },
      className
    );

    const content = container ? <div className="container mx-auto px-4">{children}</div> : children;

    return (
      <section ref={ref} className={sectionClasses} {...props}>
        {content}
      </section>
    );
  }
);
Section.displayName = 'Section';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  centered?: boolean;
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, description, centered = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('max-w-3xl mb-12 md:mb-16', centered && 'mx-auto text-center', className)}
        {...props}
      >
        <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-4">{title}</h2>
        {description && (
          <p className="text-text-secondary text-lg leading-relaxed">{description}</p>
        )}
      </div>
    );
  }
);
SectionHeader.displayName = 'SectionHeader';

export { Section, SectionHeader };
