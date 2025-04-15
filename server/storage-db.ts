import { 
  users, type User, type InsertUser,
  blogPosts, type BlogPost, type InsertBlogPost,
  contactMessages, type ContactMessage, type InsertContactMessage,
  projects, type Project, type InsertProject,
  comments, type Comment, type InsertComment,
  userRoles
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, isNull } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByCognitoId(cognitoId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.cognitoId, cognitoId));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  // Blog post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }

  async updateBlogPost(id: number, updateData: Partial<BlogPost>): Promise<BlogPost | undefined> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const [deletedPost] = await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, id))
      .returning();
    return !!deletedPost;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(desc(projects.createdAt));
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async updateProject(id: number, updateData: Partial<Project>): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    const [deletedProject] = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();
    return !!deletedProject;
  }

  // Comment methods
  async getCommentsByBlogPostId(blogPostId: number): Promise<Comment[]> {
    return await db
      .select()
      .from(comments)
      .where(
        and(
          eq(comments.blogPostId, blogPostId),
          isNull(comments.parentId),
          eq(comments.status, "published")
        )
      )
      .orderBy(desc(comments.createdAt));
  }

  async getCommentsByProjectId(projectId: number): Promise<Comment[]> {
    return await db
      .select()
      .from(comments)
      .where(
        and(
          eq(comments.projectId, projectId),
          isNull(comments.parentId),
          eq(comments.status, "published")
        )
      )
      .orderBy(desc(comments.createdAt));
  }

  async getCommentById(id: number): Promise<Comment | undefined> {
    const [comment] = await db.select().from(comments).where(eq(comments.id, id));
    return comment;
  }

  async getCommentReplies(parentId: number): Promise<Comment[]> {
    return await db
      .select()
      .from(comments)
      .where(
        and(
          eq(comments.parentId, parentId),
          eq(comments.status, "published")
        )
      )
      .orderBy(desc(comments.createdAt));
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const [comment] = await db.insert(comments).values(insertComment).returning();
    return comment;
  }

  async updateComment(id: number, updateData: Partial<Comment>): Promise<Comment | undefined> {
    const [updatedComment] = await db
      .update(comments)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(comments.id, id))
      .returning();
    return updatedComment;
  }

  async deleteComment(id: number): Promise<boolean> {
    // Soft delete by changing status
    const [updatedComment] = await db
      .update(comments)
      .set({ status: "deleted", updatedAt: new Date() })
      .where(eq(comments.id, id))
      .returning();
    return !!updatedComment;
  }

  // Contact message methods
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async getContactMessageById(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }

  async markMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const [updatedMessage] = await db
      .update(contactMessages)
      .set({ read: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return updatedMessage;
  }

  async respondToMessage(
    id: number, 
    response: string
  ): Promise<ContactMessage | undefined> {
    const [updatedMessage] = await db
      .update(contactMessages)
      .set({ 
        responseContent: response,
        responseDate: new Date(),
        read: true
      })
      .where(eq(contactMessages.id, id))
      .returning();
    return updatedMessage;
  }

  // Role methods
  async getRoles(): Promise<typeof userRoles.$inferSelect[]> {
    return await db.select().from(userRoles);
  }

  async initRoles(): Promise<void> {
    const existingRoles = await this.getRoles();
    
    if (existingRoles.length === 0) {
      // If no roles exist, create default ones
      await db.insert(userRoles).values([
        { name: "admin", description: "Administrator with full access" },
        { name: "user", description: "Regular user with comment permissions" }
      ]);
    }
  }
}

export const dbStorage = new DatabaseStorage();