import type { UserEntity } from '@/domain/entities/user.entity'
import type { RemoteUserRepository } from '@/domain/repositories/user.repository'

export class GetBasicDataUseCase {
  constructor(private readonly provider: RemoteUserRepository) {}

  execute(): Promise<UserEntity> {
    return this.provider.getBasicData()
  }
}
