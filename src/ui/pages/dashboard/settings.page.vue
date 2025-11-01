<script setup lang="ts">
import { useUserStore } from '@/ui/stores/user.store'
import { useRouter } from 'vue-router'

const { clearData } = useUserStore()
const router = useRouter()

const onLogout = () => {
  clearData()
  router.replace({ name: 'login' })
}
</script>
<template>
  <a-button danger @click="onLogout()" ghost>
    <span>Cerrar sesión</span>
  </a-button>
</template>
