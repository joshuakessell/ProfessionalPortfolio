import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

import { Button } from "@/components/ui/button";
import { cn, smoothScrollToElement } from "@/lib/utils";

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
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all",
      "glass-header",
      scrolled && "shadow-lg"
    )}>
      <nav className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Left side - Logo and title */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-10 md:h-10 md:w-12 bg-gradient-to-br from-blue-600 to-violet-600 text-white rounded-lg flex items-center justify-center font-bold text-lg md:text-xl shadow-md">
            JK
          </div>
          <span className="font-semibold text-base md:text-xl hidden sm:block text-gray-900 dark:text-white">Joshua Kessell</span>
        </div>
        
        {/* Center - Navigation links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => smoothScrollToElement(item.href.substring(1))}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label={`Navigate to ${item.label} section`}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        {/* Right side - Dark mode toggle and connect button */}
        <div className="flex items-center gap-2 md:gap-3">
          <ModeToggle />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden w-10 h-10 rounded-full"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <Button 
            className="hidden sm:block"
            onClick={() => smoothScrollToElement('contact')}
          >
            Let's Connect
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md",
        mobileMenuOpen ? "block" : "hidden"
      )}>
        <div className="flex flex-col gap-2 text-sm font-medium">
          {navItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => {
                smoothScrollToElement(item.href.substring(1));
                setMobileMenuOpen(false);
              }}
              className="py-2 text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label={`Navigate to ${item.label} section`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
