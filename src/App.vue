<script setup lang="ts">
import { reactive } from 'vue'
import { theme as antTheme } from 'ant-design-vue'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'

const theme = reactive<ThemeConfig>({
  algorithm: antTheme.darkAlgorithm,
  token: {
    colorPrimary: '#3d52d5',
    colorBgBase: '#3c3744',
    colorPrimaryBg: 'transparent',
    colorErrorBg: 'transparent',
    colorBgLayout: 'transparent',
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
