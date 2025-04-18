import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Background effects */}
      <ParticlesBackground 
        quantity={40}
        minSize={1}
        maxSize={3}
        speed={0.3}
        colors={['#3b82f6', '#8b5cf6', '#6366f1']}
        connectParticles={true}
        className="opacity-30 dark:opacity-20"
      />
      
      <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
        <div className="w-full md:w-1/2 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-8 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-primary">Full Stack Developer</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Building <span className="bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">exceptional</span> web experiences
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-xl">
            I design and develop modern web applications with a focus on performance, 
            accessibility, and user experience. Leveraging the latest technologies including AI integration.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {['React', 'Node.js', 'JavaScript', 'TypeScript'].map((tech, index) => (
              <span 
                key={tech}
                className={cn(
                  "px-3 py-1 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium",
                  "hover:scale-105 transition-transform"
                )}
              >
                {tech}
              </span>
            ))}
            <span className="px-3 py-1 bg-violet-500/10 text-violet-500 rounded-full text-sm font-medium hover:scale-105 transition-transform">
              AI Integration
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" onClick={(e) => {
              e.preventDefault();
              const projectsSection = document.getElementById('projects');
              if (projectsSection) {
                window.scrollTo({
                  top: projectsSection.offsetTop,
                  behavior: 'smooth'
                });
              }
            }}>
              <Button size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                View My Projects
              </Button>
            </a>
            <a href="#resume" onClick={(e) => {
              e.preventDefault();
              const resumeSection = document.getElementById('resume');
              if (resumeSection) {
                window.scrollTo({
                  top: resumeSection.offsetTop,
                  behavior: 'smooth'
                });
              }
            }}>
              <Button variant="outline" size="lg" className="hover:bg-background/80 transition-colors">
                Check My Resume
              </Button>
            </a>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="relative">
            {/* Decorative background squares */}
            <div className="absolute -z-10 top-4 -left-4 w-full h-full rounded-2xl bg-blue-100 dark:bg-blue-900/20"></div>
            <div className="absolute -z-10 -top-4 left-4 w-full h-full rounded-2xl bg-violet-100 dark:bg-violet-900/20"></div>
            
            {/* Profile image */}
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
              <img 
                src="/profile.jpg" 
                alt="Joshua Kessell - Professional headshot"
                className="w-full h-auto max-h-[55vh] object-cover object-center rounded-2xl"
              />
            </div>
            
            {/* Availability badge */}
            <div className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg animate-float">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Available for new projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float hidden md:block">
        <Button 
          onClick={() => {
            const resumeSection = document.getElementById('resume');
            if (resumeSection) {
              window.scrollTo({
                top: resumeSection.offsetTop,
                behavior: 'smooth'
              });
            }
          }}
          variant="ghost" 
          size="icon"
          className="rounded-full opacity-70 hover:opacity-100"
          aria-label="Scroll to Resume section"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
