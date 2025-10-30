export interface RegisterResponseDTO {
    success: boolean;
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