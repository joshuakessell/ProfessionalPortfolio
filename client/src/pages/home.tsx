import { HeroSection } from "@/components/home/hero-section";
import { ResumeSection } from "@/components/home/resume-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { AIFeaturesSection } from "@/components/home/ai-features-section";
import { BlogSection } from "@/components/home/blog-section";
import { ContactSection } from "@/components/home/contact-section";
import { ScrollToTop } from "@/components/home/scroll-to-top";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <ResumeSection />
        <ProjectsSection />
        <AIFeaturesSection />
        <BlogSection />
        <ContactSection />
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
}
