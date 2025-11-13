<script setup lang="ts">

  import { ref, reactive } from 'vue'

  interface DataInterface {
    progress: number;
    finished: boolean;
  }

  const isOpened = ref<boolean>(false)

  const data = reactive<DataInterface>({
    progress: 0,
    finished: false
  })

  const onUpdateData = (progress: number, finished: boolean) => {
    data.progress = progress
    data.finished = finished
    if( finished )
    {
      setTimeout(()=>{
        isOpened.value = false
        data.progress = 0
        data.finished = false
      },1000)
    }
  }

  const openDialog = () => {
    isOpened.value = true
  }

  defineExpose({ onUpdateData, openDialog })
</script>

<template>
  <a-modal
    v-model:open="isOpened"
    centered
    :footer="null"
    :closable="false"
  >
  <p class="font-bold text-2xl">{{ data.finished ? 'Proceso terminado!' : 'En proceso...esto podría tomar unos segundos' }}</p>
    <a-progress :percent="data.progress" />
  </a-modal>
</template>
