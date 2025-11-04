<script setup lang="ts">
import linkCreateForm from '@/ui/components/forms/link-create.form.vue'
import { ref } from 'vue'

import { AuthTokenStorage } from '@/infrastructure/services/auth-token-storage.service'
import { RemoteLinkRepositoryImpl } from '@/infrastructure/repositories/link.repository'
import { CreateLinkUseCase } from '@/application/use-cases/link/create.usecase'

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

const handleSubmit = async (values: any) => {
  console.log("check passed values", values)
  const { url } = values

  const tokenService = new AuthTokenStorage()
  const provider = new RemoteLinkRepositoryImpl(tokenService)
  const useCase = new CreateLinkUseCase(provider)
  const response = await useCase.execute( url )

  console.log("check response", response)
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
    <link-create-form @ok="handleSubmit" @cancel="onCloseDialog" />
  </a-modal>
</template>
