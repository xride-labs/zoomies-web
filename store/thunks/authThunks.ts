import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  authApi,
  type AuthSession,
  type RegisterData,
  type LoginData,
} from "@/lib/server/auth";

/**
 * Register a new user
 */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const session = await authApi.register(data);
      return session;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  },
);

/**
 * Login with email/password
 */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const session = await authApi.login(data);
      return session;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Login failed",
      );
    }
  },
);

/**
 * Login with Google
 */
export const loginWithGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async (callbackURL: string = "/home", { rejectWithValue }) => {
    try {
      await authApi.loginWithGoogle(callbackURL);
      return null; // Redirects, so no return value
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Google login failed",
      );
    }
  },
);

/**
 * Logout
 */
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      return null;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Logout failed",
      );
    }
  },
);

/**
 * Get current session
 */
export const fetchSession = createAsyncThunk(
  "auth/fetchSession",
  async (_, { rejectWithValue }) => {
    try {
      const session = await authApi.getSession();
      return session;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch session",
      );
    }
  },
);

/**
 * Request password reset
 */
export const requestPasswordReset = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await authApi.forgotPassword(email);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to request password reset",
      );
    }
  },
);

/**
 * Reset password with token
 */
export const resetPasswordAction = createAsyncThunk(
  "auth/resetPassword",
  async (data: { token: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authApi.resetPassword(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to reset password",
      );
    }
  },
);

/**
 * Verify email
 */
export const verifyEmailAction = createAsyncThunk(
  "auth/verifyEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyEmail(token);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to verify email",
      );
    }
  },
);

/**
 * Send OTP to phone
 */
export const sendOtpAction = createAsyncThunk(
  "auth/sendOtp",
  async (phone: string, { rejectWithValue }) => {
    try {
      const response = await authApi.sendOtp(phone);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to send OTP",
      );
    }
  },
);

/**
 * Verify OTP
 */
export const verifyOtpAction = createAsyncThunk(
  "auth/verifyOtp",
  async (
    { phone, otp }: { phone: string; otp: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await authApi.verifyOtp(phone, otp);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to verify OTP",
      );
    }
  },
);

// Re-export types
export type { AuthSession, RegisterData, LoginData };
