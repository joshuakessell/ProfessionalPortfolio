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
  GraduationCap,
  ChevronLeft,
  ChevronRight
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
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);
  const [currentSkillsIndex, setCurrentSkillsIndex] = useState(0);
  const [currentEducationIndex, setCurrentEducationIndex] = useState(0);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="w-full h-full overflow-x-hidden flex flex-col justify-between min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 flex-grow flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Professional Experience</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey as a developer, showcasing experience, skills, and education.
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-12">
          <a href="/joshua-kessell-resume.pdf" download="Joshua_Kessell_Resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 shadow-md holographic-hover"
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
            <div className="relative w-full">
              {/* Left scroll button - only show if not on first card */}
              {currentExperienceIndex > 0 && (
                <button 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white hover:scale-110 transition-all"
                  onClick={() => {
                    const newIndex = Math.max(0, currentExperienceIndex - 1);
                    setCurrentExperienceIndex(newIndex);
                  }}
                >
                  <ChevronLeft className="h-6 w-6 text-primary" />
                </button>
              )}
              
              {/* Right scroll button - only show if not on last card */}
              {currentExperienceIndex < experiences.length - 1 && (
                <button 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white hover:scale-110 transition-all"
                  onClick={() => {
                    const newIndex = Math.min(experiences.length - 1, currentExperienceIndex + 1);
                    setCurrentExperienceIndex(newIndex);
                  }}
                >
                  <ChevronRight className="h-6 w-6 text-primary" />
                </button>
              )}
              
              {/* Single experience card container */}
              <div className="flex justify-center items-center pb-6 pt-2 px-4">
                <div 
                  key={experiences[currentExperienceIndex].id}
                  className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm p-8 
                    w-full max-w-3xl mx-auto
                    ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-6">
                    <div className="mb-3 sm:mb-0">
                      <h3 className="text-xl font-semibold mb-1">{experiences[currentExperienceIndex].title}</h3>
                      <div className="text-primary dark:text-blue-400 font-medium text-lg">{experiences[currentExperienceIndex].company}</div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">{experiences[currentExperienceIndex].period}</div>
                      {experiences[currentExperienceIndex].current && (
                        <Badge variant="secondary" className="mt-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 animate-pulse-slow">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    {experiences[currentExperienceIndex].responsibilities.map((item, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary dark:text-blue-400 shrink-0 mt-1" />
                        <span className="text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Dot indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {experiences.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentExperienceIndex 
                        ? 'bg-primary scale-125' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    onClick={() => setCurrentExperienceIndex(index)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="skills" className="mt-0">
            <div className="relative w-full">
              {/* Left scroll button - only show if not on first card */}
              {currentSkillsIndex > 0 && (
                <button 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white hover:scale-110 transition-all"
                  onClick={() => {
                    const newIndex = Math.max(0, currentSkillsIndex - 1);
                    setCurrentSkillsIndex(newIndex);
                  }}
                >
                  <ChevronLeft className="h-6 w-6 text-primary" />
                </button>
              )}
              
              {/* Right scroll button - only show if not on last card */}
              {currentSkillsIndex < 1 && (
                <button 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white hover:scale-110 transition-all"
                  onClick={() => {
                    const newIndex = Math.min(1, currentSkillsIndex + 1);
                    setCurrentSkillsIndex(newIndex);
                  }}
                >
                  <ChevronRight className="h-6 w-6 text-primary" />
                </button>
              )}
              
              {/* Single skills card container */}
              <div className="flex justify-center items-center pb-6 pt-2 px-4">
                {currentSkillsIndex === 0 ? (
                  <div 
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm p-8 
                      w-full max-w-3xl mx-auto"
                  >
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
                ) : (
                  <div 
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm p-8 
                      w-full max-w-3xl mx-auto"
                  >
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
                )}
              </div>
              
              {/* Dot indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {[0, 1].map((index) => (
                  <button 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSkillsIndex 
                        ? 'bg-primary scale-125' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    onClick={() => setCurrentSkillsIndex(index)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="education" className="mt-0">
            <div className="relative w-full">
              {/* Left scroll button - only show if not on first card */}
              {currentEducationIndex > 0 && (
                <button 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white hover:scale-110 transition-all"
                  onClick={() => {
                    const newIndex = Math.max(0, currentEducationIndex - 1);
                    setCurrentEducationIndex(newIndex);
                  }}
                >
                  <ChevronLeft className="h-6 w-6 text-primary" />
                </button>
              )}
              
              {/* Right scroll button - only show if not on last card */}
              {currentEducationIndex < education.length - 1 && (
                <button 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white hover:scale-110 transition-all"
                  onClick={() => {
                    const newIndex = Math.min(education.length - 1, currentEducationIndex + 1);
                    setCurrentEducationIndex(newIndex);
                  }}
                >
                  <ChevronRight className="h-6 w-6 text-primary" />
                </button>
              )}
              
              {/* Single education card container */}
              <div className="flex justify-center items-center pb-6 pt-2 px-4">
                <div 
                  key={education[currentEducationIndex].id}
                  className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm p-8 
                    w-full max-w-3xl mx-auto
                    ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                >
                  <div className="flex flex-col w-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center animate-float shrink-0">
                        <GraduationCap className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{education[currentEducationIndex].degree}</h3>
                        <div className="text-primary dark:text-blue-400 font-medium">{education[currentEducationIndex].institution}</div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">{education[currentEducationIndex].period}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                      {education[currentEducationIndex].description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Dot indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {education.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentEducationIndex 
                        ? 'bg-primary scale-125' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    onClick={() => setCurrentEducationIndex(index)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
