import type { RootState } from '../../index'

export const selectAdminStats = (state: RootState) => state.admin.stats
export const selectAdminWeeklyActivity = (state: RootState) => state.admin.weeklyActivity
export const selectAdminUsers = (state: RootState) => state.admin.users
export const selectAdminRides = (state: RootState) => state.admin.rides
export const selectAdminClubs = (state: RootState) => state.admin.clubs
export const selectAdminListings = (state: RootState) => state.admin.listings
export const selectAdminReports = (state: RootState) => state.admin.reports
export const selectAdminLoading = (state: RootState) => state.admin.isLoading
export const selectAdminError = (state: RootState) => state.admin.error
export const selectAdminPagination =
  (section: 'users' | 'rides' | 'clubs' | 'listings' | 'reports') => (state: RootState) =>
    state.admin.pagination[section]
