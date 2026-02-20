import { apiAuthenticated } from "../base";
import type { Club, ClubDetails, ClubMember } from "@/store/slices/clubsSlice";

// Re-export types from slice for convenience
export type { Club, ClubDetails, ClubMember };

export interface CreateClubData {
  name: string;
  description: string;
  location: string;
  clubType?: string;
  isPublic: boolean;
}

export interface ClubMembership {
  userId: string;
  clubId: string;
  role: string;
  joinedAt: string;
}

// ============ Clubs API ============

/**
 * Get clubs the current user is a member of
 */
export async function getMyClubs(): Promise<{ clubs: Club[] }> {
  return apiAuthenticated.get<{ clubs: Club[] }>("/clubs/my");
}

/**
 * Discover public clubs
 */
export async function discoverClubs(
  page = 1,
): Promise<{ clubs: Club[]; hasMore: boolean }> {
  return apiAuthenticated.get<{ clubs: Club[]; hasMore: boolean }>(
    `/clubs/discover?page=${page}`,
  );
}

/**
 * Get club details by ID
 */
export async function getClub(clubId: string): Promise<{ club: ClubDetails }> {
  return apiAuthenticated.get<{ club: ClubDetails }>(`/clubs/${clubId}`);
}

/**
 * Create a new club
 */
export async function createClub(
  data: CreateClubData,
): Promise<{ club: Club }> {
  return apiAuthenticated.post<{ club: Club }>("/clubs", data);
}

/**
 * Update a club
 */
export async function updateClub(
  clubId: string,
  data: Partial<CreateClubData>,
): Promise<{ club: Club }> {
  return apiAuthenticated.patch<{ club: Club }>(`/clubs/${clubId}`, data);
}

/**
 * Delete a club
 */
export async function deleteClub(clubId: string): Promise<void> {
  return apiAuthenticated.delete<void>(`/clubs/${clubId}`);
}

/**
 * Request to join a club
 */
export async function requestToJoin(
  clubId: string,
): Promise<{ membership: ClubMembership }> {
  return apiAuthenticated.post<{ membership: ClubMembership }>(
    `/clubs/${clubId}/join`,
  );
}

/**
 * Cancel join request
 */
export async function cancelJoinRequest(clubId: string): Promise<void> {
  return apiAuthenticated.delete<void>(`/clubs/${clubId}/join`);
}

/**
 * Leave a club
 */
export async function leaveClub(clubId: string): Promise<void> {
  return apiAuthenticated.delete<void>(`/clubs/${clubId}/leave`);
}

/**
 * Get club members
 */
export async function getMembers(
  clubId: string,
  page = 1,
): Promise<{ members: ClubMember[]; hasMore: boolean }> {
  return apiAuthenticated.get<{ members: ClubMember[]; hasMore: boolean }>(
    `/clubs/${clubId}/members?page=${page}`,
  );
}

/**
 * Update member role
 */
export async function updateMemberRole(
  clubId: string,
  userId: string,
  role: string,
): Promise<{ membership: ClubMembership }> {
  return apiAuthenticated.patch<{ membership: ClubMembership }>(
    `/clubs/${clubId}/members/${userId}`,
    { role },
  );
}

/**
 * Remove a member from club
 */
export async function removeMember(
  clubId: string,
  userId: string,
): Promise<void> {
  return apiAuthenticated.delete<void>(`/clubs/${clubId}/members/${userId}`);
}

/**
 * Get pending join requests
 */
export async function getPendingRequests(
  clubId: string,
): Promise<{ requests: ClubMember[] }> {
  return apiAuthenticated.get<{ requests: ClubMember[] }>(
    `/clubs/${clubId}/requests`,
  );
}

/**
 * Approve join request
 */
export async function approveRequest(
  clubId: string,
  userId: string,
): Promise<void> {
  return apiAuthenticated.post<void>(
    `/clubs/${clubId}/requests/${userId}/approve`,
  );
}

/**
 * Reject join request
 */
export async function rejectRequest(
  clubId: string,
  userId: string,
): Promise<void> {
  return apiAuthenticated.post<void>(
    `/clubs/${clubId}/requests/${userId}/reject`,
  );
}

// Export all as clubsApi object
export const clubsApi = {
  getMyClubs,
  discoverClubs,
  getClub,
  createClub,
  updateClub,
  deleteClub,
  requestToJoin,
  cancelJoinRequest,
  leaveClub,
  getMembers,
  updateMemberRole,
  removeMember,
  getPendingRequests,
  approveRequest,
  rejectRequest,
};
