<script setup lang="ts" >
import ClientMap from '@/components/Map/ClientMap.vue';
import Navbar from '@/components/Navbar/Navbar.vue';

</script>

<template>
  <div class="flex">
    <Navbar />
    <div class="flex w-full">
      <ClientMap :markers="[]"/>
    </div>
  </div>
</template>