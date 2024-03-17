import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { User as UserDB } from "@prisma/client";
import EmailTemplateWelcome, {
  EmailTemplateWelcomeText,
} from "emails/email-templates/EmailTemplateWelcome";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type User,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env";
import { db } from "~/server/db";
import { resend } from "./resend";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      onboarded: boolean;
      firstName?: string;
    } & DefaultSession["user"];
  }

  interface User extends UserDB {
    id: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          onboarded: user.onboarded,
          firstName: user.firstName,
        },
      };
    },
  },
  events: {
    createUser: async (message: { user: User }) => {
      console.log("createUser", message);

      await db.keywordGroups.createMany({
        data: [
          {
            userId: message.user.id,
            title: "Strong Match",
          },
          {
            userId: message.user.id,
            title: "Not a Match",
          },
          {
            userId: message.user.id,
            title: "Other",
          },
        ],
      });

      if (message.user?.email) {
        console.log("sending email...");

        const { error } = await resend.emails.send({
          from: "Mike <mike@boltapply.com>",
          to: [message.user.email],
          subject: "Welcome to Bolt",
          text: EmailTemplateWelcomeText,
          react: EmailTemplateWelcome({ NEXT_PUBLIC_URL: env.NEXT_PUBLIC_URL }),
        });

        if (error) {
          console.error("error", error);
        }
      }
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
      },
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
