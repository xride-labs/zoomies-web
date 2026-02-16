import type { RootState } from "../../index";

export const selectMarketplace = (state: RootState) => state.marketplace;
export const selectListings = (state: RootState) => state.marketplace.listings;
export const selectMyListings = (state: RootState) =>
  state.marketplace.myListings;
export const selectSavedListings = (state: RootState) =>
  state.marketplace.savedListings;
export const selectCurrentListing = (state: RootState) =>
  state.marketplace.currentListing;
export const selectMarketplaceFilters = (state: RootState) =>
  state.marketplace.filters;
export const selectMarketplaceLoading = (state: RootState) =>
  state.marketplace.isLoading;
export const selectMarketplaceError = (state: RootState) =>
  state.marketplace.error;
export const selectMarketplaceHasMore = (state: RootState) =>
  state.marketplace.hasMore;

export const selectIsListingSaved = (listingId: string) => (state: RootState) =>
  state.marketplace.savedListings.some((listing) => listing.id === listingId);
