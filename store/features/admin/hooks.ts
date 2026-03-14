import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../shared/hooks'
import {
  selectAdminStats,
  selectAdminUsers,
  selectAdminRides,
  selectAdminClubs,
  selectAdminListings,
  selectAdminReports,
  selectAdminLoading,
  selectAdminError,
  selectAdminPagination,
} from './selectors'
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
} from './thunks'
import type {
  UserFilters,
  RideFilters,
  ClubFilters,
  ListingFilters,
  ReportFilters,
} from '@/lib/server/admin'

export const useAdminDashboard = () => {
  const dispatch = useAppDispatch()
  const stats = useAppSelector(selectAdminStats)
  const users = useAppSelector(selectAdminUsers)
  const reports = useAppSelector(selectAdminReports)
  const isLoading = useAppSelector(selectAdminLoading)
  const error = useAppSelector(selectAdminError)

  return {
    stats,
    recentUsers: users.slice(0, 5),
    pendingReports: reports.filter((r) => r.status === 'pending').slice(0, 4),
    isLoading,
    error,
    fetchStats: useCallback(() => dispatch(fetchAdminStats()), [dispatch]),
    fetchRecentUsers: useCallback(
      () => dispatch(fetchAdminUsers({ limit: 5 })),
      [dispatch],
    ),
    fetchPendingReports: useCallback(
      () => dispatch(fetchAdminReports({ status: 'pending' })),
      [dispatch],
    ),
  }
}

export const useAdminUsers = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAdminUsers)
  const isLoading = useAppSelector(selectAdminLoading)
  const error = useAppSelector(selectAdminError)
  const pagination = useAppSelector(selectAdminPagination('users'))

  return {
    users,
    isLoading,
    error,
    pagination,
    fetchUsers: useCallback(
      (filters?: UserFilters) => dispatch(fetchAdminUsers(filters)),
      [dispatch],
    ),
    updateUserRole: useCallback(
      (userId: string, role: string) => dispatch(updateAdminUserRole({ userId, role })),
      [dispatch],
    ),
    deleteUser: useCallback(
      (userId: string) => dispatch(deleteAdminUser(userId)),
      [dispatch],
    ),
  }
}

export const useAdminRides = () => {
  const dispatch = useAppDispatch()
  const rides = useAppSelector(selectAdminRides)
  const isLoading = useAppSelector(selectAdminLoading)
  const error = useAppSelector(selectAdminError)
  const pagination = useAppSelector(selectAdminPagination('rides'))

  return {
    rides,
    isLoading,
    error,
    pagination,
    fetchRides: useCallback(
      (filters?: RideFilters) => dispatch(fetchAdminRides(filters)),
      [dispatch],
    ),
    updateRideStatus: useCallback(
      (rideId: string, status: string) =>
        dispatch(updateAdminRideStatus({ rideId, status })),
      [dispatch],
    ),
    deleteRide: useCallback(
      (rideId: string) => dispatch(deleteAdminRide(rideId)),
      [dispatch],
    ),
  }
}

export const useAdminClubs = () => {
  const dispatch = useAppDispatch()
  const clubs = useAppSelector(selectAdminClubs)
  const isLoading = useAppSelector(selectAdminLoading)
  const error = useAppSelector(selectAdminError)
  const pagination = useAppSelector(selectAdminPagination('clubs'))

  return {
    clubs,
    isLoading,
    error,
    pagination,
    fetchClubs: useCallback(
      (filters?: ClubFilters) => dispatch(fetchAdminClubs(filters)),
      [dispatch],
    ),
    verifyClub: useCallback(
      (clubId: string) => dispatch(verifyAdminClub(clubId)),
      [dispatch],
    ),
    deleteClub: useCallback(
      (clubId: string) => dispatch(deleteAdminClub(clubId)),
      [dispatch],
    ),
  }
}

export const useAdminMarketplace = () => {
  const dispatch = useAppDispatch()
  const listings = useAppSelector(selectAdminListings)
  const isLoading = useAppSelector(selectAdminLoading)
  const error = useAppSelector(selectAdminError)
  const pagination = useAppSelector(selectAdminPagination('listings'))

  return {
    listings,
    isLoading,
    error,
    pagination,
    fetchListings: useCallback(
      (filters?: ListingFilters) => dispatch(fetchAdminListings(filters)),
      [dispatch],
    ),
    updateListingStatus: useCallback(
      (listingId: string, status: string) =>
        dispatch(updateAdminListingStatus({ listingId, status })),
      [dispatch],
    ),
    deleteListing: useCallback(
      (listingId: string) => dispatch(deleteAdminListing(listingId)),
      [dispatch],
    ),
  }
}

export const useAdminReports = () => {
  const dispatch = useAppDispatch()
  const reports = useAppSelector(selectAdminReports)
  const isLoading = useAppSelector(selectAdminLoading)
  const error = useAppSelector(selectAdminError)
  const pagination = useAppSelector(selectAdminPagination('reports'))

  return {
    reports,
    isLoading,
    error,
    pagination,
    fetchReports: useCallback(
      (filters?: ReportFilters) => dispatch(fetchAdminReports(filters)),
      [dispatch],
    ),
    updateReport: useCallback(
      (reportId: string, data: { status: string; resolution?: string }) =>
        dispatch(updateAdminReport({ reportId, data })),
      [dispatch],
    ),
  }
}
