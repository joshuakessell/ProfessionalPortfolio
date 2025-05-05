import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  sectionIds: string[];
}

export function ScrollIndicator({ sectionIds }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // Function to determine which section is in view
    const handleScroll = () => {
      // Get all section elements
      const sectionElements = sectionIds.map(id => document.getElementById(id));
      
      // Get current scroll position and viewport dimensions
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollPosition = scrollY + (windowHeight / 2); // Middle of viewport
      
      // Check each section's position to determine which one is active
      let newActiveSection = 0;
      let closestDistance = Infinity;
      
      sectionElements.forEach((section, index) => {
        if (!section) return;
        
        // Get section position
        const rect = section.getBoundingClientRect();
        const sectionTop = scrollY + rect.top;
        const sectionMiddle = sectionTop + (rect.height / 2);
        
        // Calculate distance from viewport middle to section middle
        const distance = Math.abs(scrollPosition - sectionMiddle);
        
        // Is this section completely visible or at least 50% visible?
        const isVisible = 
          (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3);
        
        // If this section is closer to viewport middle than previous ones
        if (isVisible && distance < closestDistance) {
          closestDistance = distance;
          newActiveSection = index;
        }
      });
      
      // Update active section if changed
      setActiveSection(newActiveSection);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check (with slight delay to ensure DOM is loaded)
    setTimeout(handleScroll, 200);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  // Handle button click
  const handleClick = (index: number) => {
    const sectionId = sectionIds[index];
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Scroll to section
      section.scrollIntoView({ behavior: 'smooth' });
      // Set active section
      setActiveSection(index);
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