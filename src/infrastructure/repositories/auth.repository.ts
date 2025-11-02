import type { UserEntity } from '@/domain/entities/user.entity'
import { AuthRepository } from '@/domain/repositories/auth.repository'
import AxiosClient from '../api/axios.client'
import type { UserResponseDTO } from '../DTO/auth/login.dto'
import type { RegisterResponseDTO } from '../DTO/auth/register.dto'
import axios from 'axios'

export class AuthRepositoryImpl extends AuthRepository {
  async login(email: String, password: String): Promise<UserEntity> {
    await AxiosClient.get('/sanctum/csrf-cookie');
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

  async register(
    name: string,
    lastname: string,
    email: string,
    password: string,
    password_confirmation: string,
  ): Promise<UserEntity> {
    const { data } = await AxiosClient.post<RegisterResponseDTO>('/register', {
      name,
      lastname,
      email,
      password,
      password_confirmation,
    })
    return {
      name: data.data.user.name,
      lastname: data.data.user.lastname,
      full_name: data.data.user.full_name,
      email: data.data.user.email,
      token: data.data.token,
    }
  }

  async forgotPassword(email: string): Promise<void> {
    await AxiosClient.post<{ success: boolean; message: string }>('/forgot-password', { email })
  }
  async resetPassword(
    email: string,
    password: string,
    password_confirmation: string,
    token: string,
  ): Promise<void> {
    await AxiosClient.post<{ success: boolean; message: string }>('/reset-password', {
      email,
      password,
      password_confirmation,
      token,
    })
  }
}
