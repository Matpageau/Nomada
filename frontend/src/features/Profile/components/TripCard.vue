<script setup lang="ts">
import PlusIcon from '@/components/icons/PlusIcon.vue';
import type { PostType } from '../../../Types/Post';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()

defineProps<{
  post?: PostType
  isCreate?: boolean
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
  <div 
    v-if="isCreate"
    class="flex justify-center items-center h-[350px] w-full rounded bg-[var(--main)] hover:bg-[var(--main-hover)] transition-colors cursor-pointer"
    @click="handleCreatePost"
  >
    <PlusIcon class="h-[45px] w-[45px]"/>
  </div>
  <div 
    v-else
    class="flex justify-center items-center h-[350px] w-full rounded bg-neutral-600 hover:bg-neutral-700 transition-colors cursor-pointer"
    @click="() => router.push(`/post/${post?._id}/edit`)"
  >
    <img 
      v-if="post?.medias[0]"
      :src="post.medias[0].toString()"
      alt="Trip photo"
      class="h-full w-full"
    >
  </div>
</template>