import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUpcomingRides,
  fetchMyRides,
  fetchPastRides,
  fetchRideDetails,
  createRideThunk,
  updateRideThunk,
  deleteRideThunk,
  joinRideThunk,
  leaveRideThunk,
  startRideThunk,
  endRideThunk,
} from "../thunks/ridesThunks";

export type RideStatus =
  | "scheduled"
  | "countdown"
  | "active"
  | "completed"
  | "cancelled"
  | "archived";

export type RideType = "club" | "personal";

export interface RideParticipant {
  id: string;
  userId: string;
  name: string;
  username: string;
  avatar: string | null;
  status: "confirmed" | "pending" | "declined";
  liveStatus?: "ok" | "need-help" | "emergency" | null;
  lastLocation?: {
    lat: number;
    lng: number;
    updatedAt: string;
  };
}

export interface Ride {
  id: string;
  title: string;
  description: string;
  type: RideType;
  status: RideStatus;
  startLocation: {
    name: string;
    lat: number;
    lng: number;
  };
  endLocation?: {
    name: string;
    lat: number;
    lng: number;
  };
  route?: string; // Encoded polyline or waypoints
  scheduledAt: string;
  estimatedDuration: number; // in minutes
  distance?: number; // in km
  maxParticipants?: number;
  participantsCount: number;
  club?: {
    id: string;
    name: string;
    avatar: string | null;
  };
  organizer: {
    id: string;
    name: string;
    avatar: string | null;
  };
  createdAt: string;
}

export interface RideDetails extends Ride {
  participants: RideParticipant[];
  isParticipant: boolean;
  isPending: boolean;
  chatEnabled: boolean;
  trackingEnabled: boolean;
}

interface RidesState {
  upcomingRides: Ride[];
  myRides: Ride[];
  pastRides: Ride[];
  currentRide: RideDetails | null;
  activeRide: RideDetails | null; // Currently in-progress ride
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

const initialState: RidesState = {
  upcomingRides: [],
  myRides: [],
  pastRides: [],
  currentRide: null,
  activeRide: null,
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1,
};

const ridesSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUpcomingRides: (state, action: PayloadAction<Ride[]>) => {
      state.upcomingRides = action.payload;
    },
    setMyRides: (state, action: PayloadAction<Ride[]>) => {
      state.myRides = action.payload;
    },
    setPastRides: (state, action: PayloadAction<Ride[]>) => {
      state.pastRides = action.payload;
    },
    setCurrentRide: (state, action: PayloadAction<RideDetails | null>) => {
      state.currentRide = action.payload;
    },
    setActiveRide: (state, action: PayloadAction<RideDetails | null>) => {
      state.activeRide = action.payload;
    },
    updateParticipantLocation: (
      state,
      action: PayloadAction<{
        participantId: string;
        location: { lat: number; lng: number; updatedAt: string };
      }>,
    ) => {
      if (state.activeRide) {
        const participant = state.activeRide.participants.find(
          (p) => p.id === action.payload.participantId,
        );
        if (participant) {
          participant.lastLocation = action.payload.location;
        }
      }
    },
    updateParticipantStatus: (
      state,
      action: PayloadAction<{
        participantId: string;
        liveStatus: "ok" | "need-help" | "emergency";
      }>,
    ) => {
      if (state.activeRide) {
        const participant = state.activeRide.participants.find(
          (p) => p.id === action.payload.participantId,
        );
        if (participant) {
          participant.liveStatus = action.payload.liveStatus;
        }
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch upcoming rides
    builder
      .addCase(fetchUpcomingRides.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingRides.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg === 1) {
          state.upcomingRides = action.payload.rides;
        } else {
          state.upcomingRides = [
            ...state.upcomingRides,
            ...action.payload.rides,
          ];
        }
        state.hasMore = action.payload.hasMore;
        state.page += 1;
      })
      .addCase(fetchUpcomingRides.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch my rides
    builder
      .addCase(fetchMyRides.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyRides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myRides = action.payload.rides;
      })
      .addCase(fetchMyRides.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch past rides
    builder
      .addCase(fetchPastRides.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPastRides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pastRides = action.payload.rides;
      })
      .addCase(fetchPastRides.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch ride details
    builder
      .addCase(fetchRideDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRideDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentRide = action.payload;
      })
      .addCase(fetchRideDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create ride
    builder
      .addCase(createRideThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRideThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myRides.unshift(action.payload as Ride);
      })
      .addCase(createRideThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update ride
    builder.addCase(updateRideThunk.fulfilled, (state, action) => {
      if (state.currentRide && action.payload) {
        state.currentRide = { ...state.currentRide, ...action.payload };
      }
    });

    // Delete ride
    builder.addCase(deleteRideThunk.fulfilled, (state, action) => {
      state.myRides = state.myRides.filter((r) => r.id !== action.payload);
      state.upcomingRides = state.upcomingRides.filter(
        (r) => r.id !== action.payload,
      );
      if (state.currentRide?.id === action.payload) {
        state.currentRide = null;
      }
    });

    // Join ride
    builder.addCase(joinRideThunk.fulfilled, (state, action) => {
      if (state.currentRide?.id === action.payload) {
        state.currentRide.isPending = true;
      }
    });

    // Leave ride
    builder.addCase(leaveRideThunk.fulfilled, (state, action) => {
      if (state.currentRide?.id === action.payload) {
        state.currentRide.isParticipant = false;
        state.currentRide.isPending = false;
      }
    });

    // Start ride
    builder.addCase(startRideThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.activeRide = action.payload;
        if (state.currentRide?.id === action.payload.id) {
          state.currentRide = action.payload;
        }
      }
    });

    // End ride
    builder.addCase(endRideThunk.fulfilled, (state, action) => {
      state.activeRide = null;
      if (action.payload && state.currentRide?.id === action.payload.id) {
        state.currentRide = action.payload;
      }
    });
  },
});

export const {
  setLoading,
  setUpcomingRides,
  setMyRides,
  setPastRides,
  setCurrentRide,
  setActiveRide,
  updateParticipantLocation,
  updateParticipantStatus,
  setError,
  clearError,
} = ridesSlice.actions;

export default ridesSlice.reducer;
