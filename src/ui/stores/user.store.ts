import type { UserEntity } from '@/domain/entities/user.entity'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user: UserEntity = reactive<UserEntity>({
    name: '',
    lastname: '',
    full_name: '',
    email: '',
    token: '',
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
  }

  function clearData() {
    user.name = ''
    user.lastname = ''
    user.full_name = ''
    user.email = ''
    user.token = ''
  }

  function isAuthenticated(): boolean {
    return !( user.token.trim().length == 0 )
  }

  return { user, setPersonalData, setAuthData, clearData, isAuthenticated }
})
