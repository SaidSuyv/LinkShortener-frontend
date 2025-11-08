import type { LinkEntity } from '../entities/link.entity'

export abstract class RemoteLinkRepository {
  abstract getAll(state?: string): Promise<LinkEntity[]>
  abstract create(url: string): Promise<void>
  abstract update(id: number, data: any): Promise<void>
  abstract remove(id: number): Promise<void>
  abstract hardRemove(id: number): Promise<void>
  abstract restore(id: number): Promise<void>
}
