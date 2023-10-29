import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: "./.env" });

const envSchema = z.object({
  PORT: z.string().default("4000"),
  POSTGRES_URL: z.string().url(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = {
  PORT: process.env.PORT!,
  POSTGRES_URL: process.env.POSTGRES_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
};

envSchema.parse(env);
