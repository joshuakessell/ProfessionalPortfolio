import { useState } from "react";
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
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href} 
              className="hover:text-primary dark:hover:text-blue-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const sectionId = item.href.replace('#', '');
                const section = document.getElementById(sectionId);
                if (section) {
                  window.scrollTo({
                    top: section.offsetTop,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {item.label}
            </a>
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
          
          <a 
            href="#contact" 
            className="hidden sm:block"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                window.scrollTo({
                  top: contactSection.offsetTop,
                  behavior: 'smooth'
                });
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
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href} 
              className="py-2 hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                const sectionId = item.href.replace('#', '');
                const section = document.getElementById(sectionId);
                if (section) {
                  window.scrollTo({
                    top: section.offsetTop,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
