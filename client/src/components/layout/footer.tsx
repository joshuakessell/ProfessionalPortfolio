import { Github, Linkedin, Mail, Phone, MapPin, ChevronRight, HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Resume", href: "#resume" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" }
  ];
  
  const contactInfo = [
    { 
      icon: <Mail className="h-5 w-5 text-primary" />,
      label: "Email",
      value: "hello@joshuakessell.com",
      href: "mailto:hello@joshuakessell.com"
    },
    { 
      icon: <Phone className="h-5 w-5 text-primary" />,
      label: "Phone",
      value: "+1 (214) 864-1386",
      href: "tel:+12148641386"
    },
    { 
      icon: <MapPin className="h-5 w-5 text-primary" />,
      label: "Location",
      value: "Dallas, Texas",
      href: null
    }
  ];
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl">
                JK
              </div>
              <div>
                <h3 className="font-semibold text-lg">Joshua Kessell</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Full Stack Developer</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              I specialize in creating exceptional digital experiences through innovative web development
              and AI integration, transforming ideas into impactful solutions.
            </p>
            
            <div className="flex gap-3">
              <a 
                href="https://github.com/joshuakessell" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </a>
              <a 
                href="https://linkedin.com/in/joshuakessell" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </a>
              <a 
                href="mailto:hello@joshuakessell.com"
                className="w-9 h-9 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center group"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({behavior: 'smooth'});
                    }}
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-primary transition-transform group-hover:translate-x-1" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-5">Contact Info</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-0.5">{info.icon}</div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{info.label}:</p>
                    {info.href ? (
                      <a href={info.href} className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300">{info.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-5">Let's Connect</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Interested in working together? Feel free to reach out and let's discuss your project.
            </p>
            <Button 
              className="w-full"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({behavior: 'smooth'})}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Joshua Kessell. All rights reserved.
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            Built with <HeartIcon className="h-4 w-4 text-red-500 animate-pulse" fill="currentColor" /> using React, TypeScript & Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
}
