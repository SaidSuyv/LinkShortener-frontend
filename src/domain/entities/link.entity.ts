export interface LinkEntity {
    id: number;
    original_url: string;
    code: string;
    created_at: string | Date;
    updated_at: string | Date;
    deleted_at: string | Date | null;
    expiration_at: string | Date | null;
}
