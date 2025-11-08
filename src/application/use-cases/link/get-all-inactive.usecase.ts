import type { LinkEntity } from '@/domain/entities/link.entity'
import type { RemoteLinkRepository } from '@/domain/repositories/link.repository'

export class GetAllInactiveLinksUseCase {
  constructor(
    private readonly provider: RemoteLinkRepository
  ){}

  execute(): Promise<LinkEntity[]> {
    return this.provider.getAll('inactive')
  }
}
