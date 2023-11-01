import { db } from "../db";
import { usersTable } from "../db/schema";
import { env } from "../utils/env";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "@package/types/api";
import bcrypt from "bcrypt";
import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

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

    // Hash password
    // We use bcrypt to hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // We can take a look at the hashed password
    console.log("password", password);
    console.log("hashedPassword", hashedPassword);

    // Create user
    const [user] = await db
      .insert(usersTable)
      .values({
        name,
        email,
        // We store the hashed password in the database, so that even if the database is compromised,
        // the attacker will not be able to see the password
        // It is important to never store the password in plain text
        hashedPassword: hashedPassword,
      })
      .returning();

    // Create json web token
    // We use jwt to create a json web token
    const token = jwt.sign(
      {
        userId: user.displayId,
      },
      env.JWT_SECRET, // JWT_SECRET is a secret string that only the server knows and should be regularly updated
      {
        expiresIn: env.JWT_EXPIRES_IN, // JWT_EXPIRES_IN is the duration of the token
      },
    );
    // We can take a look at the token
    console.log("token", token);
    // The userId is contained in the token, but without the secret,
    // others cannot decode and see the information inside the token
    // Also, others cannot forge a token without the secret

    return res.status(200).json({
      user: {
        id: user.displayId,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
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

    // Compare password
    // We use bcrypt to compare the password since the password in DB is hashed
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Create json web token
    // Same as signUp
    const token = jwt.sign(
      {
        userId: user.id,
      },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRES_IN,
      },
    );

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
