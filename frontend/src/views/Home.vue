<script setup lang="ts" >
import CompactUserCard from '@/components/Cards/CompactUserCard.vue';
import Navbar from '@/components/Navbar/Navbar.vue';
import type { UserType } from '@/Types/User';
import axios from 'axios';

const currentUser: UserType = await axios.get("http://localhost:3000/user/me")

</script>

<template>
  <div class="flex">
    <Navbar />
    <div class="flex w-full">
      <div class="w-3/5">
        <p>A</p>
      </div>
      <div class="w-2/5 mt-5">
        <CompactUserCard :user="currentUser"/>
      </div>
    </div>
  </div>
</template>