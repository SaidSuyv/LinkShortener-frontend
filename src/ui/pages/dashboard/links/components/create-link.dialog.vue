<script setup lang="ts">
import linkCreateForm from '@/ui/components/forms/link-create.form.vue'
import { ref } from 'vue'

const openDialog = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const onOpenDialog = () => {
  console.log('on opened dialog')
  openDialog.value = true
}

const onCloseDialog = () => {
  console.log('on closed dialog')
  openDialog.value = false
}

const handleSubmit = async () => {}

const emit = defineEmits(['onUploaded'])

defineExpose({ onOpenDialog })
</script>
<template>
  <a-modal
    v-model:open="openDialog"
    :confim-loading="isLoading"
    centered
    :footer="null"
    :closable="false"
  >
    <link-create-form @cancel="onCloseDialog" />
  </a-modal>
</template>