<script setup lang="ts">
import { reactive, ref } from 'vue'
import LogoImage from '/logo.png'
import { LoginUseCase } from '@/application/use-cases/auth/login.usecase'
import { AuthRepositoryImpl } from '@/infrastructure/repositories/auth.repository'
import { useUserStore } from '@/ui/stores/user.store'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

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
const AuthRepositoryInstance = new AuthRepositoryImpl()
const userStore = useUserStore()
const router = useRouter()

const [messageApi, contextHolder] = message.useMessage()

const onSubmit = async () => {
  try {
    loading.value = true
    const { name, lastname, email, full_name, token } = await LoginUseCase(
      AuthRepositoryInstance,
      form.email,
      form.password
    )
    userStore.setPersonalData({ name, lastname, full_name, email })
    userStore.setAuthData(token)
    router.replace('dashboard')
  } catch (e: any) {
    console.log('errorrrr', e)
    messageApi.error(e.message)
  }
  loading.value = false
}
</script>
<template>
  <context-holder />
  <form
    @submit.prevent="onSubmit"
    class="h-full w-full max-w-[300px] m-auto flex flex-col items-center justify-center gap-5 p-4"
  >
    <div class="flex flex-col gap-1">
      <img class="max-w-[100px] m-auto" :src="LogoImage" alt="Logo Oficial" />
      <p class="text-lg text-center font-display mt-3">Link Shortener</p>
      <p class="text-sm text-center text-white/30">by SaidSuyv</p>
    </div>
    <a-input
      v-model:value="form.email"
      placeholder="Correo electrónico"
      :disabled="loading"
    ></a-input>
    <a-input-password
      v-model:value="form.password"
      placeholder="Contraseña"
      :disabled="loading"
    ></a-input-password>
    <a-button type="primary" html-type="submit" class="w-full" :disabled="loading"
      >Iniciar sesión</a-button
    >
    <a-spin size="large" :spinning="loading" />
  </form>
</template>