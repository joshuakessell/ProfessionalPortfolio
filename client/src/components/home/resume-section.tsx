import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import { resumeTabs, experiences, skills, tools, education } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ResumeSection() {
  const [activeTab, setActiveTab] = useState("experience");
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="w-full h-full overflow-x-hidden">
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
          <span className="text-sm text-gray-500 dark:text-gray-400">Updated April 2024</span>
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
          
          <TabsContent value="experience" className="mt-0">
            <div className="flex flex-col gap-6">
              {experiences.map((exp, index) => (
                <div 
                  key={exp.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm p-6 
                    ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="text-lg font-semibold mb-1">{exp.title}</h3>
                      <div className="text-primary dark:text-blue-400 font-medium">{exp.company}</div>
                    </div>
                    <div className="text-left sm:text-right">
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
          
          <TabsContent value="skills" className="mt-0">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
                  
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div 
                        key={index}
                        className={isVisible ? 'animate-fade-in' : 'opacity-0'}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-sm">{skill.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{skill.percentage}%</span>
                        </div>
                        <Progress 
                          value={isVisible ? skill.percentage : 0} 
                          className={`h-2 ${skill.name.includes("AI") ? "progress-violet" : ""} transition-all duration-1000 ease-in-out`} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
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
                        <div 
                          key={index} 
                          className={`flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 
                            hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <Icon className="h-6 w-6 text-primary dark:text-blue-400" />
                          <span className="font-medium">{tool.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="education" className="mt-0">
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div 
                  key={edu.id}
                  className={`flex flex-col md:flex-row md:items-center bg-white dark:bg-gray-800 
                    rounded-xl overflow-hidden shadow-sm ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
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
        </Tabs>
      </div>
    </div>
  );
}
