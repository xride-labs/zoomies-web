import { useAppDispatch, useAppSelector } from '../shared/hooks'
import {
  selectUser,
  selectIsAuthenticated,
  selectUserLoading,
  selectUserError,
} from './selectors'
import { loginUser, registerUser, logoutUser } from './thunks'
import type { LoginData, RegisterData } from '@/lib/server/auth'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectUserLoading)
  const error = useAppSelector(selectUserError)

  return {
    user: user.profile,
    isAuthenticated,
    isLoading,
    error,
    login: (data: LoginData) => dispatch(loginUser(data)).unwrap(),
    register: (data: RegisterData) => dispatch(registerUser(data)).unwrap(),
    logout: () => dispatch(logoutUser()).unwrap(),
  }
}
