import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  sectionIds: string[];
}

export function ScrollIndicator({ sectionIds }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0);
  const sectionNames = ['Home', 'Resume', 'Projects', 'Blog', 'Contact'];

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
    <div className="nav-indicator">
      <div className="flex flex-col items-center space-y-6">
        {sectionIds.map((id, index) => (
          <div key={index} className="relative group">
            <button
              onClick={() => handleClick(index)}
              className={`nav-dot ${activeSection === index ? 'active animate-glow' : ''}`}
              aria-label={`Scroll to ${sectionNames[index]} section`}
            />
            
            {/* Label that appears on hover */}
            <div className="absolute top-0 right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              <span className="bg-gray-800 text-gray-100 px-2 py-1 rounded text-xs font-semibold">
                {sectionNames[index]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}