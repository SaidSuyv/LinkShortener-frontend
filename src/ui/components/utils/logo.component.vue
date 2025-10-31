<script setup lang="ts">

  import LogoImage from '/logo.png'

  enum OrientationOptions {
    Vertical = "vertical",
    Horizontal = "horizontal"
  }

  const props = withDefaults(
    defineProps<{ orientation?: OrientationOptions }>(),
    { orientation: OrientationOptions.Horizontal }
  );

</script>
<template>
  <div class="flex gap-1" :class="{'flex-col': props.orientation == OrientationOptions.Vertical}">
    <img class="max-w-[100px] m-auto" :src="LogoImage" alt="Logo Oficial" />
    <p class="text-lg text-center font-display mt-3">Link Shortener</p>
    <p class="text-sm text-center text-white/30">by SaidSuyv</p>        </div>
</template>
