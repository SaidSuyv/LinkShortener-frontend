<script setup lang="ts">
import { ResetPasswordUseCase } from '@/application/use-cases/auth/reset-password.usecase'
import { AuthRepositoryImpl } from '@/infrastructure/repositories/auth.repository'
import LogoComponent from '@/ui/components/utils/logo.component.vue'
import { App } from 'ant-design-vue'
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface FormScheme {
  email: string
  token: string
  password: string
  password_confirmation: string
}

const form = reactive<FormScheme>({
  email: '',
  password: '',
  password_confirmation: '',
  token: '',
})

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const { message, notification } = App.useApp()

// watch the params of the route to fetch the data again
watch(() => route.query, fetchData, { immediate: true })

async function fetchData(params: any) {
  //   error.value = params = null
  loading.value = true

  console.log('check params', params)
  const { token, email } = params

  if (!token || !email) return router.replace({ name: 'login' })

  form.email = email
  form.token = token

  loading.value = false
}

const onSubmit = async () => {
  loading.value = true
  try {
    await ResetPasswordUseCase(
      new AuthRepositoryImpl(),
      form.email,
      form.password,
      form.password_confirmation,
      form.token
    )
    notification.success({
      message: '¡La contraseña se ha restablecido correctamente!',
      duration: 1000,
      onClose() {
        router.replace({ name: 'login' })
      },
    })
  } catch (e: any) {
    message.error(e.message)
    loading.value = false
  }
}
</script>
<template>
  <form
    @submit.prevent="onSubmit"
    class="h-full w-full max-w-[300px] m-auto flex flex-col items-center justify-center gap-5 p-4"
  >
    <LogoComponent />
    <p class="text-xl font-semibold">Restablecer la contraseña</p>
    <a-input-password
      v-model:value="form.password"
      placeholder="Contraseña"
      :disabled="loading"
    ></a-input-password>
    <a-input-password
      v-model:value="form.password_confirmation"
      placeholder="Confirmar contraseña"
      :disabled="loading"
    ></a-input-password>
    <a-button type="primary" html-type="submit" class="w-full" :disabled="loading"
      >Restablecer contraseña</a-button
    >
    <router-link :to="{ name: 'login' }" class="w-full">
      <a-button type="text" html-type="button" class="w-full" :disabled="loading"
        >Cancelar</a-button
      >
    </router-link>
    <a-spin size="large" :spinning="loading" />
  </form>
</template>
