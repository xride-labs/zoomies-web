"use client";

import { createAuthClient } from "better-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const authClient = createAuthClient({
  baseURL: API_URL,
});

// Export individual methods for convenience
export const { signIn, signUp, signOut, useSession, getSession } = authClient;

// Types
export type Session = Awaited<ReturnType<typeof authClient.getSession>>;
export type User = NonNullable<Session["data"]>["user"];
