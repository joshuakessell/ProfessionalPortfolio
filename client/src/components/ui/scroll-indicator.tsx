import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  sectionIds: string[];
}

export function ScrollIndicator({ sectionIds }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + (window.innerHeight / 3);
      const viewportHeight = window.innerHeight;
      
      // Find which section is currently visible in the viewport
      let foundActive = false;
      
      sectionIds.forEach((id, index) => {
        const section = document.getElementById(id);
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        
        // If section is mostly visible in the viewport
        if (rect.top < viewportHeight * 0.5 && rect.bottom > viewportHeight * 0.3) {
          setActiveSection(index);
          foundActive = true;
        }
      });
      
      // If no section is found to be active, use scroll position to determine
      if (!foundActive) {
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = (scrollPosition / (documentHeight - viewportHeight)) * 100;
        
        // Rough estimation of active section based on scroll percentage
        const sectionCount = sectionIds.length;
        const sectionPercentage = 100 / sectionCount;
        const estimatedActiveSection = Math.min(
          sectionCount - 1,
          Math.floor(scrollPercentage / sectionPercentage)
        );
        
        setActiveSection(estimatedActiveSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    setTimeout(handleScroll, 100); // Delay to ensure DOM is fully rendered
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  const handleClick = (index: number) => {
    const sectionId = sectionIds[index];
    const section = document.getElementById(sectionId);
    
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index); // Immediately update the active section on click
    }
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