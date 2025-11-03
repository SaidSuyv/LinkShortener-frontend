import type { AuthTokenStorage } from '@/infrastructure/services/auth-token-storage.service'

export class CheckAuthStatus {
  constructor(private readonly provider: AuthTokenStorage) {}

  execute() {
    try {
      return !!this.provider.load()
    } catch (e: any) {
      return null
    }
  }
}
