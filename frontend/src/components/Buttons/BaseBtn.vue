<script setup lang="ts">
const emit = defineEmits<{
  (e: "click"): void
}>()

defineProps<{
  text: string
  isDisabled?: boolean
}>()
</script>

<template>
  <button
    @click="emit('click')"
    class="cursor-pointer rounded p-3 disabled:opacity-60 disabled:cursor-auto transition-all"
    :disabled="isDisabled"
  >
    <p>{{ text }}</p>
  </button>
</template>