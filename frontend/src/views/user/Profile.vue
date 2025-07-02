<script setup lang="ts">
import Navbar from '@/components/Navbar/Navbar.vue';
import defaultProfile from '@/assets/imgs/defautProfile.jpg'
import type { UserType } from '@/Types/User';
import type { PostType } from '@/Types/Post';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import axios from 'axios';

const route = useRoute()
const username = route.params.username as string

const currentUser = ref<UserType | null>(null)
const user = ref<UserType | null>(null)
const posts = ref<PostType[]>([])

onMounted(async () => {
  try {
    const userRes = await axios.get<UserType>(`http://localhost:3000/user/by-username/${username}`)
    user.value = userRes.data
    console.log(user);
    
    const [meRes, postsRes] = await Promise.all([
      await axios.get<UserType>('http://localhost:3000/user/me', {
        withCredentials: true
      }),
      
      await axios.get<PostType[]>(`http://localhost:3000/posts/user/${user.value._id}`)
    ])

    currentUser.value = meRes.data
    user.value = userRes.data
    posts.value = postsRes.data
  } catch (error: any) {
    console.error('❌ Failed to fetch user profile:', error)
  }
})

</script>

<template>
  <div class="flex">
    <Navbar />
    <div v-if="user" class="flex w-full p-10">
      <div class="flex w-1/2">
        <div class="w-full">
          <div class="p-10 border-b-1 border-neutral-700">
            <div class="flex">
              <div class="w-1/3">
                <img 
                  :src="user.profileImg ?? defaultProfile"
                  alt="Profile picture"
                  class="rounded-full h-[120px] w-[120px]"
                >
              </div>
              <div class="flex flex-col w-2/3 justify-between">
                <p class="text-2xl">{{ user.username }}</p>
                <div class="flex gap-10">
                  <p><strong></strong> Travel</p>
                  <p><strong></strong> Km Travelled</p>
                  <p><strong></strong> Follower</p>
                  <p><strong></strong> Following</p>
                </div>
                <p>{{ user.bio }}</p>
              </div>
            </div>
          </div>
          <div v-if="currentUser?._id == user._id">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>