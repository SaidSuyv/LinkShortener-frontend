import type { RemoteAuthRepository } from '@/domain/repositories/auth.repository'

export class LogoutUseCase {
  constructor(private readonly provider: RemoteAuthRepository) {}

  execute(): Promise<void> {
    return this.provider.logout()
  }
}
