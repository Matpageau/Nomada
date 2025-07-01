<script setup lang="ts">
import type { UserType } from "@/Types/User.ts"

const { user } = defineProps<{
  user: UserType
}>()
</script>

<template>
  <div class="flex">
    <a :href="`/${user.username}`">
      <img 
        :src="`${user.profileImg}`"
        alt="profile picture"
        class="rounded-full"
      >
    </a>
  </div>
</template>