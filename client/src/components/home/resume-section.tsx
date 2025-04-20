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
  Briefcase,
  Award,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { resumeTabs, experiences, skills, tools, education } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ResumeSection() {
  const [activeTab, setActiveTab] = useState("experience");
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.4
      }
    })
  };
  
  return (
    <div className="container mx-auto px-4">
      <motion.div 
        className="text-center mb-12"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">My Experience</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          My professional journey as a developer, showcasing experience, skills, and education.
        </p>
        
        <div className="mt-6">
          <a href="/joshua-kessell-resume.pdf" download target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <FileText className="h-4 w-4" />
              Download Full Resume
            </Button>
          </a>
        </div>
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Column 1: Work Experience */}
        <motion.div 
          className="md:col-span-2"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Work Experience</h3>
          </div>
          
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                custom={index}
                variants={itemVariants}
                className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                {/* Timeline connector */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-[5.5rem] bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -ml-9"></div>
                )}
                
                {/* Timeline dot */}
                <div className="absolute -left-3 top-7 w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 bg-primary"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold">{exp.title}</h4>
                    <p className="text-primary dark:text-blue-400 font-medium">{exp.company}</p>
                  </div>
                  
                  <div className="mt-2 md:mt-0 md:text-right">
                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                      {exp.period}
                    </span>
                    {exp.current && (
                      <Badge variant="secondary" className="ml-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 animate-pulse-slow">
                        Current
                      </Badge>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-3 text-gray-600 dark:text-gray-300 pl-1">
                  {exp.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <div className="flex items-center gap-3 mt-12 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Education</h3>
          </div>
          
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                custom={index}
                variants={itemVariants}
                className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                {/* Timeline connector */}
                {index < education.length - 1 && (
                  <div className="absolute left-6 top-[5.5rem] bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 -ml-9"></div>
                )}
                
                {/* Timeline dot */}
                <div className="absolute -left-3 top-7 w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 bg-primary"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold">{edu.degree}</h4>
                    <p className="text-primary dark:text-blue-400 font-medium">{edu.institution}</p>
                  </div>
                  
                  <div className="mt-2 md:mt-0 md:text-right">
                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                      {edu.period}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {edu.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Column 2: Skills and Tools */}
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <div className="sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Skills & Tools</h3>
            </div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8"
              variants={sectionVariants}
            >
              <h4 className="text-lg font-semibold mb-6">Technical Skills</h4>
              
              <div className="space-y-5">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={index}
                    custom={index}
                    variants={itemVariants}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${skill.name.includes("AI") ? "bg-violet-500" : "bg-primary"}`}
                        style={{ width: `${isVisible ? skill.percentage : 0}%`, transition: "width 1s ease-in-out" }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 p-6"
              variants={sectionVariants}
            >
              <h4 className="text-lg font-semibold mb-6">Tools & Platforms</h4>
              
              <div className="flex flex-wrap gap-3">
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
                    <motion.div 
                      key={index}
                      custom={index}
                      variants={itemVariants}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <Icon className="h-5 w-5 text-primary dark:text-blue-400" />
                      <span className="font-medium text-sm">{tool.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
