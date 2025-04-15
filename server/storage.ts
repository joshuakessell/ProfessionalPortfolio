import { 
  users, type User, type InsertUser,
  blogPosts, type BlogPost, type InsertBlogPost,
  projects, type Project, type InsertProject,
  comments, type Comment, type InsertComment,
  contactMessages, type ContactMessage, type InsertContactMessage,
  userRoles, type UserRole
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByCognitoId?(cognitoId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser?(id: number, updateData: Partial<User>): Promise<User | undefined>;
  
  // Blog post methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug?(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost?(id: number, updateData: Partial<BlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost?(id: number): Promise<boolean>;
  
  // Project methods
  getProjects?(): Promise<Project[]>;
  getFeaturedProjects?(): Promise<Project[]>;
  getProjectById?(id: number): Promise<Project | undefined>;
  createProject?(project: InsertProject): Promise<Project>;
  updateProject?(id: number, updateData: Partial<Project>): Promise<Project | undefined>;
  deleteProject?(id: number): Promise<boolean>;
  
  // Comment methods
  getCommentsByBlogPostId?(blogPostId: number): Promise<Comment[]>;
  getCommentsByProjectId?(projectId: number): Promise<Comment[]>;
  getCommentById?(id: number): Promise<Comment | undefined>;
  getCommentReplies?(parentId: number): Promise<Comment[]>;
  createComment?(comment: InsertComment): Promise<Comment>;
  updateComment?(id: number, updateData: Partial<Comment>): Promise<Comment | undefined>;
  deleteComment?(id: number): Promise<boolean>;
  
  // Contact message methods
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessageById(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: number): Promise<ContactMessage | undefined>;
  respondToMessage?(id: number, response: string): Promise<ContactMessage | undefined>;
  
  // Role methods
  getRoles?(): Promise<UserRole[]>;
  initRoles?(): Promise<void>;
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
    // First create default admin user
    const adminUser: InsertUser = {
      cognitoId: "demo-admin-id",
      email: "admin@example.com",
      username: "admin",
      firstName: "Admin",
      lastName: "User",
      roleId: 1, // Admin role
      socialProviders: []
    };
    
    const userId = this.createUser(adminUser).then(user => {
      // After creating user, create sample blog posts
      const samplePosts: InsertBlogPost[] = [
        {
          title: "The Future of AI in Modern Web Development",
          excerpt: "Exploring how artificial intelligence is transforming the way we build, deploy, and optimize web applications for better user experiences.",
          content: "Artificial intelligence has become an integral part of modern web development...",
          imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=400&fit=crop",
          category: "AI & Development",
          featured: true,
          authorId: user.id,
          slug: "the-future-of-ai-in-modern-web-development",
          status: "published"
        },
        {
          title: "10 Proven Strategies for Optimizing React Performance",
          excerpt: "Practical techniques to significantly improve the performance of your React applications, from code splitting to memoization and beyond.",
          content: "Performance optimization is crucial for providing a smooth user experience in React applications...",
          imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=400&fit=crop",
          category: "React",
          featured: false,
          authorId: user.id,
          slug: "10-proven-strategies-for-optimizing-react-performance",
          status: "published"
        },
        {
          title: "Modern CSS Techniques Every Developer Should Know",
          excerpt: "From CSS Grid to Custom Properties and Container Queries, discover the powerful features that are revolutionizing web layout and design.",
          content: "The landscape of CSS has evolved dramatically in recent years...",
          imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
          category: "CSS",
          featured: false,
          authorId: user.id,
          slug: "modern-css-techniques-every-developer-should-know",
          status: "published"
        }
      ];
      
      // Add sample posts to storage
      for (const post of samplePosts) {
        this.createBlogPost(post);
      }
    });
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
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: now,
      updatedAt: now,
      lastLogin: null,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      avatarUrl: insertUser.avatarUrl || null,
      socialProviders: insertUser.socialProviders || []
    };
    this.users.set(id, user);
    return user;
  }
  
  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.posts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.posts.get(id);
  }
  
  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.postCurrentId++;
    const now = new Date();
    const post: BlogPost = { 
      ...insertPost, 
      id,
      createdAt: now,
      updatedAt: now,
      authorId: insertPost.authorId,
      status: insertPost.status || "draft",
      slug: insertPost.slug || `post-${id}`
    };
    this.posts.set(id, post);
    return post;
  }
  
  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.messages.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
      createdAt: new Date(),
      read: false,
      responseDate: null,
      responseContent: null
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

// Import the database storage
import { dbStorage } from "./storage-db";

// Export the database storage for use in the application
export const storage = dbStorage;
