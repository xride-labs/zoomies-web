import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  marketplaceApi,
  type Listing,
  type ListingDetails,
  type CreateListingData,
  type ListingFilters,
} from "@/lib/server/marketplace";

/**
 * Fetch marketplace listings
 */
export const fetchListings = createAsyncThunk(
  "marketplace/fetchListings",
  async (filters: ListingFilters = {}, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.getListings(filters);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch listings",
      );
    }
  },
);

/**
 * Fetch more listings (pagination)
 */
export const fetchMoreListings = createAsyncThunk(
  "marketplace/fetchMore",
  async (filters: ListingFilters, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.getListings(filters);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch more listings",
      );
    }
  },
);

/**
 * Fetch user's listings
 */
export const fetchMyListings = createAsyncThunk(
  "marketplace/fetchMyListings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.getMyListings();
      return response.listings;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch your listings",
      );
    }
  },
);

/**
 * Fetch saved listings
 */
export const fetchSavedListings = createAsyncThunk(
  "marketplace/fetchSaved",
  async (_, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.getSavedListings();
      return response.listings;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to fetch saved listings",
      );
    }
  },
);

/**
 * Fetch listing details
 */
export const fetchListingDetails = createAsyncThunk(
  "marketplace/fetchDetails",
  async (listingId: string, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.getListing(listingId);
      return response.listing;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch listing",
      );
    }
  },
);

/**
 * Create a listing
 */
export const createListingThunk = createAsyncThunk(
  "marketplace/create",
  async (data: CreateListingData, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.createListing(data);
      return response.listing;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create listing",
      );
    }
  },
);

/**
 * Update a listing
 */
export const updateListingThunk = createAsyncThunk(
  "marketplace/update",
  async (
    {
      listingId,
      data,
    }: { listingId: string; data: Partial<CreateListingData> },
    { rejectWithValue },
  ) => {
    try {
      const response = await marketplaceApi.updateListing(listingId, data);
      return response.listing;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update listing",
      );
    }
  },
);

/**
 * Delete a listing
 */
export const deleteListingThunk = createAsyncThunk(
  "marketplace/delete",
  async (listingId: string, { rejectWithValue }) => {
    try {
      await marketplaceApi.deleteListing(listingId);
      return listingId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete listing",
      );
    }
  },
);

/**
 * Save a listing
 */
export const saveListingThunk = createAsyncThunk(
  "marketplace/save",
  async (listingId: string, { rejectWithValue }) => {
    try {
      await marketplaceApi.saveListing(listingId);
      return listingId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to save listing",
      );
    }
  },
);

/**
 * Unsave a listing
 */
export const unsaveListingThunk = createAsyncThunk(
  "marketplace/unsave",
  async (listingId: string, { rejectWithValue }) => {
    try {
      await marketplaceApi.unsaveListing(listingId);
      return listingId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to unsave listing",
      );
    }
  },
);

/**
 * Mark listing as sold
 */
export const markAsSoldThunk = createAsyncThunk(
  "marketplace/markAsSold",
  async (listingId: string, { rejectWithValue }) => {
    try {
      const response = await marketplaceApi.markAsSold(listingId);
      return response.listing;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to mark as sold",
      );
    }
  },
);

// Re-export types
export type { Listing, ListingDetails, CreateListingData, ListingFilters };
