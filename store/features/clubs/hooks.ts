import { useAppDispatch, useAppSelector } from '../shared/hooks'
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

  return {
    myClubs,
    discoveredClubs,
    currentClub,
    isLoading,
    error,
    fetchMyClubs: () => dispatch(fetchMyClubs()),
    discoverClubs: (page?: number) => dispatch(discoverClubsThunk(page || 1)),
    fetchClubDetails: (clubId: string) => dispatch(fetchClubDetails(clubId)),
    createClub: (data: CreateClubData) => dispatch(createClubThunk(data)),
    updateClub: (clubId: string, data: Partial<CreateClubData>) =>
      dispatch(updateClubThunk({ clubId, data })),
    deleteClub: (clubId: string) => dispatch(deleteClubThunk(clubId)),
    joinClub: (clubId: string) => dispatch(joinClubThunk(clubId)),
    leaveClub: (clubId: string) => dispatch(leaveClubThunk(clubId)),
  }
}
