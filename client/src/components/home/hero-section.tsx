import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <section 
      id="about" 
      className="container mx-auto px-4 py-12 md:py-20 lg:py-24 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16"
      ref={ref}
    >
      <motion.div 
        className="w-full md:w-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
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
        
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">React</span>
          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">Node.js</span>
          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">JavaScript</span>
          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">TypeScript</span>
          <span className="px-3 py-1 bg-violet-500/10 text-violet-500 rounded-full text-sm font-medium">AI Integration</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#projects">
            <Button size="lg">
              View My Projects
            </Button>
          </a>
          <a href="#resume">
            <Button variant="outline" size="lg">
              Check My Resume
            </Button>
          </a>
        </div>
      </motion.div>
      
      <motion.div 
        className="w-full md:w-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative">
          <div className="absolute -z-10 top-4 -left-4 w-full h-full rounded-2xl bg-blue-100 dark:bg-blue-900/20"></div>
          <div className="absolute -z-10 -top-4 left-4 w-full h-full rounded-2xl bg-violet-100 dark:bg-violet-900/20"></div>
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
            <img 
              src="/profile.jpg" 
              alt="Joshua Kessell - Professional headshot"
              className="w-full h-auto rounded-2xl"
            />
          </div>
          
          <div className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Available for new projects</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
