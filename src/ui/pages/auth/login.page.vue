<script setup lang="ts">
import { reactive, ref } from 'vue'
import { LoginUseCase } from '@/application/use-cases/auth/login.usecase'
import { AuthRepositoryImpl } from '@/infrastructure/repositories/auth.repository'
import { useUserStore } from '@/ui/stores/user.store'
import LogoComponent from '@/ui/components/utils/logo.component.vue'
import { useRouter } from 'vue-router'
import { App } from 'ant-design-vue'

interface FormScheme {
  email: string
  password: string
  remember: boolean
}

const form = reactive<FormScheme>({
  email: '',
  password: '',
  remember: false,
})

const loading = ref(false)
const userStore = useUserStore()
const router = useRouter()

const { message } = App.useApp()

const onSubmit = async () => {
  loading.value = true
  try {
    const { name, lastname, email, full_name, token } = await LoginUseCase(
      new AuthRepositoryImpl(),
      form.email,
      form.password
    )
    userStore.setPersonalData({ name, lastname, full_name, email })
    userStore.setAuthData(token)
    router.push({ name: 'dashboard' })
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
  <LogoComponent orientation="vertical" logow="max-w-[80px] md:max-w-[100px]" />
    <a-input
      v-model:value="form.email"
      placeholder="Correo electrónico"
      :disabled="loading"
    ></a-input>
    <div class="flex flex-col w-full gap-1">
      <router-link :to="{ name: 'forgot-password' }" tabindex="-1" replace>
        <span class="text-white/60">¿Olvidaste tu contraseña?</span>
      </router-link>
      <a-input-password
        v-model:value="form.password"
        placeholder="Contraseña"
        :disabled="loading"
      ></a-input-password>
    </div>
    <a-button type="primary" html-type="submit" class="w-full" :disabled="loading"
      >Iniciar sesión</a-button
    >
    <p class="text-sm text-center">
      ¿Eres nuevo(a)?
      <router-link :to="{ name: 'register' }" tabindex="-1" replace
        ><span class="font-semibold text-primary text-underline">Registrate</span></router-link
      >
    </p>
    <a-spin size="large" :spinning="loading" />
  </form>
</template>
