import { useAppDispatch, useAppSelector } from "../shared/hooks";
import {
  selectUpcomingRides,
  selectMyRides,
  selectPastRides,
  selectCurrentRide,
  selectActiveRide,
  selectRidesLoading,
  selectRidesError,
} from "./selectors";
import {
  fetchUpcomingRides,
  fetchMyRides,
  fetchPastRides,
  fetchRideDetails,
  createRideThunk,
  updateRideThunk,
  deleteRideThunk,
  joinRideThunk,
  leaveRideThunk,
  startRideThunk,
  endRideThunk,
} from "./thunks";

export const useRides = () => {
  const dispatch = useAppDispatch();
  const upcomingRides = useAppSelector(selectUpcomingRides);
  const myRides = useAppSelector(selectMyRides);
  const pastRides = useAppSelector(selectPastRides);
  const currentRide = useAppSelector(selectCurrentRide);
  const activeRide = useAppSelector(selectActiveRide);
  const isLoading = useAppSelector(selectRidesLoading);
  const error = useAppSelector(selectRidesError);

  return {
    upcomingRides,
    myRides,
    pastRides,
    currentRide,
    activeRide,
    isLoading,
    error,
    fetchUpcomingRides: (page?: number) =>
      dispatch(fetchUpcomingRides(page || 1)),
    fetchMyRides: (page?: number) => dispatch(fetchMyRides(page || 1)),
    fetchPastRides: (page?: number) => dispatch(fetchPastRides(page || 1)),
    fetchRideDetails: (rideId: string) => dispatch(fetchRideDetails(rideId)),
    createRide: (data: any) => dispatch(createRideThunk(data)),
    updateRide: (rideId: string, data: any) =>
      dispatch(updateRideThunk({ rideId, data })),
    deleteRide: (rideId: string) => dispatch(deleteRideThunk(rideId)),
    joinRide: (rideId: string) => dispatch(joinRideThunk(rideId)),
    leaveRide: (rideId: string) => dispatch(leaveRideThunk(rideId)),
    startRide: (rideId: string) => dispatch(startRideThunk(rideId)),
    endRide: (rideId: string) => dispatch(endRideThunk(rideId)),
  };
};
