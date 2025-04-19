import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "#hero" },
  { label: "Resume", href: "#resume" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track the active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Check for sections with the 'active' class
      const sections = ['hero', 'resume', 'projects', 'contact'];
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section?.classList.contains('active')) {
          setActiveSection(sectionId);
          break;
        }
      }
    };
    
    // Set up a MutationObserver to watch for class changes on the sections
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          handleScroll();
        }
      });
    });
    
    // Observe each section for class changes
    const sections = ['hero', 'resume', 'projects', 'contact'];
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section, { attributes: true });
      }
    });
    
    // Also listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    setTimeout(handleScroll, 500);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 shadow-sm dark:shadow-gray-800/20">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-xl">
            J
          </div>
          <span className="font-semibold text-xl hidden sm:block">Joshua Kessell</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            
            return (
              <a 
                key={item.label}
                href={item.href} 
                className={cn(
                  "relative py-2 hover:text-primary dark:hover:text-blue-400 transition-colors",
                  isActive ? "text-primary dark:text-blue-400" : ""
                )}
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById(sectionId);
                  if (section) {
                    // First, remove active class from all sections
                    const allSections = ['hero', 'resume', 'projects', 'contact'];
                    allSections.forEach(id => {
                      const elem = document.getElementById(id);
                      if (elem) {
                        elem.classList.remove('active');
                      }
                    });
                    
                    // Then add active class to target section
                    section.classList.add('active');
                    
                    // Manual scroll to section
                    section.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update URL hash for better navigation state
                    window.history.pushState(null, '', item.href);
                  }
                }}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-blue-400 rounded"></span>
                )}
              </a>
            );
          })}
        </div>
        
        <div className="flex items-center gap-3">
          <ModeToggle />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden w-10 h-10 rounded-full"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <a 
            href="#contact" 
            className="hidden sm:block"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                // First, remove active class from all sections
                const allSections = ['hero', 'resume', 'projects', 'contact'];
                allSections.forEach(id => {
                  const elem = document.getElementById(id);
                  if (elem) {
                    elem.classList.remove('active');
                  }
                });
                
                // Then add active class to contact section
                contactSection.classList.add('active');
                
                // Manual scroll to section
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update URL hash for better navigation state
                window.history.pushState(null, '', '#contact');
              }
            }}
          >
            <Button>Let's Connect</Button>
          </a>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900",
        mobileMenuOpen ? "block" : "hidden"
      )}>
        <div className="flex flex-col gap-2 text-sm font-medium">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            
            return (
              <a 
                key={item.label}
                href={item.href} 
                className={cn(
                  "py-2 relative hover:text-primary border-l-2 pl-2",
                  isActive 
                    ? "border-primary text-primary dark:border-blue-400 dark:text-blue-400" 
                    : "border-transparent"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const section = document.getElementById(sectionId);
                  if (section) {
                    // First, remove active class from all sections
                    const allSections = ['hero', 'resume', 'projects', 'contact'];
                    allSections.forEach(id => {
                      const elem = document.getElementById(id);
                      if (elem) {
                        elem.classList.remove('active');
                      }
                    });
                    
                    // Then add active class to target section
                    section.classList.add('active');
                    
                    // Manual scroll to section
                    section.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update URL hash for better navigation state
                    window.history.pushState(null, '', item.href);
                  }
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
