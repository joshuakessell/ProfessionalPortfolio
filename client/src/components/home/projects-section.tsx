import { 
  ExternalLink, 
  Github, 
  ArrowRight,
  Folder,
  Star,
  Code,
  ArrowUpRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { featuredProjects } from "@/lib/data";
import { useGitHubRepos } from "@/lib/hooks";
import { useEffect, useState, useRef } from "react";
import { cn, formatDate } from "@/lib/utils";
import { GitHubRepo } from "@/lib/types";

export function ProjectsSection() {
  const { data: githubReposData, isLoading, error } = useGitHubRepos();
  const githubRepos = githubReposData as GitHubRepo[] || [];
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'featured' | 'github'>('featured');
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // Handle animation and intersection observation
  useEffect(() => {
    setIsVisible(true);
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Only set up intersection observer if animation is allowed
    if (!prefersReducedMotion && projectsRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const cards = projectsRef.current?.querySelectorAll('.project-card');
              cards?.forEach((card, index) => {
                const element = card as HTMLElement;
                element.style.animationDelay = `${0.2 + index * 0.1}s`;
                element.classList.add('animate-fade-in');
                element.classList.remove('opacity-0');
              });
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(projectsRef.current);
      
      return () => {
        if (projectsRef.current) {
          observer.unobserve(projectsRef.current);
        }
      };
    }
  }, [activeTab]);
  
  // Handle tab changes
  const handleTabChange = (tab: 'featured' | 'github') => {
    setActiveTab(tab);
  };
  
  return (
    <div className="w-full h-full relative">
      {/* Decorative background elements */}
      <div className="animated-bg-shape" style={{ top: '30%', left: '10%' }}></div>
      <div className="animated-bg-shape" style={{ bottom: '20%', right: '10%', animationDelay: '5s' }}></div>
      
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div 
          className={`text-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text inline-block">Featured Projects</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            A showcase of my recent work, side projects, and open-source contributions.
          </p>
        </div>

        {/* Tab navigation */}
        <div 
          className={`flex justify-center mb-10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          <div className="p-1 bg-indigo-900/20 border border-indigo-500/20 rounded-xl flex">
            <button 
              onClick={() => handleTabChange('featured')}
              className={cn(
                "py-3 px-6 rounded-lg transition-all",
                activeTab === 'featured' 
                  ? "bg-indigo-600/70 text-white" 
                  : "text-gray-400 hover:text-gray-200"
              )}
            >
              Featured Projects
            </button>
            <button 
              onClick={() => handleTabChange('github')}
              className={cn(
                "py-3 px-6 rounded-lg transition-all",
                activeTab === 'github' 
                  ? "bg-indigo-600/70 text-white" 
                  : "text-gray-400 hover:text-gray-200"
              )}
            >
              GitHub Repos
            </button>
          </div>
        </div>
        
        {/* Projects display area */}
        <div ref={projectsRef} className="relative">
          {/* Featured projects tab */}
          {activeTab === 'featured' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className="project-card interactive-card group overflow-hidden opacity-0"
                >
                  <div className="relative h-48 overflow-hidden rounded-lg mb-5">
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/30 to-transparent z-10"></div>
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    
                    {project.aiProject && (
                      <Badge 
                        className="absolute top-3 right-3 bg-pink-900/50 text-pink-300 border border-pink-500/30 z-20 animate-float"
                        style={{ animationDelay: `${index * 0.5}s` }}
                      >
                        AI Integration
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        className={cn(
                          "bg-indigo-900/40 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-900/60",
                          tag === 'OpenAI' && "bg-pink-900/40 text-pink-300 border-pink-500/30"
                        )}
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge className="bg-gray-800/50 text-gray-300 border border-gray-700">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-gray-300 mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-indigo-500/20 mt-auto">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Github className="h-5 w-5" />
                        <span className="text-sm">Code</span>
                      </a>
                    )}
                    
                    {project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <span className="text-sm">Live Demo</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* GitHub repos tab */}
          {activeTab === 'github' && (
            <div className="grid md:grid-cols-2 gap-8">
              {isLoading ? (
                // Loading state with improved skeletons
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="interactive-card animate-pulse">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-indigo-900/30 rounded-lg"></div>
                        <div>
                          <div className="h-6 w-40 bg-indigo-900/40 rounded mb-2"></div>
                          <div className="h-4 w-24 bg-indigo-900/30 rounded"></div>
                        </div>
                      </div>
                      <div className="w-16 h-8 bg-indigo-900/30 rounded-full"></div>
                    </div>
                    
                    <div className="h-4 w-full bg-indigo-900/30 rounded mb-2"></div>
                    <div className="h-4 w-5/6 bg-indigo-900/30 rounded mb-6"></div>
                    
                    <div className="flex gap-2 mb-6">
                      <div className="h-6 w-16 bg-indigo-900/30 rounded-full"></div>
                      <div className="h-6 w-20 bg-indigo-900/30 rounded-full"></div>
                      <div className="h-6 w-24 bg-indigo-900/30 rounded-full"></div>
                    </div>
                    
                    <div className="pt-4 border-t border-indigo-500/20 flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-900/50"></div>
                        <div className="h-4 w-20 bg-indigo-900/30 rounded"></div>
                      </div>
                      <div className="w-28 h-9 bg-indigo-900/30 rounded-lg"></div>
                    </div>
                  </div>
                ))
              ) : error ? (
                // Error state
                <div className="col-span-full interactive-card">
                  <p className="text-center text-pink-400">
                    Unable to load GitHub repositories. Please try again later.
                  </p>
                </div>
              ) : (
                // GitHub data display
                githubRepos.map((repo: GitHubRepo, index: number) => (
                  <div 
                    key={repo.id} 
                    className="project-card interactive-card group opacity-0"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="p-3 rounded-lg bg-indigo-900/40 border border-indigo-500/30 text-indigo-400">
                          <Folder className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                            <a 
                              href={repo.html_url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="hover:underline"
                            >
                              {repo.name}
                            </a>
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Updated {formatDate(repo.updated_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 bg-yellow-900/20 px-2 py-1 rounded-full border border-yellow-700/30">
                        <Star className="h-4 w-4" />
                        <span className="text-sm">{repo.stargazers_count}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 line-clamp-2 mb-6">
                      {repo.description || "No description provided"}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {repo.topics.slice(0, 4).map((topic: string, topicIndex: number) => (
                        <Badge 
                          key={topicIndex} 
                          className="bg-indigo-900/40 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-900/60"
                        >
                          {topic}
                        </Badge>
                      ))}
                      {repo.topics.length > 4 && (
                        <Badge className="bg-gray-800/50 text-gray-300 border border-gray-700">
                          +{repo.topics.length - 4}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-indigo-500/20 mt-auto">
                      {repo.language && (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                          <span className="text-sm text-gray-300">{repo.language}</span>
                        </div>
                      )}
                      
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="glass-panel px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-900/30 
                          transition-colors border border-indigo-500/30"
                      >
                        <Github className="h-4 w-4 text-indigo-400" />
                        <span className="text-sm text-white">View Repo</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        
        <div 
          className={`flex justify-center mt-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.8s' }}
        >
          <a 
            href="https://github.com/joshuakessell?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glow-button inline-flex items-center gap-2"
          >
            <Github className="h-5 w-5" />
            View More on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
