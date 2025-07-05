<script setup lang="ts">
import PlusIcon from '@/components/icons/PlusIcon.vue';

const emit = defineEmits<{
  (e: "click"): void
}>()
</script>

<template>
  <button 
    class="cursor-pointer"
    @click="emit('click')"
  >
    <PlusIcon />
  </button>
</template>