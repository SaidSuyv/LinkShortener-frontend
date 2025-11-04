export interface GetBasicDataApiResponse {
  success?: boolean
  message?: string
  error?: any
  data?: {
    name: string
    lastname: string
    full_name: string
    email: string
  }
}
