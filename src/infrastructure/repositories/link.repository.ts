import type { LinkEntity } from "@/domain/entities/link.entity";
import { LinkRepository } from "@/domain/repositories/link.repository";
import AxiosClient from "../api/axios.client";
import type { AllLinkResponseDTO } from "../DTO/link.dto";

import { TokenStorageService } from '../services/token-storage.service'

export class LinkRepositoryImpl extends LinkRepository {

  private TokenServiceInstance = new TokenStorageService()

    async getAll(): Promise<LinkEntity[]> {
        const { data } = await AxiosClient.get<AllLinkResponseDTO>('/link', { token: true } );
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
