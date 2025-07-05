<script setup lang="ts">
import XIcon from '../icons/XIcon.vue';

const emit = defineEmits<{
  (e: "close"): void
}>()

</script>

<template>
  <div class="absolute w-screen h-screen p-20 z-20 bg-[#00000085]">
    <div class="h-full w-full">
      <div class="flex flex-col bg-neutral-700 h-full rounded p-2">
        <div class="flex flex-col w-full h-full justify-end">
          <XIcon class="cursor-pointer self-end mb-2" @click="emit('close')"/>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>