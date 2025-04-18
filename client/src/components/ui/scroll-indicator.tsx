import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  sectionIds: string[];
}

export function ScrollIndicator({ sectionIds }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0);

  // Listen for scroll events to detect the active section
  useEffect(() => {
    const handleScroll = () => {
      // Get current scroll position plus some offset for better detection
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;
      
      // Check each section
      let activeIndex = 0;
      let closestDistance = Infinity;
      
      for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (!section) continue;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionMiddle = sectionTop + sectionHeight / 2;
        
        // Calculate how close we are to this section's middle
        const distance = Math.abs(scrollPosition - sectionMiddle);
        
        // If this section is closer to our current scroll position, make it active
        if (distance < closestDistance) {
          closestDistance = distance;
          activeIndex = i;
        }
      }
      
      setActiveSection(activeIndex);
    };
    
    // Set initial active section
    setTimeout(handleScroll, 100);
    
    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  // Handle click on dot indicators to navigate to sections
  const handleClick = (index: number) => {
    const sectionId = sectionIds[index];
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Manually set active section for immediate feedback
      setActiveSection(index);
      
      // Scroll to the section with smooth animation
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update URL hash for better navigation state
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
                className={`indicator-dot ${activeSection === index ? 'active' : ''}`}
                aria-label={`Scroll to ${sectionName} section`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}