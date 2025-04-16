import { useState } from "react";
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
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { resumeTabs, experiences, skills, tools, education } from "@/lib/data";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useParallax } from "@/hooks/use-parallax";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

export function ResumeSection() {
  const [activeTab, setActiveTab] = useState("experience");
  const [sectionRef, isSectionInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  return (
    <section 
      id="resume" 
      className="bg-gray-50 dark:bg-gray-900/30 py-16 md:py-24 relative overflow-hidden" 
      ref={sectionRef}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div 
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-primary/10 blur-3xl"
          style={useParallax(0.2, 'down')}
        />
        <div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-200 dark:bg-blue-900/30 blur-3xl"
          style={useParallax(0.15, 'up')}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <AnimatedHeading
          title="Professional Experience"
          subtitle="My professional journey as a developer, showcasing experience, skills, and education."
          centered={true}
          className="mb-8"
        />
        
        <AnimatedSection animation="fade-in" delay={1} className="flex items-center justify-center gap-2 mb-12">
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
        </AnimatedSection>
        
        <AnimatedSection animation="fade-in" delay={2}>
          <Tabs defaultValue="experience" onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 flex w-full justify-start border-b border-gray-200 dark:border-gray-800">
              {resumeTabs.map((tab, index) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className={cn(
                    "px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none",
                    "transition-all hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  )}
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="experience" className="mt-0">
              <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
                {experiences.map((exp, index) => (
                  <AnimatedSection 
                    key={exp.id} 
                    animation="fade-in" 
                    delay={(index % 3 + 1) as 1 | 2 | 3}
                  >
                    <Card className="hover:shadow-md transition-shadow duration-300 card-3d h-full">
                      <CardContent className="p-6">
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
                              style={{ 
                                animationDelay: `${idx * 100}ms`,
                                opacity: 0,
                                animation: isSectionInView ? 'fadeIn 0.5s ease-out forwards' : 'none'
                              }}
                            >
                              <CheckCircle2 className="h-5 w-5 text-primary dark:text-blue-400 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="skills" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                <AnimatedSection animation="slide-left">
                  <Card className="card-3d">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
                      
                      <div className="space-y-4">
                        {skills.map((skill, index) => (
                          <div 
                            key={index}
                            style={{ 
                              animationDelay: `${index * 100}ms`,
                              opacity: 0,
                              animation: isSectionInView ? 'fadeIn 0.5s ease-out forwards' : 'none'
                            }}
                          >
                            <div className="flex justify-between mb-1">
                              <span className="font-medium text-sm">{skill.name}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{skill.percentage}%</span>
                            </div>
                            <Progress 
                              value={isSectionInView ? skill.percentage : 0} 
                              className={`h-2 ${skill.name.includes("AI") ? "progress-violet" : ""} transition-all duration-1000 ease-in-out`} 
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
                
                <AnimatedSection animation="slide-right">
                  <Card className="card-3d">
                    <CardContent className="p-6">
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
                              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              style={{ 
                                animationDelay: `${index * 100}ms`,
                                opacity: 0,
                                animation: isSectionInView ? 'fadeIn 0.5s ease-out forwards' : 'none'
                              }}
                            >
                              <Icon className="h-6 w-6 text-primary dark:text-blue-400" />
                              <span className="font-medium">{tool.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="mt-0">
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <AnimatedSection 
                    key={edu.id} 
                    animation="fade-in" 
                    delay={(index % 3 + 1) as 1 | 2 | 3}
                  >
                    <Card className="flex flex-col md:flex-row md:items-center hover:shadow-md transition-shadow duration-300 card-3d">
                      <CardContent className="p-6 flex flex-col md:flex-row w-full">
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
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedSection>
      </div>
    </section>
  );
}
