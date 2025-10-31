<script setup lang="ts">
import { useUserStore } from '@/ui/stores/user.store'
import LogoComponent from '@/ui/components/utils/logo.component.vue'
import { useRouter } from 'vue-router'
import { App } from 'ant-design-vue'
import { AuthRepositoryImpl } from '@/infrastructure/repositories/auth.repository'
import { reactive, ref } from 'vue'
import { LoginUseCase } from '@/application/use-cases/auth/login.usecase'
import { RegisterUseCase } from '@/application/use-cases/auth/register.usecase'

interface FormScheme {
  name: string
  lastname: string
  email: string
  password: string
  password_confirmation: string
}

const form = reactive<FormScheme>({
  name: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const loading = ref(false)
const userStore = useUserStore()
const router = useRouter()

const { message } = App.useApp()

const onSubmit = async () => {
  loading.value = true
  try {
    const { name, lastname, email, full_name, token } = await RegisterUseCase(
      new AuthRepositoryImpl(),
      form.name,
      form.lastname,
      form.email,
      form.password,
      form.password_confirmation
    )
    userStore.setPersonalData({ name, lastname, full_name, email })
    userStore.setAuthData(token)
    router.replace('dashboard')
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
    <LogoComponent :logow="80" />
    <p class="w-full text-lg text-semibold">Información personal</p>
    <a-input v-model:value="form.name" placeholder="Nombres" :disabled="loading" />
    <a-input v-model:value="form.lastname" placeholder="Apellidos" :disabled="loading" />
    <p class="w-full text-lg text-semibold">Información de cuenta</p>
    <a-input v-model:value="form.email" placeholder="Correo electrónico" :disabled="loading" />
    <a-input-password v-model:value="form.password" placeholder="Contraseña" :disabled="loading" />
    <a-input-password
      v-model:value="form.password_confirmation"
      placeholder="Confirmar contraseña"
      :disabled="loading"
    />
    <a-button type="primary" html-type="submit" class="w-full" :disabled="loading"
      >Registrarse</a-button
    >
    <router-link :to="{ name: 'login' }" class="w-full">
      <a-button type="text" html-type="button" class="w-full" :disabled="loading"
        >Cancelar</a-button
      >
    </router-link>
    <a-spin size="large" :spinning="loading" />
  </form>
</template>
