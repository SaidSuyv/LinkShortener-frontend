import type { LinkEntity } from "@/domain/entities/link.entity";
import { LinkRepository } from "@/domain/repositories/link.repository";
import AxiosClient from "../api/axios.client";
import type { AllLinkResponseDTO } from "../DTO/link.dto";

export class LinkRepositoryImpl extends LinkRepository {
    async getAll(): Promise<LinkEntity[]> {
        const response = await AxiosClient.get<AllLinkResponseDTO>('/link');
        return response.data.data
    }
    update(id: number, data: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    restore(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}