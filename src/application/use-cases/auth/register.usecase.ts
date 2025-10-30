import type { UserEntity } from "@/domain/entities/user.entity";
import type { AuthRepository } from "@/domain/repositories/auth.repository";

export const RegisterUseCase = async (name: string, lastname: string, email: string, password: string, confirm_password: string, repo?: AuthRepository): Promise<UserEntity> => {
    return await repo.register(name, lastname, email, password, confirm_password);
}