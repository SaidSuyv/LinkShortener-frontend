<script setup lang="ts">
  import { HomeOutlined, PaperClipOutlined, SettingOutlined } from '@ant-design/icons-vue'
  interface MenuItem {
    icon?: string;
    label?: string;
    route?: string;
    children?: MenuItem[]
  }

  const menu: MenuItem[] = [
    { icon: HomeOutlined, label: "Inicio", route: "home" },
    { icon: PaperClipOutlined, label: "Mis Links", route: "links" },
    { icon: SettingOutlined, label: "Configuracion", route: "settings" }
  ]
</script>
<template>
  <a-menu mode="inline" style="background-color: transparent;">
    <a-menu-item v-for="(item, index) in menu" :key="index">
      <router-link :to="{ name: item.route }">
      <component :is="item.icon" />
      <span>{{ item.label }}</span>
      </router-link>
    </a-menu-item>
  </a-menu>
</template>
