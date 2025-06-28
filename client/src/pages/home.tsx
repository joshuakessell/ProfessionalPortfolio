import { HeroSection } from "@/components/home/hero-section";
import { ResumeSection } from "@/components/home/resume-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { BlogSection } from "@/components/home/blog-section";
import { ContactSection } from "@/components/home/contact-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/ui/particle-background";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { useEffect } from "react";

export default function Home() {
  // Detect scroll position if needed
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Scroll handling logic if needed
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="scroll-container geometric-bg">
      {/* Dynamic Background */}
      <ParticleBackground 
        particleCount={35}
        particleSpeed={0.15}
        connectionDistance={90}
        showConnections={true}
      />
      <AnimatedBackground />
      
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="scroll-section">
        <div className="scroll-content relative z-10">
          <HeroSection />
        </div>
      </section>
      
      {/* Resume Section */}
      <section id="resume" className="scroll-section">
        <div className="scroll-content pt-20 relative z-10">
          <ResumeSection />
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="scroll-section">
        <div className="scroll-content pt-20 relative z-10">
          <ProjectsSection />
        </div>
      </section>
      
      {/* Blog Section */}
      <section id="blog" className="scroll-section">
        <div className="scroll-content pt-20 relative z-10">
          <BlogSection />
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="scroll-section">
        <div className="scroll-content pt-20 relative z-10">
          <ContactSection />
          <Footer />
        </div>
      </section>
    </div>
  );
}
