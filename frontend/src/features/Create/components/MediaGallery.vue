<script setup lang="ts">
import PlusIcon from '@/components/icons/PlusIcon.vue';
import { onBeforeUnmount, ref } from 'vue';

const medias = ref<string[]>([])

const emit = defineEmits<{
  (e: "setMedias", medias: string[]): void
}>()

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if(!files) return

  const newUrls = Array.from(files).map(file => URL.createObjectURL(file))
  medias.value = [ ...medias.value, ...newUrls]
  emit('setMedias', medias.value)
}

onBeforeUnmount(() => {
  medias.value.forEach(url => URL.revokeObjectURL(url))
})
</script>

<template>
  <div class="overflow-y-scroll h-full px-2 scrollbar-thin">
    <div class="grid grid-cols-4 gap-4">
      <div class="relative aspect-square border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center hover:bg-gray-100 transition">
        <label class="flex flex-col items-center justify-center text-gray-500 cursor-pointer h-full w-full">
          <PlusIcon />
          <span>Add medias</span>
          <input 
            type="file"
            multiple
            accept="image/*"
            class="hidden"
            @change="handleFileChange"
          >
        </label>
      </div>
      <div 
        v-for="(img, index) in medias"
        :key="index"
        class="flex relative rounded-xl aspect-square overflow-hidden shadow-md hover:shadow-lg transition items-center justify-center bg-white"
      >
        <img :src="img" alt="step image">
      </div>
    </div>
  </div>
</template>