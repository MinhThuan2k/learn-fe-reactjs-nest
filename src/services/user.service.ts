import { BaseService } from './base.service'

export interface UserProfile {
  user: {
    id: number
    name: string
    email: string
  }
}

class UserService extends BaseService {
  profile() {
    return this.get<UserProfile>('/api/v1/users/profile')
  }
}

export const userService = new UserService()
