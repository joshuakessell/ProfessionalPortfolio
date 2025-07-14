import { 
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // Contact message methods (read-only static data)
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessageById(id: number): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: number): Promise<ContactMessage | undefined>;
}

export class MemStorage implements IStorage {
  private messages: Map<number, ContactMessage>;
  private messageCurrentId: number;

  constructor() {
    this.messages = new Map();
    this.messageCurrentId = 1;
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
    const now = new Date();
    const message: ContactMessage = { 
      ...insertMessage, 
      id,
      createdAt: now,
      updatedAt: now,
      read: false,
      response: null,
      respondedAt: null
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