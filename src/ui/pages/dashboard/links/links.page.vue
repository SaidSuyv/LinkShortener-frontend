<script setup lang="ts">
import { h, ref } from 'vue'
import pageHeaderComponent from '@/ui/components/utils/page-header.component.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import CreateLinkDialog from './components/dialogs/create-link.dialog.vue'
import ActiveSubpage from './components/subpages/active.subpage.vue'
import InactiveSubpage from './components/subpages/inactive.subpage.vue'

import { RemoteLinkRepositoryImpl } from '@/infrastructure/repositories/link.repository'
import { CheckStatusBulkUseCase } from '@/application/use-cases/link/check-status-bulk.usecase'
import CheckStatusBulkDialog from './components/dialogs/check-status-bulk.dialog.vue'

const CreateLinkDialogRef = ref<InstanceType<typeof CreateLinkDialog>>()
const CheckStatusBulkDialogRef = ref<InstanceType<typeof CheckStatusBulkDialog>>()

const handleCreateDialog = () => {
  CreateLinkDialogRef.value.onOpenDialog()
}

const ActiveSubpageRef = ref<InstanceType<typeof ActiveSubpage>>()
const InactiveSubpageRef = ref<InstanceType<typeof InactiveSubpage>>()

const handleUploaded = () => {
  ActiveSubpageRef.value?.onFetchData()
  InactiveSubpageRef.value?.onFetchData()
}

const handleTabChange = (ev: any) => {
  console.log('ev',ev)
  switch(ev){
    case '1':
      ActiveSubpageRef.value?.onFetchData()
      break;
    case '2':
      InactiveSubpageRef.value?.onFetchData()
      break;
  }
}

const handleCheckStatusBulk = (id: string) => {
  let timer = null
  const checkTimeSpan = 500 // 1seg

  CheckStatusBulkDialogRef.value?.openDialog()

  timer = setInterval(
    async () => {
      const provider = new RemoteLinkRepositoryImpl()
      const usecase = new CheckStatusBulkUseCase(provider)
      const { progress, finished } = await usecase.execute(id)

      CheckStatusBulkDialogRef.value?.onUpdateData(progress, finished)

      if(finished) {
        clearInterval(timer)
        handleUploaded()
      }
    },
    checkTimeSpan
  )
}

</script>
<template>
  <create-link-dialog ref="CreateLinkDialogRef" @on-uploaded="handleUploaded" />
  <check-status-bulk-dialog ref="CheckStatusBulkDialogRef"/>
  <page-header-component title="Mis links" />
  <a-space>
    <a-button type="primary" class="!flex items-center justify-center" @click="handleCreateDialog">
      <plus-outlined />
      <span>Crear nuevo link</span>
    </a-button>
  </a-space>
  <a-tabs @change="handleTabChange">
    <a-tab-pane key="1" tab="Activos">
      <active-subpage ref="ActiveSubpageRef" @on-reload="handleUploaded"
        @on-check-status-bulk="handleCheckStatusBulk($event)"/>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Inactivos">
      <inactive-subpage ref="InactiveSubpageRef" @on-reload="handleUploaded" />
    </a-tab-pane>
  </a-tabs>
</template>
<style>
/* .ant-table-wrapper {
  min-width: 100dvh !important;
} */
</style>
