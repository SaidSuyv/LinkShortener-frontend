<script setup lang="ts">
import { useLayoutStore } from '@/ui/stores/layout.store'
import { MenuOutlined } from '@ant-design/icons-vue'
import { h } from 'vue'

const props = defineProps<{
  title: string
}>()

const { triggerCollapsed } = useLayoutStore()
</script>
<template>
  <div class="flex items-center gap-2">
    <a-button
      size="large"
      class="!grid !place-items-center"
      type="text"
      shape="circle"
      :icon="h(MenuOutlined)"
      @click="() => triggerCollapsed()"
    />
    <h1 class="text-2xl font-semibold">{{ props.title }}</h1>
  </div>
</template>