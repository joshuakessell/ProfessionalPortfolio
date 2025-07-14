import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { getGitHubRepos } from "./github";
import { generateContent } from "./openai";
import rateLimit from "express-rate-limit";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rate limiter for AI endpoint to prevent abuse and cost overruns
  const aiRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
      message: "Too many AI requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // GitHub repos endpoint
  app.get("/api/github/repos", async (_req, res) => {
    try {
      const repos = await getGitHubRepos();
      res.json(repos);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch GitHub repositories" });
    }
  });

  // AI content generation endpoint with rate limiting
  app.post("/api/ai/generate", aiRateLimit, async (req, res) => {
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

  // Removed GET /api/contact endpoint - exposed sensitive personal data without authentication
  // Contact messages are now stored securely and only accessible through proper admin channels

  const httpServer = createServer(app);
  return httpServer;
}