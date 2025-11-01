export interface AllLinkResponseDTO {
    success: boolean;
    data: [{
        id: number;
        original_url: string;
        code: string;
        created_at: string;
        updated_at: string;
        deleted_at: string;
    }]
}