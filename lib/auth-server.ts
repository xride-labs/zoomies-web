import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface SessionUser {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  phone: string | null;
  roles: string[];
}

export interface ServerSession {
  user: SessionUser;
  session: {
    id: string;
    token: string;
    expiresAt: string;
  };
}

/**
 * Get the current session on the server side (RSC, Server Actions, Route Handlers)
 * This makes a request to the backend API with forwarded cookies
 */
export async function getServerSession(): Promise<ServerSession | null> {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const response = await fetch(`${API_URL}/api/auth/get-session`, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("[Auth] Failed to get server session:", error);
    return null;
  }
}

/**
 * Check if user has any of the required roles
 */
export function hasRole(
  session: ServerSession | null,
  ...roles: string[]
): boolean {
  if (!session) return false;
  return roles.some((role) => session.user.roles.includes(role));
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(session: ServerSession | null): boolean {
  return session !== null && session.user !== null;
}
