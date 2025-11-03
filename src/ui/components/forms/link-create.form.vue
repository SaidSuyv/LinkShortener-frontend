<script setup lang="ts">
import { reactive } from 'vue'

interface PropsScheme {
  loading: boolean
}

const props = withDefaults(defineProps<PropsScheme>(), {
  loading: false,
})

interface LinkFormScheme {
  url: string
}

const form = reactive<LinkFormScheme>({
  url: '',
})

const handleSubmit = (values: any) => {
  console.log('submitted', values)
}

const handleSubmitFailed = (errorInfo: any) => {
  console.log('failed:', errorInfo)
}

const emit = defineEmits(['cancel'])

const handleCancel = () => emit('cancel')
</script>
<template>
  <a-form
    :model="form"
    :disabled="props.loading"
    @finish="handleSubmit"
    @finishFailed="handleSubmitFailed"
  >
    <a-form-item>
      <h1 class="text-2xl font-semibold">Crear nuevo link</h1>
    </a-form-item>
    <a-form-item name="url" :rules="[{ required: true, message: 'Por favor ingrese un url' }]">
      <label for="original_url" class="block mb-2 font-bold">Url</label>
      <a-input id="original_url" v-model:value="form.url" placeholder="https://example.com" />
    </a-form-item>
    <a-space>
      <a-button type="primary" html-type="submit">Crear nuevo link</a-button>
      <a-button type="secondary" ghost @click="handleCancel">Cancelar</a-button>
    </a-space>
  </a-form>
</template>