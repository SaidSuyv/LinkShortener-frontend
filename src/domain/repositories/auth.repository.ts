import type { UserEntity } from '../entities/user.entity'

export abstract class AuthRepository {
  abstract login(email: String, password: String): Promise<UserEntity>
  abstract logout(): Promise<void>
}
