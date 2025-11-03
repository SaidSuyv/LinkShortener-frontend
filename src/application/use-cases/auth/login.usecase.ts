import type { UserEntity } from '@/domain/entities/user.entity'
import type { RemoteAuthRepository } from '@/domain/repositories/auth.repository'

export class LoginUseCase {
  constructor(private readonly provider: RemoteAuthRepository) {}

  execute(email: string, password: string): Promise<UserEntity> {
    return this.provider.login(email, password)
  }
}
