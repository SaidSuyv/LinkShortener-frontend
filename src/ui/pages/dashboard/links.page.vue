<script setup lang="ts">
import { GetAllLinksUseCase } from '@/application/use-cases/link/get-all.usecase'
import { LinkRepositoryImpl } from '@/infrastructure/repositories/link.repository'
import { onMounted } from 'vue'

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
  },
]

const onFetchData = async () => {
  const data = await GetAllLinksUseCase(new LinkRepositoryImpl())

  console.log(data)
}

onMounted(() => {
  onFetchData()
})
</script>
<template>
  <h1 class="text-2xl font-semibold">Mis links</h1>
</template>
