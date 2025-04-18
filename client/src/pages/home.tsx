import { HeroSection } from "@/components/home/hero-section";
import { ResumeSection } from "@/components/home/resume-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { ContactSection } from "@/components/home/contact-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { useEffect, useState } from "react";

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);

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
            section.scrollIntoView({ behavior: 'smooth' });
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
  }, [isInitialized]);

  // Sections for the scroll indicator
  const sectionIds = ['hero', 'resume', 'projects', 'contact'];

  return (
    <div className="scroll-container">
      <Navbar />
      
      {/* Scroll Indicator */}
      <ScrollIndicator sectionIds={sectionIds} />
      
      {/* Hero Section */}
      <section id="hero" className="scroll-section">
        <div className="scroll-content">
          <HeroSection />
        </div>
      </section>
      
      {/* Resume Section */}
      <section id="resume" className="scroll-section">
        <div className="scroll-content">
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
          <Footer />
        </div>
      </section>
    </div>
  );
}
