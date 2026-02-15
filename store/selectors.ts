import type { RootState } from "./index";

// ============================================
// User Selectors
// ============================================
export const selectUser = (state: RootState) => state.user;
export const selectUserProfile = (state: RootState) => state.user.profile;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectUserBikes = (state: RootState) =>
  state.user.profile?.bikes ?? [];
export const selectUserClubs = (state: RootState) =>
  state.user.profile?.clubs ?? [];

// ============================================
// Clubs Selectors
// ============================================
export const selectClubs = (state: RootState) => state.clubs;
export const selectMyClubs = (state: RootState) => state.clubs.myClubs;
export const selectDiscoveredClubs = (state: RootState) =>
  state.clubs.discoveredClubs;
export const selectCurrentClub = (state: RootState) => state.clubs.currentClub;
export const selectClubsLoading = (state: RootState) => state.clubs.isLoading;
export const selectClubsError = (state: RootState) => state.clubs.error;
export const selectClubsHasMore = (state: RootState) => state.clubs.hasMore;

// ============================================
// Rides Selectors
// ============================================
export const selectRides = (state: RootState) => state.rides;
export const selectUpcomingRides = (state: RootState) =>
  state.rides.upcomingRides;
export const selectMyRides = (state: RootState) => state.rides.myRides;
export const selectPastRides = (state: RootState) => state.rides.pastRides;
export const selectCurrentRide = (state: RootState) => state.rides.currentRide;
export const selectActiveRide = (state: RootState) => state.rides.activeRide;
export const selectRidesLoading = (state: RootState) => state.rides.isLoading;
export const selectRidesError = (state: RootState) => state.rides.error;
export const selectRidesHasMore = (state: RootState) => state.rides.hasMore;

// ============================================
// Marketplace Selectors
// ============================================
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

// ============================================
// Feed Selectors
// ============================================
export const selectFeed = (state: RootState) => state.feed;
export const selectPosts = (state: RootState) => state.feed.posts;
export const selectFeedLoading = (state: RootState) => state.feed.isLoading;
export const selectFeedError = (state: RootState) => state.feed.error;
export const selectFeedHasMore = (state: RootState) => state.feed.hasMore;
export const selectFeedPage = (state: RootState) => state.feed.page;

// ============================================
// Computed / Derived Selectors
// ============================================
export const selectIsClubMember = (clubId: string) => (state: RootState) =>
  state.clubs.myClubs.some((club) => club.id === clubId);

export const selectIsRideParticipant = (rideId: string) => (state: RootState) =>
  state.rides.currentRide?.id === rideId &&
  state.rides.currentRide?.isParticipant;

export const selectIsListingSaved = (listingId: string) => (state: RootState) =>
  state.marketplace.savedListings.some((listing) => listing.id === listingId);

export const selectPostById = (postId: string) => (state: RootState) =>
  state.feed.posts.find((post) => post.id === postId);
