<script setup lang="ts">
import LogoImage from '/logo.png'

enum OrientationOptions {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

const props = withDefaults(defineProps<{ orientation?: OrientationOptions; logow: number }>(), {
  orientation: OrientationOptions.Horizontal,
  logow: 150,
})
</script>
<template>
  <div
    class="flex"
    :class="{
      'flex-col gap-3': props.orientation == OrientationOptions.Vertical,
      'items-center gap-5': props.orientation == OrientationOptions.Horizontal,
    }"
  >
    <router-link to="/">
      <img :class="`m-auto max-w-[${props.logow}px]`" :src="LogoImage" alt="Logo Oficial" />
    </router-link>
    <div
      class="flex flex-col"
      :class="{
        'items-center': props.orientation == OrientationOptions.Vertical,
      }"
    >
      <p class="text-lg font-display">Link Shortener</p>
      <p class="text-sm text-white/30">by SaidSuyv</p>
    </div>
  </div>
</template>
