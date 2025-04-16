import { useEffect, useState, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends Element = HTMLDivElement>(
  options: IntersectionObserverOptions = {}
): [RefObject<T>, boolean] {
  const { root = null, rootMargin = '0px', threshold = 0, triggerOnce = false } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<T>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        // If triggerOnce is true and we've already triggered, ignore
        if (triggerOnce && hasTriggered.current) return;
        
        if (isElementIntersecting) {
          setIsIntersecting(true);
          
          if (triggerOnce) {
            hasTriggered.current = true;
            // Disconnect the observer if we only need to trigger once
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return [elementRef, isIntersecting];
}