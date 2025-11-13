import type { RemoteLinkRepository } from '@/domain/repositories/link.repository'

export class RestoreBulkLinksUseCase {
  constructor(private readonly provider: RemoteLinkRepository) {}

  execute(items: any[]): Promise<any> {
    return this.provider.restoreBulk(items)
  }
}
