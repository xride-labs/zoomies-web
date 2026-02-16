import type { RootState } from "../../index";

export const selectClubs = (state: RootState) => state.clubs;
export const selectMyClubs = (state: RootState) => state.clubs.myClubs;
export const selectDiscoveredClubs = (state: RootState) =>
  state.clubs.discoveredClubs;
export const selectCurrentClub = (state: RootState) => state.clubs.currentClub;
export const selectClubsLoading = (state: RootState) => state.clubs.isLoading;
export const selectClubsError = (state: RootState) => state.clubs.error;
export const selectClubsHasMore = (state: RootState) => state.clubs.hasMore;

export const selectIsClubMember = (clubId: string) => (state: RootState) =>
  state.clubs.myClubs.some((club) => club.id === clubId);
