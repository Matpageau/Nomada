<script setup lang="ts">
import HomeIcon from "@/components/icons/HomeIcon.vue"
import SearchIcon from "../icons/SearchIcon.vue";
</script>

<template>
  <nav class="w-fit border-r-1 border-neutral-800 p-2 h-screen">
    <a href="/" class="flex min-w-[220px] px-5 py-3 my-2 items-center rounded-md transition-colors hover:bg-neutral-800 outline-none">
      <HomeIcon />
      <p class="pl-3">Home</p>
    </a>
    <a href="/" class="flex min-w-[220px] px-5 py-3 my-2 items-center rounded-md transition-colors hover:bg-neutral-800 outline-none">
      <SearchIcon />
      <p class="pl-3">Search</p>
    </a>
  </nav>
</template>