import type { RootState } from "../../index";

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

export const selectIsRideParticipant = (rideId: string) => (state: RootState) =>
  state.rides.currentRide?.id === rideId &&
  state.rides.currentRide?.isParticipant;
