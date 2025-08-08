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
              <div className="h-8 w-10 bg-gradient-to-br from-blue-600 to-violet-600 text-white rounded-lg flex items-center justify-center font-bold text-base shadow-md">
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
                <li><button onClick={() => smoothScrollToElement('hero')} className="hover:text-primary dark:hover:text-blue-400 transition-colors">About</button></li>
                <li><button onClick={() => smoothScrollToElement('resume')} className="hover:text-primary dark:hover:text-blue-400 transition-colors">Resume</button></li>
                <li><button onClick={() => smoothScrollToElement('projects')} className="hover:text-primary dark:hover:text-blue-400 transition-colors">Projects</button></li>
                <li><button onClick={() => smoothScrollToElement('contact')} className="hover:text-primary dark:hover:text-blue-400 transition-colors">Contact</button></li>
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
            Designed & Built with <span className="text-red-500">❤</span> by Joshua Kessell · <span className="text-gray-400">Crafted for performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
