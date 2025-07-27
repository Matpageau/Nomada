<script setup lang="ts">
import { ref } from 'vue';
import ChevronLeft from '../icons/ChevronLeft.vue';
import ChevronRight from '../icons/ChevronRight.vue';

const props = defineProps<{
  medias: string[]
}>()

const currentIndex = ref(0)

const changePage = (amount: number) => {
  currentIndex.value += amount
}
</script>

<template>
  <div class="relative">
    <img :src="props.medias[currentIndex]" :alt="`Media ${currentIndex}`" />
    <ChevronLeft 
      v-if="currentIndex != 0" 
      class="absolute top-[50%] translate-y-[-50%] cursor-pointer"
      @click="changePage(-1)"
    />
    <ChevronRight 
      v-if="currentIndex != medias.length - 1" 
      class="absolute top-[50%] right-0 translate-y-[-50%] cursor-pointer"
      @click="changePage(1)"
    />
  </div>
</template>