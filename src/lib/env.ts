import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    TG_API_TOKEN: z.string(),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_TG_APP_URL: z.string().url(),
  },
  runtimeEnv: process.env,
  // Run scripts without validation in development if needed
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  // Treat empty strings as undefined
  emptyStringAsUndefined: true,
}); 