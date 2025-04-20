import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Testimonial data
const testimonials = [
  {
    id: 1,
    content: "Joshua is one of the most talented developers I've worked with. His attention to detail and ability to solve complex problems is unmatched. He delivered our project ahead of schedule and exceeded our expectations.",
    author: "Sarah Johnson",
    position: "CTO at TechSolutions",
    avatar: "/testimonials/sarah.jpg"
  },
  {
    id: 2,
    content: "Working with Joshua was a game-changer for our startup. He quickly understood our vision and implemented features that not only met but surpassed our requirements. His expertise in both frontend and backend technologies is impressive.",
    author: "Michael Chen",
    position: "Founder, InnovateX",
    avatar: "/testimonials/michael.jpg"
  },
  {
    id: 3,
    content: "Joshua's integration of AI features into our platform revolutionized our user experience. His technical skills combined with his creative approach to problem-solving make him an exceptional developer to collaborate with.",
    author: "Emma Rodriguez",
    position: "Product Manager, AI Ventures",
    avatar: "/testimonials/emma.jpg"
  },
  {
    id: 4,
    content: "I was impressed by Joshua's ability to take our vague ideas and turn them into a polished, functional application. His communication throughout the project was excellent, and he was always receptive to feedback and iterations.",
    author: "David Wilson",
    position: "Director of Digital, CreativeWorks",
    avatar: "/testimonials/david.jpg"
  }
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Here's what clients and colleagues have to say about working with me.
        </p>
      </div>
      
      <div className={`relative max-w-4xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="absolute -top-10 left-0 opacity-20">
          <Quote size={80} className="text-primary" />
        </div>
        
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="min-h-[200px]">
            <p className="text-lg md:text-xl italic text-gray-700 dark:text-gray-300 mb-8">
              "{testimonials[activeIndex].content}"
            </p>
            
            <div className="flex items-center">
              <Avatar className="h-14 w-14 mr-4 border-2 border-primary">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(testimonials[activeIndex].author)}
                </AvatarFallback>
                {testimonials[activeIndex].avatar && (
                  <AvatarImage src={testimonials[activeIndex].avatar} alt={testimonials[activeIndex].author} />
                )}
              </Avatar>
              
              <div>
                <h4 className="font-semibold text-lg">{testimonials[activeIndex].author}</h4>
                <p className="text-gray-600 dark:text-gray-400">{testimonials[activeIndex].position}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-10">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300", 
                    index === activeIndex 
                      ? "bg-primary w-8" 
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-10 w-10"
                onClick={handlePrevious}
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-10 w-10"
                onClick={handleNext}
                aria-label="Next testimonial"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}