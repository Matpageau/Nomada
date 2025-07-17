<script setup lang="ts">
import HomeIcon from "@/components/icons/HomeIcon.vue"
import SearchIcon from "../icons/SearchIcon.vue";
import defaultProfile from '@/assets/imgs/defautProfile.jpg'
import { onMounted, ref } from "vue";
import axios from "axios";
import type { UserType } from "@/Types/User";
import router from "@/router";

const currentUser = ref<UserType | null>(null)

onMounted(async () => {
  try {
    const res = await axios.get<UserType>('http://localhost:3000/user/me', {
      withCredentials: true
    })
    currentUser.value = res.data
  } catch (error: any) {
    router.push("/login")
  }
})
</script>

<template>
  <nav class="flex flex-col justify-between w-fit border-r-1 border-neutral-800 p-2 h-screen">
    <div>
      <a href="/" class="flex min-w-[220px] px-5 py-3 my-2 items-center rounded-md transition-colors hover:bg-neutral-800 outline-none">
        <HomeIcon />
        <p class="pl-3">Home</p>
      </a>
      <a href="/" class="flex min-w-[220px] px-5 py-3 my-2 items-center rounded-md transition-colors hover:bg-neutral-800 outline-none">
        <SearchIcon />
        <p class="pl-3">Search</p>
      </a>
    </div>
    <div>
      <a :href="`/${currentUser?.username}`" class="flex min-w-[220px] px-5 py-3 my-2 items-center rounded-md transition-colors hover:bg-neutral-800 outline-none">
        <img :src="currentUser?.profileImg || defaultProfile" alt="profile picture" class="rounded-full w-6 h-6">
        <p class="pl-3">{{ currentUser?.username }}</p>
      </a>
    </div>
  </nav>
</template>