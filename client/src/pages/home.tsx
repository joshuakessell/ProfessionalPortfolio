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
      // This approach uses Intersection Observer API for better performance
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // When a section is more than 50% visible, mark it as active
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id;
            
            // Set active section in state
            setActiveSection(sectionId);
            
            // Update classes for animation
            sectionIds.forEach(id => {
              const section = document.getElementById(id);
              if (section) {
                if (id === sectionId) {
                  section.classList.add('active');
                } else {
                  section.classList.remove('active');
                }
              }
            });
          }
        });
      }, {
        root: null, // Use viewport as root
        rootMargin: "0px",
        threshold: 0.5 // Trigger when 50% of section is visible
      });
      
      // Observe all sections
      sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
          observer.observe(section);
        }
      });
      
      return () => {
        // Clean up observer
        sectionIds.forEach(id => {
          const section = document.getElementById(id);
          if (section) {
            observer.unobserve(section);
          }
        });
      };
    };
    
    // Initialize scroll handler
    const cleanup = handleScroll();
    
    // Set initial active section (first section)
    const firstSection = document.getElementById(sectionIds[0]);
    if (firstSection) {
      firstSection.classList.add('active');
    }
    
    return cleanup;
  }, [sectionIds]);

  // Handle direct navigation (hash changes and initial load)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && sectionIds.includes(hash)) {
        const section = document.getElementById(hash);
        if (section) {
          // Scroll to the section with smooth behavior
          section.scrollIntoView({ behavior: 'smooth' });
          
          // Manually set active section and classes
          setActiveSection(hash);
          
          sectionIds.forEach(id => {
            const elem = document.getElementById(id);
            if (elem) {
              elem.classList.toggle('active', id === hash);
            }
          });
        }
      }
    };

    // Initialize page and handle hash if present
    if (!isInitialized) {
      setIsInitialized(true);
      
      if (window.location.hash) {
        handleHashChange();
      }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isInitialized, sectionIds]);

  return (
    <>
      <Navbar />
      
      {/* Scroll Indicator */}
      <ScrollIndicator sectionIds={sectionIds} />
      
      <div className="scroll-container" ref={scrollContainerRef}>
        {/* Hero Section */}
        <section id="hero" className="scroll-section">
          <div className="scroll-content">
            <HeroSection />
          </div>
        </section>
        
        {/* Resume Section */}
        <section id="resume" className="scroll-section">
          <div className="scroll-content scrollbar-hide">
            <ResumeSection />
          </div>
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="scroll-section">
          <div className="scroll-content">
            <ProjectsSection />
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="scroll-section">
          <div className="scroll-content">
            <ContactSection />
          </div>
        </section>
        
        {/* Footer Section - Completely below Contact */}
        <div className="footer-wrapper">
          <Footer />
        </div>
      </div>
    </>
  );
}
