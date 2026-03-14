import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  adminApi,
  type AdminStats,
  type AdminUserRecord,
  type AdminRideRecord,
  type AdminClubRecord,
  type AdminListingRecord,
  type AdminReportRecord,
  type PaginatedData,
  type UserFilters,
  type RideFilters,
  type ClubFilters,
  type ListingFilters,
  type ReportFilters,
} from '@/lib/server/admin'

// ── Dashboard ──
export const fetchAdminStats = createAsyncThunk(
  'admin/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      return await adminApi.getStats()
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch stats',
      )
    }
  },
)

// ── Users ──
export const fetchAdminUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (filters: UserFilters | undefined, { rejectWithValue }) => {
    try {
      return await adminApi.getUsers(filters)
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch users',
      )
    }
  },
)

export const updateAdminUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ userId, role }: { userId: string; role: string }, { rejectWithValue }) => {
    try {
      await adminApi.updateUserRole(userId, role)
      return { userId, role }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update role',
      )
    }
  },
)

export const deleteAdminUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      await adminApi.deleteUser(userId)
      return userId
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete user',
      )
    }
  },
)

// ── Rides ──
export const fetchAdminRides = createAsyncThunk(
  'admin/fetchRides',
  async (filters: RideFilters | undefined, { rejectWithValue }) => {
    try {
      return await adminApi.getRides(filters)
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch rides',
      )
    }
  },
)

export const updateAdminRideStatus = createAsyncThunk(
  'admin/updateRideStatus',
  async ({ rideId, status }: { rideId: string; status: string }, { rejectWithValue }) => {
    try {
      await adminApi.updateRideStatus(rideId, status)
      return { rideId, status }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update ride',
      )
    }
  },
)

export const deleteAdminRide = createAsyncThunk(
  'admin/deleteRide',
  async (rideId: string, { rejectWithValue }) => {
    try {
      await adminApi.deleteRide(rideId)
      return rideId
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete ride',
      )
    }
  },
)

// ── Clubs ──
export const fetchAdminClubs = createAsyncThunk(
  'admin/fetchClubs',
  async (filters: ClubFilters | undefined, { rejectWithValue }) => {
    try {
      return await adminApi.getClubs(filters)
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch clubs',
      )
    }
  },
)

export const verifyAdminClub = createAsyncThunk(
  'admin/verifyClub',
  async (clubId: string, { rejectWithValue }) => {
    try {
      await adminApi.verifyClub(clubId)
      return clubId
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to verify club',
      )
    }
  },
)

export const deleteAdminClub = createAsyncThunk(
  'admin/deleteClub',
  async (clubId: string, { rejectWithValue }) => {
    try {
      await adminApi.deleteClub(clubId)
      return clubId
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete club',
      )
    }
  },
)

// ── Marketplace ──
export const fetchAdminListings = createAsyncThunk(
  'admin/fetchListings',
  async (filters: ListingFilters | undefined, { rejectWithValue }) => {
    try {
      return await adminApi.getListings(filters)
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch listings',
      )
    }
  },
)

export const updateAdminListingStatus = createAsyncThunk(
  'admin/updateListingStatus',
  async (
    { listingId, status }: { listingId: string; status: string },
    { rejectWithValue },
  ) => {
    try {
      await adminApi.updateListingStatus(listingId, status)
      return { listingId, status }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update listing',
      )
    }
  },
)

export const deleteAdminListing = createAsyncThunk(
  'admin/deleteListing',
  async (listingId: string, { rejectWithValue }) => {
    try {
      await adminApi.deleteListing(listingId)
      return listingId
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to delete listing',
      )
    }
  },
)

// ── Reports ──
export const fetchAdminReports = createAsyncThunk(
  'admin/fetchReports',
  async (filters: ReportFilters | undefined, { rejectWithValue }) => {
    try {
      return await adminApi.getReports(filters)
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch reports',
      )
    }
  },
)

export const updateAdminReport = createAsyncThunk(
  'admin/updateReport',
  async (
    {
      reportId,
      data,
    }: { reportId: string; data: { status: string; resolution?: string } },
    { rejectWithValue },
  ) => {
    try {
      await adminApi.updateReport(reportId, data)
      return { reportId, status: data.status }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update report',
      )
    }
  },
)
