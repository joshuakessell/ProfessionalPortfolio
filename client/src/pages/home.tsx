import { HeroSection } from "@/components/home/hero-section";
import { ResumeSection } from "@/components/home/resume-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { ContactSection } from "@/components/home/contact-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Sections for the scroll indicator
  const sectionIds = ['hero', 'resume', 'projects', 'contact'];

  // Handle scroll events to detect active section and apply zoom effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.3;
      
      // Find which section is currently in view
      let foundActive = false;
      let closestSection = null;
      let closestDistance = Infinity;
      
      // First pass: check if any section is directly in view
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionMiddle = sectionTop + rect.height / 2;
        
        // Check if this section is in view (prioritize sections that are directly visible)
        if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + rect.height)) {
          foundActive = true;
          setActiveSection(id);
          
          // Set active class
          element.classList.add('active');
          
          // Special case for resume section - maintain active state when scrolling within
          if (id === 'resume') {
            const resumeContent = element.querySelector('.scroll-content');
            if (resumeContent && resumeContent.scrollHeight > resumeContent.clientHeight) {
              // Resume section has scrollable content
              foundActive = true;
            }
          }
        } else {
          element.classList.remove('active');
          
          // Calculate distance to section middle for fallback
          const distance = Math.abs(scrollPosition - sectionMiddle);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = { id, element };
          }
        }
      });
      
      // If no section is directly in view, activate the closest one
      if (!foundActive && closestSection) {
        setActiveSection(closestSection.id);
        closestSection.element.classList.add('active');
      }
    };
    
    // Set up initial state after a short delay
    setTimeout(() => {
      // Force initial active section
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        heroSection.classList.add('active');
      }
      
      // Then handle actual scroll position
      handleScroll();
    }, 300);
    
    // Add scroll event listener with throttling for performance
    let lastScrollTime = 0;
    const scrollThrottle = 100; // ms
    
    const throttledScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime > scrollThrottle) {
        lastScrollTime = now;
        handleScroll();
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [sectionIds]);

  // Handle direct navigation (hash changes and initial load)
  useEffect(() => {
    // When page loads, handle direct links and URL hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && sectionIds.includes(hash)) {
        const section = document.getElementById(hash);
        if (section) {
          // Small delay to ensure the DOM is ready
          setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth' });
            
            // Update active section immediately for visual feedback
            setActiveSection(hash);
            
            // Clear any existing active classes
            sectionIds.forEach(id => {
              const elem = document.getElementById(id);
              if (elem) {
                elem.classList.remove('active');
              }
            });
            
            // Add active class to target section
            section.classList.add('active');
          }, 100);
        }
      }
    };

    // Wait for page to fully load, then check hash
    if (!isInitialized) {
      setIsInitialized(true);
      
      // If no hash is present, make sure the first section is active
      if (!window.location.hash) {
        const firstSection = document.getElementById(sectionIds[0]);
        if (firstSection) {
          firstSection.classList.add('active');
        }
      } else {
        // Handle initial hash navigation
        handleHashChange();
      }
    }

    // Listen for hash changes to navigate correctly
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isInitialized, sectionIds]);

  return (
    <div className="scroll-container" ref={scrollContainerRef}>
      <Navbar />
      
      {/* Scroll Indicator */}
      <ScrollIndicator sectionIds={sectionIds} />
      
      {/* Hero Section */}
      <section id="hero" className={`scroll-section ${activeSection === 'hero' ? 'active' : ''}`}>
        <div className="scroll-content">
          <HeroSection />
        </div>
      </section>
      
      {/* Resume Section */}
      <section id="resume" className={`scroll-section ${activeSection === 'resume' ? 'active' : ''}`}>
        <div className="scroll-content overflow-y-auto scrollbar-hide">
          <ResumeSection />
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className={`scroll-section ${activeSection === 'projects' ? 'active' : ''}`}>
        <div className="scroll-content">
          <ProjectsSection />
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className={`scroll-section ${activeSection === 'contact' ? 'active' : ''}`}>
        <div className="scroll-content">
          <ContactSection />
          <Footer />
        </div>
      </section>
    </div>
  );
}
