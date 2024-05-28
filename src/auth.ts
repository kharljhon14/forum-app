import Github from 'next-auth/providers/github';
import NextAuth from 'next-auth';
import { db } from '@/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// Check if github credentials exits
if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) throw new Error('Missing Github oauth credentials');

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    })
  ],
  adapter: PrismaAdapter(db) as Adapter,
  callbacks: {
    // usually not needed fixing bug in nexauth
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    }
  }
});
