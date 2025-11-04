import { RemoteLinkRepository } from '@/infrastructure/repositories/link.repository.ts'

export class CreateLinkUseCase {
  constructor(provider: RemoteLinkRepository){}

  execute(url: string): Promise<void> {
    return this.provider.create(url);
  }
}
