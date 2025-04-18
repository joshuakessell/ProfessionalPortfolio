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
      // Use scrollTo with offset to account for any padding
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
      
      // Update active section immediately for better feedback
      setActiveSection(index);
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col items-center space-y-4">
        {sectionIds.map((sectionId, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index 
                ? 'bg-primary scale-125' 
                : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
            }`}
            aria-label={`Scroll to ${sectionId} section`}
          />
        ))}
      </div>
    </div>
  );
}