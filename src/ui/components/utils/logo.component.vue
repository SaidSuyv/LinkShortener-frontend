<script setup lang="ts">
import LogoImage from '/logo.png'

enum OrientationOptions {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

interface PropScheme {
  orientation?: OrientationOptions;
  logow?: string;
  showTitle?: boolean;
  titleClass?: string;
  subtitleClass?: string;
}

const props = withDefaults(defineProps<PropScheme>(), {
  orientation: OrientationOptions.Horizontal,
  logow: "max-w-[60px]",
  showTitle: true,
  titleClass: '',
  subtitleClass: ''
})
</script>
<template>
  <div
    class="flex"
    :class="{
      'flex-col gap-3': props.orientation == OrientationOptions.Vertical,
      'items-center gap-5': props.orientation == OrientationOptions.Horizontal,
      '!gap-0': !props.showTitle
    }"
  >
  <router-link to="/" :class="{'m-auto': !props.showTitle}">
      <img :class="`m-auto ${props.logow}`" :src="LogoImage" alt="Logo Oficial" />
    </router-link>
    <div
      class="flex flex-col"
      :class="{
        'items-center': props.orientation == OrientationOptions.Vertical,
      }"
      v-if="props.showTitle"
    >
      <p class="text-lg font-display" :class="props.titleClass">Link Shortener</p>
      <p class="text-sm text-white/30" :class="props.subtitleClass">by SaidSuyv</p>
    </div>
  </div>
</template>
