import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { getGitHubRepos } from "./github";
import { generateContent } from "./openai";
import { signUp, signIn, getProfile, updateProfile, initializeRoles } from "./cognito";
import jwt from "jsonwebtoken";
// Import types
import "./types";

// Type for decoded JWT token
interface DecodedToken {
  sub: string;
  email: string;
  username?: string;
  "cognito:groups"?: string[];
  exp: number;
}

// Auth middleware to verify JWT token
async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify the token (in a real app, you should verify the signature with AWS Cognito)
    try {
      // Simple verification just to parse the token
      const decoded = jwt.decode(token) as DecodedToken;
      
      if (!decoded || !decoded.sub) {
        return res.status(401).json({ message: "Invalid token" });
      }
      
      // Check if token is expired
      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        return res.status(401).json({ message: "Token expired" });
      }

      // Add user info to request
      req.user = {
        cognitoId: decoded.sub,
        email: decoded.email,
        username: decoded.username || decoded.email
      };
      
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token verification failed" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Admin middleware to check if user has admin role
async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // First, run the auth middleware
    authMiddleware(req, res, async () => {
      if (!req.user || !req.user.cognitoId) {
        return res.status(401).json({ message: "Authentication required" });
      }

      // Get the user's record from the database
      if (!storage.getUserByCognitoId) {
        return res.status(500).json({ message: "User lookup not available" });
      }
      
      const user = await storage.getUserByCognitoId(req.user.cognitoId);
      if (!user) {
        return res.status(403).json({ message: "User not found" });
      }

      // Get user roles
      if (!storage.getRoles) {
        return res.status(500).json({ message: "Role lookup not available" });
      }
      
      const roles = await storage.getRoles();
      const adminRole = roles.find(role => role.name === "admin");
      
      if (!adminRole || user.roleId !== adminRole.id) {
        return res.status(403).json({ message: "Admin privileges required" });
      }

      // Add the user to the request
      req.user.id = user.id;
      req.user.roleId = user.roleId;
      
      next();
    });
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Initialize user roles
initializeRoles().catch(console.error);

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  
  // User signup
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { username, email, password, firstName, lastName } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required" });
      }
      
      const result = await signUp(username, email, password, firstName, lastName);
      
      if (!result.success) {
        return res.status(400).json({ message: result.error });
      }
      
      res.status(201).json({ message: "User created successfully", user: result.user });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  
  // User login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const result = await signIn(username, password);
      
      if (!result.success) {
        return res.status(401).json({ message: result.error });
      }
      
      res.json({
        message: "Login successful",
        user: result.user,
        token: result.token,
        refreshToken: result.refreshToken
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  });
  
  // Get user profile
  app.get("/api/auth/profile", authMiddleware, async (req, res) => {
    try {
      if (!req.user || !req.user.cognitoId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const result = await getProfile(req.user.cognitoId);
      
      if (!result.success) {
        return res.status(400).json({ message: result.error });
      }
      
      res.json({ user: result.user });
    } catch (error) {
      console.error("Profile error:", error);
      res.status(500).json({ message: "Failed to get user profile" });
    }
  });
  
  // Update user profile
  app.put("/api/auth/profile", authMiddleware, async (req, res) => {
    try {
      if (!req.user || !req.user.cognitoId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      const { firstName, lastName, email } = req.body;
      
      const result = await updateProfile(req.user.cognitoId, {
        firstName,
        lastName,
        email
      });
      
      if (!result.success) {
        return res.status(400).json({ message: result.error });
      }
      
      res.json({ message: "Profile updated successfully", user: result.user });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Failed to update user profile" });
    }
  });
  
  // API routes
  
  // Get blog posts
  app.get("/api/blog/posts", async (_req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  
  // Get single blog post
  app.get("/api/blog/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      const post = await storage.getBlogPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });
  
  // Create blog post (admin only)
  app.post("/api/blog/posts", adminMiddleware, async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Authentication required" });
      }

      // Add author ID to the post
      const postData = { 
        ...req.body,
        authorId: req.user.id
      };
      
      if (!postData.slug) {
        // Generate slug from title
        postData.slug = postData.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
      }
      
      const post = await storage.createBlogPost(postData);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });
  
  // Update blog post (admin only)
  app.put("/api/blog/posts/:id", adminMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      if (!storage.updateBlogPost) {
        return res.status(500).json({ message: "Update functionality not available" });
      }
      
      const post = await storage.getBlogPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      const updatedPost = await storage.updateBlogPost(id, req.body);
      res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });
  
  // Delete blog post (admin only)
  app.delete("/api/blog/posts/:id", adminMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      if (!storage.deleteBlogPost) {
        return res.status(500).json({ message: "Delete functionality not available" });
      }
      
      const post = await storage.getBlogPostById(id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      const deleted = await storage.deleteBlogPost(id);
      if (deleted) {
        res.json({ message: "Blog post deleted successfully" });
      } else {
        res.status(500).json({ message: "Failed to delete blog post" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });
  
  // Project routes
  
  // Get all projects
  app.get("/api/projects", async (_req, res) => {
    try {
      if (!storage.getProjects) {
        return res.status(500).json({ message: "Project functionality not available" });
      }
      
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  
  // Get featured projects
  app.get("/api/projects/featured", async (_req, res) => {
    try {
      if (!storage.getFeaturedProjects) {
        return res.status(500).json({ message: "Project functionality not available" });
      }
      
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });
  
  // Get single project
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      if (!storage.getProjectById) {
        return res.status(500).json({ message: "Project functionality not available" });
      }
      
      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });
  
  // Create project (admin only)
  app.post("/api/projects", adminMiddleware, async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      if (!storage.createProject) {
        return res.status(500).json({ message: "Project functionality not available" });
      }
      
      // Add author ID to the project
      const projectData = { 
        ...req.body,
        authorId: req.user.id,
        tags: req.body.tags || []
      };
      
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to create project" });
    }
  });
  
  // Update project (admin only)
  app.put("/api/projects/:id", adminMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      if (!storage.updateProject || !storage.getProjectById) {
        return res.status(500).json({ message: "Project functionality not available" });
      }
      
      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      const updatedProject = await storage.updateProject(id, req.body);
      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({ message: "Failed to update project" });
    }
  });
  
  // Delete project (admin only)
  app.delete("/api/projects/:id", adminMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      if (!storage.deleteProject || !storage.getProjectById) {
        return res.status(500).json({ message: "Project functionality not available" });
      }
      
      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      const deleted = await storage.deleteProject(id);
      if (deleted) {
        res.json({ message: "Project deleted successfully" });
      } else {
        res.status(500).json({ message: "Failed to delete project" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });
  
  // Get GitHub repositories
  app.get("/api/github/repos", async (_req, res) => {
    try {
      const repos = await getGitHubRepos();
      res.json(repos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch GitHub repositories" });
    }
  });
  
  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Save contact message
      const message = await storage.createContactMessage(validatedData);
      
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  
  // Comment routes
  
  // Get comments for a blog post
  app.get("/api/blog/posts/:postId/comments", async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      if (!storage.getCommentsByBlogPostId) {
        return res.status(500).json({ message: "Comments functionality not available" });
      }
      
      const comments = await storage.getCommentsByBlogPostId(postId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });
  
  // Get comments for a project
  app.get("/api/projects/:projectId/comments", async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      if (!storage.getCommentsByProjectId) {
        return res.status(500).json({ message: "Comments functionality not available" });
      }
      
      const comments = await storage.getCommentsByProjectId(projectId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });
  
  // Get comment replies
  app.get("/api/comments/:commentId/replies", async (req, res) => {
    try {
      const commentId = parseInt(req.params.commentId);
      if (isNaN(commentId)) {
        return res.status(400).json({ message: "Invalid comment ID" });
      }
      
      if (!storage.getCommentReplies) {
        return res.status(500).json({ message: "Comments functionality not available" });
      }
      
      const replies = await storage.getCommentReplies(commentId);
      res.json(replies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comment replies" });
    }
  });
  
  // Add comment to blog post (authenticated)
  app.post("/api/blog/posts/:postId/comments", authMiddleware, async (req, res) => {
    try {
      const postId = parseInt(req.params.postId);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }
      
      if (!req.user || !req.user.cognitoId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      if (!storage.createComment || !storage.getUserByCognitoId) {
        return res.status(500).json({ message: "Comments functionality not available" });
      }
      
      // Get the user from the database
      const user = await storage.getUserByCognitoId(req.user.cognitoId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { content, parentId } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: "Comment content is required" });
      }
      
      const comment = await storage.createComment({
        content,
        authorId: user.id,
        blogPostId: postId,
        parentId: parentId || null,
        status: "published"
      });
      
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Failed to create comment" });
    }
  });
  
  // Add comment to project (authenticated)
  app.post("/api/projects/:projectId/comments", authMiddleware, async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      if (!req.user || !req.user.cognitoId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      if (!storage.createComment || !storage.getUserByCognitoId) {
        return res.status(500).json({ message: "Comments functionality not available" });
      }
      
      // Get the user from the database
      const user = await storage.getUserByCognitoId(req.user.cognitoId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { content, parentId } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: "Comment content is required" });
      }
      
      const comment = await storage.createComment({
        content,
        authorId: user.id,
        projectId,
        parentId: parentId || null,
        status: "published"
      });
      
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Failed to create comment" });
    }
  });
  
  // Update comment (owner or admin)
  app.put("/api/comments/:commentId", authMiddleware, async (req, res) => {
    try {
      const commentId = parseInt(req.params.commentId);
      if (isNaN(commentId)) {
        return res.status(400).json({ message: "Invalid comment ID" });
      }
      
      if (!req.user || !req.user.cognitoId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      if (!storage.getCommentById || !storage.updateComment || !storage.getUserByCognitoId) {
        return res.status(500).json({ message: "Comments functionality not available" });
      }
      
      // Get the comment
      const comment = await storage.getCommentById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      
      // Get the user from the database
      const user = await storage.getUserByCognitoId(req.user.cognitoId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check if the user is the comment author or an admin
      if (comment.authorId !== user.id) {
        // If not the author, check if admin
        if (!storage.getRoles) {
          return res.status(403).json({ message: "Not authorized to update this comment" });
        }
        
        const roles = await storage.getRoles();
        const adminRole = roles.find(role => role.name === "admin");
        
        if (!adminRole || user.roleId !== adminRole.id) {
          return res.status(403).json({ message: "Not authorized to update this comment" });
        }
      }
      
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ message: "Comment content is required" });
      }
      
      const updatedComment = await storage.updateComment(commentId, { content });
      res.json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update comment" });
    }
  });
  
  // Delete comment (owner or admin)
  app.delete("/api/comments/:commentId", authMiddleware, async (req, res) => {
    try {
      const commentId = parseInt(req.params.commentId);
      if (isNaN(commentId)) {
        return res.status(400).json({ message: "Invalid comment ID" });
      }
      
      if (!req.user || !req.user.cognitoId) {
        return res.status(401).json({ message: "Authentication required" });
      }
      
      if (!storage.getCommentById || !storage.deleteComment || !storage.getUserByCognitoId) {
        return res.status(500).json({ message: "Comments functionality not available" });
      }
      
      // Get the comment
      const comment = await storage.getCommentById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      
      // Get the user from the database
      const user = await storage.getUserByCognitoId(req.user.cognitoId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Check if the user is the comment author or an admin
      if (comment.authorId !== user.id) {
        // If not the author, check if admin
        if (!storage.getRoles) {
          return res.status(403).json({ message: "Not authorized to delete this comment" });
        }
        
        const roles = await storage.getRoles();
        const adminRole = roles.find(role => role.name === "admin");
        
        if (!adminRole || user.roleId !== adminRole.id) {
          return res.status(403).json({ message: "Not authorized to delete this comment" });
        }
      }
      
      const deleted = await storage.deleteComment(commentId);
      if (deleted) {
        res.json({ message: "Comment deleted successfully" });
      } else {
        res.status(500).json({ message: "Failed to delete comment" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to delete comment" });
    }
  });
  
  // Generate AI content
  app.post("/api/ai/generate", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ message: "Valid prompt is required" });
      }
      
      const content = await generateContent(prompt);
      
      res.json({ content });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate content" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
