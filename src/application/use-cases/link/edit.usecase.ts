import { RemoteLinkRepository } from '@/domain/repositories/link.repository.ts'

export class EditLinkUseCase {
  constructor(private readonly provider: RemoteLinkRepository) {}

  execute(id: number, url: string): Promise<void> {
    return this.provider.update(id, { url })
  }
}
