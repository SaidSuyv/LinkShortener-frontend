import type { LinkEntity } from '@/domain/entities/link.entity'
import type { GetAllLinksApiResponse } from './get-all.response'

export class GetAllLinksApiMapper {
  private raw!: GetAllLinksApiResponse

  constructor(data: GetAllLinksApiResponse) {
    this.raw = data
  }

  toLinks(): LinkEntity[] {
    if (typeof this.raw.data != 'undefined' && this.raw.data.length > 0)
      return this.raw.data.map((e) => {
        return {
          id: e.id,
          original_url: e.original_url,
          code: e.code,
          created_at: e.created_at,
          updated_at: e.updated_at,
          deleted_at: e.deleted_at,
          expiration_at: e.expiration_at,
        }
      })
    else return []
  }
}
