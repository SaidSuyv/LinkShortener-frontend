<script setup lang="ts">
import LogoComponent from '@/ui/components/utils/logo.component.vue'
import MenuComponent from './menu.layout.vue'
import { useLayoutStore } from '../stores/layout.store'

const { layout } = useLayoutStore()
</script>
<template>
  <div class="m-[16px] overflow-hidden">
    <LogoComponent
      :showTitle="!layout.sidebar.collapsed"
      logow="max-w-[40px]"
      titleClass="!text-sm"
      subtitleClass="!text-xs"
    />
  </div>
  <MenuComponent />
</template>
