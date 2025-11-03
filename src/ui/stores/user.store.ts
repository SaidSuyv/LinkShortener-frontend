import type { UserEntity } from '@/domain/entities/user.entity'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user: UserEntity = reactive<UserEntity>({
    name: '',
    lastname: '',
    full_name: '',
    email: '',
    token: localStorage.getItem(import.meta.env.VITE_STORE_TOKEN_NAME)
  })

  function setPersonalData(data: {
    name: string
    lastname: string
    full_name: string
    email: string
  }) {
    user.name = data.name
    user.lastname = data.lastname
    user.full_name = data.full_name
    user.email = data.email
  }

  function setAuthData(token: string) {
    user.token = token
    localStorage.setItem(import.meta.env.VITE_STORE_TOKEN_NAME, token)
  }

  function clearData() {
    user.name = ''
    user.lastname = ''
    user.full_name = ''
    user.email = ''
    user.token = ''

    localStorage.removeItem(import.meta.env.VITE_STORE_TOKEN_NAME)
  }

  function isAuthenticated(): boolean {
    return !!user.token;
  }

  return { user, setPersonalData, setAuthData, clearData, isAuthenticated }
})
