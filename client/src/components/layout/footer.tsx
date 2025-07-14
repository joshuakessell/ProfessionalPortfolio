import { Link } from "wouter";
import { Github, Linkedin, Dribbble } from "lucide-react";
import { smoothScrollToElement } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="glass-footer py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-10 bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-900 rounded-lg flex items-center justify-center font-bold text-base shadow-md transition-colors">
                JK
              </div>
              <span className="font-semibold text-lg">Joshua Kessell</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
              Building exceptional web experiences with modern technologies and AI integration.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-8 mb-6 md:mb-0">
            <div>
              <h4 className="font-medium mb-3">Links</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><button onClick={(e) => { e.preventDefault(); console.log('Footer: About clicked'); smoothScrollToElement('hero'); }} className="hover:text-primary dark:hover:text-blue-400 transition-colors">About</button></li>
                <li><button onClick={(e) => { e.preventDefault(); console.log('Footer: Resume clicked'); smoothScrollToElement('resume'); }} className="hover:text-primary dark:hover:text-blue-400 transition-colors">Resume</button></li>
                <li><button onClick={(e) => { e.preventDefault(); console.log('Footer: Projects clicked'); smoothScrollToElement('projects'); }} className="hover:text-primary dark:hover:text-blue-400 transition-colors">Projects</button></li>
                <li><button onClick={(e) => { e.preventDefault(); console.log('Footer: Contact clicked'); smoothScrollToElement('contact'); }} className="hover:text-primary dark:hover:text-blue-400 transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Social</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="https://github.com/joshuakessell" className="hover:text-primary dark:hover:text-blue-400 transition-colors">GitHub</a></li>
                <li><a href="https://linkedin.com/in/joshuakessell" className="hover:text-primary dark:hover:text-blue-400 transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Joshua Kessell. All rights reserved.
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-500">
            Designed & Built with <span className="text-red-500">❤</span> by Joshua Kessell
          </div>
        </div>
      </div>
    </footer>
  );
}
