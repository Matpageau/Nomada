<script setup lang="ts">
import type { PostType } from '../../../Types/Post';
import TripCard from './TripCard.vue';

defineProps<{
  posts: PostType[]
  isDraft: boolean
}>()
</script>

<template>
  <div class="flex-grow overflow-y-scroll scrollbar-none">
    <div class="grid grid-cols-3 gap-2 auto-rows-min" v-if="posts.length > 0 || isDraft">
      <TripCard :is-create="isDraft"/>
      <TripCard 
        v-for="post in posts"
        :key="post._id.toString()"
        :post="post"
      />
    </div>
    <div v-else>
      <p>No trip</p>
    </div>
  </div>
</template>