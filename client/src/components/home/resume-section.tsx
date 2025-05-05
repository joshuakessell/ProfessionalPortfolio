import { useState, useEffect, useRef } from "react";
import { 
  Download, 
  Code, 
  Server, 
  Box, 
  GitBranch, 
  Database, 
  BrainCircuit,
  CheckCircle2,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { resumeTabs, experiences, skills, tools, education } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ResumeSection() {
  const [activeTab, setActiveTab] = useState("experience");
  const [activeItems, setActiveItems] = useState<number[]>([]);
  const tabContentRef = useRef<HTMLDivElement>(null);
  
  // Function to animate items sequentially
  const animateItems = (itemCount: number, delay: number = 100) => {
    // First hide all items
    setActiveItems([]);
    
    // Wait a moment to ensure state update is processed
    setTimeout(() => {
      // Create a new array for active items
      const newActiveItems: number[] = [];
      
      // Sequence of timeouts to show each item one at a time
      for (let i = 0; i < itemCount; i++) {
        setTimeout(() => {
          newActiveItems.push(i);
          setActiveItems([...newActiveItems]);
        }, i * delay);
      }
    }, 50); // Small initial delay to prevent flicker
  };
  
  // When tab changes, trigger animations
  useEffect(() => {
    let itemCount = 0;
    
    if (activeTab === "experience") {
      itemCount = experiences.length;
    } else if (activeTab === "skills") {
      itemCount = skills.length + tools.length;
    } else if (activeTab === "education") {
      itemCount = education.length;
    }
    
    animateItems(itemCount);
  }, [activeTab]);
  
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Professional Experience</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey as a developer, showcasing experience, skills, and education.
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-12">
          <a href="/joshua-kessell-resume.pdf" download target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </a>
          <span className="text-sm text-gray-500 dark:text-gray-400">Updated May 2024</span>
        </div>
        
        <Tabs defaultValue="experience" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 flex w-full justify-start border-b border-gray-200 dark:border-gray-800">
            {resumeTabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className={cn(
                  "px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none",
                  "transition-all hover:bg-gray-100 dark:hover:bg-gray-800/50"
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div ref={tabContentRef}>
            {/* Experience Tab */}
            <TabsContent value="experience" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
                {experiences.map((exp, index) => (
                  <div 
                    key={exp.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm p-6 transition-all duration-300 
                      ${activeItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  >
                    <div className="flex justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{exp.title}</h3>
                        <div className="text-primary dark:text-blue-400 font-medium">{exp.company}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">{exp.period}</div>
                        {exp.current && (
                          <Badge variant="secondary" className="mt-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 animate-pulse-slow">
                            Current
                          </Badge>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      {exp.responsibilities.map((item, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Skills Tab */}
            <TabsContent value="skills" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Technical Skills Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {skills.map((skill, index) => (
                        <div key={index} className="h-8 relative">
                          <div 
                            className={`flex items-center gap-2 transition-all duration-300 ease-out
                              ${activeItems.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                          >
                            <CheckCircle2 className="h-5 w-5 text-primary dark:text-blue-400 shrink-0" />
                            <span className="font-medium">{skill.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Tools Card */}
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Tools & Platforms</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {tools.map((tool, index) => {
                        let Icon;
                        switch (tool.icon) {
                          case "Code": Icon = Code; break;
                          case "Server": Icon = Server; break;
                          case "Box": Icon = Box; break;
                          case "GitBranch": Icon = GitBranch; break;
                          case "Database": Icon = Database; break;
                          case "BrainCircuit": Icon = BrainCircuit; break;
                          default: Icon = Code;
                        }
                        
                        return (
                          <div key={index} className="h-14 relative">
                            <div 
                              className={`flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 
                                hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-out 
                                ${activeItems.includes(skills.length + index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                            >
                              <Icon className="h-6 w-6 text-primary dark:text-blue-400" />
                              <span className="font-medium">{tool.name}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Education Tab */}
            <TabsContent value="education" className="mt-0">
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div 
                    key={edu.id}
                    className={`flex flex-col md:flex-row md:items-center bg-white dark:bg-gray-800 
                      rounded-xl overflow-hidden shadow-sm transition-all duration-300
                      ${activeItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  >
                    <div className="p-6 flex flex-col md:flex-row w-full">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-2 animate-float">
                          <GraduationCap className="h-8 w-8 text-primary" />
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">{edu.period}</div>
                      </div>
                      
                      <div className="md:w-3/4">
                        <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                        <div className="text-primary dark:text-blue-400 font-medium mb-2">{edu.institution}</div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
