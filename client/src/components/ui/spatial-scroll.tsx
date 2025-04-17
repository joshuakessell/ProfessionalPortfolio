import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SpatialScrollSectionProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  depth?: number;
}

export function SpatialScrollSection({
  children,
  className,
  scale = 0.8,
  depth = 1
}: SpatialScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [elementTop, setElementTop] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Reset measurements on window resize
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setElementTop(rect.top + window.scrollY);
        setElementHeight(rect.height);
      }
    };

    // Initial measurements
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update scroll position and check visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Calculate if element is visible
      const startVisible = elementTop - viewportHeight;
      const endVisible = elementTop + elementHeight;
      
      setIsVisible(
        window.scrollY > startVisible && 
        window.scrollY < endVisible
      );
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementTop, elementHeight, viewportHeight]);

  // Calculate scale and translation effects
  const calculateEffects = () => {
    if (!isVisible) return {};
    
    // Calculate how far the element is through the viewport
    const scrollStart = elementTop - viewportHeight;
    const scrollProgress = (scrollPosition - scrollStart) / (elementHeight + viewportHeight);
    
    // Clamp scroll progress between 0 and 1
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    
    // Calculate scale effect (start small, grow as you scroll)
    const scaleEffect = scale + (1 - scale) * clampedProgress;
    
    // Calculate perspective effect (further away at start, closer at end)
    const perspectiveValue = 1000;
    const translateZ = (depth * 200) * (1 - clampedProgress) - (depth * 200);
    
    return {
      transform: `perspective(${perspectiveValue}px) scale(${scaleEffect}) translateZ(${translateZ}px)`,
      opacity: 0.2 + clampedProgress * 0.8,
    };
  };

  return (
    <div 
      ref={sectionRef}
      className={cn(
        "relative transition-transform duration-75 will-change-transform",
        className
      )}
      style={calculateEffects()}
    >
      {children}
    </div>
  );
}

export function SpatialScrollContainer({ 
  children, 
  className 
}: { 
  children: ReactNode;
  className?: string; 
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
    </div>
  );
}