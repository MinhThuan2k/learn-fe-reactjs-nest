import { AuthResponse } from '@/services/auth.service'

export const ACTION_AUTH_LOGIN_SUCCESS = 'ACTION_AUTH_LOGIN_SUCCESS'
export const ACTION_AUTH_LOGOUT = 'ACTION_AUTH_LOGOUT'

export interface AuthState {
  isAuthenticated: boolean
  user: AuthResponse | null
}

export interface LoginSuccessAction {
  type: typeof ACTION_AUTH_LOGIN_SUCCESS
  payload: AuthResponse
}

export interface LogoutAction {
  type: typeof ACTION_AUTH_LOGOUT
}

export type AuthAction = LoginSuccessAction | LogoutAction
