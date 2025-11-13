import { RemoteLinkRepository } from '@/domain/repositories/link.repository'

export class CheckStatusBulkUseCase {
  constructor(
    private readonly provider: RemoteLinkRepository
  ){}

  execute(id: string): Promise<any> {
    return this.provider.statusBulk(id);
  }
}
