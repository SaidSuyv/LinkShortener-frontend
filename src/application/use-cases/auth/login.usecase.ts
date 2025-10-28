import type { UserEntity } from '@/domain/entities/user.entity'
import { AuthRepository } from '@/domain/repositories/auth.repository'

export const LoginUseCase = async (
  authRepo: AuthRepository,
  email: string,
  password: string,
): Promise<UserEntity> => {
  return await authRepo.login(email, password)
}
