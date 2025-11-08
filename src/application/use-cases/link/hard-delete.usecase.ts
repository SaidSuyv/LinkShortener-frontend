import { RemoteLinkRepository } from '@/domain/repositories/link.repository'

export class HardDeleteLinkUseCase {
  constructor(
    private readonly provider: RemoteLinkRepository
  ){}

  execute(id: number): Promise<void> {
    return this.provider.hardRemove(id)
  }
}
