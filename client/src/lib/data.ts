import { ResumeTab, Experience, Skill, Tool, Education, Project, BlogPost } from "./types";

export const resumeTabs: ResumeTab[] = [
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills & Tools" },
  { id: "education", label: "Education" }
];

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    period: "2020 - Present",
    current: true,
    responsibilities: [
      "Led the development of responsive web applications using React, TypeScript, and Next.js",
      "Implemented CI/CD pipelines reducing deployment time by 40%",
      "Integrated AI-powered features improving user engagement by 25%"
    ]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "WebInnovate Inc",
    period: "2018 - 2020",
    current: false,
    responsibilities: [
      "Developed and maintained REST APIs using Node.js and Express",
      "Designed and implemented database schemas with MongoDB",
      "Created responsive frontend interfaces using React and Redux"
    ]
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "Digital Creations",
    period: "2016 - 2018",
    current: false,
    responsibilities: [
      "Built client websites using HTML, CSS, and JavaScript",
      "Implemented responsive designs and cross-browser compatibility",
      "Worked with PHP and MySQL for backend functionality"
    ]
  }
];

export const skills: Skill[] = [
  { name: "JavaScript/TypeScript", percentage: 95 },
  { name: "React & React Native", percentage: 90 },
  { name: "Node.js/Express", percentage: 85 },
  { name: "GraphQL", percentage: 80 },
  { name: "AI Integration", percentage: 75 }
];

export const tools: Tool[] = [
  { name: "VS Code", icon: "Code" },
  { name: "AWS", icon: "Server" },
  { name: "Docker", icon: "Box" },
  { name: "Git/GitHub", icon: "GitBranch" },
  { name: "MongoDB", icon: "Database" },
  { name: "OpenAI", icon: "BrainCircuit" }
];

export const education: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    period: "2012 - 2016",
    description: "Specialized in software engineering with focus on web technologies and application development. Graduated with honors and received the Outstanding Student Award."
  },
  {
    id: 2,
    degree: "Advanced Web Development Certification",
    institution: "Tech Academy Online",
    period: "2020",
    description: "Comprehensive program covering modern JavaScript frameworks, server-side development, and deployment strategies for web applications."
  },
  {
    id: 3,
    degree: "AI & Machine Learning for Developers",
    institution: "AI Institute",
    period: "2022",
    description: "Specialized training on integrating AI capabilities into web applications, including natural language processing, computer vision, and predictive analytics."
  }
];

export const featuredProjects: Project[] = [
  {
    id: 1,
    title: "AI Content Generator",
    description: "A web application that generates content using AI models. Built with React, Node.js, and OpenAI API integration.",
    tags: ["React", "Node.js", "OpenAI"],
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
    demoUrl: "https://ai-generator-demo.netlify.app",
    githubUrl: "https://github.com/joshuakessell/ai-content-generator",
    featured: true,
    aiProject: true
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A fully functional e-commerce platform with user authentication, product listing, cart functionality, and payment processing.",
    tags: ["React", "Express", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=400&fit=crop",
    demoUrl: "https://ecommerce-platform-demo.netlify.app",
    githubUrl: "https://github.com/joshuakessell/ecommerce-platform",
    featured: true,
    aiProject: false
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A productivity app for managing tasks and projects with real-time collaboration features and priority scheduling.",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    imageUrl: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=400&fit=crop",
    demoUrl: "https://task-management-demo.netlify.app",
    githubUrl: "https://github.com/joshuakessell/task-management-app",
    featured: true,
    aiProject: false
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of AI in Modern Web Development",
    excerpt: "Exploring how artificial intelligence is transforming the way we build, deploy, and optimize web applications for better user experiences.",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=400&fit=crop",
    category: "AI & Development",
    date: "2023-05-15",
    featured: true
  },
  {
    id: 2,
    title: "10 Proven Strategies for Optimizing React Performance",
    excerpt: "Practical techniques to significantly improve the performance of your React applications, from code splitting to memoization and beyond.",
    imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=400&fit=crop",
    category: "React",
    date: "2023-04-22",
    featured: false
  },
  {
    id: 3,
    title: "Modern CSS Techniques Every Developer Should Know",
    excerpt: "From CSS Grid to Custom Properties and Container Queries, discover the powerful features that are revolutionizing web layout and design.",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    category: "CSS",
    date: "2023-03-10",
    featured: false
  }
];
