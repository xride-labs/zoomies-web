import { useAppDispatch, useAppSelector } from '../shared/hooks'
import { useCallback } from 'react'
import {
  selectMyClubs,
  selectDiscoveredClubs,
  selectCurrentClub,
  selectClubsLoading,
  selectClubsError,
} from './selectors'
import {
  fetchMyClubs,
  discoverClubsThunk,
  fetchClubDetails,
  createClubThunk,
  updateClubThunk,
  deleteClubThunk,
  joinClubThunk,
  leaveClubThunk,
  type CreateClubData,
} from './thunks'

export const useClubs = () => {
  const dispatch = useAppDispatch()
  const myClubs = useAppSelector(selectMyClubs)
  const discoveredClubs = useAppSelector(selectDiscoveredClubs)
  const currentClub = useAppSelector(selectCurrentClub)
  const isLoading = useAppSelector(selectClubsLoading)
  const error = useAppSelector(selectClubsError)

  const fetchMyClubsCallback = useCallback(() => {
    dispatch(fetchMyClubs())
  }, [dispatch])

  const discoverClubsCallback = useCallback(
    (page?: number) => {
      dispatch(discoverClubsThunk(page || 1))
    },
    [dispatch],
  )

  const fetchClubDetailsCallback = useCallback(
    (clubId: string) => {
      dispatch(fetchClubDetails(clubId))
    },
    [dispatch],
  )

  const createClubCallback = useCallback(
    (data: CreateClubData) => {
      return dispatch(createClubThunk(data))
    },
    [dispatch],
  )

  const updateClubCallback = useCallback(
    (clubId: string, data: Partial<CreateClubData>) => {
      return dispatch(updateClubThunk({ clubId, data }))
    },
    [dispatch],
  )

  const deleteClubCallback = useCallback(
    (clubId: string) => {
      return dispatch(deleteClubThunk(clubId))
    },
    [dispatch],
  )

  const joinClubCallback = useCallback(
    (clubId: string) => {
      return dispatch(joinClubThunk(clubId))
    },
    [dispatch],
  )

  const leaveClubCallback = useCallback(
    (clubId: string) => {
      return dispatch(leaveClubThunk(clubId))
    },
    [dispatch],
  )

  return {
    myClubs,
    discoveredClubs,
    currentClub,
    isLoading,
    error,
    fetchMyClubs: fetchMyClubsCallback,
    discoverClubs: discoverClubsCallback,
    fetchClubDetails: fetchClubDetailsCallback,
    createClub: createClubCallback,
    updateClub: updateClubCallback,
    deleteClub: deleteClubCallback,
    joinClub: joinClubCallback,
    leaveClub: leaveClubCallback,
  }
}
