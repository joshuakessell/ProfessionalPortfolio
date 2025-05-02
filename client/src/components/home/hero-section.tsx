import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { ChevronDown, Code, Server, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Calculate the transform values based on mouse position
  const getTransform = (factor: number) => {
    const moveX = (mousePosition.x - 0.5) * factor;
    const moveY = (mousePosition.y - 0.5) * factor;
    return `translate(${moveX}px, ${moveY}px)`;
  };

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
      {/* Animated background elements */}
      <div className="animated-bg-shape" style={{ top: '-20%', left: '60%' }}></div>
      <div className="animated-bg-shape" style={{ bottom: '-10%', right: '60%', animationDelay: '2s' }}></div>
      
      {/* Grid background */}
      <ParticlesBackground 
        quantity={50}
        minSize={1}
        maxSize={2}
        speed={0.2}
        colors={['#4F46E5', '#EC4899', '#6366F1']}
        connectParticles={true}
        className="opacity-30"
      />
      
      {/* Main content */}
      <div className="w-full max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16 relative z-10">
        <div 
          className={`w-full md:w-1/2 space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-200 tracking-wider uppercase">Full Stack Developer</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            <span className="text-white">Building</span>
            <br />
            <span className="gradient-text"> exceptional</span>
            <br />
            <span className="text-white">web experiences</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
            I design and develop modern web applications with a focus on performance, 
            accessibility, and user experience—leveraging the latest technologies including AI integration.
          </p>
          
          <div 
            className={`flex flex-wrap gap-3 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.6s' }}
          >
            {[
              { name: 'React', icon: Code, color: 'blue' },
              { name: 'Node.js', icon: Server, color: 'green' },
              { name: 'TypeScript', icon: Code, color: 'blue' },
              { name: 'AI Integration', icon: BrainCircuit, color: 'pink' }
            ].map((tech, index) => {
              const Icon = tech.icon;
              const colorClasses = {
                'blue': 'bg-indigo-900/30 text-indigo-300 border-indigo-600/30',
                'green': 'bg-emerald-900/30 text-emerald-300 border-emerald-600/30',
                'pink': 'bg-pink-900/30 text-pink-300 border-pink-600/30'
              }[tech.color];
              
              return (
                <div 
                  key={tech.name}
                  className={`px-4 py-2 ${colorClasses} rounded-full text-sm font-medium border border-opacity-50 backdrop-blur-sm flex items-center gap-2 hover:scale-105 transition-transform animate-fade-in`}
                  style={{ 
                    animationDelay: `${0.8 + index * 0.1}s`,
                    transform: getTransform(5)
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {tech.name}
                </div>
              );
            })}
          </div>
          
          <div 
            className={`flex flex-col sm:flex-row gap-5 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '1s' }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'});
              }}
              className="glow-button inline-flex items-center gap-2"
            >
              View My Projects
            </a>
            <a
              href="#resume"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('resume')?.scrollIntoView({behavior: 'smooth'});
              }}
              className="glass-panel px-6 py-3 rounded-full text-white border border-indigo-500/30 hover:border-indigo-500/50 transition-all inline-flex items-center gap-2"
            >
              Check My Resume
            </a>
          </div>
        </div>
        
        <div 
          className={`w-full md:w-1/2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.4s' }}
        >
          <div 
            className="relative interactive-card"
            style={{ transform: getTransform(-15) }}
          >
            {/* Decorative glow elements */}
            <div 
              className="absolute -z-10 -top-10 -right-10 w-60 h-60 rounded-full bg-indigo-600/20 blur-3xl"
              style={{ transform: getTransform(20) }}
            ></div>
            <div 
              className="absolute -z-10 -bottom-10 -left-10 w-60 h-60 rounded-full bg-pink-600/20 blur-3xl"
              style={{ transform: getTransform(20) }}
            ></div>
            
            {/* Image container with 3D effect */}
            <div className="relative overflow-hidden rounded-xl animate-border border-2 border-indigo-500/30">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/10 to-pink-600/10 mix-blend-overlay"></div>
              <img 
                src="/profile.jpg" 
                alt="Joshua Kessell - Professional headshot"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating status badge */}
            <div 
              className="absolute -bottom-6 -right-6 glass-panel rounded-xl p-4 animate-float hover:animate-none"
              style={{ transform: getTransform(10) }}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-slow"></div>
                <span className="text-sm font-medium text-white">Available for new projects</span>
              </div>
            </div>
            
            {/* Floating skill badge */}
            <div 
              className="absolute -top-6 -left-6 glass-panel rounded-xl p-3 animate-float" 
              style={{ animationDelay: '1s', transform: getTransform(15) }}
            >
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-pink-400" />
                <span className="text-xs font-semibold text-white">AI Integration Expert</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-float ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '1.2s', animationDelay: '1s' }}
      >
        <button
          onClick={() => {
            document.getElementById('resume')?.scrollIntoView({behavior: 'smooth'});
          }}
          className="glass-panel rounded-full w-14 h-14 flex items-center justify-center hover:bg-white/5 transition-colors"
          aria-label="Scroll to Resume section"
        >
          <ChevronDown className="h-6 w-6 text-white" />
        </button>
      </div>
      
      {/* Accent line */}
      <div className="hero-accent"></div>
    </div>
  );
}
