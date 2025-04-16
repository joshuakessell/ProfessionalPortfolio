import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useParallax } from "@/hooks/use-parallax";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { ParallaxBackground } from "@/components/ui/parallax-background";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [heroRef, isHeroVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // This will be applied to the background elements for a parallax effect
  const slowParallaxStyle = useParallax(0.2, 'up');
  const mediumParallaxStyle = useParallax(0.4, 'up');
  
  return (
    <section 
      ref={heroRef}
      id="about" 
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Particle background animation */}
      <ParticlesBackground 
        quantity={40}
        minSize={1}
        maxSize={3}
        speed={0.3}
        colors={['#3b82f6', '#8b5cf6', '#6366f1']}
        connectParticles={true}
        className="opacity-30 dark:opacity-20"
      />
      
      {/* Parallax background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-20 -left-10 w-60 h-60 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl"
          style={slowParallaxStyle}
        />
        <div 
          className="absolute bottom-20 -right-10 w-80 h-80 bg-violet-200/20 dark:bg-violet-900/10 rounded-full blur-3xl"
          style={mediumParallaxStyle}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-40 h-40 bg-primary/10 rounded-full blur-2xl"
          style={useParallax(0.3, 'down')}
        />
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
        <AnimatedSection 
          animation="slide-left" 
          className="w-full md:w-1/2"
        >
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
          
          <AnimatedSection animation="fade-in" delay={2} className="mb-8">
            <div className="flex flex-wrap gap-3">
              {['React', 'Node.js', 'JavaScript', 'TypeScript'].map((tech, index) => (
                <span 
                  key={tech}
                  className={cn(
                    "px-3 py-1 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium",
                    "hover:scale-105 transition-transform"
                  )}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  {tech}
                </span>
              ))}
              <span className="px-3 py-1 bg-violet-500/10 text-violet-500 rounded-full text-sm font-medium hover:scale-105 transition-transform">
                AI Integration
              </span>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in" delay={3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#projects">
                <Button size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                  View My Projects
                </Button>
              </a>
              <a href="#resume">
                <Button variant="outline" size="lg" className="hover:bg-background/80 transition-colors">
                  Check My Resume
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </AnimatedSection>
        
        <AnimatedSection 
          animation="slide-right" 
          delay={1}
          className="w-full md:w-1/2"
        >
          <div className="relative">
            {/* Decorative background squares with parallax effect */}
            <div 
              className="absolute -z-10 top-4 -left-4 w-full h-full rounded-2xl bg-blue-100 dark:bg-blue-900/20"
              style={useParallax(0.15, 'down')}
            ></div>
            <div 
              className="absolute -z-10 -top-4 left-4 w-full h-full rounded-2xl bg-violet-100 dark:bg-violet-900/20"
              style={useParallax(0.25, 'up')}
            ></div>
            
            {/* Profile image with card effect */}
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl card-3d">
              <img 
                src="/profile.jpg" 
                alt="Joshua Kessell - Professional headshot"
                className="w-full h-auto rounded-2xl"
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
        </AnimatedSection>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float hidden md:block">
        <Button 
          onClick={() => {
            const nextSection = document.getElementById('resume');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          variant="ghost" 
          size="icon"
          className="rounded-full opacity-70 hover:opacity-100"
        >
          <ChevronDown className="h-6 w-6" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </div>
    </section>
  );
}
