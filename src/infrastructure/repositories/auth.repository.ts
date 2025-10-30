import type { UserEntity } from '@/domain/entities/user.entity'
import { AuthRepository } from '@/domain/repositories/auth.repository'
import AxiosClient from '../api/axios.client'
import type { UserResponseDTO } from '../DTO/auth/login.dto'
import type { RegisterResponseDTO } from '../DTO/auth/register.dto'

export class AuthRepositoryImpl extends AuthRepository {
  async login(email: String, password: String): Promise<UserEntity> {
    const { data } = await AxiosClient.post<UserResponseDTO>('/login', { email, password })

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

  async register(name: string, lastname: string, email: string, password: string, confirm_password: string): Promise<UserEntity> {
    const { data } = await AxiosClient.post<RegisterResponseDTO>('/register', { name, lastname, email, password, confirm_password });
    return {
      name: data.data.user.name,
      lastname: data.data.user.lastname,
      full_name: data.data.user.full_name,
      email: data.data.user.email,
      token: data.data.token,
    };
  }

  async forgotPassword(email: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async resetPassword(email: string, password: string, confirm_password: string, token: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
