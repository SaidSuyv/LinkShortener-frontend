import type { LinkEntity } from '@/domain/entities/link.entity'
import type { RemoteLinkRepository } from '@/domain/repositories/link.repository'

export class GetAllActiveLinksUseCase {
  constructor(
    private readonly provider: RemoteLinkRepository
  ){}

  execute(): Promise<LinkEntity[]> {
    return this.provider.getAll('active');
  }
}
