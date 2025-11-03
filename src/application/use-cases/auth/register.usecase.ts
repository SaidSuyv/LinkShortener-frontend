import type { UserEntity } from '@/domain/entities/user.entity'
import type { RemoteAuthRepository } from '@/domain/repositories/auth.repository'

export class RegisterUseCase {
  constructor(private readonly provider: RemoteAuthRepository) {}

  execute(
    name: string,
    lastname: string,
    email: string,
    password: string,
    password_confirmation: string,
  ): Promise<UserEntity> {
    return this.provider.register(name, lastname, email, password, password_confirmation)
  }
}
