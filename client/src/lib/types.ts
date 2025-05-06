// Resume Types
export interface ResumeTab {
  id: string;
  label: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  current: boolean;
  responsibilities: string[];
}

export interface Skill {
  name: string;
  percentage?: number;
}

export interface Tool {
  name: string;
  icon: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  current?: boolean;
}

// Project Types
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  aiProject: boolean;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
}

// Blog Types
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  featured: boolean;
  content?: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  privacy: boolean;
}

// AI Feature Types
export interface AIFeature {
  title: string;
  description: string;
  icon: string;
  example: string;
}

// Theme Types
export type Theme = "dark" | "light" | "system";
