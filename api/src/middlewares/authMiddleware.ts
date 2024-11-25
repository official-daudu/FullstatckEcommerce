import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { object } from "zod";

export function VerifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }
  try {
    //decode jwt token data
    const decoded = jwt.verify(token, "your-secret");
    if (typeof decoded !== "object" || !decoded?.userId) {
      res.status(200).json({ error: "Access denied" });
    }
    //@ts-ignore
    req.userId = decoded.userId;
    //@ts-ignore
    req.role = decoded.role;
    next();
  } catch (e) {
    res.status(200).json({ error: "Access denied" });
  }
}

export function VerifySeller(req: Request, res: Response, next: NextFunction) {
  const role = req.role;

  if (role !== "seller") {
    res.status(401).json({ error: "Access denied" });
    return;
  }
  next();
}
