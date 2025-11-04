<script setup lang="ts">
import { useUserStore } from '@/ui/stores/user.store'
import { useRouter } from 'vue-router'
import { LogoutUseCase } from '@/application/use-cases/auth/logout.usecase'
import { RemoteAuthRepositoryImpl } from '@/infrastructure/repositories/auth.repository'
import PageHeaderComponent from '@/ui/components/utils/page-header.component.vue'
import { AuthTokenStorage } from '@/infrastructure/services/auth-token-storage.service'

const { clearData } = useUserStore()
const router = useRouter()

const onLogout = async () => {
  const tokenService = new AuthTokenStorage()
  const provider = new RemoteAuthRepositoryImpl(tokenService)
  const useCase = new LogoutUseCase(provider)
  await useCase.execute()
  clearData()
  router.replace({ name: 'login' })
}
</script>
<template>
  <page-header-component title="Configuración" />
  <a-space>
    <a-button danger @click="onLogout()" ghost>
      <span>Cerrar sesión</span>
    </a-button>
  </a-space>
</template>
