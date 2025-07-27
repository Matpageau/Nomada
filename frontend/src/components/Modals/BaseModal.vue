<script setup lang="ts">
import XIcon from '../icons/XIcon.vue';

const emit = defineEmits<{
  (e: "close"): void
}>()

</script>

<template>
  <div class="flex absolute w-screen h-screen justify-center items-center z-20 bg-[#00000085]">
    <div class="h-3/4 w-3/4">
      <div class="flex relative flex-col bg-neutral-800 h-full rounded p-2">
        <XIcon class="absolute cursor-pointer self-end mb-2" @click="emit('close')"/>
        <div class="p-5">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>