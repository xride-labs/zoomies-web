import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  marketplaceApi,
  type Listing,
  type ListingDetails,
  type CreateListingData,
  type ListingFilters,
} from "@/lib/server/marketplace";

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

export type { Listing, ListingDetails, CreateListingData, ListingFilters };
