import axios from "axios";
import {
  API_URL,
  createApiClient,
  createErrorHandler,
  InternalAxiosRequestConfig,
} from "./types";

/**
 * Unauthenticated Axios instance
 * - Does NOT send cookies
 * - Use for public API calls (login, register, public data)
 */
const axiosUnauthenticated = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
  withCredentials: false, // No cookies
});

// Request interceptor
axiosUnauthenticated.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - handle errors (no 401 handling needed)
axiosUnauthenticated.interceptors.response.use(
  (response) => response,
  createErrorHandler(),
);

/**
 * Unauthenticated API client with typed methods
 */
export const apiUnauthenticated = createApiClient(axiosUnauthenticated);

/**
 * Raw axios instance for custom requests
 */
export { axiosUnauthenticated };
