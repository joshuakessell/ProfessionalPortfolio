import { useEffect, useState } from 'react';

/**
 * A hook to create parallax scrolling effects
 * @param speed - Speed of the parallax effect (1 = normal, <1 slower, >1 faster)
 * @param direction - Direction of movement ('up' or 'down')
 * @returns The calculated transform value for the element
 */
export function useParallax(speed = 0.5, direction: 'up' | 'down' = 'up') {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const multiplier = direction === 'up' ? -1 : 1;
      setOffset(scrollPosition * speed * multiplier);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);
  
  return {
    transform: `translateY(${offset}px)`,
  };
}