<script setup lang="ts">
import placeholder from '@/assets/imgs/placeholder-image.png'
import type { PopulatedStep } from '@/Types/PopulatedStep';

const props = defineProps<{
  step: PopulatedStep
}>()

</script>

<template>
  <img 
    :src="props.step.medias[0].url ?? placeholder" 
    alt="Step image"
    class="h-[200px] w-full object-cover rounded cursor-pointer"
  />
</template>