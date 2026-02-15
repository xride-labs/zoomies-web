import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchListings,
  fetchMoreListings,
  fetchMyListings,
  fetchSavedListings,
  fetchListingDetails,
  createListingThunk,
  updateListingThunk,
  deleteListingThunk,
  saveListingThunk,
  unsaveListingThunk,
  markAsSoldThunk,
} from "../thunks/marketplaceThunks";

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
  extraReducers: (builder) => {
    // Fetch listings
    builder
      .addCase(fetchListings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listings = action.payload.listings;
        state.hasMore = action.payload.hasMore;
        state.page = 1;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch more listings
    builder
      .addCase(fetchMoreListings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMoreListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listings = [...state.listings, ...action.payload.listings];
        state.hasMore = action.payload.hasMore;
        state.page += 1;
      })
      .addCase(fetchMoreListings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch my listings
    builder
      .addCase(fetchMyListings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myListings = action.payload;
      })
      .addCase(fetchMyListings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch saved listings
    builder
      .addCase(fetchSavedListings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSavedListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedListings = action.payload;
      })
      .addCase(fetchSavedListings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch listing details
    builder
      .addCase(fetchListingDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchListingDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentListing = action.payload;
      })
      .addCase(fetchListingDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create listing
    builder
      .addCase(createListingThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createListingThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myListings.unshift(action.payload as Listing);
      })
      .addCase(createListingThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update listing
    builder.addCase(updateListingThunk.fulfilled, (state, action) => {
      if (state.currentListing && action.payload) {
        state.currentListing = { ...state.currentListing, ...action.payload };
      }
      const index = state.myListings.findIndex(
        (l) => l.id === (action.payload as Listing)?.id,
      );
      if (index !== -1 && action.payload) {
        state.myListings[index] = {
          ...state.myListings[index],
          ...action.payload,
        };
      }
    });

    // Delete listing
    builder.addCase(deleteListingThunk.fulfilled, (state, action) => {
      state.myListings = state.myListings.filter(
        (l) => l.id !== action.payload,
      );
      state.listings = state.listings.filter((l) => l.id !== action.payload);
      if (state.currentListing?.id === action.payload) {
        state.currentListing = null;
      }
    });

    // Save listing
    builder.addCase(saveListingThunk.fulfilled, (state, action) => {
      const listing = state.listings.find((l) => l.id === action.payload);
      if (
        listing &&
        !state.savedListings.find((l) => l.id === action.payload)
      ) {
        state.savedListings.push(listing);
      }
    });

    // Unsave listing
    builder.addCase(unsaveListingThunk.fulfilled, (state, action) => {
      state.savedListings = state.savedListings.filter(
        (l) => l.id !== action.payload,
      );
    });

    // Mark as sold
    builder.addCase(markAsSoldThunk.fulfilled, (state, action) => {
      if (action.payload) {
        const listing = state.myListings.find(
          (l) => l.id === action.payload.id,
        );
        if (listing) {
          listing.isSold = true;
        }
        if (state.currentListing?.id === action.payload.id) {
          state.currentListing.isSold = true;
        }
      }
    });
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
