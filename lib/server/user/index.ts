import { apiAuthenticated } from "../base";
import type { UserProfile, Bike, ClubBadge } from "@/store/slices/userSlice";

// Re-export types from slice
export type { UserProfile, Bike, ClubBadge };

export interface UpdateProfileData {
  name?: string;
  username?: string;
  bio?: string;
  location?: string;
}

// ============ User API ============

/**
 * Get current user's profile
 */
export async function getProfile(): Promise<{ user: UserProfile }> {
  return apiAuthenticated.get<{ user: UserProfile }>("/account/me");
}

/**
 * Get current user with roles (from auth endpoint)
 */
export async function getMe(): Promise<{
  user: UserProfile & { roles: string[] };
}> {
  return apiAuthenticated.get<{ user: UserProfile & { roles: string[] } }>(
    "/account/me",
  );
}

/**
 * Update current user's profile
 */
export async function updateProfile(
  data: UpdateProfileData,
): Promise<{ user: UserProfile }> {
  return apiAuthenticated.patch<{ user: UserProfile }>("/account/me", data);
}

/**
 * Get a public user profile by username
 */
export async function getPublicProfile(
  username: string,
): Promise<{ user: UserProfile }> {
  return apiAuthenticated.get<{ user: UserProfile }>(`/users/${username}`);
}

/**
 * Add a bike to user's garage
 */
export async function addBike(data: Omit<Bike, "id">): Promise<{ bike: Bike }> {
  return apiAuthenticated.post<{ bike: Bike }>("/users/me/bikes", data);
}

/**
 * Update a bike
 */
export async function updateBike(
  bikeId: string,
  data: Partial<Bike>,
): Promise<{ bike: Bike }> {
  return apiAuthenticated.patch<{ bike: Bike }>(
    `/users/me/bikes/${bikeId}`,
    data,
  );
}

/**
 * Delete a bike
 */
export async function deleteBike(bikeId: string): Promise<void> {
  return apiAuthenticated.delete<void>(`/users/me/bikes/${bikeId}`);
}

/**
 * Follow a user
 */
export async function followUser(userId: string): Promise<void> {
  return apiAuthenticated.post<void>(`/users/${userId}/follow`);
}

/**
 * Unfollow a user
 */
export async function unfollowUser(userId: string): Promise<void> {
  return apiAuthenticated.delete<void>(`/users/${userId}/follow`);
}

/**
 * Get user's followers
 */
export async function getFollowers(
  userId: string,
  page = 1,
): Promise<{ users: UserProfile[]; hasMore: boolean }> {
  return apiAuthenticated.get<{ users: UserProfile[]; hasMore: boolean }>(
    `/users/${userId}/followers?page=${page}`,
  );
}

/**
 * Get users that a user is following
 */
export async function getFollowing(
  userId: string,
  page = 1,
): Promise<{ users: UserProfile[]; hasMore: boolean }> {
  return apiAuthenticated.get<{ users: UserProfile[]; hasMore: boolean }>(
    `/users/${userId}/following?page=${page}`,
  );
}

// Export all as userApi object for convenience
export const userApi = {
  getProfile,
  getMe,
  updateProfile,
  getPublicProfile,
  addBike,
  updateBike,
  deleteBike,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
