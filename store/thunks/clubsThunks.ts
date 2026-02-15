import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clubsApi,
  type Club,
  type ClubDetails,
  type CreateClubData,
} from "@/lib/api/clubs";

/**
 * Fetch clubs the user is a member of
 */
export const fetchMyClubs = createAsyncThunk(
  "clubs/fetchMyClubs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await clubsApi.getMyClubs();
      return response.clubs;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch clubs",
      );
    }
  },
);

/**
 * Discover clubs
 */
export const discoverClubsThunk = createAsyncThunk(
  "clubs/discover",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await clubsApi.discoverClubs(page);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to discover clubs",
      );
    }
  },
);

/**
 * Fetch club details
 */
export const fetchClubDetails = createAsyncThunk(
  "clubs/fetchDetails",
  async (clubId: string, { rejectWithValue }) => {
    try {
      const response = await clubsApi.getClub(clubId);
      return response.club;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch club details",
      );
    }
  },
);

/**
 * Create a new club
 */
export const createClubThunk = createAsyncThunk(
  "clubs/create",
  async (data: CreateClubData, { rejectWithValue }) => {
    try {
      const response = await clubsApi.createClub(data);
      return response.club;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create club",
      );
    }
  },
);

/**
 * Update a club
 */
export const updateClubThunk = createAsyncThunk(
  "clubs/update",
  async (
    { clubId, data }: { clubId: string; data: Partial<CreateClubData> },
    { rejectWithValue },
  ) => {
    try {
      const response = await clubsApi.updateClub(clubId, data);
      return response.club;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update club",
      );
    }
  },
);

/**
 * Delete a club
 */
export const deleteClubThunk = createAsyncThunk(
  "clubs/delete",
  async (clubId: string, { rejectWithValue }) => {
    try {
      await clubsApi.deleteClub(clubId);
      return clubId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete club",
      );
    }
  },
);

/**
 * Request to join a club
 */
export const joinClubThunk = createAsyncThunk(
  "clubs/join",
  async (clubId: string, { rejectWithValue }) => {
    try {
      await clubsApi.requestToJoin(clubId);
      return clubId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to join club",
      );
    }
  },
);

/**
 * Leave a club
 */
export const leaveClubThunk = createAsyncThunk(
  "clubs/leave",
  async (clubId: string, { rejectWithValue }) => {
    try {
      await clubsApi.leaveClub(clubId);
      return clubId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to leave club",
      );
    }
  },
);

// Re-export types
export type { Club, ClubDetails, CreateClubData };
