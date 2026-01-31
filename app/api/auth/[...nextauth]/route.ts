import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { UserRole } from "@/types";

// Mock users for development - replace with actual backend calls
const mockUsers = [
  {
    id: "admin-1",
    email: "admin@zoomies.com",
    password: "admin123",
    name: "Super Admin",
    username: "superadmin",
    role: "ADMIN" as UserRole,
    image: null,
  },
  {
    id: "user-1",
    email: "rider@zoomies.com",
    password: "rider123",
    name: "Test Rider",
    username: "testrider",
    role: "RIDER" as UserRole,
    image: null,
  },
  {
    id: "seller-1",
    email: "seller@zoomies.com",
    password: "seller123",
    name: "Test Seller",
    username: "testseller",
    role: "SELLER" as UserRole,
    image: null,
  },
];

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // TODO: Call your Node.js backend API to validate credentials
        // const response = await fetch(`${process.env.API_URL}/auth/login`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     email: credentials.email,
        //     password: credentials.password,
        //   }),
        // });
        // const user = await response.json();
        // if (!response.ok || !user) {
        //   throw new Error("Invalid credentials");
        // }
        // return user;

        // Mock authentication for development
        const user = mockUsers.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password,
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            username: user.username,
            role: user.role,
            image: user.image,
          };
        }

        // Allow any email/password for testing (default role: USER)
        if (credentials.email && credentials.password) {
          return {
            id: "test-" + Date.now(),
            email: credentials.email,
            name: credentials.email.split("@")[0],
            username: credentials.email.split("@")[0],
            role: "USER" as UserRole,
            image: null,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    newUser: "/onboarding",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.username = user.username;
      }
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as UserRole;
        session.user.username = token.username as string | null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
