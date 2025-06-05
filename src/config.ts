import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  CRYPTO_KEY: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRED: z.coerce.number().default(60000),

  // Database Environment
  MONGO_URI: z.string().url(),
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("⚠️ Invalid or missing environment key: ", _env.error.format());
  process.exit(1);
}

export const env = {
  // Node Environment
  NODE_ENV: _env.data.NODE_ENV,
  PORT: _env.data.PORT,
  CRYPTO_KEY: _env.data.CRYPTO_KEY,
  JWT_SECRET: _env.data.JWT_SECRET,
  JWT_EXPIRED: _env.data.JWT_EXPIRED,

  // Database Environments
  MONGO_URI: _env.data.MONGO_URI,
};

export type Env = typeof env;
