import type { AuthRepository } from '@/domain/repositories/auth.repository'

export const ForgotPasswordUseCase = async (repo: AuthRepository, email: string): Promise<void> => {
  return await repo.forgotPassword(email)
}
