import type { UserEntity } from '@/domain/entities/user.entity'
import type { RegisterApiResponse } from './register.response'

export class RegisterApiMapper {
  private raw!: RegisterApiResponse

  constructor(data: RegisterApiResponse) {
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
}
