import type { UserEntity } from '@/domain/entities/user.entity'
import type { AuthRepository } from '@/domain/repositories/auth.repository'

export const LogoutUseCase = async (
  authRepo: AuthRepository
): Promise<void> => {
  return await authRepo.logout()
}
