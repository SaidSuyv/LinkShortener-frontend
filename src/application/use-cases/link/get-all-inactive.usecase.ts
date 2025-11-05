import type { LinkEntity } from '@/domain/entities/link.entity'
import type { RemoteLinkRepository } from '@/domain/repositories/link.repository'

export const GetAllInactiveLinksUseCase = async (
  repo: RemoteLinkRepository,
): Promise<LinkEntity[]> => {
  return await repo.getAll('inactive')
}
