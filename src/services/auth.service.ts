import { BaseService } from './base.service'

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
  }
}

class AuthService extends BaseService {
  login(payload: LoginPayload) {
    return this.post<AuthResponse>('/api/v1/sign-in', payload)
  }
}

export const authService = new AuthService()
