import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, Github, Linkedin, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-0 h-full flex items-center">
      {/* Background gradient circles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-violet-600/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <motion.div 
        className="grid lg:grid-cols-2 gap-12 items-center w-full"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Content section */}
        <motion.div variants={itemVariants}>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Full Stack Web Developer
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Hi, I'm <span className="text-primary">Joshua Kessell</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              I create exceptional digital experiences through innovative web development 
              and AI integration, transforming ideas into impactful solutions.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {['React', 'Node.js', 'TypeScript', 'Full Stack', 'AI Integration'].map((tech, index) => (
              <span 
                key={tech}
                className={cn(
                  "px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium",
                  "hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors"
                )}
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap gap-4 mb-8">
            <Button 
              size="lg" 
              className="group w-full md:w-auto"
              onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}
            >
              <span>View My Work</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <a 
              href="/joshua-kessell-resume.pdf" 
              download 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              <Button variant="outline" size="lg" className="w-full">
                <FileText className="mr-2 h-5 w-5" />
                <span>Download CV</span>
              </Button>
            </a>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/joshuakessell" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-6 w-6" />
            </a>
            
            <a 
              href="https://linkedin.com/in/joshuakessell" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </motion.div>
        
        {/* Image section */}
        <motion.div variants={itemVariants} className="relative order-first lg:order-last">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Decorative elements */}
            <div className="absolute -z-10 top-4 -right-4 w-full h-full rounded-2xl border-2 border-primary/20"></div>
            <div className="absolute -z-10 -top-4 -left-4 w-full h-full rounded-2xl bg-gray-100 dark:bg-gray-800/50"></div>
            
            {/* Profile image */}
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
              <img 
                src="/attached_assets/IMG_1107.JPG" 
                alt="Joshua Kessell - Professional portrait"
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
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float hidden md:block">
        <Button 
          onClick={() => document.getElementById('resume')?.scrollIntoView({behavior: 'smooth'})}
          variant="ghost" 
          size="icon"
          className="rounded-full opacity-70 hover:opacity-100 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
          aria-label="Scroll to Resume section"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
