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

export interface AdminUserRecord {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  phone: string | null;
  roles: string[];
  ridesCompleted: number | null;
  createdAt: string;
  _count: {
    createdRides: number;
    createdClubs: number;
  };
}

export interface AdminRideRecord {
  id: string;
  title: string;
  description: string | null;
  startLocation: string;
  endLocation: string | null;
  experienceLevel: string | null;
  pace: string | null;
  distance: number | null;
  duration: number | null;
  scheduledAt: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    name: string | null;
    image: string | null;
  };
  _count: {
    participants: number;
  };
}

export interface AdminClubRecord {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  establishedAt: string | null;
  verified: boolean;
  image: string | null;
  coverImage: string | null;
  clubType: string | null;
  isPublic: boolean;
  memberCount: number;
  trophies: string[];
  trophyCount: number;
  gallery: string[];
  reputation: number | null;
  owner: {
    id: string;
    name: string | null;
    image: string | null;
  };
  createdAt: string;
  updatedAt: string;
  _count: {
    members: number;
  };
}

export interface AdminListingRecord {
  id: string;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  images: string[];
  category: string | null;
  subcategory: string | null;
  specifications: string | null;
  condition: string | null;
  status: string;
  seller: {
    id: string;
    name: string | null;
    image: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AdminReportRecord {
  id: string;
  type: string;
  title: string;
  description?: string;
  reportedItem: { id: string; name: string; type: string };
  reporter: { id: string; name: string };
  status: string;
  priority: string;
  createdAt: string;
}

export interface AdminPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: AdminPagination;
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
  return apiAuthenticated.get<AdminStats>("/api/admin/stats");
}

/**
 * Get all users with pagination and filters
 */
export async function getUsers(
  filters?: UserFilters,
): Promise<PaginatedData<AdminUserRecord>> {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }
  return apiAuthenticated.get<PaginatedData<AdminUserRecord>>(
    `/admin/users?${queryParams}`,
  );
}

/**
 * Get user details by ID
 */
export async function getUserById(userId: string): Promise<AdminUserRecord> {
  return apiAuthenticated.get<AdminUserRecord>(`/admin/users/${userId}`);
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
): Promise<PaginatedData<AdminRideRecord>> {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }
  return apiAuthenticated.get<PaginatedData<AdminRideRecord>>(
    `/admin/rides?${queryParams}`,
  );
}

/**
 * Get all clubs with filters
 */
export async function getClubs(
  filters?: ClubFilters,
): Promise<PaginatedData<AdminClubRecord>> {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }
  return apiAuthenticated.get<PaginatedData<AdminClubRecord>>(
    `/admin/clubs?${queryParams}`,
  );
}

/**
 * Get all marketplace listings with filters
 */
export async function getListings(
  filters?: ListingFilters,
): Promise<PaginatedData<AdminListingRecord>> {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }
  return apiAuthenticated.get<PaginatedData<AdminListingRecord>>(
    `/admin/marketplace?${queryParams}`,
  );
}

/**
 * Get all reports with filters
 */
export async function getReports(
  filters?: ReportFilters,
): Promise<PaginatedData<AdminReportRecord>> {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }
  return apiAuthenticated.get<PaginatedData<AdminReportRecord>>(
    `/admin/reports?${queryParams}`,
  );
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
