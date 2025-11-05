<script setup lang="ts">
import { reactive } from 'vue'
import type { Rule } from 'ant-design-vue'

interface PropsScheme {
  loading: boolean
}

const props = withDefaults(defineProps<PropsScheme>(), {
  loading: false,
})

const emit = defineEmits(['ok', 'cancel'])

interface LinkFormScheme {
  url: string
}

const form = reactive<LinkFormScheme>({
  url: '',
})

const checkUrl = async (_rule: Rule, value: string) => {
  if (value.trim().length == 0) return Promise.reject('Por favor ingrese una url')
  else {
    const reg: RegExp =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/
    if (!reg.test(value)) {
      return Promise.reject('Por favor ingrese un url válido')
    }

    return Promise.resolve()
  }
}

const rules: Record<string, Rule[]> = {
  url: [{ require: true, validator: checkUrl, trigger: 'change' }],
}

const handleSubmit = (values: any) => {
  emit('ok', values)
  form.url = ''
}

const handleCancel = () => emit('cancel')
</script>
<template>
  <a-form :model="form" :disabled="props.loading" :rules="rules" @finish="handleSubmit">
    <a-form-item>
      <h1 class="text-2xl font-semibold">Crear nuevo link</h1>
    </a-form-item>
    <a-form-item name="url">
      <label for="original_url" class="block mb-2 font-bold">Url</label>
      <a-input id="original_url" v-model:value="form.url" placeholder="https://example.com" />
    </a-form-item>
    <a-space>
      <a-button type="primary" html-type="submit">Crear nuevo link</a-button>
      <a-button type="secondary" ghost @click="handleCancel">Cancelar</a-button>
    </a-space>
  </a-form>
</template>
