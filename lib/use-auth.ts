'use client'

import { useSession as useBetterAuthSession } from '@/lib/auth-client'
import { useEffect, useRef, useState } from 'react'
import { useUser } from '@/store/features/user'

export interface UserWithRoles {
  id: string
  email: string | null
  name: string | null
  image: string | null
  phone: string | null
  phoneVerified: string | null
  emailVerified: string | null
  bio: string | null
  location: string | null
  roles: string[]
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: UserWithRoles | null
  hasSession: boolean
  isAuthenticated: boolean
  isPending: boolean
  error: string | null
}

/**
 * Custom hook that combines Better Auth session with user roles from backend
 * Use this instead of useSession when you need role information
 */
export function useAuth(): AuthState {
  const { data: session, isPending: sessionPending } = useBetterAuthSession()
  const { profile, error: userError, fetchMe } = useUser()
  const [isPending, setIsPending] = useState(true)
  const hasSession = !!session?.user
  // Track which session user we've already initiated a fetch for, to prevent
  // concurrent fetchMe calls caused by unstable function references in deps.
  const fetchedForUserId = useRef<string | null>(null)

  useEffect(() => {
    if (sessionPending) return

    const sessionUserId = session?.user?.id ?? null

    if (!sessionUserId) {
      fetchedForUserId.current = null
      setIsPending(false)
      return
    }

    // Already fetching or fetched for this user — don't call fetchMe again.
    if (fetchedForUserId.current === sessionUserId) {
      if (profile) setIsPending(false)
      return
    }

    fetchedForUserId.current = sessionUserId

    if (!profile) {
      fetchMe()
        .catch((err) => console.error('[useAuth] fetchMe failed:', err))
        .finally(() => setIsPending(false))
    } else {
      setIsPending(false)
    }
    // Only re-run when session identity or pending state changes.
    // fetchMe is intentionally excluded — it's a new ref each render but
    // the ref guard above ensures it's only called once per session user.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id, sessionPending])

  // Transform Redux profile to match the expected UserWithRoles signature
  const user = profile
    ? {
        id: profile.id,
        email: profile.email ?? null,
        name: profile.name ?? null,
        image: profile.avatar ?? null,
        phone: null, // Depending on profile structure
        phoneVerified: null,
        emailVerified: null,
        bio: profile.bio ?? null,
        location: profile.location ?? null,
        roles: profile.roles ?? ['USER'],
        createdAt: profile.createdAt?.toString() || '',
        updatedAt: '',
      }
    : null

  return {
    user,
    hasSession,
    isAuthenticated: !!user,
    // isLoading intentionally excluded: the local isPending already tracks
    // the initial profile resolution. Including isLoading caused the layout
    // to toggle skeleton on every subsequent Redux fetch (render loop).
    isPending: sessionPending || isPending,
    error: userError,
  }
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(
  user: UserWithRoles | null | undefined,
  ...roles: string[]
): boolean {
  if (!user || !user.roles) return false
  return roles.some((role) => user.roles.includes(role))
}

/**
 * Check if user has all of the specified roles
 */
export function hasAllRoles(
  user: UserWithRoles | null | undefined,
  ...roles: string[]
): boolean {
  if (!user || !user.roles) return false
  return roles.every((role) => user.roles.includes(role))
}
