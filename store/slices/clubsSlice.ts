import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchMyClubs,
  discoverClubsThunk,
  fetchClubDetails,
  createClubThunk,
  updateClubThunk,
  deleteClubThunk,
  joinClubThunk,
  leaveClubThunk,
} from "../thunks/clubsThunks";

export interface Club {
  id: string;
  name: string;
  description: string;
  avatar: string | null;
  coverImage: string | null;
  location: string;
  membersCount: number;
  ridesCount: number;
  isPrivate: boolean;
  isPublic?: boolean;
  tags: string[];
  createdAt: string;
  founder: {
    id: string;
    name: string;
    avatar: string | null;
  };
}

export interface ClubMember {
  id: string;
  userId: string;
  name: string;
  username: string;
  avatar: string | null;
  role: "member" | "officer" | "admin" | "founder";
  joinedAt: string;
}

export interface ClubDetails extends Club {
  members: ClubMember[];
  isMember: boolean;
  isPending: boolean;
  userRole: "member" | "officer" | "admin" | "founder" | null;
  // Management settings (may not be present in all responses)
  requireApproval?: boolean;
  allowMemberInvites?: boolean;
  showMemberList?: boolean;
}

interface ClubsState {
  myClubs: Club[];
  discoveredClubs: Club[];
  currentClub: ClubDetails | null;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

const initialState: ClubsState = {
  myClubs: [],
  discoveredClubs: [],
  currentClub: null,
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1,
};

const clubsSlice = createSlice({
  name: "clubs",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMyClubs: (state, action: PayloadAction<Club[]>) => {
      state.myClubs = action.payload;
    },
    setDiscoveredClubs: (state, action: PayloadAction<Club[]>) => {
      state.discoveredClubs = action.payload;
    },
    setCurrentClub: (state, action: PayloadAction<ClubDetails | null>) => {
      state.currentClub = action.payload;
    },
    updateClubLocal: (state, action: PayloadAction<Partial<ClubDetails>>) => {
      if (state.currentClub) {
        state.currentClub = { ...state.currentClub, ...action.payload };
      }
    },
    addToMyClubs: (state, action: PayloadAction<Club>) => {
      state.myClubs.push(action.payload);
    },
    removeFromMyClubs: (state, action: PayloadAction<string>) => {
      state.myClubs = state.myClubs.filter(
        (club) => club.id !== action.payload,
      );
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
    // Fetch my clubs
    builder
      .addCase(fetchMyClubs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyClubs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myClubs = action.payload;
      })
      .addCase(fetchMyClubs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Discover clubs
    builder
      .addCase(discoverClubsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(discoverClubsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg === 1) {
          state.discoveredClubs = action.payload.clubs;
        } else {
          state.discoveredClubs = [
            ...state.discoveredClubs,
            ...action.payload.clubs,
          ];
        }
        state.hasMore = action.payload.hasMore;
        state.page += 1;
      })
      .addCase(discoverClubsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch club details
    builder
      .addCase(fetchClubDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClubDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentClub = action.payload;
      })
      .addCase(fetchClubDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create club
    builder
      .addCase(createClubThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createClubThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myClubs.push(action.payload as Club);
      })
      .addCase(createClubThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update club
    builder.addCase(updateClubThunk.fulfilled, (state, action) => {
      if (state.currentClub && action.payload) {
        state.currentClub = { ...state.currentClub, ...action.payload };
      }
      const index = state.myClubs.findIndex(
        (c) => c.id === (action.payload as Club)?.id,
      );
      if (index !== -1 && action.payload) {
        state.myClubs[index] = { ...state.myClubs[index], ...action.payload };
      }
    });

    // Delete club
    builder.addCase(deleteClubThunk.fulfilled, (state, action) => {
      state.myClubs = state.myClubs.filter((c) => c.id !== action.payload);
      if (state.currentClub?.id === action.payload) {
        state.currentClub = null;
      }
    });

    // Join club
    builder.addCase(joinClubThunk.fulfilled, (state, action) => {
      if (state.currentClub?.id === action.payload) {
        state.currentClub.isPending = true;
      }
    });

    // Leave club
    builder.addCase(leaveClubThunk.fulfilled, (state, action) => {
      state.myClubs = state.myClubs.filter((c) => c.id !== action.payload);
      if (state.currentClub?.id === action.payload) {
        state.currentClub.isMember = false;
        state.currentClub.userRole = null;
      }
    });
  },
});

export const {
  setLoading,
  setMyClubs,
  setDiscoveredClubs,
  setCurrentClub,
  updateClubLocal,
  addToMyClubs,
  removeFromMyClubs,
  setError,
  clearError,
} = clubsSlice.actions;

export default clubsSlice.reducer;
