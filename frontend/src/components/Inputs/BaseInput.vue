<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const props = defineProps<{
  type: InputTypeHTMLAttribute
  isRequired: boolean
  placeholder?: string
  error?: string
}>()
</script>

<template>
  <div class="flex flex-col">
    <input 
    :type="props.type"
    class="bg-white shadow rounded outline-none p-3 border-1 border-white"
    :class="{ 'border-red-500': props.error}"
    :required="props.isRequired"
    :placeholder="placeholder"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <span
      class="text-red-600 text-sm min-h-[1.25rem]" 
      aria-live="polite"
    >
      {{ props.error || '\u00A0' }}
    </span>
  </div>
</template>