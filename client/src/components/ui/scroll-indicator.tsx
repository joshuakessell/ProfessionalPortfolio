import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  sectionIds: string[];
}

export function ScrollIndicator({ sectionIds }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      const sections = sectionIds.map(id => document.getElementById(id));
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Find the section that is currently in the viewport
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (!section) continue;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // If the section is in the viewport
        if (
          scrollPosition >= sectionTop - viewportHeight / 3 &&
          scrollPosition < sectionTop + sectionHeight - viewportHeight / 3
        ) {
          setActiveSection(i);
          break;
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  const scrollToSection = (index: number) => {
    const section = document.getElementById(sectionIds[index]);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="scroll-indicator">
      {sectionIds.map((_, index) => (
        <div
          key={index}
          className={`indicator-dot ${index === activeSection ? 'active' : ''}`}
          onClick={() => scrollToSection(index)}
          role="button"
          aria-label={`Scroll to section ${index + 1}`}
        />
      ))}
    </div>
  );
}