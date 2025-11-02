import type { LinkEntity } from "@/domain/entities/link.entity";
import { LinkRepository } from "@/domain/repositories/link.repository";
import AxiosClient from "../api/axios.client";
import type { AllLinkResponseDTO } from "../DTO/link.dto";

export class LinkRepositoryImpl extends LinkRepository {
    async getAll(): Promise<LinkEntity[]> {
        await AxiosClient.get('/sanctum/csrf-cookie');
        const { data } = await AxiosClient.get<AllLinkResponseDTO>('/link');
        return data.data
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