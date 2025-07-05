<script setup lang="ts">
import TripGrid from './TripGrid.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { PostType } from '@/Types/Post'

const props = defineProps<{ posts: PostType[] }>()
const route = useRoute()

const isDraft = computed(() => route.path.endsWith('/draft'))

const filteredPosts = computed(() =>
  props.posts.filter(post => !!post.status === isDraft.value)
)
</script>

<template>
  <TripGrid :posts="filteredPosts" class="mt-3" :is-draft="isDraft"/>
</template>
