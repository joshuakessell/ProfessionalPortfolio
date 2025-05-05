import { useState, useEffect, useRef } from "react";
import { ArrowRight, Clock, Tag, Pin } from "lucide-react";
import { useBlogPosts } from "@/lib/hooks";
import { cn, formatDate } from "@/lib/utils";
import { blogPosts } from "@/lib/data";
import { BlogPost } from "@/lib/types";

export function BlogSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { data: fetchedPosts, isLoading, error } = useBlogPosts();
  const blogRef = useRef<HTMLDivElement>(null);
  
  // Use either fetched posts or fallback to static data
  const posts: BlogPost[] = (fetchedPosts as BlogPost[]) || blogPosts;
  
  // Handle animation and visibility
  useEffect(() => {
    setIsVisible(true);
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Only set up intersection observer if animation is allowed
    if (!prefersReducedMotion && blogRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const cards = blogRef.current?.querySelectorAll('.blog-card');
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
      
      observer.observe(blogRef.current);
      
      return () => {
        if (blogRef.current) {
          observer.unobserve(blogRef.current);
        }
      };
    }
  }, []);
  
  return (
    <div className="w-full h-full relative">
      {/* Decorative background elements */}
      <div className="animated-bg-shape" style={{ top: '20%', right: '15%' }}></div>
      <div className="animated-bg-shape" style={{ bottom: '10%', left: '15%', animationDelay: '3s' }}></div>
      
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div 
          className={`text-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text inline-block">Latest Articles</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Thoughts, tutorials, and insights about web development, AI integration, and industry trends.
          </p>
        </div>
        
        <div ref={blogRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading state with improved skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="interactive-card animate-pulse">
                <div className="h-48 bg-indigo-900/30 rounded-lg mb-6"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-5 w-20 bg-indigo-900/30 rounded-full"></div>
                  <div className="h-5 w-5 bg-indigo-900/30 rounded-full"></div>
                  <div className="h-5 w-24 bg-indigo-900/30 rounded-full"></div>
                </div>
                <div className="h-8 w-5/6 bg-indigo-900/40 rounded mb-4"></div>
                <div className="h-4 w-full bg-indigo-900/30 rounded mb-2"></div>
                <div className="h-4 w-full bg-indigo-900/30 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-indigo-900/30 rounded mb-8"></div>
                <div className="h-9 w-32 bg-indigo-900/30 rounded-full"></div>
              </div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-full interactive-card">
              <p className="text-center text-pink-400">
                Unable to load blog posts. Please try again later.
              </p>
            </div>
          ) : (
            // Data display with improved styling
            posts.map((post: BlogPost, index: number) => (
              <div 
                key={post.id} 
                className="blog-card interactive-card group overflow-hidden opacity-0"
              >
                <div className="relative h-48 overflow-hidden rounded-lg mb-5">
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/30 to-transparent z-10"></div>
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {post.featured && (
                    <div className="absolute top-3 left-3 glass-panel px-3 py-1 rounded-full z-20 flex items-center gap-1 animate-float border border-indigo-500/30">
                      <Pin className="h-3 w-3 text-indigo-400" />
                      <span className="text-xs font-medium text-white">Featured</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                  <div className="flex items-center gap-1 text-indigo-400 text-sm">
                    <Tag className="h-4 w-4" />
                    <span>{post.category}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <a 
                  href={`/blog/${post.id}`} 
                  className="glass-panel px-4 py-2 rounded-full inline-flex items-center gap-2 
                    hover:bg-indigo-900/30 transition-colors border border-indigo-500/30 group"
                >
                  <span className="text-sm text-white">Read Article</span>
                  <ArrowRight className="h-4 w-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))
          )}
        </div>
        
        <div 
          className={`flex justify-center mt-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.8s' }}
        >
          <a 
            href="/blog"
            className="glow-button inline-flex items-center gap-2 group"
          >
            <span>View All Articles</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
