import { apiClient } from "./api";
import { UserProfile, Bike } from "@/store/slices/userSlice";
import { Club, ClubDetails } from "@/store/slices/clubsSlice";
import { Ride, RideDetails } from "@/store/slices/ridesSlice";
import {
  Listing,
  ListingDetails,
  ListingCategory,
  ListingCondition,
} from "@/store/slices/marketplaceSlice";
import { Post } from "@/store/slices/feedSlice";

// ============ Auth API ============
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    apiClient.post<{ user: UserProfile; token: string }>(
      "/auth/register",
      data,
    ),

  login: (data: { email: string; password: string }) =>
    apiClient.post<{ user: UserProfile; token: string }>("/auth/login", data),

  forgotPassword: (email: string) =>
    apiClient.post<{ message: string }>("/auth/forgot-password", { email }),

  resetPassword: (data: { token: string; password: string }) =>
    apiClient.post<{ message: string }>("/auth/reset-password", data),

  verifyEmail: (token: string) =>
    apiClient.post<{ message: string }>("/auth/verify-email", { token }),
};

// ============ User API ============
export const userAPI = {
  getProfile: () => apiClient.get<UserProfile>("/users/me"),

  updateProfile: (data: Partial<UserProfile>) =>
    apiClient.patch<UserProfile>("/users/me", data),

  getPublicProfile: (username: string) =>
    apiClient.get<UserProfile>(`/users/${username}`),

  addBike: (data: Omit<Bike, "id">) =>
    apiClient.post<Bike>("/users/me/bikes", data),

  updateBike: (bikeId: string, data: Partial<Bike>) =>
    apiClient.patch<Bike>(`/users/me/bikes/${bikeId}`, data),

  deleteBike: (bikeId: string) => apiClient.delete(`/users/me/bikes/${bikeId}`),

  followUser: (userId: string) => apiClient.post(`/users/${userId}/follow`),

  unfollowUser: (userId: string) => apiClient.delete(`/users/${userId}/follow`),

  getFollowers: (userId: string, page = 1) =>
    apiClient.get<{ users: UserProfile[]; hasMore: boolean }>(
      `/users/${userId}/followers?page=${page}`,
    ),

  getFollowing: (userId: string, page = 1) =>
    apiClient.get<{ users: UserProfile[]; hasMore: boolean }>(
      `/users/${userId}/following?page=${page}`,
    ),
};

// ============ Clubs API ============
export const clubsAPI = {
  getMyClubs: () => apiClient.get<Club[]>("/clubs/my"),

  getClub: (clubId: string) => apiClient.get<ClubDetails>(`/clubs/${clubId}`),

  createClub: (data: {
    name: string;
    description: string;
    location: string;
    isPrivate: boolean;
  }) => apiClient.post<Club>("/clubs", data),

  updateClub: (clubId: string, data: Partial<Club>) =>
    apiClient.patch<Club>(`/clubs/${clubId}`, data),

  deleteClub: (clubId: string) => apiClient.delete(`/clubs/${clubId}`),

  requestToJoin: (clubId: string) => apiClient.post(`/clubs/${clubId}/join`),

  cancelJoinRequest: (clubId: string) =>
    apiClient.delete(`/clubs/${clubId}/join`),

  leaveClub: (clubId: string) => apiClient.delete(`/clubs/${clubId}/leave`),

  getMembers: (clubId: string, page = 1) =>
    apiClient.get<{ members: UserProfile[]; hasMore: boolean }>(
      `/clubs/${clubId}/members?page=${page}`,
    ),

  updateMemberRole: (clubId: string, userId: string, role: string) =>
    apiClient.patch(`/clubs/${clubId}/members/${userId}`, { role }),

  removeMember: (clubId: string, userId: string) =>
    apiClient.delete(`/clubs/${clubId}/members/${userId}`),

  getPendingRequests: (clubId: string) =>
    apiClient.get<UserProfile[]>(`/clubs/${clubId}/requests`),

  approveRequest: (clubId: string, userId: string) =>
    apiClient.post(`/clubs/${clubId}/requests/${userId}/approve`),

  rejectRequest: (clubId: string, userId: string) =>
    apiClient.post(`/clubs/${clubId}/requests/${userId}/reject`),
};

// ============ Rides API ============
export const ridesAPI = {
  getUpcomingRides: (page = 1) =>
    apiClient.get<{ rides: Ride[]; hasMore: boolean }>(
      `/rides/upcoming?page=${page}`,
    ),

  getMyRides: (page = 1) =>
    apiClient.get<{ rides: Ride[]; hasMore: boolean }>(
      `/rides/my?page=${page}`,
    ),

  getPastRides: (page = 1) =>
    apiClient.get<{ rides: Ride[]; hasMore: boolean }>(
      `/rides/past?page=${page}`,
    ),

  getRide: (rideId: string) => apiClient.get<RideDetails>(`/rides/${rideId}`),

  createRide: (data: Partial<Ride>) => apiClient.post<Ride>("/rides", data),

  updateRide: (rideId: string, data: Partial<Ride>) =>
    apiClient.patch<Ride>(`/rides/${rideId}`, data),

  deleteRide: (rideId: string) => apiClient.delete(`/rides/${rideId}`),

  joinRide: (rideId: string) => apiClient.post(`/rides/${rideId}/join`),

  leaveRide: (rideId: string) => apiClient.delete(`/rides/${rideId}/leave`),

  startRide: (rideId: string) => apiClient.post(`/rides/${rideId}/start`),

  endRide: (rideId: string) => apiClient.post(`/rides/${rideId}/end`),

  updateLocation: (rideId: string, location: { lat: number; lng: number }) =>
    apiClient.post(`/rides/${rideId}/location`, location),

  updateStatus: (rideId: string, status: "ok" | "need-help" | "emergency") =>
    apiClient.post(`/rides/${rideId}/status`, { status }),

  getClubRides: (clubId: string, page = 1) =>
    apiClient.get<{ rides: Ride[]; hasMore: boolean }>(
      `/clubs/${clubId}/rides?page=${page}`,
    ),
};

// ============ Marketplace API ============
export const marketplaceAPI = {
  getListings: (params: {
    page?: number;
    category?: ListingCategory;
    condition?: ListingCondition;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
    return apiClient.get<{ listings: Listing[]; hasMore: boolean }>(
      `/marketplace?${queryParams}`,
    );
  },

  getMyListings: () => apiClient.get<Listing[]>("/marketplace/my"),

  getSavedListings: () => apiClient.get<Listing[]>("/marketplace/saved"),

  getListing: (listingId: string) =>
    apiClient.get<ListingDetails>(`/marketplace/${listingId}`),

  createListing: (data: Partial<Listing>) =>
    apiClient.post<Listing>("/marketplace", data),

  updateListing: (listingId: string, data: Partial<Listing>) =>
    apiClient.patch<Listing>(`/marketplace/${listingId}`, data),

  deleteListing: (listingId: string) =>
    apiClient.delete(`/marketplace/${listingId}`),

  saveListing: (listingId: string) =>
    apiClient.post(`/marketplace/${listingId}/save`),

  unsaveListing: (listingId: string) =>
    apiClient.delete(`/marketplace/${listingId}/save`),

  markAsSold: (listingId: string) =>
    apiClient.patch(`/marketplace/${listingId}`, { isSold: true }),
};

// ============ Feed API ============
export const feedAPI = {
  getFeed: (page = 1) =>
    apiClient.get<{ posts: Post[]; hasMore: boolean }>(`/feed?page=${page}`),

  getPost: (postId: string) => apiClient.get<Post>(`/posts/${postId}`),

  createPost: (data: { content: string; images?: string[] }) =>
    apiClient.post<Post>("/posts", data),

  updatePost: (postId: string, data: Partial<Post>) =>
    apiClient.patch<Post>(`/posts/${postId}`, data),

  deletePost: (postId: string) => apiClient.delete(`/posts/${postId}`),

  likePost: (postId: string) => apiClient.post(`/posts/${postId}/like`),

  unlikePost: (postId: string) => apiClient.delete(`/posts/${postId}/like`),

  savePost: (postId: string) => apiClient.post(`/posts/${postId}/save`),

  unsavePost: (postId: string) => apiClient.delete(`/posts/${postId}/save`),

  getComments: (postId: string, page = 1) =>
    apiClient.get<{ comments: Comment[]; hasMore: boolean }>(
      `/posts/${postId}/comments?page=${page}`,
    ),

  addComment: (postId: string, content: string) =>
    apiClient.post(`/posts/${postId}/comments`, { content }),

  deleteComment: (postId: string, commentId: string) =>
    apiClient.delete(`/posts/${postId}/comments/${commentId}`),

  getUserPosts: (userId: string, page = 1) =>
    apiClient.get<{ posts: Post[]; hasMore: boolean }>(
      `/users/${userId}/posts?page=${page}`,
    ),
};
