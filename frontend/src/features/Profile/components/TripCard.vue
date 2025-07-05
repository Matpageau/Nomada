<script setup lang="ts">
import PlusIcon from '@/components/icons/PlusIcon.vue';
import type { PostType } from '../../../Types/Post';
import axios from 'axios';
import router from '@/router';

defineProps<{
  post?: PostType
  isCreate?: boolean
}>()

const emit = defineEmits<{
  (e: "createPost"): void
}>()

const handleCreatePost = async () => {
  try {
    const res = await axios.post("http://localhost:3000/post/create",
      {},
      { withCredentials: true }
    )

    const createdPost = res.data

    router.push(`/post/${createdPost._id}/edit`)
  } catch (error) {
    console.error("❌ Failed to create draft post:", error)
  }
  
}
</script>

<template>
  <div class="h-1/3">
    <div 
      v-if="isCreate"
      class="flex justify-center items-center h-[350px] w-full rounded bg-[var(--main)] hover:bg-[var(--main-hover)] transition-colors cursor-pointer"
      @click="handleCreatePost"
    >
      <PlusIcon class="h-[50px] w-[50px]"/>
    </div>
    <div v-else>
      <p>Post</p>
    </div>
  </div>
</template>