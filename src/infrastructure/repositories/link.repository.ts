import type { LinkEntity } from '@/domain/entities/link.entity'
import { LinkRepository } from '@/domain/repositories/link.repository'
import AxiosClient from '../api/axios.client'
import { GetAllLinksApiMapper } from '../mappers/link/get-all.mapper'
import type { GetAllLinksApiResponse } from '../mappers/link/get-all.response'

export class LinkRepositoryImpl extends LinkRepository {
  async getAll(): Promise<LinkEntity[]> {
    const { data } = await AxiosClient.get<GetAllLinksApiResponse>('/link')

    const GetAllLinksApiMapperInstance = new GetAllLinksApiMapper(data)

    return GetAllLinksApiMapperInstance.toLinks()
  }

  async create(url: string): Promise<void> {
    const { data } = await AxiosClient.post('/link', { url })

    console.log('url data response', data)

    return data.data
  }

  update(id: number, data: any): Promise<void> {
    throw new Error('Method not implemented.')
  }
  remove(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
  restore(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
