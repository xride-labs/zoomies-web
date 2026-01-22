import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

const initialState: RidesState = {
  upcomingRides: [],
  myRides: [],
  pastRides: [],
  currentRide: null,
  activeRide: null,
  isLoading: false,
  error: null,
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
