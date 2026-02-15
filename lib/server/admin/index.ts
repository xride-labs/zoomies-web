import { apiAuthenticated } from "../base";

// ============ Types ============
export interface AdminStats {
  overview: {
    totalUsers: number;
    totalRides: number;
    totalClubs: number;
    totalListings: number;
    activeRides: number;
    completedRides: number;
    verifiedClubs: number;
  };
  recent: {
    newUsersLast7Days: number;
    newRidesLast7Days: number;
  };
  breakdown: {
    usersByRole: Record<string, number>;
    ridesByStatus: Record<string, number>;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar: string | null;
  roles: string[];
  status: string;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface AdminPagination {
  total: number;
  page: number;
  pages: number;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}

export interface RideFilters {
  page?: number;
  status?: string;
  search?: string;
}

export interface ClubFilters {
  page?: number;
  verified?: boolean;
  search?: string;
}

export interface ListingFilters {
  page?: number;
  status?: string;
  search?: string;
}

export interface ReportFilters {
  page?: number;
  status?: string;
}

// ============ Admin API ============

/**
 * Get admin dashboard statistics
 */
export async function getStats(): Promise<AdminStats> {
  return apiAuthenticated.get<AdminStats>("/admin/stats");
}

/**
 * Get all users with pagination and filters
 */
export async function getUsers(
  filters?: UserFilters,
): Promise<{ users: AdminUser[]; pagination: AdminPagination }> {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }
  return apiAuthenticated.get<{
    users: AdminUser[];
    pagination: AdminPagination;
  }>(`/admin/users?${queryParams}`);
}

/**
 * Get user details by ID
 */
export async function getUserById(userId: string): Promise<AdminUser> {
  return apiAuthenticated.get<AdminUser>(`/admin/users/${userId}`);
}

/**
 * Update user role
 */
export async function updateUserRole(
  userId: string,
  role: string,
): Promise<void> {
  return apiAuthenticated.patch<void>(`/admin/users/${userId}/role`, { role });
}

/**
 * Update user status (active, suspended, etc.)
 */
export async function updateUserStatus(
  userId: string,
  status: string,
): Promise<void> {
  return apiAuthenticated.patch<void>(`/admin/users/${userId}/status`, {
    status,
  });
}

/**
 * Get all rides with filters
 */
export async function getRides(
  filters?: RideFilters,
): Promise<{ rides: unknown[]; pagination: AdminPagination }> {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }
  return apiAuthenticated.get<{
    rides: unknown[];
    pagination: AdminPagination;
  }>(`/admin/rides?${queryParams}`);
}

/**
 * Get all clubs with filters
 */
export async function getClubs(
  filters?: ClubFilters,
): Promise<{ clubs: unknown[]; pagination: AdminPagination }> {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }
  return apiAuthenticated.get<{
    clubs: unknown[];
    pagination: AdminPagination;
  }>(`/admin/clubs?${queryParams}`);
}

/**
 * Get all marketplace listings with filters
 */
export async function getListings(
  filters?: ListingFilters,
): Promise<{ listings: unknown[]; pagination: AdminPagination }> {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }
  return apiAuthenticated.get<{
    listings: unknown[];
    pagination: AdminPagination;
  }>(`/admin/marketplace?${queryParams}`);
}

/**
 * Get all reports with filters
 */
export async function getReports(
  filters?: ReportFilters,
): Promise<{ reports: unknown[]; pagination: AdminPagination }> {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }
  return apiAuthenticated.get<{
    reports: unknown[];
    pagination: AdminPagination;
  }>(`/admin/reports?${queryParams}`);
}

/**
 * Update report status
 */
export async function updateReport(
  reportId: string,
  data: { status: string; resolution?: string },
): Promise<void> {
  return apiAuthenticated.patch<void>(`/admin/reports/${reportId}`, data);
}

/**
 * Verify a club
 */
export async function verifyClub(clubId: string): Promise<void> {
  return apiAuthenticated.patch<void>(`/admin/clubs/${clubId}/verify`, {});
}

// Export all as adminApi object
export const adminApi = {
  getStats,
  getUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
  getRides,
  getClubs,
  getListings,
  getReports,
  updateReport,
  verifyClub,
};
