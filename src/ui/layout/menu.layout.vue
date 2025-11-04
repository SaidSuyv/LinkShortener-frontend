<script setup lang="ts">
import { HomeOutlined, PaperClipOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { ItemType, MenuProps } from 'ant-design-vue'
import { h, reactive, ref, VueElement, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group'
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

const selectedKeys = ref<string[]>(['home'])

watch(
  () => route.name,
  (v: any) => {
    if (!selectedKeys.value.includes(v)) selectedKeys.value = [v]
  },
  { immediate: true }
)
</script>
<template>
  <a-menu
    id="main-menu"
    mode="inline"
    v-model:selectedKeys="selectedKeys"
    :items="items"
    @click="handleAction"
    class="!bg-transparent !border-0"
  />
</template>
