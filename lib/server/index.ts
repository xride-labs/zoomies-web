// Re-export base utilities
export { apiAuthenticated, apiUnauthenticated } from "./base";
export type { ApiResponse, PaginatedResponse, ApiError } from "./base";

// Re-export auth API
export * from "./auth";
export { authApi } from "./auth";

// Re-export user API
export * from "./user";
export { userApi } from "./user";

// Re-export clubs API
export * from "./clubs";
export { clubsApi } from "./clubs";

// Re-export rides API
export * from "./rides";
export { ridesApi } from "./rides";

// Re-export marketplace API (excluding conflicting exports)
export {
  marketplaceApi,
  getListings as getMarketplaceListings,
  getListing,
  getMyListings,
  getSavedListings,
  createListing,
  updateListing,
  deleteListing,
  saveListing,
  unsaveListing,
  markAsSold,
  type CreateListingData,
  type ListingFilters as MarketplaceFilters,
} from "./marketplace";

// Re-export admin API
export * from "./admin";
export { adminApi } from "./admin";

// Re-export feed API
export * from "./feed";
export { feedApi } from "./feed";

// Re-export media API
export * from "./media";
export { mediaApi } from "./media";
