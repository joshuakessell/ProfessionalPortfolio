import { HeroSection } from "@/components/home/hero-section";
import { ResumeSection } from "@/components/home/resume-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { BlogSection } from "@/components/home/blog-section";
import { ContactSection } from "@/components/home/contact-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { useEffect } from "react";

export default function Home() {
  // Detect scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Your scroll handling logic if needed
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sections for the scroll indicator
  const sectionIds = ['hero', 'resume', 'projects', 'blog', 'contact'];

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
        <div className="scroll-content pt-20">
          <ResumeSection />
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="scroll-section">
        <div className="scroll-content pt-20">
          <ProjectsSection />
        </div>
      </section>
      
      {/* Blog Section */}
      <section id="blog" className="scroll-section">
        <div className="scroll-content pt-20">
          <BlogSection />
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="scroll-section">
        <div className="scroll-content pt-20">
          <ContactSection />
          <Footer />
        </div>
      </section>
    </div>
  );
}
