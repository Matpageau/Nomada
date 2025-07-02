<script setup lang="ts">
import type { UserType } from "@/Types/User.ts"
import defaultProfile from '@/assets/imgs/defautProfile.jpg'
const { user } = defineProps<{
  user: UserType
}>()
</script>

<template>
  <div class="flex">
    <a :href="`/${user.username}`">
      <img 
        :src="user.profileImg || defaultProfile"
        alt="profile picture"
        class="rounded-full h-[44px]"
      >
    </a>
    <div class='ml-3'>
        <a :href="`/${user.username}`">{{ user.username }}</a>
        <p class='text-neutral-400 text-sm'>{{ user.fullName }}</p>
      </div>
  </div>
</template>