import { Request } from "express";

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        cognitoId: string;
        email: string;
        username: string;
        id?: number;
        roleId?: number;
      };
    }
  }
}