import { Request, Response, NextFunction } from "express";

export const taskMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in middleware");
};
