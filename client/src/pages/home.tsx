import { HeroSection } from "@/components/home/hero-section";
import { ResumeSection } from "@/components/home/resume-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ContactSection } from "@/components/home/contact-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/home/scroll-to-top";

export default function Home() {
  // Sections for the website
  const sections = [
    { id: 'about', label: 'About', component: <HeroSection /> },
    { id: 'resume', label: 'Resume', component: <ResumeSection /> },
    { id: 'projects', label: 'Projects', component: <ProjectsSection /> },
    { id: 'testimonials', label: 'Testimonials', component: <TestimonialsSection /> },
    { id: 'contact', label: 'Contact', component: <ContactSection /> }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="about" className="min-h-screen relative overflow-hidden py-16 md:py-0 flex items-center">
          <HeroSection />
        </section>
        
        {/* Resume Section */}
        <section id="resume" className="py-20 bg-gray-50 dark:bg-gray-900/30">
          <ResumeSection />
        </section>
        
        {/* Projects Section */}
        <section id="projects" className="py-20">
          <ProjectsSection />
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900/30">
          <TestimonialsSection />
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-20">
          <ContactSection />
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}
