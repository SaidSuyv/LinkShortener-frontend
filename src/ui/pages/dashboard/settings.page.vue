<script setup lang="ts">
import { useUserStore } from '@/ui/stores/user.store'
import { useRouter } from 'vue-router'
import { LogoutUseCase } from '@/application/use-cases/auth/logout.usecase'
import { AuthRepositoryImpl } from '@/infrastructure/repositories/auth.repository'

const { clearData } = useUserStore()
const router = useRouter()

const onLogout = async () => {
  await LogoutUseCase( new AuthRepositoryImpl() )
  clearData()
  router.replace({ name: 'login' })
}
</script>
<template>
  <a-button danger @click="onLogout()" ghost>
    <span>Cerrar sesión</span>
  </a-button>
</template>
