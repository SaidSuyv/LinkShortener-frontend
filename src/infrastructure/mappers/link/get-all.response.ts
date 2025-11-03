export interface GetAllLinksApiResponse {
  success?: boolean
  message?: string
  errors?: any
  data?: [
    {
      id: number
      original_url: string
      code: string
      created_at: string
      updated_at: string
      deleted_at: string
    },
  ]
}
