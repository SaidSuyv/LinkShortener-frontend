import type { RemoteAuthRepository } from '@/domain/repositories/auth.repository'

export class ResetPasswordUseCase {
  constructor(private readonly provider: RemoteAuthRepository) {}

  execute(
    email: string,
    password: string,
    password_confirmation: string,
    token: string,
  ): Promise<void> {
    return this.provider.resetPassword(email, password, password_confirmation, token)
  }
}
