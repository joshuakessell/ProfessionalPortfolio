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
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Find which section is currently in view
      const sections = sectionIds.map(id => {
        const element = document.getElementById(id);
        if (!element) return null;
        
        const top = element.offsetTop;
        const height = element.offsetHeight;
        
        return {
          id,
          element,
          top,
          bottom: top + height,
          inView: scrollPosition >= top && scrollPosition < top + height
        };
      }).filter(Boolean);
      
      // Find the section that's currently in view
      const currentSection = sections.find(section => section?.inView);
      
      if (currentSection) {
        // Update active section state
        setActiveSection(currentSection.id);
        
        // Apply active class to current section for zoom effect
        sections.forEach(section => {
          if (section) {
            if (section.id === currentSection.id) {
              section.element.classList.add('active');
            } else {
              section.element.classList.remove('active');
            }
          }
        });
      }
    };
    
    // Set initial active section after DOM is ready
    setTimeout(handleScroll, 100);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  // Initialize page and ensure correct navigation
  useEffect(() => {
    // When page loads, handle direct links and URL hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && sectionIds.includes(hash)) {
        const section = document.getElementById(hash);
        if (section) {
          // Small delay to ensure the DOM is ready
          setTimeout(() => {
            // Calculate any offset for fixed headers
            const navbarHeight = 60; // Approximate height of the navbar
            const offsetPosition = section.offsetTop - navbarHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            // Update active section immediately for visual feedback
            setActiveSection(hash);
          }, 300);
        }
      }
    };

    // Wait for page to fully load, then check hash
    if (!isInitialized) {
      setIsInitialized(true);
      handleHashChange();
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
