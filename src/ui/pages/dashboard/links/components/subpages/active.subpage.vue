<script setup lang="ts">
import { createVNode, onMounted, ref, h, reactive, watch } from 'vue'
import EditLinkDialog from '../dialogs/edit-link.dialog.vue'
import { Modal } from 'ant-design-vue'
import { DeleteOutlined, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { RemoteLinkRepositoryImpl } from '@/infrastructure/repositories/link.repository'
import { DeleteLinkUseCase } from '@/application/use-cases/link/delete.usecase'
import { GetAllActiveLinksUseCase } from '@/application/use-cases/link/get-all-active.usecase'
import type { ColumnProps } from 'ant-design-vue/es/table'

const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
    width: 100,
  },
  {
    title: 'URL',
    dataIndex: 'original_url',
    key: 'original_url',
    width: 250,
  },
  {
    title: 'Short URL',
    dataIndex: 'code',
    key: 'code',
    width: 100,
  },
  {
    title: 'Fecha de creación',
    dataIndex: 'created_at',
    key: 'created_at',
    sorter: true,
    width: 250,
  },
  {
    title: 'Fecha de expiración',
    dataIndex: 'expiration_at',
    key: 'expiration_at',
    sorter: true,
    width: 250,
  },
  {
    title: 'Acciones',
    key: 'actions',
    width: 150,
  },
]

const items = ref<any[]>([])
const isLoading = ref<boolean>(false)

const emit = defineEmits(['onReload'])

const EditLinkDialogRef = ref<InstanceType<typeof EditLinkDialog>>()

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
    centered: true,
    async onOk() {
      isLoading.value = true
      const provider = new RemoteLinkRepositoryImpl()
      const useCase = new DeleteLinkUseCase(provider)
      await useCase.execute(id)
      isLoading.value = false
      emit('onReload')
    },
  })
}

const onFetchData = async () => {
  isLoading.value = true
  const data = await GetAllActiveLinksUseCase(new RemoteLinkRepositoryImpl())

  items.value = data

  isLoading.value = false
}

const paginationConfig = reactive<{ pageSize: number }>({
  pageSize: 5,
})

onMounted(() => {
  onFetchData()
})

defineExpose({ onFetchData })
</script>
<template>
  <edit-link-dialog ref="EditLinkDialogRef" @on-uploaded="onFetchData" />
  <a-table
    :loading="isLoading"
    :data-source="items"
    :columns="columns"
    :pagination="paginationConfig"
    :scroll="{ x: 'max-content' }"
    table-layout="fixed"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'created_at'">
        {{ new Date(record.created_at).toLocaleString() }}
      </template>
      <template v-else-if="column.key === 'expiration_at'">
        {{ record.expiration_at ? new Date(record.expiration_at).toLocaleString() : '-' }}
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
</template>