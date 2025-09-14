import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.development.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  schema: [
    // "./src/db/schema/schema.ts",
    "./src/db/schema/auth.schema.ts",
  ],
  out: ".src/db/migrations",
  dialect: "postgresql",
  // strict: true,
  // verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL,
    // password: env.DB_PASSWORD!,
    // user: env.DB_USER!,
    // database: env.DB_NAME!,
    // host: env.DB_HOST!,
    // ssl: false,
  },
});
