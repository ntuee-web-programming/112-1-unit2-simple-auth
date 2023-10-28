import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: "./.env" });

const envSchema = z.object({
  PORT: z.string().default("4000"),
  POSTGRES_URL: z.string().url(),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = {
  PORT: process.env.PORT!,
  POSTGRES_URL: process.env.POSTGRES_URL!,
};

envSchema.parse(env);
