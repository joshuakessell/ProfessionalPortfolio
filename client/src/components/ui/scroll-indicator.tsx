import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  sectionIds: string[];
}

export function ScrollIndicator({ sectionIds }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sectionIds.map(id => document.getElementById(id));
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Adjusted for better detection
      
      // First determine if we're in the viewport of one of the sections
      let inViewport = false;
      
      for (let i = 0; i < sectionElements.length; i++) {
        const section = sectionElements[i];
        if (!section) continue;
        
        const sectionTop = section.offsetTop - 50; // Add some tolerance
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // Special case for resume section which might be scrollable
        if (sectionIds[i] === 'resume') {
          const resumeSection = section;
          const resumeContent = resumeSection.querySelector('.scroll-content');
          
          if (resumeContent) {
            // Check if we're within the resume section's viewport
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
              // We're in the resume section
              setActiveSection(i);
              inViewport = true;
              break;
            }
          }
        }
        
        // Check for other sections
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(i);
          inViewport = true;
          break; // Stop checking once we found the active section
        }
      }
      
      // If not in any section's viewport, we might be scrolling through the resume content
      if (!inViewport) {
        // Default to resume section if we haven't matched any section
        // This assumes we're scrolling through the resume content
        const resumeIndex = sectionIds.indexOf('resume');
        if (resumeIndex !== -1) {
          setActiveSection(resumeIndex);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      handleScroll();
    }, 200);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [sectionIds]);

  const handleClick = (index: number) => {
    const sectionId = sectionIds[index];
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Set a small timeout to ensure any UI updates complete first
      setTimeout(() => {
        // Calculate any offset for fixed headers
        const navbarHeight = 60; // Approximate height of the navbar
        const offsetPosition = section.offsetTop - navbarHeight;
        
        // Use scrollTo with offset to account for any padding and the fixed navbar
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update active section immediately for better feedback
        setActiveSection(index);
        
        // Also update URL hash for better navigation state
        window.history.pushState(null, '', `#${sectionId}`);
      }, 50);
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
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
                className={`w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center
                  hover:scale-125 ${
                  activeSection === index 
                    ? 'bg-primary border-2 border-white dark:border-gray-800 scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 border border-gray-200 dark:border-gray-700'
                }`}
                aria-label={`Scroll to ${sectionName} section`}
              >
                {activeSection === index && (
                  <div className="w-1 h-1 rounded-full bg-white dark:bg-gray-200"></div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}