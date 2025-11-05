<script setup lang="ts">
import { GetAllInactiveLinksUseCase } from '@/application/use-cases/link/get-all-inactive.usecase'
import { RestoreLinkUseCase } from '@/application/use-cases/link/restore.usecase'
import type { LinkEntity } from '@/domain/entities/link.entity'
import { RemoteLinkRepositoryImpl } from '@/infrastructure/repositories/link.repository'
import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import type { ColumnProps } from 'ant-design-vue/es/table'
import { createVNode, h, onBeforeMount, onMounted, reactive, ref, watch } from 'vue'

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
    title: 'Fecha de creacion',
    dataIndex: 'created_at',
    key: 'created_at',
    sorter: true,
    width: 250,
  },
  {
    title: 'Fecha de eliminación',
    dataIndex: 'deleted_at',
    key: 'deleted_at',
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

const items = ref<LinkEntity[]>()
const isLoading = ref<boolean>(false)

const emit = defineEmits(['onReload'])

const handleRestoreLinkDialog = (id: number) => {
  Modal.confirm({
    title: '¿Deseas restaurar este link?',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'Si el link ya expiró, la acción no tendrá ningun efecto.',
    okText: 'Si',
    cancelText: 'No',
    okType: 'default',
    centered: true,
    async onOk() {
      isLoading.value = true
      const provider = new RemoteLinkRepositoryImpl()
      const useCase = new RestoreLinkUseCase(provider)
      await useCase.execute(id)
      isLoading.value = false
      emit('onReload')
    },
  })
}

const onFetchData = async () => {
  isLoading.value = true

  const data = await GetAllInactiveLinksUseCase(new RemoteLinkRepositoryImpl())

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
  <a-table
    :loading="isLoading"
    :dataSource="items"
    :columns="columns"
    :pagination="paginationConfig"
    :scroll="{ x: 'max-content' }"
    table-layout="fixed"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'created_at'">
        {{ new Date(record.created_at).toLocaleString() }}
      </template>
      <template v-else-if="column.key === 'deleted_at'">
        {{ new Date(record.deleted_at).toLocaleString() }}
      </template>
      <template v-else-if="column.key === 'expiration_at'">
        {{ record.expiration_at ? new Date(record.created_at).toLocaleString() : '---' }}
      </template>
      <template v-else-if="column.key === 'actions'">
        <a-space>
          <a-tooltip title="Resturar">
            <a-button
              :icon="h(CheckOutlined)"
              shape="circle"
              type="primary"
              class="!flex items-center justify-center"
              @click="handleRestoreLinkDialog(record.id)"
            />
          </a-tooltip>
        </a-space>
      </template>
    </template>
  </a-table>
</template>