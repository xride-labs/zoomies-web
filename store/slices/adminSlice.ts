import { createSlice } from '@reduxjs/toolkit'
import type {
  AdminStats,
  AdminUserRecord,
  AdminRideRecord,
  AdminClubRecord,
  AdminListingRecord,
  AdminReportRecord,
  AdminPagination,
} from '@/lib/server/admin'
import {
  fetchAdminStats,
  fetchAdminUsers,
  updateAdminUserRole,
  deleteAdminUser,
  fetchAdminRides,
  updateAdminRideStatus,
  deleteAdminRide,
  fetchAdminClubs,
  verifyAdminClub,
  deleteAdminClub,
  fetchAdminListings,
  updateAdminListingStatus,
  deleteAdminListing,
  fetchAdminReports,
  updateAdminReport,
} from '../features/admin/thunks'

const defaultPagination: AdminPagination = { page: 1, limit: 20, total: 0, totalPages: 1 }

interface AdminState {
  stats: AdminStats | null
  users: AdminUserRecord[]
  rides: AdminRideRecord[]
  clubs: AdminClubRecord[]
  listings: AdminListingRecord[]
  reports: AdminReportRecord[]
  pagination: {
    users: AdminPagination
    rides: AdminPagination
    clubs: AdminPagination
    listings: AdminPagination
    reports: AdminPagination
  }
  isLoading: boolean
  error: string | null
}

const initialState: AdminState = {
  stats: null,
  users: [],
  rides: [],
  clubs: [],
  listings: [],
  reports: [],
  pagination: {
    users: defaultPagination,
    rides: defaultPagination,
    clubs: defaultPagination,
    listings: defaultPagination,
    reports: defaultPagination,
  },
  isLoading: false,
  error: null,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // ── Stats ──
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.isLoading = false
        state.stats = action.payload
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

    // ── Users ──
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload.items
        state.pagination.users = action.payload.pagination
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(updateAdminUserRole.fulfilled, (state, action) => {
        const user = state.users.find((u) => u.id === action.payload.userId)
        if (user) user.roles = [action.payload.role]
      })
      .addCase(deleteAdminUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload)
        state.pagination.users.total -= 1
      })

    // ── Rides ──
    builder
      .addCase(fetchAdminRides.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAdminRides.fulfilled, (state, action) => {
        state.isLoading = false
        state.rides = action.payload.items
        state.pagination.rides = action.payload.pagination
      })
      .addCase(fetchAdminRides.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(updateAdminRideStatus.fulfilled, (state, action) => {
        const ride = state.rides.find((r) => r.id === action.payload.rideId)
        if (ride) ride.status = action.payload.status
      })
      .addCase(deleteAdminRide.fulfilled, (state, action) => {
        state.rides = state.rides.filter((r) => r.id !== action.payload)
        state.pagination.rides.total -= 1
      })

    // ── Clubs ──
    builder
      .addCase(fetchAdminClubs.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAdminClubs.fulfilled, (state, action) => {
        state.isLoading = false
        state.clubs = action.payload.items
        state.pagination.clubs = action.payload.pagination
      })
      .addCase(fetchAdminClubs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(verifyAdminClub.fulfilled, (state, action) => {
        const club = state.clubs.find((c) => c.id === action.payload)
        if (club) club.verified = true
      })
      .addCase(deleteAdminClub.fulfilled, (state, action) => {
        state.clubs = state.clubs.filter((c) => c.id !== action.payload)
        state.pagination.clubs.total -= 1
      })

    // ── Listings ──
    builder
      .addCase(fetchAdminListings.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAdminListings.fulfilled, (state, action) => {
        state.isLoading = false
        state.listings = action.payload.items
        state.pagination.listings = action.payload.pagination
      })
      .addCase(fetchAdminListings.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(updateAdminListingStatus.fulfilled, (state, action) => {
        const listing = state.listings.find((l) => l.id === action.payload.listingId)
        if (listing) listing.status = action.payload.status
      })
      .addCase(deleteAdminListing.fulfilled, (state, action) => {
        state.listings = state.listings.filter((l) => l.id !== action.payload)
        state.pagination.listings.total -= 1
      })

    // ── Reports ──
    builder
      .addCase(fetchAdminReports.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAdminReports.fulfilled, (state, action) => {
        state.isLoading = false
        state.reports = action.payload.items
        state.pagination.reports = action.payload.pagination
      })
      .addCase(fetchAdminReports.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(updateAdminReport.fulfilled, (state, action) => {
        const report = state.reports.find((r) => r.id === action.payload.reportId)
        if (report) report.status = action.payload.status
      })
  },
})

export const { clearAdminError } = adminSlice.actions
export default adminSlice.reducer
