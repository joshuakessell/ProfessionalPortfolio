import { ResumeTab, Experience, Skill, Tool, Education, Project, BlogPost } from "./types";

export const resumeTabs: ResumeTab[] = [
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills & Tools" },
  { id: "education", label: "Education" }
];

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "TEKsystems Global Services",
    period: "January 2019 - March 2025",
    current: true,
    responsibilities: [
      "Android / Java Developer (3 years): Developed and maintained Android apps for tracking passenger luggage in a major airline",
      "Integrated RESTful APIs using Spring Boot to support real-time updates and worked in Agile sprints",
      "Backend Java Developer (1 year): Built product fulfillment API with Spring Boot and Kafka for an automobile manufacturer",
      "Full Stack Developer (1 year): Rebuilt legacy .NET system into interactive Angular 10 web app for a healthcare training platform",
      "DevOps Automation Engineer (1 year): Automated server migration with Ansible scripts and deployed CI/CD pipelines to AWS Government Cloud"
    ]
  },
  {
    id: 2,
    title: "Software Support Analyst",
    company: "Intuit",
    period: "November 2017 - April 2018",
    current: false,
    responsibilities: [
      "Used phone and online chat to assist professional accountants and firms in using proprietary tax software",
      "Provided technical support and troubleshooting for tax preparation software",
      "Helped resolve complex software issues during tax season",
      "Ensured clients could effectively utilize software features for accurate tax preparation"
    ]
  },
  {
    id: 3,
    title: "Platform Support Analyst",
    company: "Texas Instruments",
    period: "2016 - 2017",
    current: false,
    responsibilities: [
      "Supported internal teams by resolving trouble requests and general inquiries",
      "Acted as liaison between client and order fulfillment teams",
      "Generated weekly reports and collaborated with analyst team to improve methods and processes",
      "Helped streamline communication between different departments to improve efficiency"
    ]
  },
  {
    id: 4,
    title: "At-Home Chat Advisor",
    company: "Apple, Inc",
    period: "2014 - 2016",
    current: false,
    responsibilities: [
      "Resolved up to three simultaneous AppleCare Support live chats",
      "Directed team meetings and shared best practices feedback with other advisors",
      "Maintained an independent, productive and functional home-office work environment",
      "Provided technical support for Apple products and services to customers"
    ]
  }
];

export const skills: Skill[] = [
  { name: "JavaScript/HTML5/CSS3", percentage: 95 },
  { name: "React", percentage: 90 },
  { name: "Java", percentage: 90 },
  { name: "MongoDB", percentage: 85 },
  { name: "Spring Boot", percentage: 85 },
  { name: "Angular", percentage: 82 },
  { name: "Android SDK", percentage: 80 },
  { name: "REST Services", percentage: 80 },
  { name: "Agile Development", percentage: 75 }
];

export const tools: Tool[] = [
  { name: "AWS", icon: "Server" },
  { name: "Ansible", icon: "Code" },
  { name: "Python", icon: "Code" },
  { name: "Git/GitHub", icon: "GitBranch" },
  { name: "MongoDB", icon: "Database" },
  { name: "CI/CD", icon: "Server" },
  { name: "Automation", icon: "Code" },
  { name: "Node.js", icon: "Code" }
];

export const education: Education[] = [
  {
    id: 1,
    degree: "Certificate in Full Stack Web Development",
    institution: "Southern Methodist University",
    period: "October 2018 - December 2018",
    description: "Specialized training in the MERN Stack (MongoDB, Express, React, Node.js). Developed full-stack web applications and gained hands-on experience with modern JavaScript frameworks and libraries."
  },
  {
    id: 2,
    degree: "Associates of Applied Science in Game Development",
    institution: "El Centro (Dallas County Community College)",
    period: "2011 - 2013",
    description: "Studied game development fundamentals, programming logic, and interactive application design. Gained valuable experience in software development principles and programming paradigms."
  }
];

export const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Airline Luggage Tracking App",
    description: "Android application for a major airline that allows staff to track passenger luggage in real-time throughout the journey, reducing lost luggage incidents by 35%.",
    tags: ["Android", "Java", "Spring Boot", "RESTful API"],
    imageUrl: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=400&fit=crop",
    demoUrl: "https://luggage-tracker-demo.joshuakessell.com",
    githubUrl: "https://github.com/joshuakessell/airline-luggage-tracker",
    featured: true,
    aiProject: false
  },
  {
    id: 2,
    title: "Healthcare Training Platform",
    description: "Interactive web application for healthcare professionals that gamifies training modules and improves user engagement. Replaced a legacy .NET system with a modern Angular solution.",
    tags: ["Angular", "TypeScript", "MongoDB", "Express"],
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
    demoUrl: "https://health-training-demo.joshuakessell.com",
    githubUrl: "https://github.com/joshuakessell/healthcare-training-platform",
    featured: true,
    aiProject: false
  },
  {
    id: 3,
    title: "Automotive Fulfillment API",
    description: "Backend service built with Spring Boot and Kafka for an automobile manufacturer that handles product fulfillment requests, inventory management, and dealer communications.",
    tags: ["Java", "Spring Boot", "Kafka", "RESTful API"],
    imageUrl: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=400&fit=crop",
    demoUrl: "https://auto-api-demo.joshuakessell.com",
    githubUrl: "https://github.com/joshuakessell/automotive-fulfillment-api",
    featured: true,
    aiProject: false
  },
  {
    id: 4,
    title: "Server Migration Automation Tool",
    description: "DevOps automation solution developed for a U.S. defense contractor that uses Ansible scripts to automate server migration and deploy CI/CD pipelines to AWS Government Cloud.",
    tags: ["Ansible", "Python", "AWS", "CI/CD"],
    imageUrl: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?w=800&h=400&fit=crop",
    demoUrl: "https://migration-tool-demo.joshuakessell.com",
    githubUrl: "https://github.com/joshuakessell/server-migration-tools",
    featured: true,
    aiProject: false
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Android Apps for the Airline Industry",
    excerpt: "My experience developing Android applications for tracking passenger luggage and the unique challenges of building apps for the airline industry.",
    imageUrl: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800&h=400&fit=crop",
    category: "Android Development",
    date: "2024-03-15",
    featured: true
  },
  {
    id: 2,
    title: "Spring Boot and Kafka: A Powerful Combination",
    excerpt: "How I leveraged Spring Boot and Kafka to build a robust product fulfillment API for an automobile manufacturer and lessons learned along the way.",
    imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=400&fit=crop",
    category: "Java Development",
    date: "2024-02-10",
    featured: true
  },
  {
    id: 3,
    title: "Gamification in Healthcare Training Applications",
    excerpt: "Strategies for implementing gamification elements in healthcare training platforms to improve user engagement and knowledge retention.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
    category: "Angular",
    date: "2023-11-25",
    featured: false
  },
  {
    id: 4,
    title: "Automating Server Migration with Ansible",
    excerpt: "A practical guide to using Ansible for automating server migrations and deploying CI/CD pipelines to AWS Government Cloud environments.",
    imageUrl: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?w=800&h=400&fit=crop",
    category: "DevOps",
    date: "2023-08-15",
    featured: false
  },
  {
    id: 5,
    title: "From .NET to Angular: Modernizing Legacy Applications",
    excerpt: "My journey transforming a legacy .NET system into a modern Angular web application for a healthcare training platform.",
    imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop",
    category: "Web Development",
    date: "2023-06-20",
    featured: false
  }
];
