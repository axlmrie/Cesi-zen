import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { db } from "@/server/db";
import {
  betterAuthBaseURL,
  betterAuthTrustedOrigins,
} from "@/server/mobile-origins";

export const auth = betterAuth({
  baseURL: betterAuthBaseURL,
  database: prismaAdapter(db, {
    provider: "mysql",
  }),
  trustedOrigins: betterAuthTrustedOrigins,
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
