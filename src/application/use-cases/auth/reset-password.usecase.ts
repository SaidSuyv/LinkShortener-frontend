import type { AuthRepository } from '@/domain/repositories/auth.repository'

export const ResetPasswordUseCase = async (
  repo: AuthRepository,
  email: string,
  password: string,
  password_confirmation: string,
  token: string,
): Promise<void> => {
  return await repo.resetPassword(email, password, password_confirmation, token)
}
