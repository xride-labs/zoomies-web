import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ridesApi,
  type Ride,
  type RideDetails,
  type CreateRideData,
} from "@/lib/server/rides";

export const fetchUpcomingRides = createAsyncThunk(
  "rides/fetchUpcoming",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await ridesApi.getUpcomingRides(page);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch rides",
      );
    }
  },
);

export const fetchMyRides = createAsyncThunk(
  "rides/fetchMy",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await ridesApi.getMyRides(page);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch rides",
      );
    }
  },
);

export const fetchPastRides = createAsyncThunk(
  "rides/fetchPast",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await ridesApi.getPastRides(page);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch past rides",
      );
    }
  },
);

export const fetchRideDetails = createAsyncThunk(
  "rides/fetchDetails",
  async (rideId: string, { rejectWithValue }) => {
    try {
      const response = await ridesApi.getRide(rideId);
      return response.ride;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch ride details",
      );
    }
  },
);

export const createRideThunk = createAsyncThunk(
  "rides/create",
  async (data: CreateRideData, { rejectWithValue }) => {
    try {
      const response = await ridesApi.createRide(data);
      return response.ride;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create ride",
      );
    }
  },
);

export const updateRideThunk = createAsyncThunk(
  "rides/update",
  async (
    { rideId, data }: { rideId: string; data: Partial<CreateRideData> },
    { rejectWithValue },
  ) => {
    try {
      const response = await ridesApi.updateRide(rideId, data);
      return response.ride;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update ride",
      );
    }
  },
);

export const deleteRideThunk = createAsyncThunk(
  "rides/delete",
  async (rideId: string, { rejectWithValue }) => {
    try {
      await ridesApi.deleteRide(rideId);
      return rideId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete ride",
      );
    }
  },
);

export const joinRideThunk = createAsyncThunk(
  "rides/join",
  async (rideId: string, { rejectWithValue }) => {
    try {
      await ridesApi.joinRide(rideId);
      return rideId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to join ride",
      );
    }
  },
);

export const leaveRideThunk = createAsyncThunk(
  "rides/leave",
  async (rideId: string, { rejectWithValue }) => {
    try {
      await ridesApi.leaveRide(rideId);
      return rideId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to leave ride",
      );
    }
  },
);

export const startRideThunk = createAsyncThunk(
  "rides/start",
  async (rideId: string, { rejectWithValue }) => {
    try {
      const response = await ridesApi.startRide(rideId);
      return response.ride;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to start ride",
      );
    }
  },
);

export const endRideThunk = createAsyncThunk(
  "rides/end",
  async (rideId: string, { rejectWithValue }) => {
    try {
      const response = await ridesApi.endRide(rideId);
      return response.ride;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to end ride",
      );
    }
  },
);

export type { Ride, RideDetails, CreateRideData };
