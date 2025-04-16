import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", toggleVisibility);
    
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <div 
      className={`
        fixed bottom-6 right-6 z-40 
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      `}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:shadow-gray-900/30 transition-all duration-300 animate-float"
        aria-label="Scroll to top"
      >
        <div className="relative w-5 h-5">
          <ArrowUp className="h-5 w-5 absolute inset-0 text-primary transition-transform dark:text-blue-400 
            group-hover:-translate-y-1 duration-200" />
        </div>
      </Button>
    </div>
  );
}
