import { ResumeTab, Experience, Skill, Tool, Education, Project, BlogPost } from "./types";

export const resumeTabs: ResumeTab[] = [
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills & Tools" },
  { id: "education", label: "Education" }
];

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Walmart Global Tech",
    period: "May 2023 - Present",
    current: true,
    responsibilities: [
      "Lead developer for eCommerce platform used by millions of customers worldwide",
      "Implementing microservice architecture with Node.js, React, and AWS",
      "Optimizing application performance and scalability for high-traffic retail solutions",
      "Collaborating with cross-functional teams to deliver exceptional customer experiences"
    ]
  },
  {
    id: 2,
    title: "Tech Lead",
    company: "IBM",
    period: "November 2020 - May 2023",
    current: false,
    responsibilities: [
      "Led teams of 5-8 developers in delivering enterprise-grade applications for Fortune 500 clients",
      "Architected scalable cloud solutions using IBM Cloud, Kubernetes, and microservices",
      "Implemented DevOps practices including CI/CD pipelines and automated testing",
      "Mentored junior developers and conducted regular code reviews and technical training"
    ]
  },
  {
    id: 3,
    title: "Software Developer",
    company: "Cognizant",
    period: "June 2018 - November 2020",
    current: false,
    responsibilities: [
      "Developed full-stack applications using Java Spring Boot, Angular, and SQL databases",
      "Integrated third-party APIs and services for financial and healthcare clients",
      "Created responsive web interfaces using modern CSS frameworks and JavaScript",
      "Participated in Agile development processes with daily standups and sprint planning"
    ]
  },
  {
    id: 4,
    title: "Associate Developer",
    company: "Accenture",
    period: "August 2016 - June 2018",
    current: false,
    responsibilities: [
      "Built and maintained web applications for enterprise clients using Java and JavaScript",
      "Collaborated with UX designers to implement responsive user interfaces",
      "Performed bug fixes and implemented feature enhancements for legacy systems",
      "Assisted with database design and optimization using SQL Server and Oracle"
    ]
  }
];

export const skills: Skill[] = [
  { name: "JavaScript/TypeScript", percentage: 95 },
  { name: "Java", percentage: 90 },
  { name: "React", percentage: 90 },
  { name: "Node.js/Express", percentage: 85 },
  { name: "Spring Boot", percentage: 85 },
  { name: "AWS/Cloud Architecture", percentage: 82 },
  { name: "Microservices", percentage: 80 },
  { name: "GraphQL", percentage: 75 },
  { name: "AI/ML Integration", percentage: 70 }
];

export const tools: Tool[] = [
  { name: "AWS", icon: "Server" },
  { name: "Kubernetes", icon: "Box" },
  { name: "Docker", icon: "Box" },
  { name: "Git/GitHub", icon: "GitBranch" },
  { name: "SQL & NoSQL", icon: "Database" },
  { name: "CI/CD", icon: "Code" },
  { name: "Azure DevOps", icon: "Server" },
  { name: "OpenAI", icon: "BrainCircuit" }
];

export const education: Education[] = [
  {
    id: 1,
    degree: "Master of Science in Computer Engineering",
    institution: "Georgia Institute of Technology",
    period: "2014 - 2016",
    description: "Specialized in distributed systems and cloud computing with focus on scalable architecture. Graduated with a 3.8 GPA and received the Outstanding Research Award for cloud optimization."
  },
  {
    id: 2,
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Illinois Urbana-Champaign",
    period: "2010 - 2014",
    description: "Focused on software engineering and data structures. Participated in ACM programming competitions and senior capstone project developing a healthcare management system."
  },
  {
    id: 3,
    degree: "AWS Solutions Architect - Professional",
    institution: "Amazon Web Services",
    period: "2022",
    description: "Advanced certification for designing distributed systems on AWS, including security best practices, high-availability architectures, and cost optimization strategies."
  },
  {
    id: 4,
    degree: "IBM Cloud Professional Architect",
    institution: "IBM",
    period: "2021",
    description: "Professional certification covering IBM Cloud architecture, hybrid cloud solutions, and enterprise application modernization strategies."
  }
];

export const featuredProjects: Project[] = [
  {
    id: 1,
    title: "Retail Companion AI",
    description: "An AI-powered retail assistant that helps customers find products, get recommendations, and navigate store layouts using natural language processing and computer vision.",
    tags: ["React", "Node.js", "OpenAI", "AWS"],
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
    demoUrl: "https://retail-companion-demo.walmart.tech",
    githubUrl: "https://github.com/joshuakessell/retail-companion-ai",
    featured: true,
    aiProject: true
  },
  {
    id: 2,
    title: "Enterprise Microservices Framework",
    description: "A comprehensive microservices architecture template for enterprise applications, featuring service discovery, API gateway, circuit breakers, and distributed tracing.",
    tags: ["Java", "Spring Boot", "Kubernetes", "Docker"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    demoUrl: "https://microservices-demo.ibm.com",
    githubUrl: "https://github.com/joshuakessell/enterprise-microservices",
    featured: true,
    aiProject: false
  },
  {
    id: 3,
    title: "Cloud Cost Optimizer",
    description: "An intelligent resource management tool that analyzes cloud usage patterns and provides recommendations for cost optimization across AWS, Azure, and GCP environments.",
    tags: ["Python", "React", "AWS", "Terraform"],
    imageUrl: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=400&fit=crop",
    demoUrl: "https://cloud-optimizer.joshuakessell.com",
    githubUrl: "https://github.com/joshuakessell/cloud-cost-optimizer",
    featured: true,
    aiProject: true
  },
  {
    id: 4,
    title: "Distributed Event Processing Platform",
    description: "A high-throughput event processing system capable of handling millions of events per second with guaranteed delivery, idempotency, and real-time analytics.",
    tags: ["Kafka", "Java", "Elasticsearch", "Redis"],
    imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=400&fit=crop",
    demoUrl: "https://event-platform-demo.cognizant.com",
    githubUrl: "https://github.com/joshuakessell/distributed-event-platform",
    featured: true,
    aiProject: false
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Scaling Microservices at Walmart: Lessons Learned",
    excerpt: "How we scaled our microservices architecture to handle millions of concurrent users during peak retail events like Black Friday and Cyber Monday.",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=400&fit=crop",
    category: "Architecture",
    date: "2024-03-15",
    featured: true
  },
  {
    id: 2,
    title: "Implementing AI-Powered Product Recommendations in Retail",
    excerpt: "A deep dive into how we built and deployed machine learning models that increased conversion rates by 35% through personalized product recommendations.",
    imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=400&fit=crop",
    category: "AI & ML",
    date: "2024-01-22",
    featured: true
  },
  {
    id: 3,
    title: "Cloud Cost Optimization: How We Reduced Our AWS Bill by 40%",
    excerpt: "Practical strategies we implemented at IBM to identify inefficiencies, optimize resource utilization, and dramatically reduce cloud infrastructure costs.",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    category: "Cloud",
    date: "2023-11-10",
    featured: false
  },
  {
    id: 4,
    title: "Building Event-Driven Architectures with Kafka and Spring Boot",
    excerpt: "A comprehensive guide to designing and implementing scalable event-driven systems that handle high-throughput data processing requirements.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    category: "Java",
    date: "2023-08-05",
    featured: false
  },
  {
    id: 5,
    title: "DevOps Transformation: From Quarterly to Daily Deployments",
    excerpt: "How our team at Cognizant transformed our deployment pipeline, automated testing, and embraced DevOps culture to achieve continuous delivery.",
    imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop",
    category: "DevOps",
    date: "2023-05-17",
    featured: false
  }
];
