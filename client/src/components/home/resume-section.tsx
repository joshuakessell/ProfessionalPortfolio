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
import type { SubRole } from "@/lib/types";
import { cn } from "@/lib/utils";


export function ResumeSection() {
  const [activeTab, setActiveTab] = useState("experience");
  const [activeItems, setActiveItems] = useState<number[]>([]);
  const tabContentRef = useRef<HTMLDivElement>(null);
  
  // Function to ensure smooth transition between tabs
  const resetAnimations = () => {
    setActiveItems([]);
    setSectionVisible({
      skillsHeader: false,
      toolsHeader: false,
      skillsCard: false,
      toolsCard: false
    });
  };
  
  // Create separate animation states for section headers and contents
  const [sectionVisible, setSectionVisible] = useState<{
    skillsHeader: boolean;
    toolsHeader: boolean;
    skillsCard: boolean;
    toolsCard: boolean;
  }>({
    skillsHeader: false,
    toolsHeader: false,
    skillsCard: false,
    toolsCard: false
  });

  // When tab changes, trigger animations
  useEffect(() => {
    // Reset all animations first
    resetAnimations();
    
    // Add a small delay before starting new animations
    if (activeTab === "experience") {
      // Staggered animation for experience items
      setTimeout(() => {
        const newActiveItems: number[] = [];
        experiences.forEach((_, i) => {
          setTimeout(() => {
            newActiveItems.push(i);
            setActiveItems([...newActiveItems]);
          }, i * 300); // Longer delay between experience cards for more pronounced effect
        });
      }, 200);
    } else if (activeTab === "skills") {
      // Sequential section animations for the skills tab
      
      // Show skills card header first
      setTimeout(() => {
        setSectionVisible(prev => ({ ...prev, skillsHeader: true }));
      }, 300);
      
      // Then show skills list
      setTimeout(() => {
        setSectionVisible(prev => ({ ...prev, skillsCard: true }));
        // Animate skills items
        const newActiveItems: number[] = [];
        skills.forEach((_, i) => {
          setTimeout(() => {
            newActiveItems.push(i);
            setActiveItems([...newActiveItems]);
          }, i * 80);
        });
      }, 700);
      
      // Then show tools card header
      setTimeout(() => {
        setSectionVisible(prev => ({ ...prev, toolsHeader: true }));
      }, 1100);
      
      // Finally show tools list
      setTimeout(() => {
        setSectionVisible(prev => ({ ...prev, toolsCard: true }));
        // Animate tool items
        const skillsCount = skills.length;
        const newActiveItems = [...Array(skillsCount)].map((_, i) => i);
        
        tools.forEach((_, i) => {
          setTimeout(() => {
            newActiveItems.push(skillsCount + i);
            setActiveItems([...newActiveItems]);
          }, i * 80);
        });
      }, 1500);
      
    } else if (activeTab === "education") {
      // Create a more staggered animation for education items
      setTimeout(() => {
        const newActiveItems: number[] = [];
        education.forEach((_, i) => {
          setTimeout(() => {
            newActiveItems.push(i);
            setActiveItems([...newActiveItems]);
          }, i * 300); // Longer delay between education items for more pronounced effect
        });
      }, 200);
    }
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
          <a href="/joshua-kessell-resume-june-2025.pdf" download target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </a>
          <span className="text-sm text-gray-500 dark:text-gray-400">Updated June 2025</span>
        </div>
        
        <Tabs defaultValue="experience" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100 dark:bg-gray-800/50 p-1 rounded-lg h-auto">
              {resumeTabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className={cn(
                    "px-5 py-2.5 text-sm font-medium rounded-md",
                    "data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700",
                    "data-[state=active]:text-primary dark:data-[state=active]:text-blue-400",
                    "data-[state=active]:shadow-sm",
                    "transition-all duration-200"
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <div ref={tabContentRef}>
            {/* Experience Tab */}
            <TabsContent value="experience" className="mt-0">
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div 
                    key={exp.id}
                    className={`glass-panel rounded-xl overflow-hidden p-6 transition-all duration-700 transform
                      ${activeItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ 
                      transitionDelay: `${index * 200}ms`
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                        {exp.company !== exp.title && (
                          <div className="text-primary dark:text-blue-400 font-medium text-lg">{exp.company}</div>
                        )}
                      </div>
                      <div className="text-left md:text-right mt-2 md:mt-0">
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{exp.period}</div>
                        {exp.current && (
                          <Badge variant="secondary" className="mt-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 animate-pulse-slow">
                            Current
                          </Badge>
                        )}
                      </div>
                    </div>
                    {exp.responsibilities.length > 0 && (
                      <ul className="grid md:grid-cols-2 gap-3 text-gray-600 dark:text-gray-300">
                        {exp.responsibilities.map((item, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-start gap-2"
                          >
                            <CheckCircle2 className="h-5 w-5 text-primary dark:text-blue-400 shrink-0 mt-0.5" />
                            <span className="text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {exp.subRoles && exp.subRoles.length > 0 && (
                      <div className="space-y-4 mt-6">
                        {exp.subRoles.map((subRole, subIndex) => (
                          <div 
                            key={subRole.id} 
                            className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5 border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex flex-col md:flex-row md:justify-between mb-3">
                              <div>
                                <h4 className="text-lg font-medium mb-1">{subRole.title}</h4>
                                {subRole.client && (
                                  <div className="text-primary dark:text-blue-400 text-sm">{subRole.client}</div>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 md:mt-0">{subRole.period}</div>
                            </div>
                            <ul className="space-y-2">
                              {subRole.responsibilities.map((item, idx) => (
                                <li 
                                  key={idx} 
                                  className="flex items-start gap-2"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-primary dark:text-blue-400 shrink-0 mt-0.5" />
                                  <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Skills Tab */}
            <TabsContent value="skills" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Technical Skills Card */}
                <div className="glass-panel rounded-xl overflow-hidden transition-all duration-500">
                  <div className="p-6">
                    <h3 
                      className={`text-lg font-semibold mb-4 transition-all duration-300 
                        ${sectionVisible.skillsHeader ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                    >
                      Technical Skills
                    </h3>
                    
                    <div 
                      className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 transition-all duration-300 
                        ${sectionVisible.skillsCard ? 'opacity-100' : 'opacity-0'}`}
                    >
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
                <div className="glass-panel rounded-xl overflow-hidden transition-all duration-500">
                  <div className="p-6">
                    <h3 
                      className={`text-lg font-semibold mb-4 transition-all duration-300
                        ${sectionVisible.toolsHeader ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
                    >
                      Tools & Platforms
                    </h3>
                    
                    <div 
                      className={`grid grid-cols-2 gap-4 transition-all duration-300 
                        ${sectionVisible.toolsCard ? 'opacity-100' : 'opacity-0'}`}
                    >
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
                              className={`flex items-center gap-3 p-3 rounded-lg bg-white/20 dark:bg-black/20 
                                hover:bg-white/30 dark:hover:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-white/10
                                transition-all duration-300 ease-out 
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
                    className={`flex flex-col md:flex-row md:items-center glass-panel 
                      rounded-xl overflow-hidden transition-all duration-300
                      ${activeItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  >
                    <div className="p-6 flex flex-col md:flex-row w-full">
                      <div className="md:w-1/4 mb-4 md:mb-0">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-2 animate-float">
                          <GraduationCap className="h-8 w-8 text-primary" />
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">{edu.period}</div>
                        {edu.current && (
                          <Badge variant="secondary" className="mt-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 animate-pulse-slow">
                            Current
                          </Badge>
                        )}
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
