<script setup lang="ts">
import { ref } from 'vue'
import SidebarLayout from './sidebar.layout.vue'
import FooterLayout from './footer.layout.vue'

const collapsed = ref<boolean>(true)
</script>
<template>
  <a-layout style="min-height: 100dvh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible breakpoint="lg" collapsed-width="0">
      <SidebarLayout :collapsed="collapsed" />
    </a-layout-sider>
    <a-layout>
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
