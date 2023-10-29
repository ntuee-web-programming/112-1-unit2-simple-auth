import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Step 10: Create userAuth middleware
// A middleware is a function that runs before the controller
// We can use it to check if the user is authenticated and protect certain routes
export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // User send the token in the authorization header
    if (!req?.headers?.authorization) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }
    // The authorization field is in the format: "Bearer <token>"
    // So we split the string and get the token
    const token = req?.headers?.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    // Take a look at the content of verified
    console.log("verified", verified);

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};
