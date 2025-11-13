import type { RemoteLinkRepository } from '@/domain/repositories/link.repository'

export class HardDeleteBulkLinksUseCase {
  constructor(private readonly provider: RemoteLinkRepository) {}

  execute(items: any[]): Promise<any> {
    return this.provider.hardDeleteBulk(items)
  }
}
