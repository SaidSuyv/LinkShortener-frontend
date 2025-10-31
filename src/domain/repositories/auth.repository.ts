import type { UserEntity } from '../entities/user.entity'

export abstract class AuthRepository {
  abstract login(email: string, password: string): Promise<UserEntity>
  abstract logout(): Promise<void>
  abstract register(
    name: string,
    lastname: string,
    email: string,
    password: string,
    password_confirmation: string,
  ): Promise<UserEntity>
  abstract forgotPassword(email: string): Promise<void>
  abstract resetPassword(
    email: string,
    password: string,
    password_confirmation: string,
    token: string,
  ): Promise<void>
}
