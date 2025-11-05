<script setup lang="ts">
import { h, ref } from 'vue'
import pageHeaderComponent from '@/ui/components/utils/page-header.component.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import CreateLinkDialog from './components/dialogs/create-link.dialog.vue'
import ActiveSubpage from './components/subpages/active.subpage.vue'
import InactiveSubpage from './components/subpages/inactive.subpage.vue'

const CreateLinkDialogRef = ref<InstanceType<typeof CreateLinkDialog>>()

const handleCreateDialog = () => {
  CreateLinkDialogRef.value.onOpenDialog()
}

const ActiveSubpageRef = ref<InstanceType<typeof ActiveSubpage>>()
const InactiveSubpageRef = ref<InstanceType<typeof InactiveSubpage>>()

const handleUploaded = () => {
  if (ActiveSubpageRef.value) ActiveSubpageRef.value.onFetchData()
  if (InactiveSubpageRef.value) InactiveSubpageRef.value.onFetchData()
}
</script>
<template>
  <create-link-dialog ref="CreateLinkDialogRef" @on-uploaded="handleUploaded" />
  <page-header-component title="Mis links" />
  <a-space>
    <a-button type="primary" class="!flex items-center justify-center" @click="handleCreateDialog">
      <plus-outlined />
      <span>Crear nuevo link</span>
    </a-button>
  </a-space>
  <a-tabs>
    <a-tab-pane key="1" tab="Activos">
      <active-subpage ref="ActiveSubpageRef" @on-reload="handleUploaded" />
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