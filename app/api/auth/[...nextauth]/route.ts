
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth/index";
import CredentialsProvider from "next-auth/providers/credentials";
import * as process from "process";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      async authorize(credentials, req) {
        // Perform database operations

        const res = await fetch(`http://157.175.176.124/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        console.log("auth ts");

        const user = await res.json();

        // console.log(credentials)

        // if (
        //   credentials?.email === "admin@admin.com" &&
        //   credentials.password === "12345678"
        // ) {
        //   return {
        //     id: "1",
        //     email: credentials?.email,
        //   };
        // }

        // return null;
        if (res.ok && user) {
          return user.data;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/en/login",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      console.log(session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
