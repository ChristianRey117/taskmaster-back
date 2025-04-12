import { Request } from "express";
import jwt from "jsonwebtoken";
import { AuthPayload } from "middleware/authMiddleware";

export const idUserHandler = (req: Request): AuthPayload | null => {
  const authHeader = req.headers["authorization"];
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, "JWT_SECRET") as AuthPayload;
      return decoded;
    }
    return null;
  }
  return null;
};
