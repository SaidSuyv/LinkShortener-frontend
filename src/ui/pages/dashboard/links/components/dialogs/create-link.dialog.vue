<script setup lang="ts">
import linkCreateForm from '@/ui/components/forms/link-create.form.vue'
import { ref } from 'vue'

import { RemoteLinkRepositoryImpl } from '@/infrastructure/repositories/link.repository'
import { CreateLinkUseCase } from '@/application/use-cases/link/create.usecase'

const openDialog = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const onOpenDialog = () => {
  openDialog.value = true
}

const onCloseDialog = () => {
  openDialog.value = false
}

const handleSubmit = async (values: any) => {
  const { url } = values

  isLoading.value = true

  const provider = new RemoteLinkRepositoryImpl()
  const useCase = new CreateLinkUseCase(provider)
  await useCase.execute(url)

  isLoading.value = false

  emit('onUploaded')
  onCloseDialog()
}

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
    <link-create-form :loading="isLoading" @ok="handleSubmit" @cancel="onCloseDialog" />
  </a-modal>
</template>
