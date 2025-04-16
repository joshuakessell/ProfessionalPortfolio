import React from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

type AnimationVariant = 
  | 'fade-in'
  | 'slide-left' 
  | 'slide-right' 
  | 'float' 
  | 'pulse-slow';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationVariant;
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  threshold?: number;
}

export function AnimatedSection({
  children,
  className,
  animation = 'fade-in',
  delay,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const [ref, isInView] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    triggerOnce: true,
  });

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in': return 'animate-fade-in';
      case 'slide-left': return 'animate-slide-left';
      case 'slide-right': return 'animate-slide-right';
      case 'float': return 'animate-float';
      case 'pulse-slow': return 'animate-pulse-slow';
      default: return 'animate-fade-in';
    }
  };

  const delayClass = delay ? `stagger-${delay}` : '';

  return (
    <div 
      ref={ref} 
      className={cn(
        className,
        isInView ? getAnimationClass() : 'opacity-0',
        delayClass
      )}
    >
      {children}
    </div>
  );
}