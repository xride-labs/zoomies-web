'use client'

import { useSession as useBetterAuthSession } from '@/lib/auth-client'
import { useEffect, useState } from 'react'
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
  const { profile, isLoading, error: userError, fetchMe } = useUser()
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    async function fetchUserWithRoles() {
      if (sessionPending) return

      if (!session?.user) {
        setIsPending(false)
        return
      }

      // If we don't have the profile in Redux yet, fetch it
      if (!profile) {
        try {
          await fetchMe()
        } catch (err) {
          console.error('[useAuth] Error fetching user:', err)
        }
      }
      setIsPending(false)
    }

    fetchUserWithRoles()
  }, [session, sessionPending, profile])

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
    isAuthenticated: !!user,
    isPending: sessionPending || isPending || isLoading,
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
