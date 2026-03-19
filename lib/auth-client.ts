'use client'

import { createAuthClient } from 'better-auth/react'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
if (!apiUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is required')
}

// Normalize URL: strip trailing slash and optional /api suffix, then append /api/auth
const cleanBaseUrl = apiUrl.replace(/\/+$/, '').replace(/\/api\/?$/, '') + '/api/auth'

export const authClient = createAuthClient({
  baseURL: cleanBaseUrl,
})

// Export individual methods for convenience
export const { signIn, signUp, signOut, useSession, getSession } = authClient

// Types
export type Session = Awaited<ReturnType<typeof authClient.getSession>>
export type User = NonNullable<Session['data']>['user']
