import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  sectionIds: string[];
}

export function ScrollIndicator({ sectionIds }: ScrollIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Listen for active section changes by checking for the 'active' class
  useEffect(() => {
    const checkActiveSection = () => {
      for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (section?.classList.contains('active')) {
          setActiveIndex(i);
          break;
        }
      }
    };
    
    // Set up an observer to watch for changes to the 'active' class on sections
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkActiveSection();
        }
      });
    });
    
    // Observe all sections for class changes
    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section, { attributes: true });
      }
    });
    
    // Set initial active index
    checkActiveSection();
    
    // Also listen for scroll events as a backup
    const handleScroll = () => {
      // Find which section is most visible in the viewport
      let maxVisibleArea = 0;
      let mostVisibleIndex = activeIndex;
      
      sectionIds.forEach((id, index) => {
        const section = document.getElementById(id);
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        // Calculate how much of the section is visible in the viewport
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const visibleArea = Math.max(0, visibleHeight) / rect.height;
        
        if (visibleArea > maxVisibleArea) {
          maxVisibleArea = visibleArea;
          mostVisibleIndex = index;
        }
      });
      
      if (mostVisibleIndex !== activeIndex) {
        setActiveIndex(mostVisibleIndex);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, activeIndex]);

  // Handle click on dot indicators
  const handleClick = (index: number) => {
    const sectionId = sectionIds[index];
    const section = document.getElementById(sectionId);
    
    if (section) {
      // First, mark all sections as inactive
      sectionIds.forEach(id => {
        const elem = document.getElementById(id);
        if (elem) {
          elem.classList.remove('active');
        }
      });
      
      // Then mark target section as active
      section.classList.add('active');
      
      // Set active index immediately
      setActiveIndex(index);
      
      // Scroll to section
      section.scrollIntoView({ behavior: 'smooth' });
      
      // Update URL hash
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  return (
    <div className="scroll-indicator">
      <div className="flex flex-col items-center space-y-6">
        {sectionIds.map((sectionId, index) => {
          // Convert sectionId to display name
          let sectionName = '';
          switch(sectionId) {
            case 'hero': sectionName = 'About'; break;
            case 'resume': sectionName = 'Resume'; break;
            case 'projects': sectionName = 'Projects'; break;
            case 'contact': sectionName = 'Contact'; break;
            default: sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
          }
          
          return (
            <div key={index} className="group relative">
              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {sectionName}
              </div>
              
              <button
                onClick={() => handleClick(index)}
                className={`indicator-dot ${activeIndex === index ? 'active' : ''}`}
                aria-label={`Scroll to ${sectionName} section`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}