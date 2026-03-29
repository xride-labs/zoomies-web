import axios from 'axios'
import {
  API_URL,
  createApiClient,
  createErrorHandler,
  InternalAxiosRequestConfig,
} from './types'
import { authClient } from '@/lib/auth-client'

/**
 * Authenticated Axios instance
 * - Sends cookies automatically (withCredentials: true)
 * - Handles 401 errors by signing out user
 * - Use for all authenticated API calls
 */
const axiosAuthenticated = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
  withCredentials: true, // Send cookies with requests
})

// Request interceptor
axiosAuthenticated.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor - handle errors and 401
axiosAuthenticated.interceptors.response.use(
  (response) => response,
  createErrorHandler(async (error) => {
    const debugAuth = process.env.NODE_ENV !== 'production'

    if (debugAuth) {
      console.warn('[apiAuthenticated] 401 response', {
        method: error.config?.method,
        url: error.config?.url,
        status: error.response?.status,
      })
    }

    try {
      const session = await authClient.getSession()
      const hasSession = !!session.data?.user

      if (debugAuth) {
        console.warn('[apiAuthenticated] Better Auth session on 401', {
          hasSession,
        })
      }

      // If there is still a valid auth session, avoid hard redirect loops.
      if (hasSession) {
        return
      }
    } catch (sessionError) {
      if (debugAuth) {
        console.error(
          '[apiAuthenticated] failed to read auth session on 401',
          sessionError,
        )
      }
    }

    // No active session: sign out local state and send user to login.
    await authClient.signOut()
    window.location.href = '/login'
  }),
)

/**
 * Authenticated API client with typed methods
 */
export const apiAuthenticated = createApiClient(axiosAuthenticated)

/**
 * Raw axios instance for custom requests
 */
export { axiosAuthenticated }
