import React from 'react';
import { useParallax } from '@/hooks/use-parallax';
import { cn } from '@/lib/utils';

interface ParallaxBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

export function ParallaxBackground({
  children,
  className,
  speed = 0.2,
  direction = 'up',
}: ParallaxBackgroundProps) {
  const parallaxStyle = useParallax(speed, direction);

  return (
    <div className="parallax-bg">
      <div 
        className={cn("w-full h-full", className)}
        style={parallaxStyle}
      >
        {children}
      </div>
    </div>
  );
}