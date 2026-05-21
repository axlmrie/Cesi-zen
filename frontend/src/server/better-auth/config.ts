import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { db } from "@/server/db";

const appBaseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
const mobileHost = process.env.MOBILE_DEV_HOST ?? "172.20.10.2";

export const auth = betterAuth({
  baseURL: appBaseURL,
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  trustedOrigins: [
    "appli://",
    "exp://",
    "http://localhost:3000",
    "http://localhost:8081",
    `http://${mobileHost}:3000`,
    `http://${mobileHost}:8081`,
  ],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
      age: {
        type: "number",
        required: false,
      },
    },
  },
  plugins: [expo()],
  socialProviders: {},
});

export type Session = typeof auth.$Infer.Session;
