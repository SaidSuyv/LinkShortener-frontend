import type { UserEntity } from '@/domain/entities/user.entity'
import type { AuthRepository } from '@/domain/repositories/auth.repository'

export const RegisterUseCase = async (
  repo: AuthRepository,
  name: string,
  lastname: string,
  email: string,
  password: string,
  password_confirmation: string,
): Promise<UserEntity> => {
  return await repo.register(name, lastname, email, password, password_confirmation)
}
