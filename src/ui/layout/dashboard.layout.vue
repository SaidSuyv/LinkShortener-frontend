<script setup lang="ts">
import { ref } from 'vue'
import SidebarLayout from './sidebar.layout.vue'
import FooterLayout from './footer.layout.vue'
import { useLayoutStore } from '../stores/layout.store'

const { layout, setCollapsedWidth } = useLayoutStore()

const handleBreakpoint = (isMobile: boolean) => {
  if (isMobile) setCollapsedWidth(0)
  else setCollapsedWidth(80)
}
</script>
<template>
  <a-layout style="min-height: 100dvh">
    <a-layout-sider
      v-model:collapsed="layout.sidebar.collapsed"
      collapsible
      breakpoint="md"
      :collapsed-width="layout.sidebar.collapsedWidth"
      @breakpoint="handleBreakpoint($event)"
      :trigger="null"
    >
      <SidebarLayout />
    </a-layout-sider>
    <a-layout class="overflow-auto">
      <a-layout-content>
        <div class="p-5 h-full flex flex-col gap-5">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <FooterLayout />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
