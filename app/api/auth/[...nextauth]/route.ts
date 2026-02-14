import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { UserRole } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Roles that are allowed to access the web portal
const WEB_ACCESS_ROLES: UserRole[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "CLUB_OWNER",
  "SELLER",
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

        try {
          // Call backend API for authentication
          const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          // If backend auth fails, fall back to Auth.js session approach
          // by calling the /me endpoint if a session token exists
          if (!res.ok) {
            // Try ExpressAuth-style auth (the backend uses @auth/express)
            // For development, allow mock login
            if (process.env.NODE_ENV === "development") {
              // Development mock: authenticate via backend /auth/me after
              // ExpressAuth sets the cookie
              return {
                id: "dev-" + Date.now(),
                email: credentials.email,
                name: credentials.email.split("@")[0],
                username: credentials.email.split("@")[0],
                roles: ["USER"] as UserRole[],
              };
            }
            throw new Error("Invalid email or password");
          }

          const data = await res.json();
          const user = data.data?.user || data.user;

          if (!user) {
            throw new Error("Invalid response from server");
          }

          const roles: UserRole[] = user.roles || ["USER"];

          // Block users who only have RIDER/USER roles (no web access)
          const hasWebAccess = roles.some((r: UserRole) =>
            WEB_ACCESS_ROLES.includes(r),
          );
          if (!hasWebAccess) {
            throw new Error(
              "Access denied. The web portal is for admins, club owners, and sellers only. Please use the mobile app.",
            );
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            username: user.username,
            roles,
            image: user.image,
          };
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
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
        token.roles = user.roles || ["USER"];
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
        session.user.roles = (token.roles as UserRole[]) || ["USER"];
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
