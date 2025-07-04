<script setup lang="ts" >
import CompactUserCard from '@/components/Cards/CompactUserCard.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import router from '@/router';
import type { UserType } from '@/Types/User';
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';

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
  <div class="flex">
    <Navbar />
    <div class="flex w-full">
      <div class="w-3/5">
        <p>A</p>
      </div>
      <div class="w-2/5 mt-5">
        <CompactUserCard v-if="currentUser" :user="currentUser"/>
      </div>
    </div>
  </div>
</template>