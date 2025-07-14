import { useEffect, useState, useCallback } from 'react';
import { smoothScrollToElement } from '@/lib/utils';

interface ScrollIndicatorProps {
  sectionIds: string[];
}

export function ScrollIndicator({ sectionIds }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0);

  // Improved scroll detection function specifically for scroll-snap pages
  const detectVisibleSection = useCallback(() => {
    // For scroll-snap layouts, we need to be more precise
    const viewportHeight = window.innerHeight;
    
    // In scroll-snap, typically one section dominates the viewport
    // We'll determine which section has the most coverage of the viewport
    let maxVisibleSection = 0;
    let maxVisiblePercentage = 0;
    
    // Track the section with least negative offset (closest to top of viewport)
    let mostVisibleSection = -1;
    let leastNegativeTop = -Infinity;
    
    // Track the section with least positive bottom (closest to bottom of viewport)
    let leastPositiveBottom = Infinity;
    
    sectionIds.forEach((id, index) => {
      const section = document.getElementById(id);
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      
      // Special case: section is perfectly aligned at top (snap happened)
      if (Math.abs(rect.top) < 5) {
        mostVisibleSection = index;
      }
      
      // Calculate how much of the section is visible
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      
      if (visibleBottom <= 0 || visibleTop >= viewportHeight) {
        // Section not visible at all
        return;
      }
      
      // Track the section with top closest to viewport top
      if (rect.top > leastNegativeTop && rect.top <= 0) {
        leastNegativeTop = rect.top;
        mostVisibleSection = index;
      }
      
      // Calculate visible percentage
      const visibleHeight = visibleBottom - visibleTop;
      const percentVisible = visibleHeight / viewportHeight;
      
      if (percentVisible > maxVisiblePercentage) {
        maxVisiblePercentage = percentVisible;
        maxVisibleSection = index;
      }
    });
    
    // Special cases for first and last sections
    const isAtTop = window.scrollY < viewportHeight / 2;
    const isAtBottom = window.scrollY + viewportHeight >= document.body.scrollHeight - 50;
    
    if (isAtTop) {
      maxVisibleSection = 0;
    } else if (isAtBottom) {
      maxVisibleSection = sectionIds.length - 1;
    } else if (mostVisibleSection !== -1) {
      // If we detected a section that's perfectly aligned or nearly so
      maxVisibleSection = mostVisibleSection;
    }
    
    // Only update if needed to prevent unnecessary re-renders
    if (maxVisibleSection !== activeSection) {
      setActiveSection(maxVisibleSection);
    }
  }, [sectionIds, activeSection]);

  useEffect(() => {
    // Using a throttled handler for better performance
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          detectVisibleSection();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Specific handler for wheel events (mouse wheel/touchpad)
    const handleWheel = () => {
      handleScroll();
    };
    
    // Add event listeners for different types of scrolling
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    document.addEventListener('touchmove', handleScroll, { passive: true });
    
    // Try to catch all possible scroll events
    const scrollElements = document.querySelectorAll('.scroll-section, .scroll-container');
    scrollElements.forEach(el => {
      el.addEventListener('scroll', handleScroll, { passive: true });
    });
    
    // Initial detection with delay to ensure DOM is loaded
    const initialTimer = setTimeout(detectVisibleSection, 300);
    
    // Periodic checking (backup to ensure dots always match position)
    const intervalTimer = setInterval(detectVisibleSection, 1000);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleScroll);
      scrollElements.forEach(el => {
        el.removeEventListener('scroll', handleScroll);
      });
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [detectVisibleSection]);

  // Handle button click
  const handleClick = (index: number) => {
    const sectionId = sectionIds[index];
    smoothScrollToElement(sectionId);
    setActiveSection(index);
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col items-center space-y-5">
        {sectionIds.map((id, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              activeSection === index 
                ? 'bg-primary scale-125 shadow-lg shadow-primary/20' 
                : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
            }`}
            aria-label={`Scroll to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}