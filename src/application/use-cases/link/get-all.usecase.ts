import type { LinkEntity } from "@/domain/entities/link.entity";
import type { RemoteLinkRepository } from "@/domain/repositories/link.repository";

export const GetAllLinksUseCase = async (repo: RemoteLinkRepository): Promise<LinkEntity[]> => {
    return await repo.getAll();
}
