import type { LinkEntity } from "@/domain/entities/link.entity";
import type { LinkRepository } from "@/domain/repositories/link.repository";

export const GetAllLinksUseCase = async (repo: LinkRepository): Promise<LinkEntity[]> => {
    return await repo.getAll();
}