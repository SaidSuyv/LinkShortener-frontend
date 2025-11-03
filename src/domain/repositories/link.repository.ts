import type { LinkEntity } from '../entities/link.entity'

export abstract class LinkRepository {
  abstract getAll(): Promise<LinkEntity[]>
  abstract create(url: string): Promise<void>
  abstract update(id: number, data: any): Promise<void>
  abstract remove(id: number): Promise<void>
  abstract restore(id: number): Promise<void>
}
