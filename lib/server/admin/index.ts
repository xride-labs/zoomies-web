import { apiAuthenticated } from '../base'

// ============ Types ============
export interface AdminStats {
  overview: {
    totalUsers: number
    totalRides: number
    totalClubs: number
    totalListings: number
    activeRides: number
    completedRides: number
    verifiedClubs: number
    pendingReports: number
    highPriorityReports: number
  }
  recent: {
    newUsersLast7Days: number
    newRidesLast7Days: number
    reportsLast7Days: number
  }
  breakdown: {
    usersByRole: Record<string, number>
    ridesByStatus: Record<string, number>
  }
}

export interface AdminWeeklyActivityPoint {
  label: string
  date: string
  usersRegistered: number
  ridesCreated: number
  clubsCreated: number
  listingsCreated: number
  reportsCreated: number
}

export interface AdminWeeklyActivity {
  days: number
  activity: AdminWeeklyActivityPoint[]
}

export interface AdminUserRecord {
  id: string
  email: string | null
  name: string | null
  username?: string | null
  image: string | null
  phone: string | null
  bio?: string | null
  location?: string | null
  activityLevel?: string
  emailVerified?: boolean
  phoneVerified?: boolean
  status?: 'active' | 'pending'
  lastActive?: string
  roles: string[]
  ridesCompleted: number | null
  createdAt: string
  _count: {
    createdRides: number
    createdClubs: number
  }
}

export interface AdminRideRecord {
  id: string
  title: string
  description: string | null
  startLocation: string
  endLocation: string | null
  experienceLevel: string | null
  pace: string | null
  distance: number | null
  duration: number | null
  scheduledAt: string | null
  status: string
  createdAt: string
  updatedAt: string
  creator: {
    id: string
    name: string | null
    image: string | null
  }
  _count: {
    participants: number
  }
}

export interface AdminClubRecord {
  id: string
  name: string
  description: string | null
  location: string | null
  establishedAt: string | null
  verified: boolean
  image: string | null
  coverImage: string | null
  clubType: string | null
  isPublic: boolean
  memberCount: number
  trophies: string[]
  trophyCount: number
  gallery: string[]
  reputation: number | null
  owner: {
    id: string
    name: string | null
    image: string | null
  }
  createdAt: string
  updatedAt: string
  _count: {
    members: number
  }
}

export interface AdminListingRecord {
  id: string
  title: string
  description: string | null
  price: number
  currency: string
  images: string[]
  category: string | null
  subcategory: string | null
  specifications: string | null
  condition: string | null
  status: string
  seller: {
    id: string
    name: string | null
    image: string | null
  }
  createdAt: string
  updatedAt: string
}

export interface AdminReportRecord {
  id: string
  type: string
  title: string
  description?: string
  reportedItem: { id: string; name: string; type: string }
  reporter: { id: string; name: string }
  status: string
  priority: string
  createdAt: string
}

export interface AdminPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedData<T> {
  items: T[]
  pagination: AdminPagination
}

export interface UserFilters {
  page?: number
  limit?: number
  role?: string
  status?: 'active' | 'pending'
  search?: string
}

export interface CreateAdminUserInput {
  email: string
  password: string
  name?: string
  username?: string
  phone?: string
  bio?: string
  location?: string
  activityLevel?: 'Casual' | 'Regular' | 'Enthusiast' | 'Pro'
  roles?: Array<'ADMIN' | 'CO_ADMIN' | 'RIDER' | 'SELLER' | 'CLUB_OWNER'>
}

export interface UpdateAdminUserInput {
  email?: string
  name?: string
  username?: string
  phone?: string | null
  bio?: string | null
  location?: string | null
  activityLevel?: 'Casual' | 'Regular' | 'Enthusiast' | 'Pro'
  emailVerified?: boolean
  phoneVerified?: boolean
  roles?: Array<'ADMIN' | 'CO_ADMIN' | 'RIDER' | 'SELLER' | 'CLUB_OWNER'>
}

export interface RideFilters {
  page?: number
  status?: string
  search?: string
}

export interface ClubFilters {
  page?: number
  verified?: boolean
  search?: string
}

export interface ListingFilters {
  page?: number
  status?: string
  search?: string
}

export interface ReportFilters {
  page?: number
  status?: string
}

// ============ Admin API ============

/**
 * Get admin dashboard statistics
 */
export async function getStats(): Promise<AdminStats> {
  return apiAuthenticated.get<AdminStats>('/admin/stats')
}

/**
 * Get weekly activity metrics for admin dashboard charts
 */
export async function getWeeklyActivity(days = 7): Promise<AdminWeeklyActivity> {
  return apiAuthenticated.get<AdminWeeklyActivity>(`/admin/activity/weekly?days=${days}`)
}

/**
 * Get all users with pagination and filters
 */
export async function getUsers(
  filters?: UserFilters,
): Promise<PaginatedData<AdminUserRecord>> {
  const queryParams = new URLSearchParams()
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value))
      }
    })
  }
  return apiAuthenticated.get<PaginatedData<AdminUserRecord>>(
    `/admin/users?${queryParams}`,
  )
}

/**
 * Get user details by ID
 */
export async function getUserById(userId: string): Promise<AdminUserRecord> {
  return apiAuthenticated.get<AdminUserRecord>(`/admin/users/${userId}`)
}

/**
 * Update user role
 */
export async function updateUserRole(userId: string, role: string): Promise<void> {
  return apiAuthenticated.patch<void>(`/admin/users/${userId}/role`, { role })
}

/**
 * Update user status (active, suspended, etc.)
 */
export async function updateUserStatus(userId: string, status: string): Promise<void> {
  return apiAuthenticated.patch<void>(`/admin/users/${userId}/status`, {
    status,
  })
}

/**
 * Create a user from admin panel
 */
export async function createUser(data: CreateAdminUserInput): Promise<AdminUserRecord> {
  return apiAuthenticated.post<AdminUserRecord>('/admin/users', data)
}

/**
 * Update full user profile data from admin panel
 */
export async function updateUser(
  userId: string,
  data: UpdateAdminUserInput,
): Promise<AdminUserRecord> {
  return apiAuthenticated.patch<AdminUserRecord>(`/admin/users/${userId}`, data)
}

/**
 * Get all rides with filters
 */
export async function getRides(
  filters?: RideFilters,
): Promise<PaginatedData<AdminRideRecord>> {
  const queryParams = new URLSearchParams()
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value))
      }
    })
  }
  return apiAuthenticated.get<PaginatedData<AdminRideRecord>>(
    `/admin/rides?${queryParams}`,
  )
}

/**
 * Get all clubs with filters
 */
export async function getClubs(
  filters?: ClubFilters,
): Promise<PaginatedData<AdminClubRecord>> {
  const queryParams = new URLSearchParams()
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value))
      }
    })
  }
  return apiAuthenticated.get<PaginatedData<AdminClubRecord>>(
    `/admin/clubs?${queryParams}`,
  )
}

/**
 * Get all marketplace listings with filters
 */
export async function getListings(
  filters?: ListingFilters,
): Promise<PaginatedData<AdminListingRecord>> {
  const queryParams = new URLSearchParams()
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value))
      }
    })
  }
  return apiAuthenticated.get<PaginatedData<AdminListingRecord>>(
    `/admin/marketplace?${queryParams}`,
  )
}

/**
 * Get all reports with filters
 */
export async function getReports(
  filters?: ReportFilters,
): Promise<PaginatedData<AdminReportRecord>> {
  const queryParams = new URLSearchParams()
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value))
      }
    })
  }
  return apiAuthenticated.get<PaginatedData<AdminReportRecord>>(
    `/admin/reports?${queryParams}`,
  )
}

/**
 * Update report status
 */
export async function updateReport(
  reportId: string,
  data: { status: string; resolution?: string },
): Promise<void> {
  return apiAuthenticated.patch<void>(`/admin/reports/${reportId}`, data)
}

/**
 * Verify a club
 */
export async function verifyClub(clubId: string): Promise<void> {
  return apiAuthenticated.patch<void>(`/admin/clubs/${clubId}/verify`, {})
}

/**
 * Delete a user
 */
export async function deleteUser(userId: string): Promise<void> {
  return apiAuthenticated.delete<void>(`/admin/users/${userId}`)
}

/**
 * Update ride status (cancel, etc.)
 */
export async function updateRideStatus(rideId: string, status: string): Promise<void> {
  return apiAuthenticated.patch<void>(`/admin/rides/${rideId}/status`, { status })
}

/**
 * Delete a ride
 */
export async function deleteRide(rideId: string): Promise<void> {
  return apiAuthenticated.delete<void>(`/admin/rides/${rideId}`)
}

/**
 * Delete a club
 */
export async function deleteClub(clubId: string): Promise<void> {
  return apiAuthenticated.delete<void>(`/admin/clubs/${clubId}`)
}

/**
 * Update listing status (approve, flag, remove)
 */
export async function updateListingStatus(
  listingId: string,
  status: string,
): Promise<void> {
  return apiAuthenticated.patch<void>(`/admin/marketplace/${listingId}/status`, {
    status,
  })
}

/**
 * Delete a listing
 */
export async function deleteListing(listingId: string): Promise<void> {
  return apiAuthenticated.delete<void>(`/admin/marketplace/${listingId}`)
}

// Export all as adminApi object
export const adminApi = {
  getStats,
  getWeeklyActivity,
  getUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
  createUser,
  updateUser,
  getRides,
  getClubs,
  getListings,
  getReports,
  updateReport,
  verifyClub,
  deleteUser,
  updateRideStatus,
  deleteRide,
  deleteClub,
  updateListingStatus,
  deleteListing,
}
