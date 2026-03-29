import { useAppDispatch, useAppSelector } from '../shared/hooks'
import { selectUserProfile, selectUserLoading, selectUserError } from './selectors'
import {
  fetchProfile,
  fetchMe,
  updateUserProfile,
  type UpdateProfileData,
} from './thunks'

export const useUser = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectUserProfile)
  const isLoading = useAppSelector(selectUserLoading)
  const error = useAppSelector(selectUserError)

  return {
    profile,
    isLoading,
    error,
    fetchProfile: () => dispatch(fetchProfile()),
    fetchMe: () => dispatch(fetchMe()).unwrap(),
    updateProfile: (data: UpdateProfileData) => dispatch(updateUserProfile(data)),
    hasRole: (role: string) => profile?.roles?.includes(role) ?? false,
    hasAnyRole: (roles: string[]) =>
      profile?.roles?.some((r) => roles.includes(r)) ?? false,
  }
}
