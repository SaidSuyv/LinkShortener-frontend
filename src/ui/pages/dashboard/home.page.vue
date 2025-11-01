<script setup lang="ts">
  import { useUserStore } from '@/ui/stores/user.store'
  import { computed } from 'vue'

  const { user } = useUserStore()
  const first_name = computed( () => user.name.split(" ")[0] )
</script>
<template>
  <h1>¡Hola, {{first_name}}!</h1>
</template>
