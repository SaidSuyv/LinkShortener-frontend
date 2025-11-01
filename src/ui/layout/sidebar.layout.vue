<script setup lang="ts">
  import LogoComponent from '@/ui/components/utils/logo.component.vue'
  import MenuComponent from './menu.layout.vue'

  const props = defineProps<{
    collapsed: boolean
  }>()
</script>
<template>
  <div class="m-[16px] overflow-hidden">
  <LogoComponent :showTitle="!props.collapsed" logow="max-w-[40px] md:max-w-[80px]"
  titleClass="!text-sm" subtitleClass="!text-xs" />
  </div>
  <MenuComponent />
</template>
