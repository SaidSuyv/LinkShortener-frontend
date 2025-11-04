import type { LinkEntity } from '@/domain/entities/link.entity'
import { RemoteLinkRepository } from '@/domain/repositories/link.repository'
import AxiosClient from '../api/axios.client'
import { GetAllLinksApiMapper } from '../mappers/link/get-all.mapper'
import type { GetAllLinksApiResponse } from '../mappers/link/get-all.response'

export class RemoteLinkRepositoryImpl extends RemoteLinkRepository {
  async getAll(): Promise<LinkEntity[]> {
    const { data } = await AxiosClient.get<GetAllLinksApiResponse>('/link')

    const GetAllLinksApiMapperInstance = new GetAllLinksApiMapper(data)

    return GetAllLinksApiMapperInstance.toLinks()
  }

  async create(url: string): Promise<void> {
    const { data } = await AxiosClient.post('/link', { url })

    return data.data
  }

  async update(id: number, updated: any): Promise<void> {
    const { data } = await AxiosClient.put(`/link/${id}`, updated)

    return data.data
  }

  async remove(id: number): Promise<void> {
    const { data } = await AxiosClient.delete(`/link/${id}`)
    return data.data
  }
  restore(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
