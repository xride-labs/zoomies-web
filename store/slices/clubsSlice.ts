import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

interface ClubsState {
  myClubs: Club[];
  discoveredClubs: Club[];
  currentClub: ClubDetails | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ClubsState = {
  myClubs: [],
  discoveredClubs: [],
  currentClub: null,
  isLoading: false,
  error: null,
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
    updateClub: (state, action: PayloadAction<Partial<ClubDetails>>) => {
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
});

export const {
  setLoading,
  setMyClubs,
  setDiscoveredClubs,
  setCurrentClub,
  updateClub,
  addToMyClubs,
  removeFromMyClubs,
  setError,
  clearError,
} = clubsSlice.actions;

export default clubsSlice.reducer;
