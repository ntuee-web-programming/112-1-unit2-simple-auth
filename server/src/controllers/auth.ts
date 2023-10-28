import { db } from "../db";
import { usersTable } from "../db/schema";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "@package/types/api";
import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";

export const signUp = async (
  req: Request<never, never, SignUpRequest>,
  res: Response<SignUpResponse | { error: string }>,
) => {
  try {
    const { email, password, name } = req.body;
    console.log("[signUp]");
    console.log("email", email);
    console.log("name", name);
    console.log("password", password);

    // Check if user already exists
    const [exist] = await db
      .select({ dummy: sql`1` })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .execute();
    if (exist) {
      console.log("User already exists");
      return res.status(400).json({ error: "User already exists" });
    }

    // Create user
    const [user] = await db
      .insert(usersTable)
      .values({
        name,
        email,
        hashedPassword: password,
      })
      .returning();
    return res.status(200).json({
      user: {
        id: user.displayId,
        name: user.name,
        email: user.email,
      },
      token: "token",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signIn = async (
  req: Request<never, never, SignInRequest>,
  res: Response<SignInResponse | { error: string }>,
) => {
  try {
    const { email, password } = req.body;
    console.log("[signIn]");
    console.log("email", email);
    console.log("password", password);

    // Find user

    const [user] = await db
      .select({
        id: usersTable.displayId,
        name: usersTable.name,
        email: usersTable.email,
        hashedPassword: usersTable.hashedPassword,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .execute();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.hashedPassword !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: "token",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
