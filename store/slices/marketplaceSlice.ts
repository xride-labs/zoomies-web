import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ListingCategory =
  | "parts"
  | "accessories"
  | "gear"
  | "apparel"
  | "tools"
  | "bikes";

export type ListingCondition =
  | "new"
  | "like-new"
  | "excellent"
  | "good"
  | "fair"
  | "parts-only";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: ListingCategory;
  condition: ListingCondition;
  images: string[];
  location: string;
  isNegotiable: boolean;
  isSold: boolean;
  viewsCount: number;
  createdAt: string;
  seller: {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
    rating: number;
    reviewsCount: number;
    clubs: { id: string; name: string }[];
  };
}

export interface ListingDetails extends Listing {
  sellerPhone?: string;
  relatedListings: Listing[];
}

interface MarketplaceState {
  listings: Listing[];
  myListings: Listing[];
  savedListings: Listing[];
  currentListing: ListingDetails | null;
  filters: {
    category: ListingCategory | null;
    condition: ListingCondition | null;
    minPrice: number | null;
    maxPrice: number | null;
    location: string | null;
  };
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

const initialState: MarketplaceState = {
  listings: [],
  myListings: [],
  savedListings: [],
  currentListing: null,
  filters: {
    category: null,
    condition: null,
    minPrice: null,
    maxPrice: null,
    location: null,
  },
  isLoading: false,
  error: null,
  hasMore: true,
  page: 1,
};

const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setListings: (state, action: PayloadAction<Listing[]>) => {
      state.listings = action.payload;
      state.page = 1;
    },
    appendListings: (state, action: PayloadAction<Listing[]>) => {
      state.listings = [...state.listings, ...action.payload];
      state.page += 1;
    },
    setMyListings: (state, action: PayloadAction<Listing[]>) => {
      state.myListings = action.payload;
    },
    setSavedListings: (state, action: PayloadAction<Listing[]>) => {
      state.savedListings = action.payload;
    },
    setCurrentListing: (
      state,
      action: PayloadAction<ListingDetails | null>,
    ) => {
      state.currentListing = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<MarketplaceState["filters"]>>,
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    addToSaved: (state, action: PayloadAction<Listing>) => {
      state.savedListings.push(action.payload);
    },
    removeFromSaved: (state, action: PayloadAction<string>) => {
      state.savedListings = state.savedListings.filter(
        (listing) => listing.id !== action.payload,
      );
    },
    markAsSold: (state, action: PayloadAction<string>) => {
      const listing = state.myListings.find((l) => l.id === action.payload);
      if (listing) {
        listing.isSold = true;
      }
      if (state.currentListing?.id === action.payload) {
        state.currentListing.isSold = true;
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
  setListings,
  appendListings,
  setMyListings,
  setSavedListings,
  setCurrentListing,
  setFilters,
  clearFilters,
  setHasMore,
  addToSaved,
  removeFromSaved,
  markAsSold,
  setError,
  clearError,
} = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
