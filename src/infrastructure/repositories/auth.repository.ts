import type { UserEntity } from '@/domain/entities/user.entity'
import { RemoteAuthRepository } from '@/domain/repositories/auth.repository'
import AxiosClient from '../api/axios.client'
import { LoginApiMapper } from '../mappers/auth/login.mapper'
import { RegisterApiMapper } from '../mappers/auth/register.mapper'
import { AuthTokenStorage } from '../services/auth-token-storage.service'
import type { LoginApiResponse } from '../mappers/auth/login.response'
import type { RegisterApiResponse } from '../mappers/auth/register.response'

export class RemoteAuthRepositoryImpl extends RemoteAuthRepository {
  constructor(private readonly authTokenStorage: AuthTokenStorage) {
    super()
  }

  async login(email: String, password: String): Promise<UserEntity> {
    const { data } = await AxiosClient.post<LoginApiResponse>('/login', { email, password })

    const LoginApiMapperInstance = new LoginApiMapper(data)

    this.authTokenStorage.save(LoginApiMapperInstance.getToken())

    return LoginApiMapperInstance.toDomainUser()
  }

  async logout(): Promise<void> {
    await AxiosClient.get('/logout')
    this.authTokenStorage.clear()
  }

  async register(
    name: string,
    lastname: string,
    email: string,
    password: string,
    password_confirmation: string,
  ): Promise<UserEntity> {
    const body = { name, lastname, email, password, password_confirmation }

    const { data } = await AxiosClient.post<RegisterApiResponse>('/register', body)

    const RegisterApiMapperInstance = new RegisterApiMapper(data)

    return RegisterApiMapperInstance.toDomainUser()
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
    const body = { email, password, password_confirmation, token }
    await AxiosClient.post<{ success: boolean; message: string }>('/reset-password', body)
  }
}
