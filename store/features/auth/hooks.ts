import { useAppSelector } from '../shared/hooks'
import {
  selectUser,
  selectIsAuthenticated,
  selectUserLoading,
  selectUserError,
} from './selectors'
import { authApi, type LoginData, type RegisterData } from '@/lib/server/auth'

export const useAuth = () => {
  const user = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectUserLoading)
  const error = useAppSelector(selectUserError)

  return {
    user: user.profile,
    isAuthenticated,
    isLoading,
    error,
    login: (data: LoginData) => authApi.login(data),
    register: (data: RegisterData) => authApi.register(data),
    logout: () => authApi.logout(),
  }
}
