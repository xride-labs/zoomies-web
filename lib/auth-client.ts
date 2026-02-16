"use client";

import { createAuthClient } from "better-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// remove trailing slash and /api if present amd ensure it ends with /api/auth
const cleanBaseUrl = API_URL.replace(/\/+$/, "").replace(/\/api\/?$/, "") + "/api/auth";

export const authClient = createAuthClient({
  baseURL: cleanBaseUrl,
});

// Export individual methods for convenience
export const { signIn, signUp, signOut, useSession, getSession } = authClient;

// Types
export type Session = Awaited<ReturnType<typeof authClient.getSession>>;
export type User = NonNullable<Session["data"]>["user"];
