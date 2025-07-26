<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import defaultMarker from '@/assets/imgs/placeholder-image.png'

const props = defineProps<{
  img?: string | File
}>();

const previewUrl = ref<string | null>(null);
let objectUrl: string | null = null;

const updatePreview = (img?: string | File) => {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
    objectUrl = null;
  }

  if (img instanceof File) {
    objectUrl = URL.createObjectURL(img);
    previewUrl.value = objectUrl;
  } else if (typeof img === 'string') {
    previewUrl.value = img;
  } else {
    previewUrl.value = null;
  }
};

watch(() => props.img, updatePreview, { immediate: true });

onBeforeUnmount(() => {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
  }
});
</script>

<template>
  <img
    v-if="previewUrl"
    :src="previewUrl"
    class="rounded-full h-auto aspect-1/1 object-cover w-[30px] hover:w-[60px] transition-all"
  />
  <img 
    v-else
    :src="defaultMarker"
    alt="default marker"
    class="rounded-full h-auto aspect-1/1 object-cover w-[30px] hover:w-[60px] transition-all"
  >
</template>
