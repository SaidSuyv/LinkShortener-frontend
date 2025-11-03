export class AuthTokenStorage {
  private readonly name = import.meta.env.VITE_STORE_TOKEN_NAME

  load(): string {
    const token = localStorage.getItem(this.name)
    if (!token) throw new Error('Token unavailable')
    return token
  }

  save(token: string): void {
    localStorage.setItem(this.name, token)
  }

  clear(): void {
    localStorage.removeItem(this.name)
  }
}
