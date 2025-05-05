import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Resume", href: "#resume" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Handle scroll events to change navbar style and highlight active section
  useEffect(() => {
    const handleScroll = () => {
      // Add background when scrolled
      setScrolled(window.scrollY > 20);
      
      // Find active section for highlighting menu items
      const sections = navItems.map(item => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Optimize parallax effect for different devices
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-[#050816]/80 backdrop-blur-md py-3" 
          : "bg-transparent py-5"
      )}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-pink-500 text-white rounded-lg flex items-center justify-center font-bold text-xl animate-glow shadow-lg">
            J
          </div>
          <span className="font-semibold text-xl text-white hidden sm:block group-hover:text-indigo-400 transition-colors">
            Joshua Kessell
          </span>
        </a>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a 
                key={item.label}
                href={item.href} 
                className={cn(
                  "text-sm font-medium py-2 px-4 relative transition-all",
                  isActive 
                    ? "text-white" 
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
                )}
              </a>
            );
          })}
          
          <a href="#contact">
            <button className="glow-button ml-2">
              Let's Connect
            </button>
          </a>
        </div>
        
        {/* Mobile toggle */}
        <button
          className="p-2 rounded-full md:hidden glass-panel"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </nav>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden fixed top-[69px] right-0 w-full h-screen transition-all duration-300 z-40",
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="w-full h-full bg-[#050816]/95 backdrop-blur-lg">
          <div className="flex flex-col pt-10 px-6">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a 
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "py-5 text-lg font-medium border-b border-gray-800 flex items-center justify-between",
                    isActive ? "text-indigo-400" : "text-gray-300",
                    isReducedMotion ? "" : "animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  )}
                </a>
              );
            })}
            
            <a 
              href="#contact"
              className={cn(
                "mt-10 text-center glow-button",
                isReducedMotion ? "" : "animate-fade-in"
              )}
              style={{ animationDelay: "0.5s" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Let's Connect
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
