import {
  ACTION_AUTH_LOGIN_SUCCESS,
  ACTION_AUTH_LOGOUT,
  LoginSuccessAction,
  LogoutAction
} from '@/core/redux/types/auth'

export const loginSuccess = (user: any): LoginSuccessAction => ({
  type: ACTION_AUTH_LOGIN_SUCCESS,
  payload: user
})

export const logout = (): LogoutAction => ({
  type: ACTION_AUTH_LOGOUT
})
