import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - add auth token
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get session on client side
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session?.user) {
        // The backend should provide an access token in the session
        // For now, we'll use a placeholder
        // config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Sign out user on 401
        await signOut({ redirect: true, callbackUrl: "/login" });
      }
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject(
        new Error("Network error. Please check your connection."),
      );
    }

    // Handle other errors
    const errorMessage =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "An unexpected error occurred";

    return Promise.reject(new Error(errorMessage));
  },
);

export default api;

// Backend API response format (matches backend ApiResponse class)
interface BackendResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: unknown;
  };
}

// Typed API methods - automatically unwrap the 'data' property from backend response
export const apiClient = {
  get: <T>(url: string, config = {}) =>
    api.get<BackendResponse<T>>(url, config).then((res) => res.data.data as T),
  post: <T>(url: string, data = {}, config = {}) =>
    api
      .post<BackendResponse<T>>(url, data, config)
      .then((res) => res.data.data as T),
  put: <T>(url: string, data = {}, config = {}) =>
    api
      .put<BackendResponse<T>>(url, data, config)
      .then((res) => res.data.data as T),
  patch: <T>(url: string, data = {}, config = {}) =>
    api
      .patch<BackendResponse<T>>(url, data, config)
      .then((res) => res.data.data as T),
  delete: <T>(url: string, config = {}) =>
    api
      .delete<BackendResponse<T>>(url, config)
      .then((res) => res.data.data as T),
};
