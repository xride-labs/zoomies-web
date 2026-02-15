import axios from "axios";
import {
  API_URL,
  createApiClient,
  createErrorHandler,
  InternalAxiosRequestConfig,
} from "./types";
import { authClient } from "@/lib/auth-client";

/**
 * Authenticated Axios instance
 * - Sends cookies automatically (withCredentials: true)
 * - Handles 401 errors by signing out user
 * - Use for all authenticated API calls
 */
const axiosAuthenticated = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
  withCredentials: true, // Send cookies with requests
});

// Request interceptor
axiosAuthenticated.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - handle errors and 401
axiosAuthenticated.interceptors.response.use(
  (response) => response,
  createErrorHandler(async () => {
    // Sign out on 401
    await authClient.signOut();
    window.location.href = "/login";
  }),
);

/**
 * Authenticated API client with typed methods
 */
export const apiAuthenticated = createApiClient(axiosAuthenticated);

/**
 * Raw axios instance for custom requests
 */
export { axiosAuthenticated };
