import { ResumeTab, Experience, Skill, Tool, Education, Project } from "./types";

export const resumeTabs: ResumeTab[] = [
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills & Tools" },
  { id: "education", label: "Education" }
];

export const resumeDownloadUrl = "/joshua-kessell-resume-june-2025.pdf";

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Android Java Developer",
    company: "TEKsystems Global Services at United Airlines",
    period: "2022 - 2025",
    current: false,
    responsibilities: [
      "Developed and maintained a suite of Android apps used to track passenger luggage",
      "Integrated RESTful API using Java and Spring Boot to support real-time updates",
      "Implemented a PIN login system for a streamlined cross-app login experience",
      "Selected to partner with senior developers to convert a React web app to Java/Android on an accelerated timeline, completing the rewrite within a single month"
    ]
  },
  {
    id: 2,
    title: "Backend Java Developer",
    company: "TEKsystems Global Services at GM / OnStar",
    period: "2021 - 2022",
    current: false,
    responsibilities: [
      "Built fulfillment API using Spring Boot and Kafka",
      "Learned Kafka on-the-job, contributing without prior experience",
      "Worked within an Agile development environment to deliver features on schedule",
      "Collaborated with cross-functional teams to ensure seamless integration"
    ]
  },
  {
    id: 3,
    title: "Angular Developer",
    company: "TEKsystems Global Services at Reliant Healthcare",
    period: "2020 - 2021",
    current: false,
    responsibilities: [
      "Modernized .NET platform into Angular 10 web app",
      "Gamified training modules to boost engagement",
      "Ensured secure backend data flow through cross-team collaboration",
      "Implemented responsive UI design for better user experience across devices"
    ]
  },
  {
    id: 4,
    title: "Automation Engineer",
    company: "TEKsystems Global Services at Perspecta",
    period: "2019 - 2020",
    current: false,
    responsibilities: [
      "Automated server migration using Ansible scripts",
      "Deployed CI/CD pipelines to AWS GovCloud",
      "Project concluded early due to COVID-19",
      "Optimized deployment workflows to improve efficiency and reduce manual errors"
    ]
  },
  {
    id: 5,
    title: "Software Support Analyst",
    company: "Intuit",
    period: "2017 - 2018",
    current: false,
    responsibilities: [
      "Delivered technical support to accountants using Intuit tax software",
      "Resolved complex issues during peak tax season",
      "Provided solutions for software functionality and user experience issues",
      "Maintained high customer satisfaction ratings while handling numerous support requests"
    ]
  },
  {
    id: 6,
    title: "Platform Support Analyst",
    company: "Texas Instruments",
    period: "2016 - 2017",
    current: false,
    responsibilities: [
      "Provided internal support by resolving platform issues",
      "Streamlined cross-team communication",
      "Reviewed sample component requests for engineering designs",
      "Helped optimize internal processes to improve workflow efficiency"
    ]
  },
  {
    id: 7,
    title: "At-Home Chat Advisor",
    company: "Apple",
    period: "2014 - 2016",
    current: false,
    responsibilities: [
      "Provided live chat support for AppleCare",
      "Resolved technical issues across multiple customers simultaneously",
      "Led team discussions and shared best practices",
      "Maintained a high-performance remote workspace"
    ]
  }
];

export const skills: Skill[] = [
  { name: "Java" },
  { name: "Python" },
  { name: "JavaScript/TypeScript" },
  { name: "React/Angular" },
  { name: "Spring Boot" },
  { name: "Android Development" },
  { name: "REST APIs" },
  { name: "Git" },
  { name: "Agile Methodologies" }
];

export const tools: Tool[] = [
  { name: "AWS", icon: "Server" },
  { name: "Azure", icon: "Cloud" },
  { name: "GCP", icon: "Cloud" },
  { name: "Docker", icon: "Box" },
  { name: "Kubernetes", icon: "Boxes" },
  { name: "Ansible", icon: "Code" },
  { name: "CI/CD", icon: "Server" },
  { name: "Bash Scripting", icon: "Terminal" }
];

export const education: Education[] = [
  {
    id: 1,
    degree: "Bachelors of Science in Computer Science",
    institution: "University of Phoenix",
    period: "MAY 2025 - EST 2027",
    description: "Currently pursuing a Bachelor's degree in Computer Science with a focus on advanced programming concepts and software engineering principles.",
    current: true
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
    title: "Code Genie",
    subtitle: "a Visual Studio Code extension",
    description: "VS Code extension that generates code using AI, allowing you to insert intelligent code completions directly in your editor with a right-click.",
    tags: ["TypeScript", "VS Code Extension", "VS Code API", "OpenAI", "Node.js"],
    imageUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&h=400&fit=crop",
    demoUrl: "https://github.com/joshuakessell/CodeGenieExtension/releases/latest/download/code-genie.vsix",
    githubUrl: "https://github.com/joshuakessell/CodeGenieExtension",
    featured: true,
    aiProject: true
  },
  {
    id: 2,
    title: "Java Fake Data Generator",
    subtitle: "a Visual Studio Code extension",
    description: "A smart VSCode extension that generates realistic mock data for your Java classes using the OpenAI API. Select a class, choose your format (Java, JSON, CSV), and get context-aware fake data instantly — perfect for unit tests, prototyping, and fixtures.",
    tags: ["Java", "VS Code Extension", "VS Code API", "OpenAI", "Test Data", "Unit Testing"],
    imageUrl: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&h=400&fit=crop",
    demoUrl: "https://github.com/joshuakessell/JavaTestDataMaster/releases/latest/download/java-test-data-master.vsix",
    githubUrl: "https://github.com/joshuakessell/JavaTestDataMaster",
    featured: true,
    aiProject: true
  },
  {
    id: 3,
    title: "Clarif-AI",
    description: "AI-powered unbiased news analysis platform that delivers factually verified, multi-perspective reporting. Features real-time news aggregation, bias detection, external article analysis, and cross-source fact-checking to provide balanced viewpoints on current events.",
    tags: ["AI", "News Analysis", "Bias Detection", "Fact Checking", "React", "TypeScript"],
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop",
    demoUrl: "https://clarif-ai.joshuakessell.com",
    githubUrl: "https://github.com/joshuakessell/ClarifAI",
    featured: true,
    aiProject: true
  },
  {
    id: 4,
    title: "GitIt?",
    description: "An AI-powered code explanation platform that transforms complex code into human-readable insights. Features instant code analysis, natural language to code generation, repository analysis with GitHub integration, and intelligent explanations across 20+ programming languages.",
    tags: ["AI", "Code Analysis", "Natural Language Processing", "GitHub Integration", "Code Generation", "Repository Analysis"],
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    demoUrl: "https://codexplainer.joshuakessell.com/",
    githubUrl: "https://github.com/joshuakessell/GitIt",
    featured: true,
    aiProject: true
  }
];

// Blog posts removed - static portfolio only
