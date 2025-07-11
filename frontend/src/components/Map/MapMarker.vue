<script setup lang="ts">
defineProps<{
  img: string
}>();
</script>

<template>
  <div class="w-10 h-10 rounded-full overflow-hidden shadow-md">
    <img :src="img" alt="Marker" class="w-full h-full object-cover" />
  </div>
</template>