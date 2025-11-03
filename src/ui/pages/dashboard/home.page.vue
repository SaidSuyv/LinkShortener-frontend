<script setup lang="ts">
import { useUserStore } from '@/ui/stores/user.store'
import { computed } from 'vue'
import pageHeaderComponent from '@/ui/components/utils/page-header.component.vue'

const { user } = useUserStore()
const first_name = computed(() => user.name.split(' ')[0])
</script>
<template>
  <page-header-component :title="`!Hola, ${first_name}!`" />
</template>
