<script setup lang="ts">
import HomeIcon from "@/components/icons/HomeIcon.vue"
import SearchIcon from "../icons/SearchIcon.vue";
import defaultProfile from '@/assets/imgs/defautProfile.jpg'
import { useUserStore } from "@/stores/userStore";
import GearIcon from "../icons/GearIcon.vue";
const userStore = useUserStore()

</script>

<template>
  <nav class="flex flex-col justify-between w-fit border-r-1 border-neutral-800 p-2 h-screen">
    <div>
      <h1 class="text-center text-5xl font-bold italic my-6">Nomada</h1>
      <div class="h-[1px] w-full bg-neutral-700"></div>
      <div class="mt-6">
        <a href="/" class="flex min-w-[250px] px-5 py-3 my-2 items-center rounded-md transition-colors hover:bg-neutral-800 outline-none">
          <HomeIcon />
          <p class="pl-3">Home</p>
        </a>
        <a href="/" class="flex min-w-[250px] px-5 py-3 my-2 items-center rounded-md transition-colors hover:bg-neutral-800 outline-none">
          <SearchIcon />
          <p class="pl-3">Search</p>
        </a>
      </div>
    </div>
    <div>
      <a href="/settings" class="flex min-w-[250px] px-5 py-3 my-2 items-center rounded-md transition-colors hover:bg-neutral-800 outline-none">
        <GearIcon />
        <p class="pl-3">Settings</p>
      </a>
      <a :href="`/user/${userStore.currentUser?.username}`" class="flex min-w-[250px] px-5 py-3 my-2 items-center rounded-md transition-colors hover:bg-neutral-800 outline-none">
        <img :src="userStore.currentUser?.profileImg || defaultProfile" alt="profile picture" class="rounded-full w-6 h-6">
        <p class="pl-3">{{ userStore.currentUser?.username }}</p>
      </a>
    </div>
  </nav>
</template>