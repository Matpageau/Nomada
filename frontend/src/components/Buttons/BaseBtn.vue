<script setup lang="ts">
const emit = defineEmits<{
  (e: "click"): void
}>()

defineProps<{
  text: string
}>()
</script>

<template>
  <button
    @click="emit('click')"
    class="w-fit p-1 cursor-pointer rounded"
  >
    <p>{{ text }}</p>
  </button>
</template>