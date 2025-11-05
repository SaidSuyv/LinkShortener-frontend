import type { RemoteLinkRepository } from '@/domain/repositories/link.repository'

export class RestoreLinkUseCase {
  constructor(private readonly provider: RemoteLinkRepository) {}

  execute(id: number): Promise<void> {
    return this.provider.restore(id)
  }
}
