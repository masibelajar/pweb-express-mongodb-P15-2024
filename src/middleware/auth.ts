import formatResponse from "@/format/formatResponse";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("No token provided");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new Error("Invalid token");
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      const response = formatResponse("failed", "Invalid token");
      res.status(401).json(response);
    } else {
      console.log(error);
      const response = formatResponse("error", error.message);
      res.status(401).json(response);
    }
  }
};