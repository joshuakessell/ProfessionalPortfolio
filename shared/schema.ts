import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact messages table (static data only)
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  response: text("response"),
  respondedAt: timestamp("responded_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Insert schemas for form validation
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  read: true,
  response: true,
  respondedAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters").regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, apostrophes, and hyphens"),
  email: z.string().email("Invalid email address").max(254, "Email must be under 254 characters"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200, "Subject must be under 200 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message must be under 5000 characters"),
});

// Types
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;