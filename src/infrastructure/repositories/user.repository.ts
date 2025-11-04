import type { UserEntity } from '@/domain/entities/user.entity'
import { RemoteUserRepository } from '@/domain/repositories/user.repository'
import AxiosClient from '../api/axios.client'
import { GetBasicDataApiMapper } from '../mappers/user/get-basic-data.mapper'
import type { GetBasicDataApiResponse } from '../mappers/user/get-basic-data.response'

export class RemoteUserRepositoryImpl extends RemoteUserRepository {
  async getBasicData(): Promise<UserEntity> {
    const { data } = await AxiosClient.get<GetBasicDataApiResponse>('/user')

    const GetBasicDataApiMapperInstance = new GetBasicDataApiMapper(data)

    return GetBasicDataApiMapperInstance.toDomain()
  }
}
