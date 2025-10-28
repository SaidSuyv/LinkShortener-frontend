export interface UserResponseDTO {
  success: boolean
  message?: string
  data: {
    user: {
      name: string
      lastname: string
      full_name: string
      email: string
    }
    token: string
  }
}
