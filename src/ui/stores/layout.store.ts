import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface LayoutScheme {
  sidebar: {
    collapsed: boolean
    collapsedWidth: number
  }
}

export const useLayoutStore = defineStore('layout', () => {
  const layout: LayoutScheme = reactive<LayoutScheme>({
    sidebar: {
      collapsed: true,
      collapsedWidth: 80,
    },
  })

  function triggerCollapsed() {
    layout.sidebar.collapsed = !layout.sidebar.collapsed
  }

  function setCollapsedWidth(width: number) {
    layout.sidebar.collapsedWidth = width
  }

  return { layout, triggerCollapsed, setCollapsedWidth }
})
