import { useState } from "react";
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
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full backdrop-blur-md bg-white/80 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-12 bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-900 rounded-lg flex items-center justify-center font-bold text-xl shadow-md transition-colors">
            JK
          </div>
          <span className="font-semibold text-xl hidden sm:block text-gray-900 dark:text-white">Joshua Kessell</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => smoothScrollToElement(item.href.substring(1))}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {item.label}
            </button>
          ))}
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
        "md:hidden px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md",
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
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
