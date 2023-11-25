import { env } from "@/env.mjs";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token.sub && typeof session.user === "object") {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
