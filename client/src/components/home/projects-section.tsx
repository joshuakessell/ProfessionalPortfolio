import { 
  ExternalLink, 
  Github, 
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { featuredProjects } from "@/lib/data";
import { useGitHubRepos } from "@/lib/hooks";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ParallaxBackground } from "@/components/ui/parallax-background";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useParallax } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const [sectionRef, isSectionInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const { data: githubRepos, isLoading, error } = useGitHubRepos();
  
  // Use either fetched repos or fallback to featured projects
  const projects = githubRepos || featuredProjects;
  
  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Decorative background elements with parallax */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div 
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-200 dark:bg-blue-900/40 blur-3xl"
          style={useParallax(0.1, 'up')}
        />
        <div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
          style={useParallax(0.2, 'down')}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <AnimatedHeading
          title="Featured Projects"
          subtitle="A showcase of my recent work, side projects, and open-source contributions."
          centered={true}
          className="mb-12"
        />

        <AnimatedSection animation="fade-in" delay={1} className="mb-8 flex justify-center">
          <Button variant="outline" className="bg-gray-800 hover:bg-black text-white shadow-lg hover:shadow-xl transition-all" asChild>
            <a href="https://github.com/joshuakessell" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              View GitHub Profile
            </a>
          </Button>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading ? (
            // Loading state
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-gray-100 dark:bg-gray-700" />
                <CardContent className="p-6">
                  <div className="h-6 w-2/3 bg-gray-100 dark:bg-gray-700 rounded mb-4" />
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-700 rounded mb-4" />
                  <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-16 bg-gray-100 dark:bg-gray-700 rounded" />
                    <div className="h-6 w-20 bg-gray-100 dark:bg-gray-700 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            // Error state
            <Card className="col-span-full p-6">
              <p className="text-center text-red-500">
                Unable to load GitHub projects. Please try again later.
              </p>
            </Card>
          ) : (
            // Data display
            featuredProjects.map((project, index) => (
              <AnimatedSection 
                key={project.id} 
                animation="fade-in" 
                delay={(index % 3 + 1) as 1 | 2 | 3} 
                threshold={0.1}
              >
                <Card className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-3d h-full">
                  <div className="h-48 bg-gray-100 dark:bg-gray-700 relative overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {project.aiProject && (
                      <div className="absolute top-3 right-3 animate-float">
                        <Badge className="bg-violet-500/80 hover:bg-violet-500 text-white">AI Project</Badge>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <div className="flex items-center gap-2">
                        {project.demoUrl && (
                          <a 
                            href={project.demoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-primary dark:hover:text-blue-400 transition-colors hover:scale-110"
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
                            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors hover:scale-110"
                            aria-label={`View GitHub repository for ${project.title}`}
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => {
                        const getBadgeClasses = (tag: string) => {
                          switch (tag) {
                            case 'React':
                              return "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400";
                            case 'Node.js':
                            case 'Express':
                              return "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400";
                            case 'OpenAI':
                              return "bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400";
                            case 'MongoDB':
                              return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400";
                            case 'Firebase':
                              return "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400";
                            default:
                              return "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300";
                          }
                        };
                        
                        return (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className={cn(
                              getBadgeClasses(tag),
                              "hover:scale-105 transition-transform"
                            )}
                          >
                            {tag}
                          </Badge>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))
          )}
        </div>
        
        <AnimatedSection animation="fade-in" delay={2} className="mt-10 text-center">
          <Button 
            variant="link" 
            className="text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300 animate-pulse-slow" 
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
        </AnimatedSection>
      </div>
    </section>
  );
}
