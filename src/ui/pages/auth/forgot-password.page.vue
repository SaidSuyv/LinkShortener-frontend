<script setup lang="ts">
import { ForgotPasswordUseCase } from '@/application/use-cases/auth/forgot-password.usecase'
import { RemoteAuthRepositoryImpl } from '@/infrastructure/repositories/auth.repository'
import { AuthTokenStorage } from '@/infrastructure/services/auth-token-storage.service'
import LogoComponent from '@/ui/components/utils/logo.component.vue'
import { App } from 'ant-design-vue'
import { ref } from 'vue'

const email = ref('')
const loading = ref(false)

const { message, notification } = App.useApp()

const onSubmit = async () => {
  loading.value = true
  try {
    const tokenService = new AuthTokenStorage()
    const provider = new RemoteAuthRepositoryImpl(tokenService)
    const useCase = new ForgotPasswordUseCase(provider)
    await useCase.execute(email.value)
    notification.success({ message: '¡Correo enviado con éxito!' })
  } catch (e: any) {
    message.error(e.message)
  }
  loading.value = false
}
</script>
<template>
  <form
    @submit.prevent="onSubmit"
    class="h-full w-full max-w-[300px] m-auto flex flex-col items-center justify-center gap-5 p-4"
  >
    <LogoComponent />
    <p class="text-xl font-semibold">Recuperar contraseña</p>
    <a-input v-model:value="email" placeholder="Correo electrónico" :disabled="loading"></a-input>
    <a-button type="primary" html-type="submit" class="w-full" :disabled="loading"
      >Enviar correo de recuperación</a-button
    >
    <router-link :to="{ name: 'login' }" class="w-full">
      <a-button type="text" html-type="button" class="w-full" :disabled="loading"
        >Cancelar</a-button
      >
    </router-link>
    <a-spin size="large" :spinning="loading" />
  </form>
</template>
