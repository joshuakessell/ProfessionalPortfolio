import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Set navbar style based on scroll position
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Set active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Animation variants for mobile menu
  const menuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.2
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };
  
  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <a 
            href="#about" 
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
              JK
            </div>
            <span className="font-semibold text-xl hidden sm:block">
              Joshua Kessell
              <span className="block text-xs text-gray-500 dark:text-gray-400 font-normal">
                Full Stack Developer
              </span>
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({behavior: 'smooth'});
                }}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors relative",
                  activeSection === item.href.substring(1) 
                    ? "text-primary dark:text-blue-400" 
                    : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400"
                )}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <motion.span 
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-blue-400"
                  />
                )}
              </a>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 border-r border-gray-200 dark:border-gray-700 pr-4 mr-2">
              <a 
                href="https://github.com/joshuakessell" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/joshuakessell" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:hello@joshuakessell.com" 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="Email Me"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            
            <ModeToggle />
            
            <a href="#contact" className="hidden md:block" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({behavior: 'smooth'});
            }}>
              <Button size="sm" className="px-4">Contact Me</Button>
            </a>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden w-10 h-10"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu Overlay */}
      <motion.div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 md:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
        initial="closed"
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0, transition: { delay: 0.3 } }
        }}
        onClick={toggleMobileMenu}
      />
      
      {/* Mobile Menu Panel */}
      <motion.div 
        className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-gray-900 z-50 md:hidden overflow-y-auto"
        initial="closed"
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl">
              JK
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <nav className="mb-10">
            <ul className="space-y-4">
              {navItems.map((item, i) => (
                <motion.li key={item.label} variants={menuItemVariants}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(item.href)?.scrollIntoView({behavior: 'smooth'});
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "block py-3 px-4 rounded-lg text-lg font-medium transition-colors",
                      activeSection === item.href.substring(1)
                        ? "bg-primary/10 text-primary dark:text-blue-400" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
          
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Connect with me</p>
            <div className="flex gap-4 mb-6">
              <a 
                href="https://github.com/joshuakessell" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/in/joshuakessell" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:hello@joshuakessell.com" 
                className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Email Me"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({behavior: 'smooth'});
                setMobileMenuOpen(false);
              }}
              className="block w-full"
            >
              <Button className="w-full">Contact Me</Button>
            </a>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
