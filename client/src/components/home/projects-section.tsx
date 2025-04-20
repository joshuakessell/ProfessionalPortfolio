import { 
  ExternalLink, 
  Github, 
  ArrowRight,
  Code,
  FolderGit2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { featuredProjects } from "@/lib/data";
import { useGitHubRepos } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ProjectsSection() {
  const { data: githubRepos, isLoading, error } = useGitHubRepos();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <div className="container mx-auto px-4">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <FolderGit2 className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          A showcase of my recent work, side projects, and open-source contributions.
        </p>

        <div className="flex justify-center mb-12">
          <Button 
            variant="outline" 
            className="px-6 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <a 
              href="https://github.com/joshuakessell" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2"
            >
              <Github className="h-5 w-5" />
              <span>GitHub Profile</span>
            </a>
          </Button>
        </div>
      </motion.div>
      
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {isLoading ? (
          // Loading state
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm animate-pulse h-full">
              <div className="h-52 bg-gray-100 dark:bg-gray-700" />
              <div className="p-6">
                <div className="h-6 w-2/3 bg-gray-100 dark:bg-gray-700 rounded mb-4" />
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-700 rounded mb-4" />
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-16 bg-gray-100 dark:bg-gray-700 rounded" />
                  <div className="h-6 w-20 bg-gray-100 dark:bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          ))
        ) : error ? (
          // Error state
          <motion.div 
            className="col-span-full p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
            variants={itemVariants}
          >
            <p className="text-center text-red-500">
              Unable to load GitHub projects. Please try again later.
            </p>
          </motion.div>
        ) : (
          // Data display
          featuredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all h-full flex flex-col transform hover:-translate-y-1"
            >
              <div className="h-52 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-bold">{project.title}</h3>
                      <div className="flex gap-3">
                        {project.demoUrl && (
                          <a 
                            href={project.demoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white hover:text-primary transition-colors"
                            aria-label={`View demo for ${project.title}`}
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white hover:text-primary transition-colors"
                            aria-label={`View GitHub repository for ${project.title}`}
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Badge */}
                {project.aiProject && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-violet-500 hover:bg-violet-600 text-white">
                      AI Project
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, index) => {
                    const getBadgeClasses = (tag: string) => {
                      switch (tag) {
                        case 'React':
                        case 'TypeScript':
                          return "border-blue-200 text-blue-600 dark:border-blue-900 dark:text-blue-400";
                        case 'Node.js':
                        case 'Express':
                          return "border-green-200 text-green-600 dark:border-green-900 dark:text-green-400";
                        case 'OpenAI':
                          return "border-violet-200 text-violet-600 dark:border-violet-900 dark:text-violet-400";
                        case 'MongoDB':
                          return "border-yellow-200 text-yellow-600 dark:border-yellow-900 dark:text-yellow-400";
                        case 'Firebase':
                          return "border-red-200 text-red-600 dark:border-red-900 dark:text-red-400";
                        case 'VS Code API':
                          return "border-indigo-200 text-indigo-600 dark:border-indigo-900 dark:text-indigo-400";
                        default:
                          return "border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-300";
                      }
                    };
                    
                    return (
                      <span 
                        key={index}
                        className={cn(
                          "px-2 py-1 text-xs font-medium border rounded-md",
                          getBadgeClasses(tag)
                        )}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
      
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button 
          className="group" 
          variant="ghost"
          asChild
        >
          <a 
            href="https://github.com/joshuakessell?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2"
          >
            <span>View All Projects</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </motion.div>
    </div>
  );
}
