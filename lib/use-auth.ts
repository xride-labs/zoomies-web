"use client";

import { useSession as useBetterAuthSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface UserWithRoles {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  phone: string | null;
  phoneVerified: string | null;
  emailVerified: string | null;
  bio: string | null;
  location: string | null;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: UserWithRoles | null;
  isAuthenticated: boolean;
  isPending: boolean;
  error: string | null;
}

/**
 * Custom hook that combines Better Auth session with user roles from backend
 * Use this instead of useSession when you need role information
 */
export function useAuth(): AuthState {
  const { data: session, isPending: sessionPending } = useBetterAuthSession();
  const [user, setUser] = useState<UserWithRoles | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserWithRoles() {
      if (sessionPending) return;

      if (!session?.user) {
        setUser(null);
        setIsPending(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/account/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            setUser(null);
            setIsPending(false);
            return;
          }
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data.data?.user || null);
        setError(null);
      } catch (err) {
        console.error("[useAuth] Error fetching user:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        // Still set basic user info from session even if /me fails
        setUser({
          id: session.user.id,
          email: session.user.email ?? null,
          name: session.user.name ?? null,
          image: session.user.image ?? null,
          phone: null,
          phoneVerified: null,
          emailVerified: null,
          bio: null,
          location: null,
          roles: ["USER"], // Default role
          createdAt: session.user.createdAt?.toString() || "",
          updatedAt: session.user.updatedAt?.toString() || "",
        });
      } finally {
        setIsPending(false);
      }
    }

    fetchUserWithRoles();
  }, [session, sessionPending]);

  return {
    user,
    isAuthenticated: !!user,
    isPending,
    error,
  };
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(
  user: UserWithRoles | null,
  ...roles: string[]
): boolean {
  if (!user) return false;
  return roles.some((role) => user.roles.includes(role));
}

/**
 * Check if user has all of the specified roles
 */
export function hasAllRoles(
  user: UserWithRoles | null,
  ...roles: string[]
): boolean {
  if (!user) return false;
  return roles.every((role) => user.roles.includes(role));
}
