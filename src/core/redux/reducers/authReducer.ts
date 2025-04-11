import {
  ACTION_AUTH_LOGIN_SUCCESS,
  ACTION_AUTH_LOGOUT,
  AuthAction,
  AuthState
} from '@/core/redux/types/auth'

const tokenFromStorage = localStorage.getItem('token')
const userFromStorage = localStorage.getItem('user')
const initialState: AuthState = {
  isAuthenticated: !!tokenFromStorage,
  user: userFromStorage ? JSON.parse(userFromStorage) : null
}

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case ACTION_AUTH_LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    case ACTION_AUTH_LOGOUT:
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    default:
      return state
  }
}
