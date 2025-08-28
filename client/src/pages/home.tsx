import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import ResumeSection from "@/components/home/resume-section";
import ProjectsSection from "@/components/home/projects-section";
import ContactSection from "@/components/home/contact-section";

export default function Home() {
  return (
    <div className="scroll-container geometric-bg">
      <Navbar />

      <section id="hero" className="scroll-section bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="scroll-content relative z-10">
          <HeroSection />
        </div>
      </section>

      <section id="resume" className="scroll-section bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="scroll-content pt-20 relative z-10">
          <ResumeSection />
        </div>
      </section>

      <section id="projects" className="scroll-section bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <div className="scroll-content pt-20 relative z-10">
          <ProjectsSection />
        </div>
      </section>

      <section id="contact" className="scroll-section bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
        <div className="scroll-content pt-20 relative z-10">
          <ContactSection />
          <Footer />
        </div>
      </section>
    </div>
  );
}
