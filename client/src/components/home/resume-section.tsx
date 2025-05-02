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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { resumeTabs, experiences, skills, tools, education } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ResumeSection() {
  const [activeTab, setActiveTab] = useState("experience");
  const [isVisible, setIsVisible] = useState(false);
  const [skillBars, setSkillBars] = useState<{[key: string]: number}>({});
  const skillsRef = useRef<HTMLDivElement>(null);
  
  // Track if each section is in view for animation
  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && skillsRef.current && activeTab === "skills") {
        // Animate skill bars when the skills tab is visible
        const newSkillBars: {[key: string]: number} = {};
        skills.forEach(skill => {
          newSkillBars[skill.name] = skill.percentage;
        });
        setSkillBars(newSkillBars);
      }
    }, { threshold: 0.3 });
    
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    
    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, [activeTab]);

  // Reset skill bars when tab changes
  useEffect(() => {
    if (activeTab !== "skills") {
      setSkillBars({});
    } else if (skillsRef.current && isVisible) {
      // If already visible and switching to skills, animate immediately
      const newSkillBars: {[key: string]: number} = {};
      skills.forEach(skill => {
        newSkillBars[skill.name] = skill.percentage;
      });
      setSkillBars(newSkillBars);
    }
  }, [activeTab]);
  
  return (
    <div className="w-full h-full overflow-y-auto relative">
      {/* Decorative background shapes */}
      <div className="animated-bg-shape" style={{ top: '10%', right: '15%' }}></div>
      <div className="shape-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div 
          className={`text-center mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text inline-block">Professional Experience</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            My professional journey as a developer, showcasing experience, skills, and education.
          </p>
        </div>
        
        <div 
          className={`flex items-center justify-center gap-4 mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          <a href="/joshua-kessell-resume.pdf" download target="_blank" rel="noopener noreferrer">
            <button className="glow-button flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Resume
            </button>
          </a>
          <span className="text-sm text-gray-400">Updated May 2024</span>
        </div>
        
        <Tabs 
          defaultValue="experience" 
          onValueChange={setActiveTab} 
          className={`w-full ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.4s' }}
        >
          <TabsList className="mb-8 flex w-full justify-start border-b border-indigo-500/20 p-0 bg-transparent space-x-2">
            {resumeTabs.map((tab, index) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className={cn(
                  "py-4 px-6 rounded-t-lg data-[state=active]:bg-indigo-900/20 data-[state=active]:text-white",
                  "data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 text-gray-400",
                  "transition-all hover:text-gray-200 hover:bg-indigo-900/10",
                  isVisible ? 'animate-fade-in' : 'opacity-0'
                )}
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="experience" className="mt-4">
            <div className="grid md:grid-cols-2 gap-8">
              {experiences.map((exp, index) => (
                <div 
                  key={exp.id}
                  className={`interactive-card ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.6 + index * 0.15}s` }}
                >
                  <div className="flex justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{exp.title}</h3>
                      <div className="text-indigo-400 font-medium">{exp.company}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">{exp.period}</div>
                      {exp.current && (
                        <Badge 
                          className="mt-2 bg-green-900/20 text-green-400 border-green-500/30 
                          border animate-pulse-slow px-3"
                        >
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    {exp.responsibilities.map((item, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-3"
                      >
                        <span className="bg-indigo-900/30 p-1 rounded-full mt-0.5 border border-indigo-500/20">
                          <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                        </span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="skills" className="mt-4" ref={skillsRef}>
            <div className="grid md:grid-cols-2 gap-8">
              <div 
                className={`interactive-card ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.6s' }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white">Technical Skills</h3>
                
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-200">{skill.name}</span>
                        <span className="text-xs text-gray-400">{skillBars[skill.name] || 0}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-bar-fill" 
                          style={{ 
                            width: `${skillBars[skill.name] || 0}%`,
                            transitionDelay: `${index * 0.1}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div 
                className={`interactive-card ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.8s' }}
              >
                <h3 className="text-xl font-semibold mb-6 text-white">Tools & Platforms</h3>
                
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
                        className="glass-panel p-4 rounded-xl flex items-center gap-3 hover:bg-white/5 
                          transition-colors cursor-pointer group"
                        style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                      >
                        <div className="bg-indigo-900/40 p-2 rounded-lg group-hover:bg-indigo-800/40 
                          transition-colors border border-indigo-500/30">
                          <Icon className="h-5 w-5 text-indigo-400" />
                        </div>
                        <span className="font-medium text-gray-200">{tool.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="education" className="mt-4">
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div 
                  key={edu.id}
                  className={`interactive-card ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.6 + index * 0.2}s` }}
                >
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="md:w-1/4 mb-6 md:mb-0">
                      <div className="w-20 h-20 bg-indigo-900/30 rounded-xl border border-indigo-500/30
                        flex items-center justify-center mb-3 animate-float">
                        <GraduationCap className="h-10 w-10 text-indigo-400" />
                      </div>
                      <div className="text-gray-400 text-sm">{edu.period}</div>
                    </div>
                    
                    <div className="md:w-3/4">
                      <h3 className="text-2xl font-semibold mb-3 text-white">{edu.degree}</h3>
                      <div className="text-indigo-400 font-medium mb-3">{edu.institution}</div>
                      <p className="text-gray-300 leading-relaxed">
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
