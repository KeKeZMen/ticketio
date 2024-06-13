import { createHash } from "crypto";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Неверный логин или пароль");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (
          !user ||
          user.password !==
            createHash("sha256").update(credentials.password).digest("hex")
        ) {
          throw new Error("Неверный логин или пароль");
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        } as any;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        const user = token.user as User;
        session.user = user;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
};
