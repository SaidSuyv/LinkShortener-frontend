import { RemoteLinkRepository } from '@/domain/repositories/link.repository.ts'

export class DeleteLinkUseCase {
  constructor(private readonly provider: RemoteLinkRepository) {}

  execute(id: number): Promise<void> {
    return this.provider.remove(id)
  }
}
