import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/server/db";
import { nextCookies } from "better-auth/next-js";
import { env } from "~/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  advanced: {
    useSecureCookies: true,
    cookiePrefix: "better-auth",
    cookieName: "session_token",
  },
  plugins: [nextCookies()],
});
