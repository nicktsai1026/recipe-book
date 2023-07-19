import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from '@/models/User';
import * as bcrypt from 'bcrypt-ts';
import connectMongoDB from "@/libs/mongodb";

const handler = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 365 * 24 * 60 * 60 // 1 year
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "someone@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string, password: string };
        await connectMongoDB();
        
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }
       
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
          throw new Error("Password is incorrect");
        } else {
          return user;
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
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