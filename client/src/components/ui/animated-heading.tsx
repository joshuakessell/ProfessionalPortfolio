import React from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

interface AnimatedHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function AnimatedHeading({
  title,
  subtitle,
  centered = true,
  className,
}: AnimatedHeadingProps) {
  const [ref, isInView] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div 
      ref={ref} 
      className={cn(
        centered ? 'text-center' : '',
        'mb-12',
        className
      )}
    >
      <h2 
        className={cn(
          'text-3xl md:text-4xl font-bold mb-3',
          isInView ? 'animate-fade-in' : 'opacity-0'
        )}
      >
        {title}
      </h2>
      
      {subtitle && (
        <p 
          className={cn(
            'text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto',
            isInView ? 'animate-fade-in stagger-1' : 'opacity-0'
          )}
        >
          {subtitle}
        </p>
      )}
      
      <div 
        className={cn(
          'h-1 w-20 bg-primary mt-4',
          centered ? 'mx-auto' : '',
          isInView ? 'animate-slide-right stagger-2' : 'opacity-0'
        )}
      />
    </div>
  );
}