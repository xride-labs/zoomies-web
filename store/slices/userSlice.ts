import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar: string | null;
  bio: string;
  location: string;
  bikes: Bike[];
  clubs: ClubBadge[];
  ridesCount: number;
  followersCount: number;
  followingCount: number;
  isVerified: boolean;
  createdAt: string;
}

export interface Bike {
  id: string;
  make: string;
  model: string;
  year: number;
  nickname?: string;
  image?: string;
}

export interface ClubBadge {
  id: string;
  name: string;
  avatar: string | null;
  role: "member" | "officer" | "admin" | "founder";
}

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  profile: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    addBike: (state, action: PayloadAction<Bike>) => {
      if (state.profile) {
        state.profile.bikes.push(action.payload);
      }
    },
    removeBike: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        state.profile.bikes = state.profile.bikes.filter(
          (bike) => bike.id !== action.payload,
        );
      }
    },
  },
});

export const {
  setLoading,
  setProfile,
  updateProfile,
  setError,
  logout,
  addBike,
  removeBike,
} = userSlice.actions;

export default userSlice.reducer;
