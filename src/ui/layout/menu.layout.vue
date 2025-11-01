<script setup lang="ts">
import { HomeOutlined, PaperClipOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { ItemType, MenuProps } from 'ant-design-vue'
import { h, reactive, VueElement } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType
}

const items: ItemType[] = reactive([
  getItem('Inicio', 'home', () => h(HomeOutlined)),
  getItem('Mis Links', 'links', () => h(PaperClipOutlined)),
  getItem('Configuración', 'settings', () => h(SettingOutlined)),
])

const handleAction: MenuProps['onClick'] = (e) => {
  const name: string = e.key as string
  router.push({ name })
}
</script>
<template>
  <a-menu
    id="main-menu"
    mode="inline"
    :items="items"
    @click="handleAction"
    class="!bg-transparent !border-0"
  />
</template>
