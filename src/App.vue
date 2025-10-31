<script setup lang="ts">
import { reactive } from 'vue'
import { theme as antTheme } from 'ant-design-vue'

const theme = reactive({
  algorithm: antTheme.darkAlgorithm,
  token: {
    colorPrimary: '#3d52d5',
    colorSecondary: '#555',
  },
})
</script>

<template>
  <a-app class="h-full">
    <a-config-provider :theme="theme">
      <router-view />
    </a-config-provider>
  </a-app>
</template>
