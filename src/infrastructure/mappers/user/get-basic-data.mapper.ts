import type { UserEntity } from '@/domain/entities/user.entity'
import type { GetBasicDataApiResponse } from './get-basic-data.response'

export class GetBasicDataApiMapper {
  private raw!: GetBasicDataApiResponse

  constructor(data: GetBasicDataApiResponse) {
    this.raw = data
  }

  toDomain(): UserEntity {
    if (typeof this.raw.data != 'undefined') {
      return {
        name: this.raw.data.name,
        lastname: this.raw.data.lastname,
        full_name: this.raw.data.full_name,
        email: this.raw.data.email,
      }
    } else throw new Error('Unable to map information')
  }
}
