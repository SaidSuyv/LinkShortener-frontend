import type { RemoteAuthRepository } from '@/domain/repositories/auth.repository'

export class ForgotPasswordUseCase {
  constructor(private readonly provider: RemoteAuthRepository) {}

  execute(email: string): Promise<void> {
    return this.provider.forgotPassword(email)
  }
}
