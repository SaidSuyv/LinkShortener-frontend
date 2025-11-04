import type { UserEntity } from '../entities/user.entity'

export abstract class RemoteUserRepository {
  abstract getBasicData(): Promise<UserEntity>
}
