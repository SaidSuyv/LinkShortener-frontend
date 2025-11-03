<script setup lang="ts">
import { GetAllLinksUseCase } from '@/application/use-cases/link/get-all.usecase'
import { LinkRepositoryImpl } from '@/infrastructure/repositories/link.repository'
import { onMounted, ref } from 'vue'

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
    responsive: ['md']
  },
]

const items = ref<any[]>([])

const onFetchData = async () => {
  const data = await GetAllLinksUseCase(new LinkRepositoryImpl())

  console.log(data)

  items.value = data
}

onMounted(() => {
  onFetchData()
})
</script>
<template>
  <h1 class="text-2xl font-semibold">Mis links</h1>
  <div class="max-x-[100%] overflow-auto">
    <a-table :dataSource="items" :columns="columns" />
  </div>
</template>
