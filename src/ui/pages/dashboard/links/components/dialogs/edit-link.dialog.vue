<script setup lang="ts">
import linkEditForm from '@/ui/components/forms/link-edit.form.vue'
import { reactive, ref } from 'vue'

import { RemoteLinkRepositoryImpl } from '@/infrastructure/repositories/link.repository'
import { EditLinkUseCase } from '@/application/use-cases/link/edit.usecase'

const openDialog = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const data = reactive<{ id: number | null; url: string | null }>({
  id: null,
  url: null,
})

const onOpenDialog = (inp: { id: number; url: string }) => {
  data.id = inp.id
  data.url = inp.url
  openDialog.value = true
}

const onCloseDialog = () => {
  openDialog.value = false
}

const handleSubmit = async (values: any) => {
  const { url } = values
  const id = data.id

  isLoading.value = true

  const provider = new RemoteLinkRepositoryImpl()
  const useCase = new EditLinkUseCase(provider)
  await useCase.execute(id!, url)

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
    <link-edit-form :data="data" :loading="isLoading" @ok="handleSubmit" @cancel="onCloseDialog" />
  </a-modal>
</template>
