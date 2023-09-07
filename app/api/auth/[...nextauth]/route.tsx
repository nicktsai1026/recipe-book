import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from 'bcrypt-ts';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const { email, password } = credentials as { email: string, password: string };
        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        });

        if (!user) {
          throw new Error("Email");
        }
       
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
          throw new Error("Password");
        }

        return user;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 365 * 24 * 60 * 60 // 1 year
  },
  jwt:{
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/users'
  },
  callbacks: {
    async jwt ({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    }
  }
});

export { handler as GET, handler as POST }