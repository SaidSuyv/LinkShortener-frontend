import type { UserEntity } from '@/domain/entities/user.entity'
import { AuthRepository } from '@/domain/repositories/auth.repository'
import AxiosClient from '../api/axios.client'
import type { UserResponseDTO } from '../DTO/auth/login.dto'

export class AuthRepositoryImpl extends AuthRepository {
  async login(email: String, password: String): Promise<UserEntity> {
    const { data } = await AxiosClient.post<UserResponseDTO>('/login', { email, password })

    if (!data.success) {
      throw new Error(data.message || 'Hubo un error inesperado.')
    }

    return {
      name: data.data.user.name,
      lastname: data.data.user.lastname,
      full_name: data.data.user.full_name,
      email: data.data.user.email,
      token: data.data.token,
    }
  }

  async logout(): Promise<void> {
    return
  }
}
