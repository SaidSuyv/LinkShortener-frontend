import type { LinkEntity } from '@/domain/entities/link.entity'
import { RemoteLinkRepository } from '@/domain/repositories/link.repository'
import AxiosClient from '../api/axios.client'
import { GetAllLinksApiMapper } from '../mappers/link/get-all.mapper'
import type { GetAllLinksApiResponse } from '../mappers/link/get-all.response'

export class RemoteLinkRepositoryImpl extends RemoteLinkRepository {
  async getAll(state?: string): Promise<LinkEntity[]> {
    var url = '/link'

    if (typeof state != 'undefined') {
      switch (state) {
        case 'active':
          url += '?state=active'
          break
        case 'inactive':
          url += '?state=inactive'
          break
      }
    }

    const { data } = await AxiosClient.get<GetAllLinksApiResponse>(url)

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

  async hardRemove(id: number): Promise<void> {
    const { data } = await AxiosClient.delete(`/link/${id}/?hard`)
    return data.data
  }

  async restore(id: number): Promise<void> {
    const { data } = await AxiosClient.post(`/link/restore/${id}`)
    return data.data
  }

  async statusBulk(id: string): Promise<any> {
    const { data } = await AxiosClient.get(`/link/bulk/status/${id}`)
    return data.data
  }

  async deleteBulk(items: any[]): Promise<void> {
    const { data } = await AxiosClient.post('/link/bulk/delete', { items })
    return data.data
  }
}
