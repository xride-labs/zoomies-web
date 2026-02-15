import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchProfile,
  fetchMe,
  updateUserProfile,
  addUserBike,
  updateUserBike,
  deleteUserBike,
} from "../thunks/userThunks";

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
    updateProfileLocal: (
      state,
      action: PayloadAction<Partial<UserProfile>>,
    ) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    addBikeLocal: (state, action: PayloadAction<Bike>) => {
      if (state.profile) {
        state.profile.bikes.push(action.payload);
      }
    },
    removeBikeLocal: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        state.profile.bikes = state.profile.bikes.filter(
          (bike) => bike.id !== action.payload,
        );
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch profile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch me (auth user)
    builder
      .addCase(fetchMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.profile = action.payload as UserProfile;
          state.isAuthenticated = true;
        }
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.profile && action.payload) {
          state.profile = { ...state.profile, ...action.payload };
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Add bike
    builder
      .addCase(addUserBike.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addUserBike.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.profile && action.payload) {
          state.profile.bikes.push(action.payload);
        }
      })
      .addCase(addUserBike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update bike
    builder.addCase(updateUserBike.fulfilled, (state, action) => {
      if (state.profile && action.payload) {
        const index = state.profile.bikes.findIndex(
          (b) => b.id === action.payload.id,
        );
        if (index !== -1) {
          state.profile.bikes[index] = action.payload;
        }
      }
    });

    // Delete bike
    builder.addCase(deleteUserBike.fulfilled, (state, action) => {
      if (state.profile) {
        state.profile.bikes = state.profile.bikes.filter(
          (b) => b.id !== action.payload,
        );
      }
    });
  },
});

export const {
  setLoading,
  setProfile,
  updateProfileLocal,
  setError,
  clearError,
  logout,
  addBikeLocal,
  removeBikeLocal,
} = userSlice.actions;

export default userSlice.reducer;
