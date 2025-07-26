<script setup lang="ts">
import PlusIcon from '@/components/icons/PlusIcon.vue';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

type MediaItem = File | string;

const props = defineProps<{
  medias?: MediaItem[]
}>()

const emit = defineEmits<{
  (e: "setMedias", medias: MediaItem[]): void
}>();

const medias = ref<MediaItem[]>([]);
const previewUrls = ref<string[]>([]);

const generatePreviewUrls = (items: MediaItem[]) => {
  previewUrls.value = items.map(media =>
    typeof media === 'string' ? media : URL.createObjectURL(media)
  )
}

watch(
  () => props.medias,
  (newMedias) => {
    if (newMedias && newMedias.length) {
      medias.value = newMedias
      generatePreviewUrls(newMedias)
    } else {
      medias.value = []
      previewUrls.value = []
    }
  },
  { immediate: true }
)

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (!files) return;

  const newFiles = Array.from(files);

  const newPreviews = newFiles.map(file => URL.createObjectURL(file));
  previewUrls.value.push(...newPreviews);

  medias.value.push(...newFiles);
  emit("setMedias", medias.value);
};

onBeforeUnmount(() => {
  previewUrls.value.forEach(url => URL.revokeObjectURL(url));
});
</script>

<template>
  <div class="overflow-y-scroll h-full scrollbar-thin">
    <div class="grid grid-cols-3 gap-2">
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
        v-for="(media, index) in medias"
        :key="index"
        class="flex relative rounded-xl aspect-square overflow-hidden shadow-md hover:shadow-lg transition items-center justify-center bg-white"
      >
        <img 
          :src="typeof media === 'string' ? media : previewUrls[index]" 
          alt="step image"
          class="object-cover w-full h-full"
        >
      </div>
    </div>
  </div>
</template>
