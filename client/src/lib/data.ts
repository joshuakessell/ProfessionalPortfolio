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
  { name: "JavaScript/HTML5/CSS3" },
  { name: "React" },
  { name: "Java" },
  { name: "MongoDB" },
  { name: "Spring Boot" },
  { name: "Angular" },
  { name: "Android SDK" },
  { name: "REST Services" },
  { name: "Agile Development" }
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
    degree: "Bachelors of Science in Computer Science",
    institution: "University of Phoenix",
    period: "MAY 2025 - EST 2027",
    description: "Currently pursuing a Bachelor's degree in Computer Science with a focus on advanced programming concepts and software engineering principles."
  },
  {
    id: 2,
    degree: "Full Stack Web Development Certificate",
    institution: "Southern Methodist University",
    period: "OCT 2018 - DEC 2018",
    description: "Specialized training in the MERN Stack (MongoDB, Express, React, Node.js). Developed full-stack web applications and gained hands-on experience with modern JavaScript frameworks and libraries."
  },
  {
    id: 3,
    degree: "Associate of Science in Computer Programming",
    institution: "El Centro Dallas County College",
    period: "2011 - 2014",
    description: "Studied programming fundamentals, computer science principles, and software development methodologies. Gained foundational knowledge in algorithms, data structures, and application design."
  }
];

export const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Code Genie VSCode Extension",
    description: "VS Code extension that generates code using AI, allowing you to insert intelligent code completions directly in your editor with a right-click.",
    tags: ["TypeScript", "VS Code API", "OpenAI", "Node.js"],
    imageUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&h=400&fit=crop",
    demoUrl: "https://marketplace.visualstudio.com/items?itemName=joshuakessell.code-genie",
    githubUrl: "https://github.com/joshuakessell/CodeGenieExtension",
    featured: true,
    aiProject: true
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
