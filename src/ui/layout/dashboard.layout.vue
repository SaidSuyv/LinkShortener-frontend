<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import SidebarLayout from './sidebar.layout.vue'
import FooterLayout from './footer.layout.vue'
import { useLayoutStore } from '../stores/layout.store'
import { useUserStore } from '../stores/user.store'
import { RemoteUserRepositoryImpl } from '@/infrastructure/repositories/user.repository'
import { GetBasicDataUseCase } from '@/application/use-cases/user/get-basic-data.usecase'

const { layout, setCollapsedWidth } = useLayoutStore()
const { setPersonalData } = useUserStore()

const handleBreakpoint = (isMobile: boolean) => {
  if (isMobile) setCollapsedWidth(0)
  else setCollapsedWidth(80)
}

const fetchUserData = async () => {
  const provider = new RemoteUserRepositoryImpl()
  const useCase = new GetBasicDataUseCase(provider)
  const response = await useCase.execute()

  setPersonalData(response)
}

onMounted(() => {
  fetchUserData()
})
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
