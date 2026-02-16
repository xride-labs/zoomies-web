import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  userApi,
  type UserProfile,
  type Bike,
  type UpdateProfileData,
} from "@/lib/server/user";

export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getProfile();
      return response.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch profile",
      );
    }
  },
);

export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getMe();
      return response.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch user",
      );
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (data: UpdateProfileData, { rejectWithValue }) => {
    try {
      const response = await userApi.updateProfile(data);
      return response.user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update profile",
      );
    }
  },
);

export const addUserBike = createAsyncThunk(
  "user/addBike",
  async (data: Omit<Bike, "id">, { rejectWithValue }) => {
    try {
      const response = await userApi.addBike(data);
      return response.bike;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to add bike",
      );
    }
  },
);

export const updateUserBike = createAsyncThunk(
  "user/updateBike",
  async (
    { bikeId, data }: { bikeId: string; data: Partial<Bike> },
    { rejectWithValue },
  ) => {
    try {
      const response = await userApi.updateBike(bikeId, data);
      return response.bike;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update bike",
      );
    }
  },
);

export const deleteUserBike = createAsyncThunk(
  "user/deleteBike",
  async (bikeId: string, { rejectWithValue }) => {
    try {
      await userApi.deleteBike(bikeId);
      return bikeId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete bike",
      );
    }
  },
);

export const followUserAction = createAsyncThunk(
  "user/follow",
  async (userId: string, { rejectWithValue }) => {
    try {
      await userApi.followUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to follow user",
      );
    }
  },
);

export const unfollowUserAction = createAsyncThunk(
  "user/unfollow",
  async (userId: string, { rejectWithValue }) => {
    try {
      await userApi.unfollowUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to unfollow user",
      );
    }
  },
);

export type { UserProfile, Bike, UpdateProfileData };
