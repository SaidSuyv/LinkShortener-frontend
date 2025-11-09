import type { RemoteLinkRepository } from "@/domain/repositories/link.repository";

export class DeleteBulkLinksUseCase {
    constructor(private readonly provider: RemoteLinkRepository) { }

    execute(items: any[]): Promise<void> {
        return this.provider.deleteBulk(items);
    }
}