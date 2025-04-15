import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBlogPosts } from "@/lib/hooks";
import { formatDate } from "@/lib/utils";
import { blogPosts } from "@/lib/data";

export function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: fetchedPosts, isLoading, error } = useBlogPosts();
  
  // Use either fetched posts or fallback to static data
  const posts = fetchedPosts || blogPosts;
  
  return (
    <section id="blog" className="py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
            Thoughts, tutorials, and insights about web development, AI integration, and industry trends.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {isLoading ? (
            // Loading state
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm h-full">
                <div className="h-48 bg-gray-100 dark:bg-gray-700 animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-4 w-1/3 bg-gray-100 dark:bg-gray-700 rounded animate-pulse mb-3" />
                  <div className="h-6 w-5/6 bg-gray-100 dark:bg-gray-700 rounded animate-pulse mb-3" />
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-700 rounded animate-pulse mb-4" />
                  <div className="h-4 w-1/4 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))
          ) : error ? (
            // Error state
            <Card className="col-span-full p-6">
              <p className="text-center text-red-500">
                Unable to load blog posts. Please try again later.
              </p>
            </Card>
          ) : (
            // Data display
            posts.map((post) => (
              <Card key={post.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                <div className="h-48 bg-gray-100 dark:bg-gray-700 relative">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {post.featured && (
                    <div className="absolute top-0 left-0 bg-primary text-white text-sm font-medium py-1 px-3">
                      Featured
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(post.date)}</span>
                    <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                    <span className="text-xs text-primary dark:text-blue-400 font-medium">{post.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  
                  <Button variant="link" className="text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300 p-0 justify-start" asChild>
                    <a href={`/blog/${post.id}`} className="inline-flex items-center text-sm mt-2">
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button variant="outline" size="lg" className="group" asChild>
            <a href="/blog">
              View All Articles
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
