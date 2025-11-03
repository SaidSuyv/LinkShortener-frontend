<script setup lang="ts">
interface BaseDialogScheme {
  open: boolean
  loading?: boolean
  centered?: boolean
}

const props = withDefaults(defineProps<BaseDialogScheme>(), { open: false })

const emit = defineEmits(['state:ok', 'close'])

const handleClose = () => {
  console.log('check pepepepe')
  emit('close')
}
</script>
<template>
  <a-modal
    v-model:open="props.open"
    :confirm-loading="props.loading"
    @ok="handleClose"
    :centered="props.centered"
    :footer="null"
    :closable="null"
  >
    <slot />
  </a-modal>
</template>