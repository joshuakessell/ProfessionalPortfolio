import { 
  users, type User, type InsertUser,
  blogPosts, type BlogPost, type InsertBlogPost,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog post methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Contact message methods
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessageById(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: number): Promise<ContactMessage | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, BlogPost>;
  private messages: Map<number, ContactMessage>;
  private userCurrentId: number;
  private postCurrentId: number;
  private messageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.messages = new Map();
    this.userCurrentId = 1;
    this.postCurrentId = 1;
    this.messageCurrentId = 1;
    
    // Initialize with some sample data
    this.initSampleData();
  }
  
  // Initialize with sample data
  private initSampleData() {
    // Sample blog posts
    const samplePosts: InsertBlogPost[] = [
      {
        title: "The Future of AI in Modern Web Development",
        excerpt: "Exploring how artificial intelligence is transforming the way we build, deploy, and optimize web applications for better user experiences.",
        content: "Artificial intelligence has become an integral part of modern web development...",
        imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=400&fit=crop",
        category: "AI & Development",
        featured: true,
        authorId: null,
      },
      {
        title: "10 Proven Strategies for Optimizing React Performance",
        excerpt: "Practical techniques to significantly improve the performance of your React applications, from code splitting to memoization and beyond.",
        content: "Performance optimization is crucial for providing a smooth user experience in React applications...",
        imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=400&fit=crop",
        category: "React",
        featured: false,
        authorId: null,
      },
      {
        title: "Modern CSS Techniques Every Developer Should Know",
        excerpt: "From CSS Grid to Custom Properties and Container Queries, discover the powerful features that are revolutionizing web layout and design.",
        content: "The landscape of CSS has evolved dramatically in recent years...",
        imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
        category: "CSS",
        featured: false,
        authorId: null,
      }
    ];
    
    // Add sample posts to storage
    for (const post of samplePosts) {
      this.createBlogPost(post);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.posts.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.posts.get(id);
  }
  
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.postCurrentId++;
    const post: BlogPost = { 
      ...insertPost, 
      id, 
      date: new Date() 
    };
    this.posts.set(id, post);
    return post;
  }
  
  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.messages.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
  
  async getContactMessageById(id: number): Promise<ContactMessage | undefined> {
    return this.messages.get(id);
  }
  
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageCurrentId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      date: new Date(),
      read: false
    };
    this.messages.set(id, message);
    return message;
  }
  
  async markMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const message = this.messages.get(id);
    if (message) {
      const updatedMessage: ContactMessage = { ...message, read: true };
      this.messages.set(id, updatedMessage);
      return updatedMessage;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
