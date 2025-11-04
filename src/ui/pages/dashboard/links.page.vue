<script setup lang="ts">
import { GetAllLinksUseCase } from '@/application/use-cases/link/get-all.usecase'
import { RenoteLinkRepositoryImpl } from '@/infrastructure/repositories/link.repository'
import { onMounted, ref } from 'vue'
import pageHeaderComponent from '@/ui/components/utils/page-header.component.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import CreateLinkDialog from './links/components/create-link.dialog.vue'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
  },
  {
    title: 'URL',
    dataIndex: 'original_url',
  },
  {
    title: 'Short URL',
    dataIndex: 'code',
  },
  {
    title: 'Fecha de creación',
    dataIndex: 'created_at',
    sorter: true,
    responsive: ['md'],
  },
]

const items = ref<any[]>([])

const CreateLinkDialogRef = ref<InstanceType<typeof CreateLinkDialog>>()

const handleDialogOpen = () => {
  console.log('handleDialogOpen')
  if (CreateLinkDialogRef.value) {
    console.log('dialog disque existe')
    CreateLinkDialogRef.value.onOpenDialog()
  } else console.log('dialog no existe')
}

const onFetchData = async () => {
  const tokenService = new AuthTokenService()
  const data = await GetAllLinksUseCase(new RemoteLinkRepositoryImpl(tokenService))

  console.log(data)

  items.value = data
}

onMounted(() => {
  onFetchData()
})
</script>
<template>
  <create-link-dialog ref="CreateLinkDialogRef" />
  <page-header-component title="Mis links" />
  <a-space>
    <a-button type="primary" class="!flex items-center justify-center" @click="handleDialogOpen">
      <plus-outlined />
      <span>Crear nuevo link</span>
    </a-button>
  </a-space>
  <div class="max-x-[100%] overflow-auto">
    <a-table :dataSource="items" :columns="columns" />
  </div>
</template>
