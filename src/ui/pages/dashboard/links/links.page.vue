<script setup lang="ts">
import { GetAllLinksUseCase } from '@/application/use-cases/link/get-all.usecase'
import { RemoteLinkRepositoryImpl } from '@/infrastructure/repositories/link.repository'
import { createVNode, h, onMounted, ref } from 'vue'
import pageHeaderComponent from '@/ui/components/utils/page-header.component.vue'
import {
  DeleteOutlined,
  EditFilled,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue'
import CreateLinkDialog from './components/create-link.dialog.vue'
import EditLinkDialog from './components/edit-link.dialog.vue'
import { Modal } from 'ant-design-vue'
import { DeleteLinkUseCase } from '@/application/use-cases/link/delete.usecase'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
  },
  {
    title: 'URL',
    dataIndex: 'original_url',
    key: 'original_url',
  },
  {
    title: 'Short URL',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Fecha de creación',
    dataIndex: 'created_at',
    key: 'created_at',
    sorter: true,
    responsive: ['md'],
  },
  {
    title: 'Fecha de expiración',
    dataIndex: 'expiration_at',
    key: 'expiration_at',
    sorter: true,
  },
  {
    title: 'Acciones',
    key: 'actions',
  },
]

const items = ref<any[]>([])
const isLoading = ref<boolean>(false)

const CreateLinkDialogRef = ref<InstanceType<typeof CreateLinkDialog>>()
const EditLinkDialogRef = ref<InstanceType<typeof EditLinkDialog>>()

const handleCreateDialog = () => {
  if (CreateLinkDialogRef.value) {
    CreateLinkDialogRef.value.onOpenDialog()
  }
}

const handleEditDialog = (id: number, url: string) => {
  if (EditLinkDialogRef.value) {
    EditLinkDialogRef.value.onOpenDialog({ id, url })
  }
}

const handleDeleteDialog = (id: number) => {
  Modal.confirm({
    title: '¿Seguro de borrar este url?',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'Puedes volver a activarlo en cualquier momento',
    okText: 'Si',
    okType: 'danger',
    cancelText: 'No',
    async onOk() {
      isLoading.value = true
      const provider = new RemoteLinkRepositoryImpl()
      const useCase = new DeleteLinkUseCase(provider)
      await useCase.execute(id)
      isLoading.value = false
      onFetchData()
    },
    onCancel() {
      console.log('Cancel')
    },
  })
}

const onFetchData = async () => {
  isLoading.value = true
  const data = await GetAllLinksUseCase(new RemoteLinkRepositoryImpl())

  items.value = data

  isLoading.value = false
}

const handleUploaded = () => onFetchData()

onMounted(() => {
  onFetchData()
})
</script>
<template>
  <create-link-dialog ref="CreateLinkDialogRef" @on-uploaded="handleUploaded" />
  <edit-link-dialog ref="EditLinkDialogRef" @on-uploaded="handleUploaded" />
  <page-header-component title="Mis links" />
  <a-space>
    <a-button type="primary" class="!flex items-center justify-center" @click="handleCreateDialog">
      <plus-outlined />
      <span>Crear nuevo link</span>
    </a-button>
  </a-space>
  <div class="max-x-[100%] overflow-auto">
    <a-table :loading="isLoading" :dataSource="items" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'created_at'">
          {{ new Date(record.created_at).toLocaleString() }}
        </template>
        <template v-else-if="column.key === 'expiration_at'">
          {{ new Date(record.expiration_at).toLocaleString() }}
        </template>
        <template v-else-if="column.key === 'actions'">
          <a-space>
            <a-tooltip title="Editar">
              <a-button
                :icon="h(EditFilled)"
                shape="circle"
                type="primary"
                class="!flex items-center justify-center"
                @click="handleEditDialog(record.id, record.original_url)"
              />
            </a-tooltip>
            <a-tooltip title="Borrar">
              <a-button
                :icon="h(DeleteOutlined)"
                shape="circle"
                danger
                type="primary"
                class="!flex items-center justify-center"
                @click="handleDeleteDialog(record.id)"
              />
            </a-tooltip>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
