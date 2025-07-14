import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { getGitHubRepos } from "./github";
import { generateContent } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // GitHub repos endpoint
  app.get("/api/github/repos", async (_req, res) => {
    try {
      const repos = await getGitHubRepos();
      res.json(repos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch GitHub repositories" });
    }
  });

  // AI content generation endpoint
  app.post("/api/ai/generate", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ message: "Prompt is required" });
      }
      
      const content = await generateContent(prompt);
      res.json({ content });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate content" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ message: "Message sent successfully", id: message.id });
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

  // Get contact messages (read-only, no authentication required)
  app.get("/api/contact", async (_req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Contact messages error:", error);
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}