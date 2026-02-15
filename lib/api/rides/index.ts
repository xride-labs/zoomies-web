import { apiAuthenticated } from "../base";
import type {
  Ride,
  RideDetails,
  RideParticipant,
  RideStatus,
  RideType,
} from "@/store/slices/ridesSlice";

// Re-export types from slice
export type { Ride, RideDetails, RideParticipant, RideStatus, RideType };

export interface CreateRideData {
  title: string;
  description: string;
  startLocation: {
    name: string;
    lat: number;
    lng: number;
  };
  endLocation?: {
    name: string;
    lat: number;
    lng: number;
  };
  scheduledAt: string;
  estimatedDuration: number;
  type: RideType;
  maxParticipants?: number;
  clubId?: string;
}

// ============ Rides API ============

/**
 * Get upcoming rides
 */
export async function getUpcomingRides(
  page = 1,
): Promise<{ rides: Ride[]; hasMore: boolean }> {
  return apiAuthenticated.get<{ rides: Ride[]; hasMore: boolean }>(
    `/rides/upcoming?page=${page}`,
  );
}

/**
 * Get rides the user is participating in
 */
export async function getMyRides(
  page = 1,
): Promise<{ rides: Ride[]; hasMore: boolean }> {
  return apiAuthenticated.get<{ rides: Ride[]; hasMore: boolean }>(
    `/rides/my?page=${page}`,
  );
}

/**
 * Get past rides
 */
export async function getPastRides(
  page = 1,
): Promise<{ rides: Ride[]; hasMore: boolean }> {
  return apiAuthenticated.get<{ rides: Ride[]; hasMore: boolean }>(
    `/rides/past?page=${page}`,
  );
}

/**
 * Get ride details by ID
 */
export async function getRide(rideId: string): Promise<{ ride: RideDetails }> {
  return apiAuthenticated.get<{ ride: RideDetails }>(`/rides/${rideId}`);
}

/**
 * Create a new ride
 */
export async function createRide(
  data: CreateRideData,
): Promise<{ ride: Ride }> {
  return apiAuthenticated.post<{ ride: Ride }>("/rides", data);
}

/**
 * Update a ride
 */
export async function updateRide(
  rideId: string,
  data: Partial<CreateRideData>,
): Promise<{ ride: Ride }> {
  return apiAuthenticated.patch<{ ride: Ride }>(`/rides/${rideId}`, data);
}

/**
 * Delete a ride
 */
export async function deleteRide(rideId: string): Promise<void> {
  return apiAuthenticated.delete<void>(`/rides/${rideId}`);
}

/**
 * Join a ride
 */
export async function joinRide(
  rideId: string,
): Promise<{ participant: { id: string; status: string } }> {
  return apiAuthenticated.post<{ participant: { id: string; status: string } }>(
    `/rides/${rideId}/join`,
  );
}

/**
 * Leave a ride
 */
export async function leaveRide(rideId: string): Promise<void> {
  return apiAuthenticated.delete<void>(`/rides/${rideId}/leave`);
}

/**
 * Start a ride (organizer only)
 */
export async function startRide(
  rideId: string,
): Promise<{ ride: RideDetails }> {
  return apiAuthenticated.post<{ ride: RideDetails }>(`/rides/${rideId}/start`);
}

/**
 * End a ride (organizer only)
 */
export async function endRide(rideId: string): Promise<{ ride: RideDetails }> {
  return apiAuthenticated.post<{ ride: RideDetails }>(`/rides/${rideId}/end`);
}

/**
 * Update live location during a ride
 */
export async function updateLocation(
  rideId: string,
  location: { lat: number; lng: number },
): Promise<void> {
  return apiAuthenticated.post<void>(`/rides/${rideId}/location`, location);
}

/**
 * Update rider status during a ride
 */
export async function updateStatus(
  rideId: string,
  status: "ok" | "need-help" | "emergency",
): Promise<void> {
  return apiAuthenticated.post<void>(`/rides/${rideId}/status`, { status });
}

/**
 * Get rides for a specific club
 */
export async function getClubRides(
  clubId: string,
  page = 1,
): Promise<{ rides: Ride[]; hasMore: boolean }> {
  return apiAuthenticated.get<{ rides: Ride[]; hasMore: boolean }>(
    `/clubs/${clubId}/rides?page=${page}`,
  );
}

// Export all as ridesApi object
export const ridesApi = {
  getUpcomingRides,
  getMyRides,
  getPastRides,
  getRide,
  createRide,
  updateRide,
  deleteRide,
  joinRide,
  leaveRide,
  startRide,
  endRide,
  updateLocation,
  updateStatus,
  getClubRides,
};
