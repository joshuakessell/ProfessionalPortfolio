import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useTheme } from "@/providers/theme-provider";
import { useEffect, Suspense, lazy } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const HeroSection = lazy(() => import("@/components/home/hero-section"));
const ResumeSection = lazy(() => import("@/components/home/resume-section"));
const ProjectsSection = lazy(() => import("@/components/home/projects-section"));
const ContactSection = lazy(() => import("@/components/home/contact-section"));

export default function Home() {
  const { reduceMotion } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [heroRef, heroInView] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const [resumeRef, resumeInView] = useIntersectionObserver({ rootMargin: "200px", threshold: 0.1, triggerOnce: true });
  const [projectsRef, projectsInView] = useIntersectionObserver({ rootMargin: "200px", threshold: 0.1, triggerOnce: true });
  const [contactRef, contactInView] = useIntersectionObserver({ rootMargin: "200px", threshold: 0.1, triggerOnce: true });

  return (
    <div className="scroll-container geometric-bg">
      <Navbar />

      <section id="hero" ref={heroRef as any} className="scroll-section bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="scroll-content relative z-10">
          {heroInView && (
            <Suspense fallback={<div className="h-[60vh]" />}> 
              <HeroSection />
            </Suspense>
          )}
        </div>
      </section>

      <section id="resume" ref={resumeRef as any} className="scroll-section bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="scroll-content pt-20 relative z-10">
          {resumeInView && (
            <Suspense fallback={<div className="h-[40vh]" />}> 
              <ResumeSection />
            </Suspense>
          )}
        </div>
      </section>

      <section id="projects" ref={projectsRef as any} className="scroll-section bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
        <div className="scroll-content pt-20 relative z-10">
          {projectsInView && (
            <Suspense fallback={<div className="h-[40vh]" />}> 
              <ProjectsSection />
            </Suspense>
          )}
        </div>
      </section>

      <section id="contact" ref={contactRef as any} className="scroll-section bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
        <div className="scroll-content pt-20 relative z-10">
          {contactInView && (
            <Suspense fallback={<div className="h-[30vh]" />}> 
              <ContactSection />
            </Suspense>
          )}
          <Footer />
        </div>
      </section>
    </div>
  );
}
