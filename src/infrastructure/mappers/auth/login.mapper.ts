import type { UserEntity } from '@/domain/entities/user.entity'
import type { LoginApiResponse } from './login.response'

export class LoginApiMapper {
  private raw!: LoginApiResponse

  constructor(data: LoginApiResponse) {
    this.raw = data
  }

  toDomainUser(): UserEntity {
    return {
      name: this.raw.data.user.name,
      lastname: this.raw.data.user.lastname,
      full_name: this.raw.data.user.full_name,
      email: this.raw.data.user.email,
    }
  }

  getToken(): string {
    return this.raw.data.token
  }
}
