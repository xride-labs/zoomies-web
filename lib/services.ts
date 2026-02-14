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
  getProfile: () => apiClient.get<{ user: UserProfile }>("/users/me"),

  updateProfile: (data: Partial<UserProfile>) =>
    apiClient.patch<{ user: UserProfile }>("/users/me", data),

  getPublicProfile: (username: string) =>
    apiClient.get<{ user: UserProfile }>(`/users/${username}`),

  addBike: (data: Omit<Bike, "id">) =>
    apiClient.post<{ bike: Bike }>("/users/me/bikes", data),

  updateBike: (bikeId: string, data: Partial<Bike>) =>
    apiClient.patch<{ bike: Bike }>(`/users/me/bikes/${bikeId}`, data),

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
  getMyClubs: () => apiClient.get<{ clubs: Club[] }>("/clubs/my"),

  discoverClubs: (page = 1) =>
    apiClient.get<{ clubs: Club[]; hasMore: boolean }>(
      `/clubs/discover?page=${page}`,
    ),

  getClub: (clubId: string) =>
    apiClient.get<{ club: ClubDetails }>(`/clubs/${clubId}`),

  createClub: (data: {
    name: string;
    description: string;
    location: string;
    isPrivate: boolean;
  }) => apiClient.post<{ club: Club }>("/clubs", data),

  updateClub: (clubId: string, data: Partial<Club>) =>
    apiClient.patch<{ club: Club }>(`/clubs/${clubId}`, data),

  deleteClub: (clubId: string) => apiClient.delete(`/clubs/${clubId}`),

  requestToJoin: (clubId: string) =>
    apiClient.post<{ membership: unknown }>(`/clubs/${clubId}/join`),

  cancelJoinRequest: (clubId: string) =>
    apiClient.delete(`/clubs/${clubId}/join`),

  leaveClub: (clubId: string) => apiClient.delete(`/clubs/${clubId}/leave`),

  getMembers: (clubId: string, page = 1) =>
    apiClient.get<{ members: UserProfile[]; hasMore: boolean }>(
      `/clubs/${clubId}/members?page=${page}`,
    ),

  updateMemberRole: (clubId: string, userId: string, role: string) =>
    apiClient.patch<{ membership: unknown }>(
      `/clubs/${clubId}/members/${userId}`,
      { role },
    ),

  removeMember: (clubId: string, userId: string) =>
    apiClient.delete(`/clubs/${clubId}/members/${userId}`),

  getPendingRequests: (clubId: string) =>
    apiClient.get<{ requests: UserProfile[] }>(`/clubs/${clubId}/requests`),

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

  getRide: (rideId: string) =>
    apiClient.get<{ ride: RideDetails }>(`/rides/${rideId}`),

  createRide: (data: Partial<Ride>) =>
    apiClient.post<{ ride: Ride }>("/rides", data),

  updateRide: (rideId: string, data: Partial<Ride>) =>
    apiClient.patch<{ ride: Ride }>(`/rides/${rideId}`, data),

  deleteRide: (rideId: string) => apiClient.delete(`/rides/${rideId}`),

  joinRide: (rideId: string) =>
    apiClient.post<{ participant: unknown }>(`/rides/${rideId}/join`),

  leaveRide: (rideId: string) => apiClient.delete(`/rides/${rideId}/leave`),

  startRide: (rideId: string) =>
    apiClient.post<{ ride: Ride }>(`/rides/${rideId}/start`),

  endRide: (rideId: string) =>
    apiClient.post<{ ride: Ride }>(`/rides/${rideId}/end`),

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

  getMyListings: () =>
    apiClient.get<{ listings: Listing[] }>("/marketplace/my"),

  getSavedListings: () =>
    apiClient.get<{ listings: Listing[] }>("/marketplace/saved"),

  getListing: (listingId: string) =>
    apiClient.get<{ listing: ListingDetails }>(`/marketplace/${listingId}`),

  createListing: (data: Partial<Listing>) =>
    apiClient.post<{ listing: Listing }>("/marketplace", data),

  updateListing: (listingId: string, data: Partial<Listing>) =>
    apiClient.patch<{ listing: Listing }>(`/marketplace/${listingId}`, data),

  deleteListing: (listingId: string) =>
    apiClient.delete(`/marketplace/${listingId}`),

  saveListing: (listingId: string) =>
    apiClient.post(`/marketplace/${listingId}/save`),

  unsaveListing: (listingId: string) =>
    apiClient.delete(`/marketplace/${listingId}/save`),

  markAsSold: (listingId: string) =>
    apiClient.patch<{ listing: Listing }>(`/marketplace/${listingId}`, {
      isSold: true,
    }),
};

// ============ Admin API ============
export const adminAPI = {
  getStats: () =>
    apiClient.get<{
      overview: {
        totalUsers: number;
        totalRides: number;
        totalClubs: number;
        totalListings: number;
        activeRides: number;
        completedRides: number;
        verifiedClubs: number;
      };
      recent: { newUsersLast7Days: number; newRidesLast7Days: number };
      breakdown: {
        usersByRole: Record<string, number>;
        ridesByStatus: Record<string, number>;
      };
    }>("/admin/stats"),

  getUsers: (params?: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null)
          queryParams.append(key, String(value));
      });
    }
    return apiClient.get<{
      users: any[];
      pagination: { total: number; page: number; pages: number };
    }>(`/admin/users?${queryParams}`);
  },

  getUserById: (userId: string) => apiClient.get<any>(`/admin/users/${userId}`),

  updateUserRole: (userId: string, role: string) =>
    apiClient.patch(`/admin/users/${userId}/role`, { role }),

  updateUserStatus: (userId: string, status: string) =>
    apiClient.patch(`/admin/users/${userId}/status`, { status }),

  getRides: (params?: { page?: number; status?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null)
          queryParams.append(key, String(value));
      });
    }
    return apiClient.get<any>(`/admin/rides?${queryParams}`);
  },

  getClubs: (params?: {
    page?: number;
    verified?: boolean;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null)
          queryParams.append(key, String(value));
      });
    }
    return apiClient.get<any>(`/admin/clubs?${queryParams}`);
  },

  getListings: (params?: {
    page?: number;
    status?: string;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null)
          queryParams.append(key, String(value));
      });
    }
    return apiClient.get<any>(`/admin/marketplace?${queryParams}`);
  },

  getReports: (params?: { page?: number; status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null)
          queryParams.append(key, String(value));
      });
    }
    return apiClient.get<any>(`/admin/reports?${queryParams}`);
  },

  updateReport: (
    reportId: string,
    data: { status: string; resolution?: string },
  ) => apiClient.patch(`/admin/reports/${reportId}`, data),

  verifyClub: (clubId: string) =>
    apiClient.patch(`/admin/clubs/${clubId}/verify`, {}),
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
