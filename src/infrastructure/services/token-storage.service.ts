export class TokenStorageService {
  getToken(): string {
    const token = localStorage.getItem(import.meta.env.VITE_STORE_TOKEN_NAME)
    if( !token )
      throw new Error('Token unavailable')
    return token
  }
}
