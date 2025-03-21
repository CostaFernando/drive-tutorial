import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/server/db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
